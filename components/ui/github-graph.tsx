"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type GithubGraphVariant = "github" | "graphite" | "ocean" | "violet";
export type GithubGraphAnimation = "none" | "wave" | "scan" | "cascade";
export type GithubGraphAmbientEffect = "none" | "tide" | "drift" | "twinkle";

export type GithubContribution = {
  date: string;
  count: number;
  level?: number;
};

type ContributionCell = GithubContribution & { level: number };
type ContributionWeek = ContributionCell[];

interface GithubGraphProps {
  account?: string;
  months?: number;
  variant?: GithubGraphVariant;
  animation?: GithubGraphAnimation;
  animationSpeed?: number;
  cellSize?: number;
  cellGap?: number;
  cellRadius?: number;
  showLegend?: boolean;
  showAccount?: boolean;
  ambientEffect?: GithubGraphAmbientEffect;
  ambientIntensity?: number;
  data: GithubContribution[];
  selectedDate?: string;
  onContributionSelect?: (contribution: GithubContribution) => void;
  className?: string;
}

const VARIANTS: Record<
  GithubGraphVariant,
  [string, string, string, string, string]
> = {
  github: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  graphite: ["#e1e1e1", "#cccccc", "#969696", "#5f5f5f", "#171717"],
  ocean: ["#e6f5ff", "#b4e2ff", "#62bdf5", "#2585d8", "#124e93"],
  violet: ["#f2eaff", "#dcc5ff", "#b486ff", "#8355df", "#52269c"],
};

function parseDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

function buildWeeks(contributions: GithubContribution[]): ContributionWeek[] {
  const valid = contributions
    .map((item) => ({ ...item, parsedDate: parseDate(item.date) }))
    .filter(
      (item): item is GithubContribution & { parsedDate: Date } =>
        item.parsedDate !== null && Number.isFinite(item.count),
    )
    .sort((a, b) => a.date.localeCompare(b.date));
  if (valid.length === 0) return [];

  const maxCount = Math.max(0, ...valid.map((item) => item.count));
  const byDate = new Map(valid.map((item) => [item.date, item]));
  const start = addDays(valid[0].parsedDate, -valid[0].parsedDate.getUTCDay());
  const end = addDays(
    valid[valid.length - 1].parsedDate,
    6 - valid[valid.length - 1].parsedDate.getUTCDay(),
  );
  const cells: ContributionCell[] = [];

  for (let date = start; date <= end; date = addDays(date, 1)) {
    const key = toISODate(date);
    const contribution = byDate.get(key);
    const count = Math.max(0, contribution?.count ?? 0);
    const givenLevel = contribution?.level;
    const level =
      Number.isInteger(givenLevel) &&
      givenLevel !== undefined &&
      givenLevel >= 0 &&
      givenLevel <= 4
        ? count === 0
          ? 0
          : givenLevel
        : count === 0 || maxCount === 0
          ? 0
          : Math.min(4, Math.max(1, Math.ceil((count / maxCount) * 4)));
    cells.push({ date: key, count, level });
  }

  return Array.from({ length: Math.ceil(cells.length / 7) }, (_, index) =>
    cells.slice(index * 7, index * 7 + 7),
  );
}

function recentContributions(
  contributions: GithubContribution[],
  months: number,
): GithubContribution[] {
  const parsed = contributions
    .map((contribution) => ({
      contribution,
      date: parseDate(contribution.date),
    }))
    .filter(
      (item): item is { contribution: GithubContribution; date: Date } =>
        item.date !== null,
    );
  const latest = parsed.reduce<Date | null>(
    (current, item) => (!current || item.date > current ? item.date : current),
    null,
  );
  if (!latest) return [];

  const start = new Date(latest);
  start.setUTCMonth(start.getUTCMonth() - Math.max(1, Math.min(12, months)));
  return parsed
    .filter((item) => item.date >= start)
    .map((item) => item.contribution);
}

function formatContribution(contribution: ContributionCell): string {
  const date = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(parseDate(contribution.date) ?? new Date());
  return `${contribution.count} ${
    contribution.count === 1 ? "contribution" : "contributions"
  } · ${date}`;
}

function getEntranceDelay(
  animation: GithubGraphAnimation,
  week: number,
  day: number,
  speed: number,
): number {
  if (animation === "none") return 0;
  const step =
    animation === "wave"
      ? week * 0.026 + day * 0.016
      : animation === "scan"
        ? week * 0.03
        : (week + day * 2) * 0.018;
  return step / Math.max(speed, 0.1);
}

