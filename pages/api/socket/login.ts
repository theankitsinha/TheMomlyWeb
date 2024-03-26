import {NextApiResponseServerIo} from "@/pages/api/socket/io";
import {NextApiRequest} from "next";

export default function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
    if (req.method === 'POST' && req.headers.authorization === process.env.API_SOCKET_LOGIN_KEY) {
        const body: {
            userId: string,
            encryptedToken: string
        } = req.body;
        if (!body.userId || !body.encryptedToken) {
            return res.status(500).json({
                data: 'Invalid Data',
            });
        }
        res.socket.server.io.emit(body.encryptedToken, {
            userId: body.userId,
            date: new Date()
        })
        return res.status(200).json({
            data: 'Success'
        });
    } else {
        return res.status(500).json({
            data: 'Method not supported',
        });
    }


}
