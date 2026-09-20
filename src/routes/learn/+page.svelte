<script lang="ts">
  import { base } from "$app/paths";
  import { onMount, tick } from "svelte";
  import { fly } from "svelte/transition";
  import {
    loadDashboard,
    errorMessage,
    type Dashboard,
  } from "$lib/application/dashboard";
  import {
    hasSeenTrackSwipeHint,
    markTrackSwipeHintSeen,
    swipeDirection,
    type SwipeDirection,
  } from "$lib/application/track-navigation";
  import {
    visibleTracks as getVisibleTracks,
    lessonStatus,
    missingPrerequisites,
    statusLabels,
  } from "$lib/curriculum/progress";
  import {
    emptyCurriculumDagLayout,
    layoutCurriculumDag,
    type DagLayout,
  } from "$lib/curriculum/dag-layout";

  type SwipeStart = { pointerId: number; x: number; y: number };
  type PrerequisiteItem = { trackTitle: string; lessonTitle: string };
  type UnlockSummary = {
    opensExternalTrack: boolean;
    opensExternalLesson: boolean;
  };
  type LessonPopover = {
    lessonId: string;
    missingPrerequisites: PrerequisiteItem[];
    opensExternalTrack: boolean;
    opensExternalLesson: boolean;
    left: number;
    top: number;
    arrowLeft: number;
  };

  let data = $state<Dashboard | null>(null);
  let error = $state("");
  let selectedTrackId = $state<string | null>(null);
  let selectedLessonId = $state<string | null>(null);
  let showSwipeHint = $state(false);
  let transitionDirection = $state<SwipeDirection>("next");
  let hintEvaluated = false;
  let swipeStart: SwipeStart | null = null;
  let suppressPopoverUntilClick = false;
  let reducedMotion = $state(false);
  let dagScroll = $state<HTMLDivElement | null>(null);
  let lessonPopover = $state<LessonPopover | null>(null);
  let pendingLessonPopover = $state<{
    lessonId: string;
    trackId: string;
  } | null>(null);

  function trackMotif(trackId: string): string {
    switch (trackId) {
      case "python":
        return ">_";
      case "computer-architecture":
        return "CPU";
      case "discrete-math":
        return "Σ";
      case "data-structures":
        return "•—•";
      case "algorithms":
        return "↗";
      case "networks":
        return "NET";
      case "computer-graphics":
        return "△";
      default:
        return "[]";
    }
  }

  let tracks = $derived(
    data
      ? getVisibleTracks(
          data.curriculum,
          data.lessons,
          data.snapshot.lessonStates,
        )
      : [],
  );
  let selectedTrack = $derived(
    tracks.find((track) => track.id === selectedTrackId) ?? tracks[0] ?? null,
  );
  let selectedTrackIndex = $derived(
    selectedTrack
      ? tracks.findIndex((track) => track.id === selectedTrack.id)
      : -1,
  );
  let selectedLessons = $derived(
    data && selectedTrack
      ? data.lessons.filter((lesson) => lesson.track === selectedTrack.id)
      : [],
  );
  let lessonById = $derived(
    new Map(selectedLessons.map((lesson) => [lesson.id, lesson])),
  );
  let allLessonsById = $derived(
    new Map((data?.lessons ?? []).map((lesson) => [lesson.id, lesson])),
  );
  let tracksById = $derived(
    new Map((data?.curriculum.tracks ?? []).map((track) => [track.id, track])),
  );
  let dagLayout = $state<DagLayout>(emptyCurriculumDagLayout());
  $effect(() => {
    const lessonIds = selectedLessons.map((lesson) => lesson.id);
    const curriculumNodes = data?.curriculum.nodes ?? [];
    let cancelled = false;

    dagLayout = emptyCurriculumDagLayout();
    if (lessonIds.length) {
      void layoutCurriculumDag(lessonIds, curriculumNodes)
        .then((layout) => {
          if (!cancelled) dagLayout = layout;
        })
        .catch((cause) => {
          if (!cancelled)
            console.error("Failed to layout curriculum DAG with ELK", cause);
        });
    }

    return () => {
      cancelled = true;
    };
  });
  $effect(() => {
    const pending = pendingLessonPopover;
    const isReady =
      pending &&
      selectedTrack?.id === pending.trackId &&
      dagLayout.nodes.some(
        (node) => node.id === pending.lessonId && !node.isExternal,
      );
    if (!pending || !isReady) return;

    void tick().then(() => {
      if (pendingLessonPopover !== pending || !dagScroll) return;
      requestAnimationFrame(() => {
        if (pendingLessonPopover !== pending || !dagScroll) return;
        const target = Array.from(
          dagScroll.querySelectorAll<HTMLElement>("[data-lesson-id]"),
        ).find((element) => element.dataset.lessonId === pending.lessonId);
        if (!target) return;

        target.scrollIntoView({ block: "center", inline: "center" });
        target.focus({ preventScroll: true });
        openLessonPopover(target, pending.lessonId);
        pendingLessonPopover = null;
      });
    });
  });
  let selectedLesson = $derived(
    selectedLessons.find((lesson) => lesson.id === selectedLessonId) ??
      selectedLessons[0] ??
      null,
  );
  let popoverLesson = $derived(
    data?.lessons.find((lesson) => lesson.id === lessonPopover?.lessonId) ??
      null,
  );
  let popoverStatus: keyof typeof statusLabels | null = $derived(
    popoverLesson && data
      ? lessonStatus(popoverLesson, data.curriculum, data.snapshot.lessonStates)
      : null,
  );
  let completedLessonCount = $derived(
    data && selectedTrack
      ? selectedLessons.filter(
          (lesson) =>
            lessonStatus(
              lesson,
              data!.curriculum,
              data!.snapshot.lessonStates,
            ) === "completed",
        ).length
      : 0,
  );
  $effect(() => {
    const trackId = selectedTrack?.id;
    const layoutWidth = dagLayout.width;
    if (!trackId || !layoutWidth) return;

    void tick().then(() => {
      if (!dagScroll || selectedTrack?.id !== trackId) return;
      dagScroll.scrollLeft = Math.max(
        0,
        (dagScroll.scrollWidth - dagScroll.clientWidth) / 2,
      );
      dagScroll.scrollTop = 0;
    });
  });

  function localStorageIfAvailable(): Storage | null {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage;
    } catch {
      return null;
    }
  }

  function defaultLessonId(
    lessons: Dashboard["lessons"],
    curriculum: Dashboard["curriculum"],
    states: Dashboard["snapshot"]["lessonStates"],
  ): string | null {
    const inProgress = lessons.find(
      (lesson) => lessonStatus(lesson, curriculum, states) === "in-progress",
    );
    if (inProgress) return inProgress.id;

    const available = lessons.find(
      (lesson) => lessonStatus(lesson, curriculum, states) === "available",
    );
    if (available) return available.id;

    const stateByLesson = new Map(
      states.map((state) => [state.lessonId, state]),
    );
    const completed = lessons
      .filter(
        (lesson) => lessonStatus(lesson, curriculum, states) === "completed",
      )
      .sort(
        (left, right) =>
          (stateByLesson.get(right.id)?.lastStudiedAt ?? 0) -
          (stateByLesson.get(left.id)?.lastStudiedAt ?? 0),
      );
    return completed[0]?.id ?? lessons[0]?.id ?? null;
  }

  async function load() {
    error = "";
    try {
      const next = await loadDashboard();
      data = next;

      const nextTracks = getVisibleTracks(
        next.curriculum,
        next.lessons,
        next.snapshot.lessonStates,
      );
      // Track selection is deliberately local to this page. Every fresh entry
      // starts at the first currently reachable track in curriculum order.
      selectedTrackId = nextTracks[0]?.id ?? null;
      const nextLessons = nextTracks[0]
        ? next.lessons.filter((lesson) => lesson.track === nextTracks[0].id)
        : [];
      selectedLessonId = defaultLessonId(
        nextLessons,
        next.curriculum,
        next.snapshot.lessonStates,
      );
      if (!hintEvaluated && nextTracks.length > 1) {
        hintEvaluated = true;
        const storage = localStorageIfAvailable();
        showSwipeHint = !hasSeenTrackSwipeHint(storage);
        if (showSwipeHint) markTrackSwipeHintSeen(storage);
      }
    } catch (e) {
      error = errorMessage(e);
    }
  }

  onMount(() => {
    void load();
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => (reducedMotion = media.matches);
    syncMotion();
    media.addEventListener?.("change", syncMotion);
    return () => media.removeEventListener?.("change", syncMotion);
  });

  function dismissSwipeHint() {
    showSwipeHint = false;
    markTrackSwipeHintSeen(localStorageIfAvailable());
  }

  function selectTrack(trackId: string) {
    // This guard keeps both tap and swipe navigation inside the currently
    // reachable set, even if a stale event arrives after progress changes.
    const nextIndex = tracks.findIndex((track) => track.id === trackId);
    if (nextIndex < 0 || nextIndex === selectedTrackIndex) return;
    transitionDirection = nextIndex > selectedTrackIndex ? "next" : "previous";
    lessonPopover = null;
    selectedTrackId = trackId;
    if (data) {
      const nextLessons = data.lessons.filter(
        (lesson) => lesson.track === trackId,
      );
      selectedLessonId = defaultLessonId(
        nextLessons,
        data.curriculum,
        data.snapshot.lessonStates,
      );
    }
    if (showSwipeHint) dismissSwipeHint();
  }

  function moveTrack(direction: SwipeDirection) {
    if (showSwipeHint) dismissSwipeHint();
    const nextIndex = selectedTrackIndex + (direction === "next" ? 1 : -1);
    const nextTrack = tracks[nextIndex];
    if (nextTrack) selectTrack(nextTrack.id);
  }

  function handleTrackKeydown(event: KeyboardEvent, trackId: string) {
    const index = tracks.findIndex((track) => track.id === trackId);
    const nextIndex =
      event.key === "ArrowRight"
        ? index + 1
        : event.key === "ArrowLeft"
          ? index - 1
          : -1;
    const nextTrack = tracks[nextIndex];
    if (!nextTrack) return;
    event.preventDefault();
    selectTrack(nextTrack.id);
    if (typeof document !== "undefined") {
      requestAnimationFrame(() =>
        document.getElementById(`track-tab-${nextTrack.id}`)?.focus(),
      );
    }
  }

  function handlePointerDown(event: PointerEvent) {
    if (!event.isPrimary) return;
    const target = event.target;
    if (target instanceof Element && target.closest(".dag-scroll")) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const surface = event.currentTarget as HTMLElement;
    surface.setPointerCapture(event.pointerId);
    swipeStart = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
  }

  function selectLesson(lessonId: string) {
    if (!lessonById.has(lessonId)) return;
    selectedLessonId = lessonId;
  }

  function prerequisiteItems(lessonId: string): PrerequisiteItem[] {
    if (!data) return [];
    const missing = new Set(
      missingPrerequisites(
        lessonId,
        data.curriculum,
        data.snapshot.lessonStates,
      ),
    );
    const lessonsById = new Map(
      data.lessons.map((lesson) => [lesson.id, lesson]),
    );
    const tracksById = new Map(
      data.curriculum.tracks.map((track) => [track.id, track]),
    );
    const required =
      data.curriculum.nodes.find((node) => node.lesson === lessonId)
        ?.requires ?? [];

    return required.flatMap((requiredId) => {
      if (!missing.has(requiredId)) return [];
      const lesson = lessonsById.get(requiredId);
      if (!lesson) return [];
      return [
        {
          trackTitle: tracksById.get(lesson.track)?.title ?? lesson.track,
          lessonTitle: lesson.title,
        },
      ];
    });
  }

  function completionUnlockSummary(lessonId: string): UnlockSummary {
    if (!data || !selectedTrack) {
      return { opensExternalTrack: false, opensExternalLesson: false };
    }

    const unlockedIds = new Set(
      data.curriculum.nodes.flatMap((node) => {
        const missing = missingPrerequisites(
          node.lesson,
          data!.curriculum,
          data!.snapshot.lessonStates,
        );
        return missing.length === 1 && missing[0] === lessonId
          ? [node.lesson]
          : [];
      }),
    );
    const visibleTrackIds = new Set(tracks.map((track) => track.id));
    let opensExternalTrack = false;
    let opensExternalLesson = false;

    for (const lesson of data.lessons) {
      if (!unlockedIds.has(lesson.id) || lesson.track === selectedTrack.id)
        continue;
      if (visibleTrackIds.has(lesson.track)) opensExternalLesson = true;
      else opensExternalTrack = true;
    }

    return { opensExternalTrack, opensExternalLesson };
  }

  function handleLessonClick(event: MouseEvent, lessonId: string) {
    selectLesson(lessonId);
    if (suppressPopoverUntilClick) {
      suppressPopoverUntilClick = false;
      return;
    }

    openLessonPopover(event.currentTarget as HTMLElement, lessonId);
  }

  function openLessonPopover(target: HTMLElement, lessonId: string) {
    const rect = target.getBoundingClientRect();
    const width = Math.min(280, window.innerWidth - 24);
    const anchor = rect.left + rect.width / 2;
    const left = Math.min(
      Math.max(12, anchor - width / 2),
      window.innerWidth - width - 12,
    );
    const unlockSummary = completionUnlockSummary(lessonId);
    lessonPopover = {
      lessonId,
      missingPrerequisites: prerequisiteItems(lessonId),
      ...unlockSummary,
      left,
      top: rect.top - 8,
      arrowLeft: anchor - left,
    };
  }

  function openExternalLesson(lessonId: string, trackId: string) {
    if (!tracks.some((track) => track.id === trackId)) return;
    pendingLessonPopover = { lessonId, trackId };
    selectTrack(trackId);
    selectedLessonId = lessonId;
  }

  function dismissLessonPopover() {
    lessonPopover = null;
  }

  function handleWindowPointerDown(event: PointerEvent) {
    const target = event.target;
    if (target instanceof Element && target.closest(".popover-action")) return;
    if (!lessonPopover) return;
    lessonPopover = null;
    suppressPopoverUntilClick = true;
    window.setTimeout(() => (suppressPopoverUntilClick = false), 0);
  }

  function handleWindowKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") dismissLessonPopover();
  }

  function handlePointerUp(event: PointerEvent) {
    if (!swipeStart || swipeStart.pointerId !== event.pointerId) return;
    const start = swipeStart;
    swipeStart = null;
    const surface = event.currentTarget as HTMLElement;
    if (surface.hasPointerCapture(event.pointerId))
      surface.releasePointerCapture(event.pointerId);
    const direction = swipeDirection(
      event.clientX - start.x,
      event.clientY - start.y,
    );
    if (direction) {
      event.preventDefault();
      moveTrack(direction);
    }
  }

  function handlePointerCancel(event: PointerEvent) {
    if (!swipeStart || swipeStart.pointerId !== event.pointerId) return;
    swipeStart = null;
    const surface = event.currentTarget as HTMLElement;
    if (surface.hasPointerCapture(event.pointerId))
      surface.releasePointerCapture(event.pointerId);
  }
