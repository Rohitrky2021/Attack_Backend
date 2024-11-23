import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Add this declaration to extend Express Request
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

const auth = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        res.status(401).json({ message: 'No token, authorization denied' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        req.userId = decoded.userId; // Now TypeScript will recognize this property
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export default auth;
