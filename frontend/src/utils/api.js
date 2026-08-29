export const API_BASE_URL = (
  import.meta.env.DEV
    ? ''
    : import.meta.env.VITE_API_BASE_URL || 'https://mediumblue-curlew-218317.hostingersite.com'
).replace(/\/$/, '');

export async function apiRequest(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
    });
  } catch {
    throw new Error('Cannot reach the server. Make sure the API is running, then try again.');
  }

  const contentType = response.headers.get('content-type') || '';
  const raw = await response.text();

  let data;
  try {
    data = contentType.includes('application/json') || raw.trim().startsWith('{')
      ? JSON.parse(raw)
      : null;
  } catch {
    data = null;
  }

  if (!data) {
    throw new Error(
      response.ok
        ? 'Invalid response from server'
        : `Server error (${response.status}). Please try again.`
    );
  }

  if (!response.ok || !data.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}
