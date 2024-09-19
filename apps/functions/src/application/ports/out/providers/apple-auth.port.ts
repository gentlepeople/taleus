export const APPLE_AUTH_PORT = Symbol('APPLE_AUTH_PORT');

export interface AppleAuthPort {
  getUserAccount(
    idToken: string,
    options?: { nonce: string },
  ): Promise<{
    uid: string;
    emailVerified: boolean;
    email: string;
  }>;
}
