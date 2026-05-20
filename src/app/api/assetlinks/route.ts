// Android Digital Asset Links — served at /.well-known/assetlinks.json via a rewrite
// in next.config.ts. Android fetches this to verify a domain owns an Android app
// for App Links (autoVerify=true intent filter).
//
// The SHA-256 here MUST be Google's Play App Signing key SHA-256 (NOT the EAS upload
// keystore SHA), because the installed APK on user devices is signed by Google's
// signing key after Play App Signing. Each env's SHA differs and is set per deployment.

type AppEnv = "development" | "staging" | "production";

const PACKAGE_NAMES: Record<AppEnv, string> = {
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

  // Per-deployment env var. Take this from Play Console:
  //   Protected with Play → Play Store protection → App signing → SHA-256.
  // Comma-separated if multiple (e.g. upload key + app signing key for transition).
  const SHA256 = process.env.ANDROID_APP_SIGNING_SHA256;
  if (!SHA256) {
    throw new Error("ANDROID_APP_SIGNING_SHA256 is not set");
  }

  const packageName = PACKAGE_NAMES[APP_ENV];
  const sha256Fingerprints = SHA256.split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const body = [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: packageName,
        sha256_cert_fingerprints: sha256Fingerprints,
      },
    },
  ];

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