function getAmbientMotion(
  effect: GithubGraphAmbientEffect,
  intensity: number,
  week: number,
  day: number,
  delay: number,
  reducedMotion: boolean,
) {
  if (reducedMotion || effect === "none") {
    return {
      animate: { opacity: 1, scale: 1 },
      transition: {
        opacity: { duration: 0.14, delay },
        scale: { type: "spring" as const, stiffness: 900, damping: 32 },
      },
    };
  }

  const strength = Math.min(1, Math.max(0, intensity));
  const seed = ((week * 17 + day * 31) % 11) / 10;
  const isTide = effect === "tide";
  const isDrift = effect === "drift";
  const duration = isTide ? 3.2 : isDrift ? 3.8 + seed : 2 + seed * 1.4;
  const ambientDelay =
    delay + (isTide ? (week + day * 1.8) * 0.055 : seed * 0.85);
  const lowOpacity =
    1 - (isTide ? 0.24 : isDrift ? 0.16 : 0.34) * strength;
  const smallScale =
    1 - (isTide ? 0.07 : isDrift ? 0.04 : 0.08) * strength;

  return {
    animate: {
      opacity: isDrift
        ? [1, lowOpacity, 1 - 0.06 * strength, 1]
        : [1, lowOpacity, 1],
      scale: isDrift
        ? [1, smallScale, 1 + 0.025 * strength, 1]
        : [1, smallScale, 1],
    },
    transition: {
      opacity: {
        duration,
        delay: ambientDelay,
        ease: "easeInOut" as const,
        repeat: Infinity,
      },
      scale: {
        duration,
        delay: ambientDelay,
        ease: "easeInOut" as const,
        repeat: Infinity,
      },
    },
  };
}

