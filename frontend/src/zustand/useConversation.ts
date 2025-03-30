import { create } from "zustand";
import { IConversation, IMessage } from "../types/types";

type Store = {
  messages: IMessage[];
  selectedConversation: IConversation | null;
  setSelectedConversation: (conversation: IConversation | null) => void;
  setMessages: (messages: IMessage[]) => void;
};

const useConversation = create<Store>()((set) => ({
  messages: [],
  selectedConversation: null,
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
