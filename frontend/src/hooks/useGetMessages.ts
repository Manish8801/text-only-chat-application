import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

function useGetMessages() {
  const [isLoading, setIsLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    async function getMessages() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation?._id}`);

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }
  
        setMessages(data.messages);
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    }
    if (selectedConversation) getMessages();
  }, [selectedConversation, setMessages]);

  return { isLoading, messages };
}

export default useGetMessages;
