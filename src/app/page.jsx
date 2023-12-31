"use client";
import React, { useState, useCallback, useEffect } from 'react';
import { useSocket } from "@/provider/socket";
import { useRouter } from "next/navigation";

function Page() {
  const socketContext = useSocket();
  const [emailID, setEmailID] = useState(`newsumanm${Math.floor(Math.random()*100)}@gmail.com`);
  const [roomID, setRoomID] = useState("1");
  const { socket } = socketContext;
  const router = useRouter();

  const joinRoom = () => {
    if (socket) {
      socket.emit("join-room", { roomID, userID: emailID });
    }
  };

  useEffect(() => {
    const handleRoomJoin = ({ roomID: joinedRoomID }) => {
      console.log("Room Joined", joinedRoomID);
      router.push(`/Room/${joinedRoomID}`);
    };
    if (socket) {
      socket.on("joined-room", handleRoomJoin);
    }
    return () => {
      if (socket) {
        socket.off("joined-room", handleRoomJoin);
      }
    };
  }, [socket, router, roomID, emailID]);

  return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col space-y-6 text-slate-700">
          <input
              type="email"
              value={emailID}
              onChange={(e) => setEmailID(e.target.value)}
              placeholder="Email"
          />
          <input
              type="text"
              value={roomID}
              onChange={(e) => setRoomID(e.target.value)}
              placeholder="Enter room code"
          />
          <button
              onClick={joinRoom}
              className="bg-stone-700 text-white rounded-xl p-2"
          >
            Enter Room1
          </button>
        </div>
      </div>
  );
}

export default Page;
