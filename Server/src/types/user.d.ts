// types/express.d.ts
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload |any; // Add user property to the Request interface
    }
  }
}
