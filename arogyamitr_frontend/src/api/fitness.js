import { apiRequest } from "./apiClient";
import { useApi } from "./useApi";

// PUBLIC_INTERFACE
export function fetchFitnessDashboard() {
  return apiRequest("/fitness/dashboard", { method: "GET" });
}

// PUBLIC_INTERFACE
export function useFitnessDashboard() {
  return useApi(fetchFitnessDashboard, [], true);
}
