export type AIMessage = {
  role: "user" | "assistant";
  content: string;
};

export type AIChatRequest = {
  messages: AIMessage[];
};

export type AIChatResponse = {
  message: AIMessage;
};
