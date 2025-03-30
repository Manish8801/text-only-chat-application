import { FormEvent, useState } from "react";
import { BsSend } from "react-icons/bs";
import useMessageSend from "../../hooks/useMessageSend";

const MessageInput = () => {
  const [message, setMessage] = useState<string>("");
  const { isLoading, sendMessage } = useMessageSend();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message) return;

    await sendMessage(message);

    setMessage("");
  };

  return (
    <form className="px-4 mb-4 mt-1" onSubmit={handleSubmit}>
      <div className="w-full flex items-center">
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Message..."
          onChange={(e) => setMessage(e.target.value)}
          className="border rounded-lg block flex-1 p-2.5  bg-gray-700 border-gray-600 text-white"
        />
        <button
          disabled={isLoading}
          type="submit"
          className="p-2 flex justify-center text-center"
        >
          {isLoading ? (
            <span className="loading loading-dots loading-sm"></span>
          ) : (
            <BsSend className="text-[22px]" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
