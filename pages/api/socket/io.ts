import {NextApiRequest, NextApiResponse} from "next";
import {Server as SocketIOServer} from "socket.io";
import {Server as NetServer, Socket} from 'net'

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer
        }
    }
}
export const config = {
    api: {
        bodyParser: false
    }
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if (!res.socket.server.io) {
        const path = '/api/socket/io';
        const httpServer: NetServer = res.socket.server as any;
        // @ts-ignore
        res.socket.server.io = new SocketIOServer(httpServer, {
            path: path,
            addTrailingSlash: false,
            transports: ['websocket'],
        });
    }
    res.end();
}
export default ioHandler;