import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
  const { isLoading, conversations } = useGetConversations();
  return (
    <div className="overflow-auto custom-scrollbar">
      {isLoading ? (
        <span className="loading loading-spinner loading-xl"></span>
      ) : (
        conversations.length > 0 &&
        conversations.map((conversation, idx) => (
          <Conversation
            key={idx}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === conversations.length - 1}
          />
        ))
      )}
    </div>
  );
};
export default Conversations;
