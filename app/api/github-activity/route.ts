export const revalidate = 3600;

const PROFILE_URL =
  "https://github.com/users/thatcreativetayo/contributions";

type ActivityDay = {
  date: string;
  count: number;
};

function getAttribute(tag: string, name: string) {
  const match = tag.match(new RegExp(`\\b${name}="([^"]*)"`));
  return match?.[1];
}

function decodeText(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export async function GET() {
  const response = await fetch(PROFILE_URL, {
    headers: {
      Accept: "text/html",
      "User-Agent": "tayo-portfolio",
    },
    next: { revalidate },
  });

  if (!response.ok) {
    return Response.json(
      { error: `GitHub returned ${response.status} while loading activity.` },
      { status: 502 }
    );
  }

  const html = await response.text();
  const tooltipCounts = new Map<string, number>();
  const tooltipPattern =
    /<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g;

  for (const match of html.matchAll(tooltipPattern)) {
    const text = decodeText(match[2]);
    const count = text.match(/([\d,]+)\s+contributions?/i);
    tooltipCounts.set(
      match[1],
      count ? Number(count[1].replace(/,/g, "")) : 0
    );
  }

  const days: ActivityDay[] = [];
  const cellPattern =
    /<td\b[^>]*\bclass="ContributionCalendar-day"[^>]*>/g;

  for (const match of html.matchAll(cellPattern)) {
    const date = getAttribute(match[0], "data-date");
    const id = getAttribute(match[0], "id");
    if (!date || !id || !tooltipCounts.has(id)) continue;
    days.push({ date, count: tooltipCounts.get(id) ?? 0 });
  }

  const totalMatch = html.match(
    /<h2[^>]*id="js-contribution-activity-description"[^>]*>([\s\S]*?)<\/h2>/
  );
  const totalText = totalMatch ? decodeText(totalMatch[1]) : "";
  const total = totalText.match(/([\d,]+)/);

  if (days.length === 0 || !total) {
    return Response.json(
      { error: "GitHub activity data was not available in the expected format." },
      { status: 502 }
    );
  }

  days.sort((left, right) => left.date.localeCompare(right.date));

  return Response.json({
    days,
    total: Number(total[1].replace(/,/g, "")),
    period: "in the last year",
  });
}
