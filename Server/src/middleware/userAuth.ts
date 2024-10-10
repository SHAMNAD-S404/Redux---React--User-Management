import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface DecodedUser extends JwtPayload {
    id: string;
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | any> => {
    const token = req.cookies?.access_token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!process.env.JWT_SECRET) {
        console.log('JWT secret not found in middleware');
        return res.status(500).json({ error: 'Internal server error' });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as  DecodedUser ;
        
        (req as any).user = decoded.id;
        console.log((req as any).user);
        
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid token!' });
    }
};
