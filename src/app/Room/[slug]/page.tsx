"use client";
import React, {useEffect} from 'react';
import {useSocket} from "@/provider/socket";

function Page() {
    const socketContext = useSocket();


    const handleNewUserJoined = (data:any) => {
        const {emailId} = data;
        console.log("New user joined",emailId);
    }

    if (socketContext) {
        const {socket} = socketContext;
        useEffect(() => {
            socket.on('user-joined', handleNewUserJoined);
        }, [socket])
    }

    return (
        <div className="text-white">
            HI
        </div>
    );
}

export default Page;