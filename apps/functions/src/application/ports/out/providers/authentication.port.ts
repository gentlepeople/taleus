export const AUTHENTICATION_PORT = Symbol('AUTHENTICATION_PORT');

export interface AuthenticationPort {
  createUser(): Promise<{
    uid: string;
  }>;

  createCustomToken(uid: string): Promise<string>;
}
