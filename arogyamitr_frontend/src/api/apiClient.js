//
// PUBLIC_INTERFACE
// apiClient: Generic wrapper around fetch() with JWT/localStorage token, error handling, and JSON response parsing.
//

const API_BASE_URL = process.env.REACT_APP_BACKEND_API_URL || "http://localhost:3001"; // Adjust as per env

// Get JWT from localStorage helper
export function getToken() {
  return localStorage.getItem("token");
}

// PUBLIC_INTERFACE
export async function apiRequest(endpoint, { method = "GET", data = null, headers = {}, auth = true } = {}) {
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
  const jwt = getToken();

  let fetchHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...headers,
  };
  if (auth && jwt) fetchHeaders["Authorization"] = `Bearer ${jwt}`;

  const options = {
    method,
    headers: fetchHeaders,
  };
  if (data) options.body = JSON.stringify(data);

  let res;
  try {
    res = await fetch(url, options);
  } catch (err) {
    throw { network: true, message: "Network error: " + err.message };
  }
  if (!res.ok) {
    let msg = "API error";
    try {
      const errorJson = await res.json();
      msg = errorJson.detail || errorJson.message || msg;
    } catch (_) {}
    throw { status: res.status, message: msg };
  }
  if (res.status === 204) return null;
  return res.json();
}
