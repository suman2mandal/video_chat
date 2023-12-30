"use client";
import React, { useCallback, useEffect } from 'react';
import { useSocket } from "@/provider/socket";
import { usePeer } from "@/provider/peer";

function Page() {
    const socketContext = useSocket();
    const { socket } = socketContext||{};
    const { peer, createOffer } = usePeer();

    const handleNewUserJoined = useCallback(async (data) => {
        const { userID } = data;
        console.log("New user joined", userID);

        if (createOffer && socket) {
            const offer = await createOffer();
            socket.emit("call-user", { userID, offer });
        }
    }, [createOffer, socket]);

    const handleIncomingCall = useCallback(async (data) => {
        const { from, offer } = data;
        console.log("Incoming call", from, offer);
        // console.log("calling");
    }, []);

    useEffect(() => {
        socket.on('user-joined', handleNewUserJoined);
        socket.on('incoming-call', handleIncomingCall);
        return () => {
            socket.off('user-joined',handleNewUserJoined);
            socket.off('incoming-call',handleIncomingCall);
        }
    }, [socket, handleNewUserJoined, handleIncomingCall]);

    return (
        <div className="text-white">
            HI
        </div>
    );
}

export default Page;