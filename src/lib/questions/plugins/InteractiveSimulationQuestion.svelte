<script lang="ts">
  import { locale, t } from "$lib/application/locale";
  import ContentBlockRenderer from "$lib/components/ContentBlockRenderer.svelte";
  import type { QuestionRendererProps } from "$lib/questions/renderer-contract";

  type Props = QuestionRendererProps<"interactive-simulation">;
  let {
    question,
    disabled,
    attemptKey,
    reveal,
    submittedAnswer = null,
    onAnswerChange,
  }: Props = $props();

  let actionIds = $state<string[]>([]);
  let currentStateId = $state("");
  let renderedKey = $state("");
  let announcement = $state("");

  $effect(() => {
    const key = `${question.id}:${question.revision}:${attemptKey}`;
    if (renderedKey === key) return;
    renderedKey = key;
    actionIds = [];
    currentStateId = question.initialStateId;
    announcement = t(`${stateLabel(currentStateId)} 상태에서 시작합니다.`, `Start in ${stateLabel(currentStateId)}.`, $locale);
    onAnswerChange(null);
  });

  function stateLabel(id: string): string {
    return question.states.find((state) => state.id === id)?.label ?? id;
  }

  function actionLabel(id: string): string {
    return question.actions.find((action) => action.id === id)?.label ?? id;
  }

  function transitionFor(stateId: string, actionId: string) {
    return question.transitions.find(
      (transition) =>
        transition.fromStateId === stateId && transition.actionId === actionId,
    );
  }

  function availableActionIds(): string[] {
    if (disabled || actionIds.length >= question.maxSteps) return [];
    return question.transitions
      .filter((transition) => transition.fromStateId === currentStateId)
      .map((transition) => transition.actionId);
  }

  function isGoal(stateId = currentStateId): boolean {
    return question.goalStateIds.includes(stateId);
  }

  function isTerminal(nextActions: string[], nextStateId: string): boolean {
    return (
      isGoal(nextStateId) ||
      nextActions.length >= question.maxSteps ||
      !question.transitions.some(
        (transition) => transition.fromStateId === nextStateId,
      )
    );
  }

  function emit(nextActions: string[], nextStateId: string) {
    actionIds = nextActions;
    currentStateId = nextStateId;
    if (nextActions.length === 0 || !isTerminal(nextActions, nextStateId)) {
      onAnswerChange(null);
      return;
    }
    onAnswerChange({
      type: "interactive-simulation",
      actionIds: [...nextActions],
    });
  }

  function run(actionId: string) {
    if (disabled || !availableActionIds().includes(actionId)) return;
    const transition = transitionFor(currentStateId, actionId);
    if (!transition) return;
    const nextActions = [...actionIds, actionId];
    emit(nextActions, transition.toStateId);
    const suffix = isTerminal(nextActions, transition.toStateId)
      ? t(" 제출할 수 있습니다.", " You can submit now.", $locale)
      : "";
    announcement = t(`${actionLabel(actionId)} 실행. ${stateLabel(transition.toStateId)} 상태가 되었습니다.${suffix}`, `Executed ${actionLabel(actionId)}. Now in ${stateLabel(transition.toStateId)}.${suffix}`, $locale);
  }

  function replay(actions: string[]): string {
    let stateId = question.initialStateId;
    for (const actionId of actions) {
      const transition = transitionFor(stateId, actionId);
      if (!transition) break;
      stateId = transition.toStateId;
    }
    return stateId;
  }

  function undo() {
    if (disabled || actionIds.length === 0) return;
    const next = actionIds.slice(0, -1);
    const stateId = replay(next);
    emit(next, stateId);
    announcement = t(`한 단계를 취소했습니다. ${stateLabel(stateId)} 상태입니다.`, `Undid one step. Now in ${stateLabel(stateId)}.`, $locale);
  }

  function reset() {
    if (disabled) return;
    emit([], question.initialStateId);
    announcement = t(`${stateLabel(question.initialStateId)} 상태에서 다시 시작합니다.`, `Start again in ${stateLabel(question.initialStateId)}.`, $locale);
  }

  function canonicalActions(): string[] {
    return reveal?.type === "interactive-simulation" ? reveal.actionIds : [];
  }

  function submittedActions(): string[] {
    return submittedAnswer?.type === "interactive-simulation"
      ? submittedAnswer.actionIds
      : [];
  }
</script>

