// Server function on Netlify: fetches the pub's published Google Sheet (CSV) and passes it on.
// Guests' browsers only talk to our own site, never to Google.
//
// Set these in Netlify → Site configuration → Environment variables:
//   SHEET_OFFERS_CSV  = published CSV link of the "Angebote" tab
//   SHEET_EVENTS_CSV  = published CSV link of the "Events" tab

const SOURCES: Record<string, string | undefined> = {
  offers: process.env.SHEET_OFFERS_CSV,
  events: process.env.SHEET_EVENTS_CSV,
};

export default async (req: Request) => {
  const tab = new URL(req.url).searchParams.get("tab") ?? "";
  const source = SOURCES[tab];
  if (!source) return new Response("Not configured", { status: 404 });

  try {
    const upstream = await fetch(source, { redirect: "follow" });
    if (!upstream.ok) return new Response("Sheet unavailable", { status: 502 });
    return new Response(await upstream.text(), {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        // Browsers and Netlify's CDN may reuse the answer for 60 seconds.
        "cache-control": "public, max-age=60",
        "netlify-cdn-cache-control":
          "public, max-age=60, stale-while-revalidate=300",
      },
    });
  } catch {
    return new Response("Sheet unavailable", { status: 502 });
  }
};

export const config = { path: "/api/sheet" };
