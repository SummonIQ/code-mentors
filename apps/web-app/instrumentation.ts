type CaptureRequestError = (...args: unknown[]) => void;

const sentryModuleName = "@sentry/nextjs";
const sentryServerConfigPath = "./sentry.server.config";
const sentryEdgeConfigPath = "./sentry.edge.config";

let captureRequestError: CaptureRequestError = () => {};

export async function register() {
  if (process.env.NODE_ENV === "development") return;

  try {
    const sentryModule = (await import(sentryModuleName)) as {
      captureRequestError?: CaptureRequestError;
    };

    captureRequestError =
      typeof sentryModule.captureRequestError === "function"
        ? sentryModule.captureRequestError
        : () => {};

    if (process.env.NEXT_RUNTIME === "nodejs") {
      await import(sentryServerConfigPath);
    }

    if (process.env.NEXT_RUNTIME === "edge") {
      await import(sentryEdgeConfigPath);
    }
  } catch {
    captureRequestError = () => {};
  }
}

export const onRequestError: CaptureRequestError = (...args) => {
  if (process.env.NODE_ENV !== "production") return;
  captureRequestError(...args);
};
