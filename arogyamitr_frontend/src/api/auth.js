import { apiRequest } from "./apiClient";

// PUBLIC_INTERFACE
export async function loginApi(email, password) {
  return apiRequest("/auth/login", { method: "POST", data: { email, password }, auth: false });
}

// PUBLIC_INTERFACE
export async function signupApi(email, password) {
  return apiRequest("/auth/signup", { method: "POST", data: { email, password }, auth: false });
}

// PUBLIC_INTERFACE
export async function oauthLoginApi(provider, oauthToken) {
  // Use only if integrating with true Google/Apple OAuth (extend as needed)
  return apiRequest(`/auth/oauth/${provider}`, { method: "POST", data: { token: oauthToken }, auth: false });
}
