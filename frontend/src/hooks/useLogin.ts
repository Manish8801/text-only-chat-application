import { ILoginData } from "./../types/types";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuthContext from "./useAuthContext";

function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuthContext();

  async function login(loginData: ILoginData) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Login successful.");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }
  return { isLoading, login };
}

export default useLogin;
