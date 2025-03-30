import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../../skeletons/MessagesSkeleton";
import Message from "./Message";
import useMessageListen from "../../hooks/useMessageListen";

const Messages = () => {
  const { isLoading, messages } = useGetMessages();
  useMessageListen();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="flex-1 space-y-1 overflow-y-scroll px-2">
      {isLoading ? (
        <MessageSkeleton />
      ) : messages.length === 0 ? (
        <p className="text-center">Send a message to start the conversation.</p>
      ) : (
        <>
          {messages.map((message) => (
            <div key={message._id} ref={lastMessageRef}>
              <Message messageObj={message} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};
export default Messages;
