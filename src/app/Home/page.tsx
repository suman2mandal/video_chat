"use client";
import React, {useEffect} from 'react';
import {useSocket} from "@/provider/socket";

function Page() {
    const socketContext = useSocket();
    const [emailID, setEmailID] = React.useState("");
    const [roomID, setRoomID] = React.useState("");

    const joinRoom = () => {
        if (socketContext) {
            const {socket} = socketContext;
            socket.emit("join-room", {roomID, userID: emailID});
        }
    }

    useEffect(() => {
        if (socketContext) {
            const {socket} = socketContext;
            const handleRoomJoin = ({roomID}:{roomID:string}) => {
                console.log("Room Joined", roomID);
            }
            socket.on("joined-room", handleRoomJoin);
        }
    }, [socketContext]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col space-y-6 text-slate-700">
                <input type="email" value={emailID} onChange={e=>setEmailID(e.target.value)} placeholder="Email" />
                <input type="text" value={roomID} onChange={e=>setRoomID(e.target.value)} placeholder="Enter room code" />
                <input type="button" onClick={joinRoom} value="Enter Room" className="bg-stone-700 text-white rounded-xl p-2"/>
            </div>
        </div>
    );
}

export default Page;
