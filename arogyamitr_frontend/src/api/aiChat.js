import { apiRequest } from "./apiClient";
import { useApi } from "./useApi";

/**
 * PUBLIC_INTERFACE
 * Sends a message to the AI chatbot.
 * @param {string} message
 * @returns {Promise}
 */
export function sendChatMessage(message) {
  return apiRequest("/ai-chat", { method: "POST", data: { message } });
}

// PUBLIC_INTERFACE
export function useAiChat() {
  // Use like: const { data, error, loading, refetch } = useAiChat();
  // To get message history, etc. (implement as needed)
  return useApi(() => apiRequest("/ai-chat/history", { method: "GET" }), [], true);
}
