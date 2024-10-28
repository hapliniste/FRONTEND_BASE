// New API route to serve contact information securely

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        console.log('GET request received');
        res.status(200).json({
            email: process.env.CONTACT_EMAIL,
            phone: process.env.CONTACT_PHONE,
        });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
