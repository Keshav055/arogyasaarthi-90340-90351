import { apiRequest } from "./apiClient";

// PUBLIC_INTERFACE
export function scanProduct(barcode) {
  return apiRequest(`/scanner/scan`, { method: "POST", data: { barcode } });
}
