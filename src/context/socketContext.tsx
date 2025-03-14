import React, { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAuthState } from './auth';
import AuthTokenStorageService from '@services/AuthTokenStorageService';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { isAuthenticated } = useAuthState();

  useEffect(() => {
    if (!isAuthenticated) return;
    // Initialize socket connection
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      auth: { token: AuthTokenStorageService.getAccessToken() },
    });
    // Set up event listeners
    socketInstance.on('connect', () => {
      setIsConnected(true);
    });
    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });
    setSocket(socketInstance);
    // Cleanup on unmount
    return () => {
      socketInstance.close();
    };
  }, [isAuthenticated]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>
  );
};
