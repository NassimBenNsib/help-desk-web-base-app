"use client";

import { LocalStorageUtils, create } from "@/common/utils";
import type {
  ChatbotConversationMessageInterface,
  ChatbotInterface,
} from "@/common/types";

const useChatbotStore = create<ChatbotInterface>((set) => ({
  // initial state
  conversations: [
    {
      content: "Hello, I'm a chatbot. How can I help you?",
      type: "received",
      id: 1,
    },
  ],
  // methods for manipulating state
  clearConversations: () => {
    set((state) => ({
      ...state,
      conversations: [],
    }));
  },
  addConversation: (message: ChatbotConversationMessageInterface) => {
    set((state) => ({
      ...state,
      conversations: [message, ...state.conversations],
    }));
  },
}));

export { useChatbotStore };