<div class="question-body">
  {#each question.prompt as block}
    <ContentBlockRenderer {block} />
  {/each}

  <section class="state-panel" aria-live="polite">
    <span class="eyebrow">{t("현재 상태", "Current state", $locale)}</span>
    <strong class="state-name">{stateLabel(currentStateId)}</strong>
    <span class:goal={isGoal()} class="goal-status">
      {isGoal() ? t("목표 상태 도달", "Goal reached", $locale) : `${t("목표", "Goal", $locale)}: ${question.goalStateIds.map(stateLabel).join(", ")}`}
    </span>
    <span class="step-count">{actionIds.length} / {question.maxSteps} {t("단계", "steps", $locale)}</span>
  </section>

  <section class="action-panel" aria-label={t("실행 가능한 동작", "Available actions", $locale)}>
    <h3>{t("동작 선택", "Choose action", $locale)}</h3>
    <div class="action-grid">
      {#each question.actions as action}
        {@const available = availableActionIds().includes(action.id)}
        <button
          type="button"
          class="action-button"
          class:available
          disabled={!available}
          onclick={() => run(action.id)}
        >
          <strong>{action.label}</strong>
          {#if available}
            {@const transition = transitionFor(currentStateId, action.id)}
            {#if transition}<span>→ {stateLabel(transition.toStateId)}</span>{/if}
          {:else}
            <span>{t("현재 실행 불가", "Currently unavailable", $locale)}</span>
          {/if}
        </button>
      {/each}
    </div>
  </section>

  <section class="history">
    <h3>{t("실행 기록", "Action history", $locale)}</h3>
    {#if actionIds.length === 0}
      <p>{t("아직 실행한 동작이 없습니다.", "No actions yet.", $locale)}</p>
    {:else}
      <ol>
        {#each actionIds as actionId}
          <li>{actionLabel(actionId)}</li>
        {/each}
      </ol>
    {/if}
  </section>

  <div class="controls">
    <button type="button" class="secondary" disabled={disabled || actionIds.length === 0} onclick={undo}>
      {t("한 단계 취소", "Undo one step", $locale)}
    </button>
    <button type="button" class="secondary" disabled={disabled || actionIds.length === 0} onclick={reset}>
      {t("처음부터", "Start over", $locale)}
    </button>
  </div>

  {#if disabled && submittedActions().length > 0}
    <div class="answer-summary">
      <strong>{t("내가 실행한 동작", "Your actions", $locale)}</strong>
      <span>{submittedActions().map(actionLabel).join(" → ")}</span>
    </div>
  {/if}

  {#if disabled && canonicalActions().length > 0}
    <div class="answer-summary canonical-summary">
      <strong>{t("정답 동작 예시", "Example correct actions", $locale)}</strong>
      <span>{canonicalActions().map(actionLabel).join(" → ")}</span>
    </div>
  {/if}

  <p class="sr-only" aria-live="polite">{announcement}</p>
</div>

<style>
  .question-body {
    display: grid;
    gap: var(--space-4);
  }

  .state-panel {
    position: relative;
    display: grid;
    gap: var(--space-2);
    padding: 1.1rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--surface-muted);
  }

  .eyebrow,
  .step-count {
    color: var(--text-muted);
    font-size: 0.78rem;
  }

  .state-name {
    font-size: 1.2rem;
    font-weight: 650;
  }

  .goal-status {
    font-size: 0.9rem;
  }

  .goal-status.goal {
    color: var(--success);
    font-weight: 650;
  }

  .step-count {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .action-panel,
  .history {
    display: grid;
    gap: var(--space-3);
  }

  h3,
  p,
  ol {
    margin: 0;
  }

  .action-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    gap: var(--space-2);
  }

  .action-button {
    min-height: 4.5rem;
    display: grid;
    gap: 0.2rem;
    text-align: left;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface);
    color: var(--text);
    padding: 0.75rem;
  }

  .action-button.available {
    cursor: pointer;
    border-width: 2px;
    border-color: var(--primary);
  }

  .action-button.available:hover { background: var(--primary-soft); }

  .action-button span {
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  .history {
    padding: 0.9rem 1rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-muted);
  }

  .history ol {
    padding-left: 1.4rem;
  }

  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .secondary {
    min-height: 2.5rem;
    min-height: 44px;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--surface);
    color: var(--text);
    padding: 0.45rem 0.8rem;
  }

  .answer-summary {
    display: grid;
    gap: var(--space-2);
    padding: 0.8rem 1rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface);
  }

  .canonical-summary {
    border-width: 2px;
    border-color: var(--success);
    background: var(--success-soft);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
