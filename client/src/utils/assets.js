/**
 * Resolves static asset paths (Images, PDFs, Logos) relative to the application's base URL.
 * Automatically adapts when hosted at domain root (/) or GitHub Pages subpath (/Himwal/).
 */
export const getAssetUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const clean = url.startsWith('/') ? url.slice(1) : url;
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`;
};
