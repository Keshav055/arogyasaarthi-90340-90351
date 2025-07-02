import { renderHook, act } from "@testing-library/react";
import { useApi } from "../useApi";

// PUBLIC_INTERFACE
// This is a stub example of how to test custom integration hooks (no actual API request is done)
describe("useApi integration hook", () => {
  test("should initialize with loading and fetch data", async () => {
    const fakeApi = jest.fn(() => Promise.resolve("ok!"));
    const { result } = renderHook(() => useApi(fakeApi, [], true));

    // Initially loading is true
    expect(result.current.loading).toBe(true);

    // Wait for effect
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe("ok!");
  });
});
