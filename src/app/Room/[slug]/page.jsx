"use client";
import React, { useCallback, useEffect } from 'react';
import { useSocket } from "@/provider/socket";
import { usePeer } from "@/provider/peer";

function Page() {
    const socketContext = useSocket();
    const { socket } = socketContext||{};
    const { peer, createOffer,createAnswer,setRemoteAns } = usePeer();

    const handleNewUserJoined = useCallback(async (data) => {
        const { userID,roomID } = data;
        console.log("New user joined", userID);

        if (createOffer && socket) {
            const offer = await createOffer();
            socket.emit("call-user", { userID, offer,roomID });
        }
    }, [createOffer, socket]);

    const handleIncomingCall = useCallback(async (data) => {
        const { from, offer,roomID } = data;
        console.log("Incoming call", from, offer);
        const ans = await createAnswer(offer);
        socket.emit("call-accepted", { UserID: from, ans,roomID });
    }, [createAnswer, socket]);

    const handleCallAccepted = useCallback(async (data) => {
        const { ans } = data;
        console.log("Call accepted", ans);
        await setRemoteAns(ans);
    },[setRemoteAns, socket]);

    useEffect(() => {
        socket.on('user-joined', handleNewUserJoined);
        socket.on('incoming-call', handleIncomingCall);
        socket.on('call-accepted-Ack', handleCallAccepted);
        return () => {
            socket.off('user-joined',handleNewUserJoined);
            socket.off('incoming-call',handleIncomingCall);
            socket.off('call-accepted-Ack', handleCallAccepted);
        }
    }, [socket, handleNewUserJoined, handleIncomingCall]);

    return (
        <div className="text-white">
            HI
        </div>
    );
}

export default Page;
