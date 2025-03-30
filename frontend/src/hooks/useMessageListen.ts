import { useEffect } from "react";
import useSocketContext from "./useSocketContext";
import useConversation from "../zustand/useConversation";
import { IMessage } from "../types/types";
import notificationSound from "../assets/sounds/notification.mp3";

function useMessageListen() {
  const { socket } = useSocketContext();

  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("receiveMessage", (newMessage: IMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });

    return () => {
        socket?.off("receiveMessage");
        
    };
  }, [socket, messages, setMessages]);
}
export default useMessageListen;
