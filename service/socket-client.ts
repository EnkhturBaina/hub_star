import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = (): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_BASE_API_URL || 'http://192.82.92.170:8080');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
