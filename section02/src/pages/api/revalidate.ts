import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await res.revalidate("/")
        return res.status(200).json({revalidate: true});
    } catch (err) {
        res.status(500).json(err);
    }
}
