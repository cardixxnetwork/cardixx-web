// Apple App Site Association (AASA) — served at /.well-known/apple-app-site-association
// via a rewrite in next.config.ts. Apple fetches this when a Universal Link is tapped
// to verify the app should open instead of Safari.
//
// The bundle ID depends on APP_ENV: each environment (dev.cardixx.com, stag.cardixx.com,
// cardixx.com) is deployed separately with its own APP_ENV value, and serves its own
// AASA pointing at the matching mobile bundle ID.

type AppEnv = "development" | "staging" | "production";

const BUNDLE_IDS: Record<AppEnv, string> = {
  development: "com.cardixx.dev.app",
  staging: "com.cardixx.stag.app",
  production: "com.cardixx.app",
};

function readAppEnv(): AppEnv {
  const v = process.env.APP_ENV;
  if (v !== "development" && v !== "staging" && v !== "production") {
    throw new Error(
      `APP_ENV must be one of: development | staging | production (got: ${
        v ?? "undefined"
      })`,
    );
  }
  return v;
}

export function GET() {
  const APP_ENV = readAppEnv();
  const APPLE_TEAM_ID = process.env.APPLE_TEAM_ID;
  if (!APPLE_TEAM_ID) {
    throw new Error("APPLE_TEAM_ID is not set");
  }

  const bundleId = BUNDLE_IDS[APP_ENV];
  const appID = `${APPLE_TEAM_ID}.${bundleId}`;

  const body = {
    applinks: {
      details: [
        {
          appIDs: [appID],
          components: [
            // Card pages (e.g. /c/abc123, /en/c/abc123, /tr/c/abc123)
            { "/": "/c/*" },
            { "/": "/*/c/*" },
          ],
        },
      ],
    },
  };

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
