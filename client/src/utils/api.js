/**
 * Configurable API fetch helper.
 * Uses VITE_API_URL if defined (e.g. deployed backend on Render/Railway),
 * otherwise defaults to relative /api (local dev proxy or same-domain).
 */
export const API_BASE = import.meta.env.VITE_API_URL || '';

export const apiFetch = (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;
  return fetch(url, options);
};
