import { apiRequest } from "./apiClient";
import { useApi } from "./useApi";

// PUBLIC_INTERFACE
export function fetchEducationArticles() {
  return apiRequest("/education/articles", { method: "GET" });
}

// PUBLIC_INTERFACE
export function useEducationArticles() {
  return useApi(fetchEducationArticles, [], true);
}
