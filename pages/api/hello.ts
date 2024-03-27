import {NextApiRequest, NextApiResponse} from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const secret = await generateAppleClientSecret();
    const secret = "Hello World";

    return res.status(500).json({
        data: secret,
    });
}
