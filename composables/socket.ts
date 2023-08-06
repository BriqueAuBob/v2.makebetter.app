import io from 'socket.io-client';

const socketConnection = reactive({
    connected: false,
});
const useSocket = (sessionId: string, sessionToken: string) => {
    if (socketConnection.connected) return;

    const cookie = useCookie('token');

    const socket = io('http://localhost:3000', {
        transports: ['websocket'],
        query: {
            sessionId,
            sessionToken,
            token: cookie.value,
        },
    });

    socket.on('connect', () => {
        console.log('socket connected');
    });

    socket.on('disconnect', () => {
        console.log('socket disconnected');
        socket.close();
    });

    window.addEventListener('mousemove', (e: MouseEvent) => {
        socket.emit('mousemove', {
            x: e.pageX,
            y: e.pageY,
        });
    });

    socketConnection.connected = socket.connected;

    return socket;
};

export default useSocket;
