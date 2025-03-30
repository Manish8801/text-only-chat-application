import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import useAuthContext from "../../hooks/useAuthContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  if (!selectedConversation) {
    return <NoChatSelected />;
  }

  return (
    <div className="md:min-w-[450px] flex flex-col justify-between">
      <>
        {/* Header */}
        <div className="flex items-center gap-2 bg-slate-500 px-4 py-2 mb-1">
          <img className="w-8" src={selectedConversation.profilePic} alt="" />
          <span className="text-gray-900 font-bold">
            {selectedConversation?.fullname}
          </span>
        </div>

        <Messages />
        <MessageInput />
      </>
    </div>
  );
};

const NoChatSelected = () => {
  const { user } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {user!.fullname}❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default MessageContainer;
