"use client"
import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';

interface PeerContextType {
    peer: RTCPeerConnection | null;
    createOffer?: () => Promise<any>;
}

const PeerContext = createContext<PeerContextType>({ peer: null });

export const usePeer = () => {
    const context = useContext(PeerContext);
    if (!context) {
        throw new Error('usePeer must be used within a PeerProvider');
    }
    return context;
};

export const PeerProvider = (props: any) => {
    // Use state to hold the peer instance
    const [peer, setPeer] = useState<RTCPeerConnection | null>(null);

    const memoizedPeer = useMemo(() => new RTCPeerConnection({
        iceServers: [
            {
                urls: ['stun:stun.l.google.com:19302', 'stun:global.stun.twilio.com:3478'],
            },
        ],
    }), []);

    useEffect(() => {
        // Set the peer using setPeer
        setPeer(memoizedPeer);

        // Cleanup function to close the peer connection when the component unmounts
        return () => {
            memoizedPeer.close();
        };
    }, [memoizedPeer]);

    const createOffer = async () => {
        // Check if peer is available before creating an offer
        if (peer) {
            const offer = await peer.createOffer();
            await peer.setLocalDescription(offer);
            return offer;
        } else {
            throw new Error('Peer not available');
        }
    };

    return (
        <PeerContext.Provider value={{ peer, createOffer }}>
            {props.children}
        </PeerContext.Provider>
    );
};
