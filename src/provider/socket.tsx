"use client";
import React, {createContext, useContext, useMemo} from 'react';
import {io,Socket} from "socket.io-client";

const SocketContext = createContext<{socket:Socket}|null>(null);
export const useSocket = () => {
    const context = useContext(SocketContext);
    return context;
};
export const SocketProvider = (props:any) => {
    const socket = useMemo(() =>
        io("http://localhost:8001"), []);

    return (
        <SocketContext.Provider value={{socket}}>
            {props.children}
        </SocketContext.Provider>
    )
}