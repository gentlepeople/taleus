export const AUTHENTICATION_PORT = Symbol('AUTHENTICATION_PORT');

export interface AuthenticationPort {
  createUser(): Promise<{
    uid: string;
  }>;
  createCustomToken(uid: string): Promise<string>;
  verifyIdToken(idToken: string): Promise<{ uid: string }>;
  deleteUser(uid: string): Promise<boolean>;
}
