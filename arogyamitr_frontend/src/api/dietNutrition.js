import { apiRequest } from "./apiClient";
import { useApi } from "./useApi";

// PUBLIC_INTERFACE
export function fetchNutritionDashboard() {
  return apiRequest("/nutrition/dashboard", { method: "GET" });
}

// PUBLIC_INTERFACE
export function useNutritionDashboard() {
  return useApi(fetchNutritionDashboard, [], true);
}

// PUBLIC_INTERFACE
export function fetchMealPlans() {
  return apiRequest("/nutrition/meal-plans", { method: "GET" });
}
