interface ChatbotConversationMessageInterface {
  id: Number;
  content: String;
  type: "sent" | "received";
}

interface ChatbotInterface {
  conversations: ChatbotConversationMessageInterface[];
  addConversation: (conversation: ChatbotConversationMessageInterface) => void;
  clearConversations: () => void;
}

export type { ChatbotConversationMessageInterface, ChatbotInterface };
