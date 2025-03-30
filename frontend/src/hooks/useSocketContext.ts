import SocketContext from "../context/SocketContext";
import { useContext } from "react";

function useSocketContext() {
    const context = useContext(SocketContext);
    
    if (!context) {
        throw new Error("useSocketContext must be used within a SocketContextProvider");
    }

    return context;
}

export default useSocketContext;
