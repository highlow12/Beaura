<script lang="ts">
  import { base } from "$app/paths";
  import { onMount } from "svelte";
  import {
    loadDashboard,
    errorMessage,
    type Dashboard,
  } from "$lib/application/dashboard";
  import StudyCalendar from "$lib/components/StudyCalendar.svelte";
  import { locale, t } from "$lib/application/locale";
  const tr = (korean: string, english: string) => t(korean, english, $locale);
  const countText = (count: number, singular: string, plural: string, koreanUnit: string) =>
    $locale === "en" ? `${count} ${count === 1 ? singular : plural}` : `${count}${koreanUnit}`;
  const dayCount = (count: number) => countText(count, "day", "days", "일");
  let data = $state<Dashboard | null>(null);
  let error = $state("");
  async function load() {
    error = "";
    try {
      data = await loadDashboard();
    } catch (e) {
      error = errorMessage(e);
    }
  }
  onMount(() => {
    void load();
  });
</script>

<svelte:head><title>{tr("나의 학습 기록", "My learning history")} | Beaura</title></svelte:head>
<div class="stack">
  <div class="page-heading">
    <span class="page-kicker">{tr("진행도 / 이 기기의 기록", "PROGRESS / ON THIS DEVICE")}</span>
    <h1>{tr("나의 진행도", "My progress")}</h1>
    <p class="muted">{tr("작은 학습이 쌓인 기록을 한눈에 확인해요.", "See how your small learning sessions add up over time.")}</p>
  </div>
  {#if error}<div class="card error" role="alert">
      {error}<button class="button secondary" onclick={load}>{tr("다시 시도", "Try again")}</button>
    </div>
  {:else if !data}<p class="card" role="status">
      {tr("학습 기록을 불러오는 중입니다…", "Loading your learning data…")}
    </p>
  {:else}
    <StudyCalendar studyDates={data.snapshot.studyDates} />
    <div class="stats-grid">
      <div class="stat">
        <span>{tr("누적 경험치", "Total XP")}</span><strong
          >{data.snapshot.game.xp}<small>XP</small></strong
        >
      </div>
      <div class="stat">
        <span>{tr("연속 학습", "Current streak")}</span><strong
          >{dayCount(data.snapshot.game.streak)}</strong
        >
      </div>
      <div class="stat">
        <span>{tr("최장 연속 학습", "Longest streak")}</span><strong
          >{dayCount(data.snapshot.game.longestStreak)}</strong
        >
      </div>
    </div>
    <section class="card stack progress-section">
      <h2>{tr("트랙별 학습", "Progress by track")}</h2>
      {#each [...data.curriculum.tracks].sort((a, b) => a.order - b.order) as track}
        {@const lessons = data.lessons.filter((l) => l.track === track.id)}
        {@const completed = lessons.filter((l) =>
          data!.snapshot.lessonStates.some(
            (s) => s.lessonId === l.id && s.status === "completed",
          ),
        ).length}
        {#if lessons.length}<div class="track-progress" data-track={track.id}>
            <div class="row">
              <strong>{track.title}</strong><span
                >{completed} / {lessons.length}</span
              >
            </div>
              <progress
              value={completed}
              max={lessons.length}
              aria-label={`${track.title} ${tr("진행도", "progress")}`}
            ></progress>
          </div>{/if}
      {/each}
    </section>
    <section class="card progress-section">
      <div class="row">
        <h2>{tr("복습 기록", "Review history")}</h2>
        <a class="text-link" href={`${base}/review`}>{tr("복습하러 가기", "Start reviewing")}</a>
      </div>
      <p>
        {#if $locale === "en"}
          <strong>{countText(data.snapshot.questionStates.length, "question", "questions", "개")}</strong> studied ·
          <strong>{countText(data.queue.length, "question", "questions", "개")}</strong> due for review
        {:else}
          학습한 문제 <strong>{countText(data.snapshot.questionStates.length, "question", "questions", "개")}</strong> ·
          지금 복습할 문제 <strong>{countText(data.queue.length, "question", "questions", "개")}</strong>
        {/if}
      </p>
      <p class="muted">
        {tr("첫 시도에서 틀린 문제는 재시도에서 맞혀도 다시 배울 문제로 기록합니다.", "A question missed on the first try is still scheduled for review, even if you get it right on a retry.")}
      </p>
    </section>
    <section class="card progress-section">
      <h2>{tr("최근 학습한 레슨", "Recently studied lessons")}</h2>
      {#if !data.snapshot.lessonStates.length}<p class="muted">
          {tr("아직 학습 기록이 없어요. 첫 레슨을 시작해보세요.", "No learning history yet. Start your first lesson.")}
        </p>
        <a class="button" href={`${base}/learn`}>{tr("학습 시작", "Start learning")}</a>
      {:else}<ul class="recent-list">
          {#each [...data.snapshot.lessonStates]
            .filter((s) => data!.lessons.some((l) => l.id === s.lessonId))
            .sort((a, b) => (b.lastStudiedAt ?? 0) - (a.lastStudiedAt ?? 0))
            .slice(0, 10) as state}<li>
              <a class="text-link" href={`${base}/learn/${state.lessonId}`}
                >{data.lessons.find((l) => l.id === state.lessonId)?.title}</a
              ><span class="muted"
                >{state.status === "completed" ? tr("완료", "Completed") : tr("학습 중", "In progress")} · {state.lastStudiedAt
                  ? new Date(state.lastStudiedAt).toLocaleDateString($locale === "en" ? "en-US" : "ko-KR")
                  : "—"}</span
              >
            </li>{/each}
        </ul>{/if}
    </section>
  {/if}
</div>

<style>
  .progress-section {
    gap: var(--space-4);
  }
  .track-progress {
    display: grid;
    gap: var(--space-2);
    border-left: 3px solid
      color-mix(in srgb, var(--track-accent, var(--primary)) 65%, var(--border));
    padding-left: var(--space-3);
  }
  .track-progress strong {
    font-weight: 600;
  }
  .track-progress .row > span {
    color: var(--text-muted);
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.78rem;
  }
  .recent-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .recent-list li {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--space-2);
    padding: var(--space-4) 0;
    border-top: 1px solid var(--border);
  }
  .recent-list li:first-child {
    border-top: 0;
    padding-top: 0;
  }
</style>