</script>

<svelte:window
  onpointerdown={handleWindowPointerDown}
  onkeydown={handleWindowKeydown}
  onresize={dismissLessonPopover}
  onscroll={dismissLessonPopover}
/>

<svelte:head><title>학습 경로 | Beaura</title></svelte:head>

<div class="stack">
  <div class="page-heading">
    <span class="page-kicker">학습 경로 / {tracks.length || "—"}개 트랙</span>
    <h1>학습 경로</h1>
    <p class="muted">
      Python에서 자료구조로, 컴퓨터 구조에서 네트워크와 그래픽스로.
    </p>
  </div>

  {#if error}
    <div class="card error" role="alert">
      {error}<button class="button secondary" onclick={load}>다시 시도</button>
    </div>
  {:else if !data}
    <p class="card" role="status">학습 경로를 불러오는 중입니다…</p>
  {:else if !tracks.length}
    <section class="card" role="status">
      <h2>아직 열린 학습 트랙이 없어요</h2>
      <p class="muted">새 학습 콘텐츠가 준비되면 이곳에 트랙이 나타납니다.</p>
    </section>
  {:else if selectedTrack}
    <section class="track-switcher" aria-label="학습 트랙">
      <div class="track-navigation" role="group" aria-label="트랙 변경">
        <button
          type="button"
          class="track-arrow"
          aria-label="이전 트랙"
          disabled={selectedTrackIndex <= 0}
          onclick={() => moveTrack("previous")}>←</button
        >
        <div class="track-tabs" role="tablist" aria-label="열린 트랙">
          {#each tracks as track}
            <button
              type="button"
              id={`track-tab-${track.id}`}
              role="tab"
              class="track-tab"
              class:active={track.id === selectedTrack.id}
              aria-selected={track.id === selectedTrack.id}
              aria-controls={`track-panel-${track.id}`}
              tabindex={track.id === selectedTrack.id ? 0 : -1}
              onkeydown={(event) => handleTrackKeydown(event, track.id)}
              onclick={() => selectTrack(track.id)}>{track.title}</button
            >
          {/each}
        </div>
        <button
          type="button"
          class="track-arrow"
          aria-label="다음 트랙"
          disabled={selectedTrackIndex < 0 ||
            selectedTrackIndex >= tracks.length - 1}
          onclick={() => moveTrack("next")}>→</button
        >
      </div>

      {#if showSwipeHint}
        <div class="swipe-hint" role="note">
          <span>좌우로 밀어서 열린 트랙을 바꿀 수 있어요.</span>
          <button type="button" class="hint-dismiss" onclick={dismissSwipeHint}
            >알겠어요</button
          >
        </div>
      {/if}

      <div
        class="track-surface"
        role="region"
        aria-label="스와이프로 트랙 변경"
        onpointerdown={handlePointerDown}
        onpointerup={handlePointerUp}
        onpointercancel={handlePointerCancel}
      >
        {#key selectedTrack.id}
          <div
            id={`track-panel-${selectedTrack.id}`}
            class="stack track"
            role="tabpanel"
            aria-labelledby={`track-tab-${selectedTrack.id}`}
            tabindex="0"
            in:fly={{
              x: reducedMotion ? 0 : transitionDirection === "next" ? 72 : -72,
              duration: reducedMotion ? 0 : 240,
              opacity: 1,
            }}
          >
            <div>
              <div class="track-heading" data-track={selectedTrack.id}>
                <span class="track-motif" aria-hidden="true"
                  >{trackMotif(selectedTrack.id)}</span
                >
                <div class="track-heading-copy">
                  <div class="row">
                    <h2>{selectedTrack.title}</h2>
                    <span class="muted"
                      >{completedLessonCount} / {selectedLessons.length} 완료</span
                    >
                  </div>
                  {#if selectedTrack.description}<p class="muted">
                      {selectedTrack.description}
                    </p>{/if}
                </div>
              </div>
            </div>
            <section
              class="dag-section"
              data-track={selectedTrack.id}
              aria-labelledby={`dag-title-${selectedTrack.id}`}
            >
              <div class="dag-heading">
                <div>
                  <h3 id={`dag-title-${selectedTrack.id}`}>선행 관계</h3>
                  <p class="muted">
                    위에서 아래로 갈수록 다음에 배울 수 있는 레슨입니다.
                  </p>
                </div>
                <div class="dag-legend" aria-label="레슨 상태">
                  <span
                    ><i class="legend-dot completed" aria-hidden="true">✓</i
                    >완료</span
                  >
                  <span
                    ><i class="legend-dot in-progress" aria-hidden="true">●</i
                    >학습 중</span
                  >
                  <span
                    ><i class="legend-dot available" aria-hidden="true">+</i
                    >시작 가능</span
                  >
                </div>
              </div>

              <div class="dag-viewport">
                <div
                  class="dag-scroll"
                  bind:this={dagScroll}
                  role="region"
                  aria-label={`${selectedTrack.title} 레슨 DAG`}
                  aria-describedby={`dag-help-${selectedTrack.id}`}
                >
                  <div
                    class="dag-canvas"
                    style={`width: ${dagLayout.width}px; height: ${dagLayout.height}px;`}
                  >
                    <svg
                      class="dag-edges"
                      viewBox={`0 0 ${dagLayout.width} ${dagLayout.height}`}
                      aria-hidden="true"
                    >
                      <defs>
                        <marker
                          id={`dag-arrow-${selectedTrack.id}`}
                          viewBox="0 0 8 8"
                          refX="7"
                          refY="4"
                          markerWidth="5"
                          markerHeight="5"
                          orient="auto-start-reverse"
                        >
                          <path d="M 0 0 L 8 4 L 0 8 z" />
                        </marker>
                      </defs>
                      {#each dagLayout.edges as edge}
                        {@const targetLesson = lessonById.get(edge.targetId)}
                        {@const targetStatus = targetLesson
                          ? lessonStatus(
                              targetLesson,
                              data.curriculum,
                              data.snapshot.lessonStates,
                            )
                          : "locked"}
                        <path
                          d={edge.path}
                          class:edge-muted={targetStatus === "locked"}
                          marker-end={`url(#dag-arrow-${selectedTrack.id})`}
                        />
                      {/each}
                    </svg>

                    <div class="dag-nodes">
                      {#each dagLayout.nodes as node (node.id)}
                        {@const lesson = allLessonsById.get(node.id)}
                        {#if lesson && node.isExternal}
                          {@const externalStatus = lessonStatus(
                            lesson,
                            data.curriculum,
                            data.snapshot.lessonStates,
                          )}
                          <button
                            type="button"
                            class="lesson-node external-node"
                            data-track={lesson.track}
                            data-lesson-id={lesson.id}
                            aria-label={`외부 선수과목, ${tracksById.get(lesson.track)?.title ?? lesson.track}, ${lesson.title}, ${statusLabels[externalStatus]}, 해당 트랙으로 이동`}
                            style={`--node-x: ${node.x}px; --node-y: ${node.y}px; --node-width: ${node.width}px; --node-height: ${node.height}px;`}
                            onclick={() =>
                              openExternalLesson(lesson.id, lesson.track)}
                          >
                            <span class="node-icon" aria-hidden="true"
                              >{trackMotif(lesson.track)}</span
                            >
                            <span class="node-copy">
                              <span class="node-track"
                                >{tracksById.get(lesson.track)?.title ??
                                  lesson.track}</span
                              >
                              <strong>{lesson.title}</strong>
                              <span class="node-status"
                                >외부 선수과목 · {statusLabels[
                                  externalStatus
                                ]}</span
                              >
                            </span>
                          </button>
                        {:else if lesson}
                          {@const status = lessonStatus(
                            lesson,
                            data.curriculum,
                            data.snapshot.lessonStates,
                          )}
                          <button
                            type="button"
                            class="lesson-node"
                            class:selected={lesson.id === selectedLesson?.id}
                            class:completed={status === "completed"}
                            class:in-progress={status === "in-progress"}
                            class:locked={status === "locked"}
                            data-track={selectedTrack.id}
                            data-lesson-id={lesson.id}
                            aria-pressed={lesson.id === selectedLesson?.id}
                            aria-label={`${lesson.title}, ${statusLabels[status]}`}
                            style={`--node-x: ${node.x}px; --node-y: ${node.y}px; --node-width: ${node.width}px; --node-height: ${node.height}px;`}
                            aria-describedby={lessonPopover?.lessonId ===
                            lesson.id
                              ? "lesson-popover"
                              : undefined}
                            onclick={(event) =>
                              handleLessonClick(event, lesson.id)}
                          >
                            <span class="node-icon" aria-hidden="true"
                              >{status === "completed"
                                ? "✓"
                                : trackMotif(selectedTrack.id)}</span
                            >
                            <span class="node-copy">
                              <strong>{lesson.title}</strong>
                              <span class="node-status"
                                >{statusLabels[status]}</span
                              >
                            </span>
                          </button>
                        {/if}
                      {/each}
                    </div>
                  </div>
                </div>
              </div>
              <p id={`dag-help-${selectedTrack.id}`} class="dag-help muted">
                선을 따라 선행 레슨과 다음 갈림길을 확인하세요. 넓은 그래프는
                좌우로 움직일 수 있어요.
              </p>
            </section>
          </div>
        {/key}
      </div>
    </section>
  {/if}
</div>

{#if lessonPopover && popoverLesson && popoverStatus}
  <div
    id="lesson-popover"
    class="lesson-popover"
    role="dialog"
    aria-labelledby="lesson-popover-title"
    style={`--popover-left: ${lessonPopover.left}px; --popover-top: ${lessonPopover.top}px; --popover-arrow-left: ${lessonPopover.arrowLeft}px;`}
  >
    <span class:success={popoverStatus === "completed"} class="popover-status"
      >{statusLabels[popoverStatus]}</span
    >
    <strong id="lesson-popover-title">{popoverLesson.title}</strong>
    <p>{popoverLesson.description}</p>
    {#if lessonPopover.missingPrerequisites.length}
      <div class="popover-prerequisites">
        <span>먼저 들어야 해요</span>
        <ul>
          {#each lessonPopover.missingPrerequisites as item}
            <li><strong>{item.trackTitle}</strong> · {item.lessonTitle}</li>
          {/each}
        </ul>
      </div>
    {/if}
    {#if lessonPopover.opensExternalTrack || lessonPopover.opensExternalLesson}
      <div class="popover-unlocks" aria-label="완료 후 열리는 학습">
        {#if lessonPopover.opensExternalTrack}
          <p>이 레슨을 완료하면 외부의 다른 트랙이 열립니다.</p>
        {/if}
        {#if lessonPopover.opensExternalLesson}
          <p>이 레슨을 완료하면 외부의 다른 레슨이 열립니다.</p>
        {/if}
      </div>
    {/if}
    {#if popoverStatus !== "locked"}
      <a
        class="button popover-action"
        href={`${base}/learn/${popoverLesson.id}`}
        aria-label={`${popoverLesson.title} ${popoverStatus === "completed" ? "다시 읽기" : "학습하기"}`}
        >{popoverStatus === "completed"
          ? "다시 읽기"
          : popoverStatus === "in-progress"
            ? "이어하기"
            : "시작하기"}</a
      >
    {/if}
  </div>
{/if}

<style>
  .track-switcher {
    display: grid;
    gap: var(--space-4);
  }

  .track-navigation {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--space-2);
  }

  .track-tabs {
    display: flex;
    min-width: 0;
    gap: var(--space-2);
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scrollbar-width: thin;
    padding: 0.15rem 0.1rem 0.35rem;
  }

  .track-tab,
  .track-arrow {
    min-height: 44px;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--surface);
    color: var(--text-muted);
    font-weight: 600;
    transition:
      border-color var(--dur-1) ease,
      background-color var(--dur-1) ease,
      color var(--dur-1) ease;
  }

  .track-tab {
    flex: 0 0 auto;
    padding: 0.6rem 0.85rem;
    white-space: nowrap;
  }

  .track-tab:hover,
  .track-tab:focus-visible,
  .track-tab.active {
    border-color: color-mix(in srgb, var(--primary) 72%, var(--border));
    background: var(--primary-soft);
    color: var(--primary-strong);
  }

  .track-arrow {
    display: grid;
    width: 2.75rem;
    place-items: center;
    padding: 0;
    color: var(--text);
    font-size: 1.1rem;
  }

  .track-arrow:hover:not(:disabled) {
    border-color: var(--border-strong);
    background: var(--surface-muted);
  }

  .track-arrow:disabled {
    opacity: 0.45;
  }

  .swipe-hint {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    border: 1px solid color-mix(in srgb, var(--primary) 35%, var(--border));
    border-radius: var(--radius-md);
    background: var(--primary-soft);
    color: var(--text);
    padding: 0.7rem 0.9rem;
    font-size: 0.9rem;
  }

  .hint-dismiss {
    flex: 0 0 auto;
    color: var(--primary);
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 0.2rem;
    min-height: 44px;
    padding: 0.4rem;
  }

  .track-surface {
    overflow: hidden;
    touch-action: pan-y;
    overscroll-behavior-x: contain;
  }

  .track h2,
  .track .row {
    margin: 0;
  }

  .track p {
    margin: var(--space-2) 0 0;
  }

  .track-heading {
    display: flex;
    align-items: flex-start;
    gap: var(--space-4);
    border-bottom: 1px solid var(--border);
    padding-bottom: var(--space-5);
  }

  .track-heading-copy {
    flex: 1;
    min-width: 0;
  }

  .track-motif {
    display: grid;
    flex: 0 0 auto;
    place-items: center;
    width: 3.25rem;
    height: 3.25rem;
    border: 1px solid
      color-mix(in srgb, var(--track-accent, var(--primary)) 60%, var(--border));
    border-radius: var(--radius-md);
    background: color-mix(
      in srgb,
      var(--track-accent, var(--primary)) 12%,
      var(--surface)
    );
    color: var(--track-accent, var(--primary));
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.78rem;
    font-weight: 700;
    line-height: 1;
  }

  .dag-section {
    display: grid;
    gap: var(--space-3);
  }

  .dag-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-4);
  }

  .dag-heading h3 {
    margin: 0;
    font-size: 1rem;
  }

  .dag-heading p {
    margin: var(--space-1) 0 0;
    font-size: 0.88rem;
  }

  .dag-legend {
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--space-2) var(--space-3);
    color: var(--text-muted);
    font-size: 0.75rem;
  }

  .dag-legend span {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    white-space: nowrap;
  }

  .legend-dot {
    display: inline-grid;
    width: 1.2rem;
    height: 1.2rem;
    place-items: center;
    border: 1px solid var(--border-strong);
    border-radius: 50%;
    background: var(--surface);
    color: var(--text-muted);
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.7rem;
    font-style: normal;
    font-weight: 700;
  }

  .legend-dot.completed {
    border-color: color-mix(in srgb, var(--success) 60%, var(--border));
    background: var(--success-soft);
    color: var(--success);
  }

  .legend-dot.in-progress {
    border-color: color-mix(
      in srgb,
      var(--track-accent, var(--primary)) 60%,
      var(--border)
    );
    background: color-mix(
      in srgb,
      var(--track-accent, var(--primary)) 12%,
      var(--surface)
    );
    color: var(--track-accent, var(--primary));
  }

  .legend-dot.available {
    color: var(--primary);
  }

  .dag-viewport {
    min-width: 0;
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-muted);
  }

  .dag-scroll {
    max-width: 100%;
    overflow: auto;
    overscroll-behavior: contain;
    padding: var(--space-2);
    scrollbar-width: thin;
    touch-action: pan-x pan-y;
    -webkit-overflow-scrolling: touch;
  }

  .dag-canvas {
    position: relative;
    margin: 0 auto;
  }

  .dag-edges,
  .dag-nodes {
    position: absolute;
    inset: 0;
  }

  .dag-edges {
    width: 100%;
    height: 100%;
    overflow: visible;
    color: color-mix(
      in srgb,
      var(--track-accent, var(--primary)) 62%,
      var(--border)
    );
    pointer-events: none;
  }

  .dag-edges path {
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.5;
    opacity: 0.85;
  }

  .dag-edges path.edge-muted {
    stroke-dasharray: 3 4;
    opacity: 0.45;
  }

  .dag-edges marker path {
    fill: currentColor;
    stroke: none;
  }

  .dag-nodes {
    pointer-events: none;
  }

  .lesson-node {
    position: absolute;
    top: var(--node-y);
    left: var(--node-x);
    display: flex;
    align-items: center;
    gap: 0.55rem;
    width: var(--node-width);
    min-height: var(--node-height);
    border: 1px solid
      color-mix(in srgb, var(--track-accent, var(--primary)) 58%, var(--border));
    border-radius: var(--radius-md);
    background: var(--surface);
    color: var(--text);
    padding: 0.65rem 0.6rem;
    text-align: left;
    pointer-events: auto;
    transition:
      border-color var(--dur-1) ease,
      background-color var(--dur-1) ease,
      color var(--dur-1) ease;
  }

  .lesson-node:hover {
    border-color: var(--track-accent, var(--primary));
    background: color-mix(
      in srgb,
      var(--track-accent, var(--primary)) 5%,
      var(--surface)
    );
  }

  .external-node {
    border-color: color-mix(
      in srgb,
      var(--track-accent, var(--primary)) 38%,
      var(--border)
    );
    background: color-mix(
      in srgb,
      var(--track-accent, var(--primary)) 4%,
      var(--surface)
    );
    color: var(--text-muted);
  }

  .external-node:hover,
  .external-node:focus-visible {
    border-color: color-mix(
      in srgb,
      var(--track-accent, var(--primary)) 58%,
      var(--border)
    );
    background: color-mix(
      in srgb,
      var(--track-accent, var(--primary)) 7%,
      var(--surface)
    );
  }

  .external-node .node-icon {
    border-color: color-mix(
      in srgb,
      var(--track-accent, var(--primary)) 32%,
      var(--border)
    );
    background: color-mix(
      in srgb,
      var(--track-accent, var(--primary)) 5%,
      var(--surface)
    );
    color: color-mix(
      in srgb,
      var(--track-accent, var(--primary)) 65%,
      var(--text-muted)
    );
  }

  .node-track {
    overflow: hidden;
    color: color-mix(
      in srgb,
      var(--track-accent, var(--primary)) 68%,
      var(--text-muted)
    );
    font-size: 0.62rem;
    font-weight: 700;
    line-height: 1.2;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .lesson-node:active {
    transform: translateY(1px);
  }

  .lesson-node.selected {
    border-width: 2px;
    border-color: var(--track-accent, var(--primary));
    background: color-mix(
      in srgb,
      var(--track-accent, var(--primary)) 8%,
      var(--surface-raised)
    );
    box-shadow: var(--shadow-sm);
  }

  .lesson-node.completed {
    border-color: color-mix(
      in srgb,
      var(--success) 58%,
      var(--track-accent, var(--border))
    );
  }

  .lesson-node.in-progress {
    border-color: var(--track-accent, var(--primary));
    background: color-mix(
      in srgb,
      var(--track-accent, var(--primary)) 7%,
      var(--surface)
    );
  }

  .lesson-node.locked {
    border-color: var(--border);
    background: var(--surface-muted);
    color: var(--text-muted);
  }

  .lesson-node.locked:hover {
    border-color: var(--border-strong);
    background: var(--surface);
  }

  .node-icon {
    display: grid;
    flex: 0 0 auto;
    width: 1.9rem;
    height: 1.9rem;
    place-items: center;
    border: 1px solid
      color-mix(in srgb, var(--track-accent, var(--primary)) 52%, var(--border));
    border-radius: var(--radius-sm);
    background: color-mix(
      in srgb,
      var(--track-accent, var(--primary)) 11%,
      var(--surface)
    );
    color: var(--track-accent, var(--primary));
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.8rem;
    font-weight: 700;
    line-height: 1;
  }

  .lesson-node.completed .node-icon {
    border-color: color-mix(in srgb, var(--success) 52%, var(--border));
    background: var(--success-soft);
    color: var(--success);
  }

  .lesson-node.locked .node-icon {
    border-color: var(--border);
    background: var(--surface);
    color: var(--text-muted);
  }

  .node-copy {
    display: grid;
    min-width: 0;
    gap: 0.12rem;
  }

  .node-copy strong {
    display: -webkit-box;
    overflow: hidden;
    color: inherit;
    font-size: 0.82rem;
    font-weight: 650;
    line-height: 1.25;
    overflow-wrap: anywhere;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .node-status {
    overflow: hidden;
    color: var(--text-muted);
    font-size: 0.67rem;
    line-height: 1.25;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dag-help {
    margin: 0;
    font-size: 0.78rem;
  }

  .lesson-popover {
    position: fixed;
    z-index: 100;
    top: var(--popover-top);
    left: var(--popover-left);
    width: min(17.5rem, calc(100vw - 1.5rem));
    border: 1px solid color-mix(in srgb, var(--warning) 58%, var(--border));
    border-radius: var(--radius-md);
    background: var(--surface-raised);
    box-shadow: var(--shadow-md);
    color: var(--text);
    padding: 0.75rem 0.85rem;
    transform: translateY(-100%);
    pointer-events: auto;
  }

  .lesson-popover::after {
    position: absolute;
    top: 100%;
    left: var(--popover-arrow-left);
    width: 0.7rem;
    height: 0.7rem;
    border-right: 1px solid
      color-mix(in srgb, var(--warning) 58%, var(--border));
    border-bottom: 1px solid
      color-mix(in srgb, var(--warning) 58%, var(--border));
    background: var(--surface-raised);
    content: "";
    transform: translate(-50%, -50%) rotate(45deg);
  }

  .lesson-popover > strong {
    display: block;
    margin-top: 0.2rem;
    font-size: 0.95rem;
  }

  .lesson-popover > p {
    margin: 0.35rem 0 0;
    color: var(--text-muted);
    font-size: 0.78rem;
    line-height: 1.45;
  }

  .popover-status {
    color: var(--track-accent, var(--primary));
    font-size: 0.7rem;
    font-weight: 700;
  }

  .popover-status.success {
    color: var(--success);
  }

  .popover-prerequisites,
  .popover-unlocks {
    display: grid;
    gap: 0.25rem;
    margin-top: 0.65rem;
    border-top: 1px solid var(--border);
    padding-top: 0.55rem;
  }

  .popover-prerequisites > span {
    color: var(--warning);
    font-size: 0.72rem;
    font-weight: 700;
  }

  .popover-prerequisites ul {
    display: grid;
    gap: 0.25rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .popover-prerequisites li {
    font-size: 0.78rem;
    line-height: 1.4;
  }

  .popover-prerequisites li strong {
    color: var(--text);
  }

  .popover-unlocks p {
    margin: 0;
    color: var(--primary-strong);
    font-size: 0.76rem;
    font-weight: 650;
    line-height: 1.4;
  }

  .popover-action {
    width: 100%;
    margin-top: 0.7rem;
  }

  @media (max-width: 540px) {
    .track-navigation {
      gap: 0.35rem;
    }

    .track-tab {
      padding-inline: 0.7rem;
    }

    .swipe-hint {
      align-items: flex-start;
      flex-direction: column;
    }

    .dag-heading {
      align-items: flex-start;
      flex-direction: column;
      gap: var(--space-2);
    }

    .dag-legend {
      justify-content: flex-start;
    }
  }

  @media (max-width: 380px) {
    .dag-scroll {
      padding: var(--space-1);
    }

    .lesson-node {
      padding-inline: 0.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .track-surface :global(*) {
      transition-duration: 0ms !important;
      animation-duration: 0ms !important;
    }
  }
</style>
