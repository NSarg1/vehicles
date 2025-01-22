import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_BASE_URL;

const socket: Socket = io(SOCKET_URL, {
  transports: ['websocket'],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  autoConnect: true,
});

export default socket;
