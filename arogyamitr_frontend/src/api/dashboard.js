import { apiRequest } from "./apiClient";
import { useApi } from "./useApi";

/**
 * PUBLIC_INTERFACE
 * Fetches dashboard data (protected endpoint).
 */
export function fetchDashboard() {
  return apiRequest("/dashboard", { method: "GET" });
}

/**
 * PUBLIC_INTERFACE
 * useDashboardData - React hook for consuming dashboard.
 */
export function useDashboardData() {
  return useApi(fetchDashboard, [], true);
}
