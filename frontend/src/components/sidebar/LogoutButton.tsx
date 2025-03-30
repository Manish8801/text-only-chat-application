import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { isLoading, logout } = useLogout();

  return (
    <button onClick={logout} className="mt-auto">
      {isLoading ? (
        <span className="loading loading-dots loading-md"></span>
      ) : (
        <BiLogOut className="w-6 h-6 text-white cursor-pointer" />
      )}
    </button>
  );
};

export default LogoutButton;
