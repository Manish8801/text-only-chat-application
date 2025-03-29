import { BsSend } from "react-icons/bs";

const MessageInput = () => {
  return (
    <form className="px-4 mb-4 mt-1">
      <div className="w-full flex items-center">
        <input
          type="text"
          className="border rounded-lg block flex-1 p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Message..."
        />
        <button
          type="submit"
          className="p-2 flex justify-center text-center"
        >
          <BsSend className="text-[22px]" />
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
