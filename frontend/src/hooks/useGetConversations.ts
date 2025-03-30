import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IConversation } from "../types/types";

function useGetConversations() {
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<IConversation[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setConversations(data.users);
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    getConversations();
  }, []);
  return { isLoading, conversations };
}

export default useGetConversations;
