import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            userId?: string; // Make it optional to avoid conflicts when it's undefined
        }
    }
}
