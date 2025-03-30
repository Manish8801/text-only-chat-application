import useAuthContext from "../../hooks/useAuthContext";
import { IMessageProps } from "../../prop_types/prop-types";
import { extractTime } from "../../utils/extractTime";

const Message = ({ messageObj }: IMessageProps) => {
  const { user } = useAuthContext();
  const { message, createdAt, senderId, shouldShake } = messageObj;
  return (
    <div
      className={` p-0.5 ${
        user!._id === senderId ? "place-items-end" : "place-items-start"
      } right-0`}
    >
      <div
        className={`chat-bubble rounded-sm ${
          user!._id === senderId
            ? "text-white bg-blue-500"
            : "border-white text-white"
        } pt-0 pl-2 pb-0 pr-3`}
      >
        <div className={`max-w-[80%] text-wrap ${shouldShake ? "shake" : ""}`}>
          {message}
        </div>
        <div
          className={`chat-footer opacity-50 text-[10px] flex justify-end
          } leading-3`}
        >
          {extractTime(createdAt)}
        </div>
      </div>
    </div>
  );
};

export default Message;
