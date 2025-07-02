import { apiRequest } from "./apiClient";
import { useApi } from "./useApi";

// PUBLIC_INTERFACE
export function fetchEthicalBusinesses() {
  return apiRequest("/directory/ethical-businesses", { method: "GET" });
}

// PUBLIC_INTERFACE
export function useEthicalBusinesses() {
  return useApi(fetchEthicalBusinesses, [], true);
}
