import { apiRequest } from "./apiClient";
import { useApi } from "./useApi";

// PUBLIC_INTERFACE
export function fetchWellnessPath() {
  return apiRequest("/wellness-path", { method: "GET" });
}

// PUBLIC_INTERFACE
export function useWellnessPath() {
  return useApi(fetchWellnessPath, [], true);
}
