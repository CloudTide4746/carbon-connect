/** @format */

import { create } from "zustand";

interface ChatMessage {
  type: "bot" | "user";
  text: string;
}

interface GlobalState {
  isRuzhuOpen: boolean;
  setIsRuzhuOpen: (isRuzhuOpen: boolean) => void;
  chatMessages: ChatMessage[];
  setChatMessages: (
    messages: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])
  ) => void;
  addChatMessage: (message: ChatMessage) => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
  isRuzhuOpen: false,
  setIsRuzhuOpen: (isRuzhuOpen: boolean) => set({ isRuzhuOpen }),
  chatMessages: [
    { type: "bot", text: "你好！我是您的碳汇助手林小汇。请问有什么可以帮您？" },
  ],
  setChatMessages: (messages) =>
    set((state) => ({
      chatMessages:
        typeof messages === "function"
          ? messages(state.chatMessages)
          : messages,
    })),
  addChatMessage: (message) =>
    set((state) => ({ chatMessages: [...state.chatMessages, message] })),
}));

export default useGlobalStore;
