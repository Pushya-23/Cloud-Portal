// types/express/index.d.ts
import { DecodedIdToken } from 'firebase-admin/auth';

declare module 'express-serve-static-core' {
  interface Request {
    user?: DecodedIdToken;
  }
}
