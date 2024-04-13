import io from 'socket.io-client';
import { useAuthStore } from '~/stores/auth';

const socketConnection = reactive({
    connected: false,
});
const useSocket = (sessionId: string) => {
    if (socketConnection.connected) return;

    const cookie = useCookie('token');
    const authStore = useAuthStore();

    const socket = io('http://localhost:3333/', {
        transports: ['websocket'],
        query: {
            sessionId,
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

    socket.on('change_permissions', (permissions: any) => {
        if (
            !permissions.find(
                (permission: any) => permission.userId === useAuthStore().user?.id && permission.permission !== 'none'
            )
        ) {
            window.location.reload();
        }
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
