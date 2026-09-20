import { describe, expect, it } from "vitest";
import { monthDays, weekDays } from "$lib/learning/study-calendar";

describe("study calendar", () => {
  it("builds the Sunday-to-Saturday week containing today", () => {
    expect(weekDays("2026-09-20").map((item) => item.date)).toEqual([
      "2026-09-20",
      "2026-09-21",
      "2026-09-22",
      "2026-09-23",
      "2026-09-24",
      "2026-09-25",
      "2026-09-26",
    ]);
  });

  it("pads a month to complete Sunday-to-Saturday rows", () => {
    const days = monthDays("2026-09-20");
    expect(days).toHaveLength(35);
    expect(days[0]).toMatchObject({ date: "2026-08-30", inMonth: false });
    expect(days[2]).toMatchObject({ date: "2026-09-01", inMonth: true });
    expect(days.at(-1)).toMatchObject({ date: "2026-10-03", inMonth: false });
  });
});
