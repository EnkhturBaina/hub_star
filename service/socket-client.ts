import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { getAccessToken } from './api.service';

const useSocket = (): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const token = getAccessToken();

  useEffect(() => {
    if (token) {
      const newSocket = io(process.env.NEXT_PUBLIC_BASE_API_URL || 'http://192.82.92.171:8080', {
        auth: { token },
      });
      setSocket(newSocket);
      return () => {
        newSocket.disconnect();
      };
    }
  }, [token]);

  return socket;
};

export default useSocket;
