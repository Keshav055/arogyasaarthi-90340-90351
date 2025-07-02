import { apiRequest } from "./apiClient";
import { useApi } from "./useApi";

// PUBLIC_INTERFACE
export function fetchForums() {
  return apiRequest("/forums", { method: "GET" });
}

// PUBLIC_INTERFACE
export function useForums() {
  return useApi(fetchForums, [], true);
}
