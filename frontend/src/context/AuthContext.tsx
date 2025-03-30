import { createContext, useState } from "react";
import { IAuthContext } from "../types/types";
import type { ReactNode } from "react";

const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null
  );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
