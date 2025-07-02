import { apiRequest } from "./apiClient";
import { useApi } from "./useApi";

// PUBLIC_INTERFACE
export function fetchConsultations() {
  return apiRequest("/teleconsultation/appointments", { method: "GET" });
}

// PUBLIC_INTERFACE
export function useConsultations() {
  return useApi(fetchConsultations, [], true);
}
