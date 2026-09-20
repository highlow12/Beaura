<script lang="ts">
  import { localDateFor } from "$lib/learning/gamification/config";
  import { monthDays, weekDays } from "$lib/learning/study-calendar";

  let { studyDates }: { studyDates: string[] } = $props();
  let expanded = $state(false);
  const today = localDateFor(Date.now());
  const date = new Date(`${today}T12:00:00`);
  const monthLabel = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
  }).format(date);
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const studied = $derived(new Set(studyDates));
  const days = $derived(expanded ? monthDays(today) : weekDays(today));
</script>

<section class="study-calendar card" aria-label="연속 학습 달력">
  <button
    class="calendar-toggle"
    type="button"
    aria-expanded={expanded}
    aria-controls="study-calendar-grid"
    onclick={() => (expanded = !expanded)}
  >
    <span
      ><strong>{monthLabel}</strong><small
        >{expanded ? "한 달의 학습 기록" : "이번 주 학습 기록"}</small
      ></span
    >
    <span class="toggle-label"
      >{expanded ? "접기" : "한 달 보기"}
      <span aria-hidden="true">{expanded ? "⌃" : "⌄"}</span></span
    >
  </button>
  <div class="weekday-row" aria-hidden="true">
    {#each weekdays as weekday}<span>{weekday}</span>{/each}
  </div>
  <div id="study-calendar-grid" class:expanded class="calendar-grid">
    {#each days as item}
      {@const isStudied = studied.has(item.date)}
      {@const isToday = item.date === today}
      <div
        class:studied={isStudied}
        class:today={isToday}
        class:outside={!item.inMonth && expanded}
        class="calendar-day"
        aria-label={`${item.date}${isStudied ? ", 학습함" : ", 학습하지 않음"}${isToday ? ", 오늘" : ""}`}
      >
        <span>{item.day}</span>
        <i aria-hidden="true"></i>
      </div>
    {/each}
  </div>
  <div class="calendar-legend">
    <span><i class="legend-dot studied-dot"></i>학습한 날</span><span
      ><i class="legend-dot"></i>학습하지 않은 날</span
    >
  </div>
</section>

<style>
  .study-calendar {
    padding: 0;
    overflow: hidden;
  }
  .calendar-toggle {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    padding: var(--space-5) var(--space-5) var(--space-3);
    background: transparent;
    color: var(--text);
    text-align: left;
  }
  .calendar-toggle > span:first-child {
    display: grid;
    gap: 0.15rem;
  }
  .calendar-toggle strong {
    font-size: 1rem;
  }
  .calendar-toggle small {
    color: var(--text-muted);
    font-size: 0.76rem;
    font-weight: 500;
  }
  .toggle-label {
    color: var(--primary);
    font-size: 0.78rem;
    font-weight: 650;
    white-space: nowrap;
  }
  .weekday-row,
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    padding-inline: var(--space-4);
  }
  .weekday-row span {
    padding: var(--space-2) 0;
    color: var(--text-muted);
    font-size: 0.72rem;
    font-weight: 650;
    text-align: center;
  }
  .weekday-row span:first-child {
    color: var(--danger);
  }
  .calendar-grid {
    gap: var(--space-2);
    padding-bottom: var(--space-4);
  }
  .calendar-grid.expanded {
    row-gap: var(--space-3);
  }
  .calendar-day {
    min-width: 0;
    min-height: 3.15rem;
    display: grid;
    place-items: center;
    align-content: center;
    gap: 0.28rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-muted);
    color: var(--text-muted);
    font-size: 0.82rem;
    font-weight: 650;
  }
  .calendar-day i {
    width: 0.32rem;
    height: 0.32rem;
    border-radius: 50%;
    background: var(--border-strong);
  }
  .calendar-day.studied {
    border-color: color-mix(in srgb, var(--success) 38%, var(--border));
    background: var(--success-soft);
    color: var(--success);
  }
  .calendar-day.studied i {
    background: var(--success);
  }
  .calendar-day.today {
    outline: 2px solid var(--primary);
    outline-offset: 1px;
  }
  .calendar-day.outside {
    opacity: 0.28;
  }
  .calendar-legend {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
    border-top: 1px solid var(--border);
    padding: var(--space-3) var(--space-5);
    color: var(--text-muted);
    font-size: 0.72rem;
  }
  .calendar-legend span {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
  }
  .legend-dot {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: var(--border-strong);
  }
  .studied-dot {
    background: var(--success);
  }
  @media (max-width: 480px) {
    .calendar-day {
      min-height: 2.7rem;
    }
    .weekday-row,
    .calendar-grid {
      padding-inline: var(--space-3);
    }
    .calendar-grid {
      gap: 0.35rem;
    }
  }
</style>
