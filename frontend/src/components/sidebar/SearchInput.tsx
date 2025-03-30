import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import type { FormEvent } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation";

const SearchInput = () => {
  const [search, setSearch] = useState<string>("");
  const {  setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!search.trim()) return;

    if (search.length < 3) {
      toast.error("Search term must be at least 3 characters long.");
    }

    const conversation = conversations.find((c) =>
      c.fullname.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
    } else {
      toast.error("No such user found");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
