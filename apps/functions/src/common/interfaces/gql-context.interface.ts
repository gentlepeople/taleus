import { Request } from 'express';

interface RequestWithUser extends Request {
  user?: { uid: string };
}

export interface GqlContext {
  req: RequestWithUser;
}
