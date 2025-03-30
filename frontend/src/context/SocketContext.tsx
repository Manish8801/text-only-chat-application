import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ISocketContext } from "../types/types";
import useAuthContext from "../hooks/useAuthContext";
import io from "socket.io-client";

const SocketContext = createContext<ISocketContext | null>(null);

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      const newSocket = io(
        "https://text-only-chat-application-4.onrender.com",
        {
          query: {
            userId: user._id,
          },
        }
      );

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (onlineUsers: string[]) => {
        setOnlineUsers(onlineUsers);
      });
    } else if (!user && socket) {
      socket.close();
      setSocket(null);
    }
  }, [user]);

  const value = {
    socket,
    onlineUsers,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export { SocketContext as default, SocketContextProvider };
