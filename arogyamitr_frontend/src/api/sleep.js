import { apiRequest } from "./apiClient";
import { useApi } from "./useApi";

// PUBLIC_INTERFACE
export function fetchSleepDashboard() {
  return apiRequest("/sleep/dashboard", { method: "GET" });
}

// PUBLIC_INTERFACE
export function useSleepDashboard() {
  return useApi(fetchSleepDashboard, [], true);
}
