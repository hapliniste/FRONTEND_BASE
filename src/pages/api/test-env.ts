import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ 
        hasuraUrl: process.env.NEXT_PUBLIC_HASURA_URL,
        allEnv: process.env
    });
} 