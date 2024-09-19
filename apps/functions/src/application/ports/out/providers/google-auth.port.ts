export const GOOGLE_AUTH_PORT = Symbol('GOOGLE_AUTH_PORT');
export const GOOGLE_AUTH_OPTIONS = Symbol('GOOGLE_AUTH_OPTIONS');

export type IGoogleAuthOptionType = {
  GOOGLE_AUTH_CLIENT_ID: string;
  GOOGLE_AUTH_CLIENT_SECRET: string;
};

export interface GoogleAuthPort {
  getUserAccount(idToken: string): Promise<{
    uid: string;
    emailVerified?: boolean;
    email?: string;
    profileImageUrl?: string;
    nickname?: string;
  }>;
}
