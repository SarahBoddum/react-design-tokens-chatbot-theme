import posthog from 'posthog-js';

const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
const posthogHost = import.meta.env.VITE_POSTHOG_HOST;
console.log('PostHog key findes:', Boolean(posthogKey));
console.log('PostHog host findes:', Boolean(posthogHost));
let posthogClient = null;

if (!posthogKey || !posthogHost) {
  if (import.meta.env.DEV) {
    if (!posthogKey) {
      console.error('VITE_POSTHOG_KEY variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_POSTHOG_KEY is configured');
    }

    if (!posthogHost) {
      console.error('VITE_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_POSTHOG_HOST is configured');
    }
  }
} else {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    defaults: '2026-05-30',
    logs: {
      serviceName: 'design-tokens-chatbot-web',
      environment: import.meta.env.MODE,
    },
    capture_exceptions: {
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
      capture_console_errors: false,
    },
  });
  
  posthogClient = posthog;
}
console.log('PostHog initialiseret');

export default posthogClient;
