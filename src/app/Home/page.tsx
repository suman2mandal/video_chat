"use client";
import React, {useEffect} from 'react';
import {useSocket} from "@/provider/socket";
import {useRouter} from "next/navigation";

function Page() {
    const socketContext = useSocket();
    const [emailID, setEmailID] = React.useState("");
    const [roomID, setRoomID] = React.useState("");

    const router = useRouter();
    const joinRoom = () => {
        if (socketContext) {
            const {socket} = socketContext;
            socket.emit("join-room", {roomID, userID: emailID});
        }
    }

    if(socketContext) {
        const {socket} = socketContext;
        useEffect(() => {

            const handleRoomJoin = ({roomID}:{roomID:string}) => {
                console.log("Room Joined", roomID);
                router.push(`/Room/${roomID}`);
            }
            socket.on("joined-room", handleRoomJoin);
        }, [socket]);
    }

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
