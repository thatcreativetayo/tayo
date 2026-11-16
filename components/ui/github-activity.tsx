"use client";

import { useEffect, useState } from "react";
import GithubGraph, {
  type GithubContribution,
} from "@/components/ui/github-graph";
import styles from "./github-activity.module.css";

interface ActivityResponse {
  days: GithubContribution[];
  total: number;
  period: string;
}

const numberFormat = new Intl.NumberFormat("en-US");
const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export default function GithubActivity() {
  const [activity, setActivity] = useState<ActivityResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<GithubContribution | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadActivity() {
      try {
        const response = await fetch("/api/github-activity", {
          signal: controller.signal,
        });

        if (!response.ok) {
          const result = (await response.json()) as { error?: string };
          throw new Error(result.error ?? "Could not load GitHub activity.");
        }

        setActivity((await response.json()) as ActivityResponse);
      } catch (loadError) {
        if (loadError instanceof Error && loadError.name !== "AbortError") {
          setError(loadError.message);
        }
      }
    }

    void loadActivity();
    return () => controller.abort();
  }, []);

  return (
    <section
      className={`${styles.responsive} normal bg-base/3 mt-16 rounded-3xl p-5`}
      aria-labelledby="github-activity-title"
    >
      {/* <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>open source, in pixels</p>
          <h2 className={styles.title} id="github-activity-title">
            github activity
          </h2>
        </div>
        <a
          className={styles.profileLink}
          href="https://github.com/thatcreativetayo"
          target="_blank"
          rel="noopener noreferrer"
        >
          view github <span aria-hidden="true">↗</span>
        </a>
      </header> */}

      {error ? (
        <div className={styles.message} role="alert">
          <p>{error}</p>
          <button
            type="button"
            className={styles.retry}
            onClick={() => window.location.reload()}
          >
            reload page
          </button>
        </div>
      ) : !activity ? (
        <p className={styles.message} role="status">
          loading public contribution activity…
        </p>
      ) : (
        <>
          <div className={styles.summary}>
            <p>
              <strong>{numberFormat.format(activity.total)}</strong>{" "}
              contributions <span>{activity.period}</span>
            </p>
            <p className={styles.selectedDay} aria-live="polite">
              {selected
                ? `${numberFormat.format(selected.count)} ${
                    selected.count === 1 ? "contribution" : "contributions"
                  } on ${dateFormat.format(
                    new Date(`${selected.date}T00:00:00Z`),
                  )}`
                : "select a day to explore"}
            </p>
          </div>

          <GithubGraph
            account="thatcreativetayo"
            data={activity.days}
            months={12}
            variant="graphite"
            cellSize={10}
            cellGap={3}
            showAccount={false}
            onContributionSelect={(contribution) =>
              setSelected((current) =>
                current?.date === contribution.date ? null : contribution,
              )
            }
          />
        </>
      )}
    </section>
  );
}
