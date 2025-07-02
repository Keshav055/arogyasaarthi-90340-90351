import { apiRequest } from "./apiClient";
import { useApi } from "./useApi";

// PUBLIC_INTERFACE
export function fetchDiseaseDashboard() {
  return apiRequest("/disease/dashboard", { method: "GET" });
}

// PUBLIC_INTERFACE
export function useDiseaseDashboard() {
  return useApi(fetchDiseaseDashboard, [], true);
}