export function GithubGraph({
  account = "thatcreativetayo",
  months = 12,
  variant = "github",
  animation = "wave",
  animationSpeed = 1,
  cellSize = 12,
  cellGap = 3,
  cellRadius = 2,
  showLegend = true,
  showAccount = true,
  ambientEffect = "twinkle",
  ambientIntensity = 0.65,
  data,
  selectedDate,
  onContributionSelect,
  className,
}: GithubGraphProps) {
  const reducedMotion = useReducedMotion();
  const shouldReduceMotion = reducedMotion ?? false;
  const [hovered, setHovered] = React.useState<{
    contribution: ContributionCell;
    left: number;
    top: number;
    originLeft: number;
    originTop: number;
    placement: "above" | "below";
    week: number;
    day: number;
  } | null>(null);
  const [highlightLevel, setHighlightLevel] = React.useState<number | null>(
    null,
  );
  const colors = VARIANTS[variant];
  const resolvedRadius = Math.max(0, Math.min(cellRadius, cellSize / 2));
  const weeks = React.useMemo(
    () => buildWeeks(recentContributions(data, months)),
    [data, months],
  );

  const showTooltip = React.useCallback(
    (
      element: HTMLButtonElement,
      contribution: ContributionCell,
      week: number,
      day: number,
      pointer?: { clientX: number; clientY: number },
    ) => {
      const rect = element.getBoundingClientRect();
      const placement = rect.top > 56 ? "above" : "below";
      const left = Math.min(
        Math.max(rect.left + rect.width / 2, 96),
        window.innerWidth - 96,
      );
      setHovered({
        contribution,
        left,
        top: placement === "above" ? rect.top - 9 : rect.bottom + 9,
        originLeft: pointer?.clientX ?? left,
        originTop: pointer?.clientY ?? rect.top + rect.height / 2,
        placement,
        week,
        day,
      });
    },
    [],
  );

  return (
    <div className={cn("w-full", className)}>
      {showAccount && (
        <p className="mb-4 text-sm font-medium tracking-tight text-[#151515]/65">
          @{account}
        </p>
      )}

      <div className="overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div
          className="relative flex w-fit min-w-full"
          role="grid"
          aria-label={`GitHub contributions for ${account}`}
          onMouseLeave={() => setHovered(null)}
          style={{ gap: cellGap }}
        >
          {weeks.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className="grid grid-rows-7"
              role="row"
              style={{ gap: cellGap }}
            >
              {week.map((contribution, dayIndex) => {
                const delay = shouldReduceMotion
                  ? 0
                  : getEntranceDelay(
                      animation,
                      weekIndex,
                      dayIndex,
                      animationSpeed,
                    );
                const ambient = getAmbientMotion(
                  ambientEffect,
                  ambientIntensity,
                  weekIndex,
                  dayIndex,
                  delay,
                  shouldReduceMotion,
                );
                const distance = hovered
                  ? Math.hypot(
                      weekIndex - hovered.week,
                      dayIndex - hovered.day,
                    )
                  : Infinity;
                const wave = Math.max(0, 1 - distance / 3);
                const filter = `brightness(${1 + wave * 0.45}) saturate(${1 + wave * 0.2})`;
                const isSelected = selectedDate === contribution.date;
                const isHighlighted =
                  highlightLevel === null ||
                  highlightLevel === contribution.level;

                return (
                  <motion.button
                    key={contribution.date}
                    type="button"
                    role="gridcell"
                    aria-label={`${contribution.count} ${
                      contribution.count === 1
                        ? "contribution"
                        : "contributions"
                    } on ${contribution.date}`}
                    aria-selected={isSelected}
                    title={formatContribution(contribution)}
                    className="relative shrink-0 outline-none transition-shadow focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#151515]"
                    style={{
                      width: cellSize,
                      height: cellSize,
                      borderRadius: resolvedRadius,
                    }}
                    initial={
                      shouldReduceMotion || animation === "none"
                        ? false
                        : { opacity: 0, scale: 0.35, y: 4 }
                    }
                    animate={{
                      opacity: isHighlighted ? 1 : 0.22,
                      scale: 1,
                      y: 0,
                      filter,
                    }}
                    transition={{
                      opacity: { duration: 0.14, delay },
                      y: {
                        type: "spring",
                        stiffness: 520,
                        damping: 28,
                        delay,
                      },
                      scale: { type: "spring", stiffness: 900, damping: 32 },
                      filter: { duration: 0.08, ease: "easeOut" },
                    }}
                    onMouseEnter={(event) =>
                      showTooltip(
                        event.currentTarget,
                        contribution,
                        weekIndex,
                        dayIndex,
                        event,
                      )
                    }
                    onFocus={(event) =>
                      showTooltip(
                        event.currentTarget,
                        contribution,
                        weekIndex,
                        dayIndex,
                      )
                    }
                    onBlur={() => setHovered(null)}
                    onClick={() => onContributionSelect?.(contribution)}
                  >
                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        backgroundColor: colors[contribution.level],
                        borderRadius: resolvedRadius,
                        outline: isSelected
                          ? "2px solid #151515"
                          : undefined,
                        outlineOffset: isSelected ? 2 : undefined,
                      }}
                      animate={ambient.animate}
                      transition={ambient.transition}
                    />
                  </motion.button>
                );
              })}
            </div>
          ))}
          <AnimatePresence>
            {hovered && (
              <motion.span
                role="tooltip"
                className="pointer-events-none fixed z-50 whitespace-nowrap rounded-full bg-[#151515] px-3 py-1.5 text-xs font-medium text-white shadow-lg"
                initial={{
                  opacity: 0,
                  scale: 0.92,
                  left: hovered.originLeft,
                  top: hovered.originTop,
                  x: "-50%",
                  y: hovered.placement === "above" ? "-100%" : "0%",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  left: hovered.left,
                  top: hovered.top,
                  x: "-50%",
                  y: hovered.placement === "above" ? "-100%" : "0%",
                }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{
                  opacity: { duration: 0.12 },
                  scale: { duration: 0.12 },
                  left: { type: "spring", stiffness: 620, damping: 42 },
                  top: { type: "spring", stiffness: 620, damping: 42 },
                  y: { duration: 0.12 },
                }}
              >
                {formatContribution(hovered.contribution)}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {showLegend && (
        <div className="mt-4 flex items-center gap-1.5 text-xs text-[#151515]/55">
          <span>Less</span>
          {colors.map((color, level) => (
            <button
              key={color}
              type="button"
              aria-label={`${
                highlightLevel === level ? "Remove" : "Highlight"
              } activity level ${level}`}
              aria-pressed={highlightLevel === level}
              className="size-3 rounded-sm transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#151515]"
              style={{ backgroundColor: color }}
              onClick={() =>
                setHighlightLevel((current) =>
                  current === level ? null : level,
                )
              }
            />
          ))}
          <span>More</span>
        </div>
      )}
    </div>
  );
}

export default GithubGraph;
