import { useEffect, useState, useCallback } from "react";
import { apiRequest } from "./apiClient";

/**
 * PUBLIC_INTERFACE
 * useApi - universal React hook for API calls, manages loading, data, and error states.
 * @param {function} fetchFn - function returning a promise (API call)
 * @param {Array} args - arguments to pass to fetchFn
 * @param {boolean} triggerOnMount - auto-trigger on mount (defaults true)
 */
export function useApi(fetchFn, args = [], triggerOnMount = true) {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(triggerOnMount);

  const run = useCallback(async (...callArgs) => {
    setLoading(true);
    setError("");
    try {
      const result = await fetchFn(...(callArgs.length ? callArgs : args));
      setData(result);
      return result;
    } catch (e) {
      setError(e?.message || "Unknown error");
      setData(undefined);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchFn, ...args]);

  useEffect(() => {
    if (triggerOnMount) run();
    // eslint-disable-next-line
  }, []); // only on mount

  return { data, error, loading, refetch: run };
}
