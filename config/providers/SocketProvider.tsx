import React, { createContext, useContext, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import Server from 'socket.io-client';

const SocketContext = createContext(null as unknown as Socket | null);

export function useSocket () {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = React.useState<Socket | null>(null);
    
    useEffect((): any => {
        const newSocket: Socket = Server('http://localhost:3001');
        setSocket(newSocket);
        
        return () => newSocket.close();
    }, []);
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}