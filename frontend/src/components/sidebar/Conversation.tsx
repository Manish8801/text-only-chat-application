import useSocketContext from "../../hooks/useSocketContext";
import { IConversationProps } from "../../prop_types/prop-types";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }: IConversationProps) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const { _id, profilePic, fullname } = conversation;
  const isSelected = _id === selectedConversation?._id;
  const isOnline = onlineUsers.includes(_id);

  return (
    <>
      <div
        onClick={() => setSelectedConversation(conversation)}
        className={`flex py-1 items-center ${
          isSelected ? "bg-sky-500" : "hover:bg-sky-300"
        } px-2 duration-100 cursor-pointer`}
      >
        <div className={`avatar ${isOnline ? "avatar-online" : ""} `}>
          <div className="w-12 rounded-full p-1 ">
            <img src={profilePic} />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex gap-3 items-center justify-between">
            <p className="font-bold text-gray-200">{fullname}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider m-0 p-0 h-px"></div>}
    </>
  );
};
export default Conversation;
