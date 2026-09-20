import { localDateFor } from "$lib/learning/gamification/config";

export interface StudyCalendarDay {
  date: string;
  day: number;
  inMonth: boolean;
}

function dateFromLocalDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

function addDays(date: Date, amount: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

export function weekDays(today: string): StudyCalendarDay[] {
  const date = dateFromLocalDate(today);
  const sunday = addDays(date, -date.getDay());
  return Array.from({ length: 7 }, (_, index) => {
    const current = addDays(sunday, index);
    return {
      date: localDateFor(current.getTime()),
      day: current.getDate(),
      inMonth: current.getMonth() === date.getMonth(),
    };
  });
}

export function monthDays(today: string): StudyCalendarDay[] {
  const date = dateFromLocalDate(today);
  const first = new Date(date.getFullYear(), date.getMonth(), 1, 12);
  const last = new Date(date.getFullYear(), date.getMonth() + 1, 0, 12);
  const gridStart = addDays(first, -first.getDay());
  const gridEnd = addDays(last, 6 - last.getDay());
  const length =
    Math.round((gridEnd.getTime() - gridStart.getTime()) / 86_400_000) + 1;

  return Array.from({ length }, (_, index) => {
    const current = addDays(gridStart, index);
    return {
      date: localDateFor(current.getTime()),
      day: current.getDate(),
      inMonth: current.getMonth() === date.getMonth(),
    };
  });
}
