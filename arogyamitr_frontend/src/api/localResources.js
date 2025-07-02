import { apiRequest } from "./apiClient";
import { useApi } from "./useApi";

// PUBLIC_INTERFACE
export function fetchLocalResources() {
  return apiRequest("/resources", { method: "GET" });
}

// PUBLIC_INTERFACE
export function useLocalResources() {
  return useApi(fetchLocalResources, [], true);
}
