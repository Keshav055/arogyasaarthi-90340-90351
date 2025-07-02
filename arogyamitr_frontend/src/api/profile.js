import { apiRequest } from "./apiClient";
import { useApi } from "./useApi";

// PUBLIC_INTERFACE
export function fetchProfile() {
  return apiRequest("/profile", { method: "GET" });
}

export function updateProfile(profileData) {
  return apiRequest("/profile", { method: "PUT", data: profileData });
}

// PUBLIC_INTERFACE
export function useProfile() {
  return useApi(fetchProfile, [], true);
}
