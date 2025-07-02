import { apiRequest } from "./apiClient";
import { useApi } from "./useApi";

// PUBLIC_INTERFACE
export function fetchMindfulnessDashboard() {
  return apiRequest("/mindfulness/dashboard", { method: "GET" });
}

// PUBLIC_INTERFACE
export function useMindfulnessDashboard() {
  return useApi(fetchMindfulnessDashboard, [], true);
}
