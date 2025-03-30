import { useState } from "react";
import { ISignupData } from "../types/types";
import toast from "react-hot-toast";
import useAuthContext from "./useAuthContext";

function handleValidation(signupData: ISignupData) {
  const { fullname, username, password, confirmPassword, gender } = signupData;

  if (!fullname || !username || !gender || !password || !confirmPassword) {
    toast.error("Please ensure all mandatory fields are provided.");
    return false;
  }

  if (!/^[a-zA-Z\s]+$/.test(fullname)) {
    toast.error("Fullname must contain only letters and spaces.");
    return false;
  }

  if (password.length < 8) {
    toast.error("Password must be at least 8 characters long.");
    return false;
  }

  if (password !== password) {
    toast.error("Passwords do not match.");
    return false;
  }

  return true;
}

function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuthContext();

  async function signup(signupData: ISignupData) {
    const success = handleValidation(signupData);
    if (!success) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }
  return { isLoading, signup };
}

export default useSignup;
