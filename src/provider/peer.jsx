"use client"
import React, { createContext, useContext, useEffect, useMemo, useRef } from 'react';


const PeerContext = createContext(null);

export const usePeer = () => {
    const context = useContext(PeerContext);
    if (!context) {
        throw new Error('usePeer must be used within a PeerProvider');
    }
    return context;
};

export const PeerProvider = (props) => {

    let peer;
    useEffect(() => {
        // Create the peer connection only if it doesn't exist
            peer = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: ['stun:stun.l.google.com:19302', 'stun:global.stun.twilio.com:3478'],
                    },
                ],
            });

        // Cleanup function to close the peer connection when the component unmounts
        return () => {
            if (peer) {
                peer.close();
            }
        };
    }, []); // Empty dependency array to ensure it runs only once

    const createOffer = async () => {
        try {
            const offer = await peer.createOffer();
            await peer.setLocalDescription(offer);
            return offer;
        } catch (error) {
            console.error('Error creating offer:', error);
        }
    };

    const createAnswer = async (offer) => {
        await peer.setRemoteDescription(offer);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        return answer;
    }

    const setRemoteAns = async (ans)=>{
        await peer.setRemoteDescription(ans);
    }

    return (
        <PeerContext.Provider value={{ peer, createOffer,createAnswer,setRemoteAns }}>
            {props.children}
        </PeerContext.Provider>
    );
};
