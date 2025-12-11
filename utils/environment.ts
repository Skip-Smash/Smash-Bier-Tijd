/**
 * Checks if the application is running inside an iframe.
 * Returns true if the current window is not the top window.
 */
export const isInIframe = (): boolean => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};