import { createContext, ReactNode, useContext } from 'react';

import { Suspender } from '../../mobile-ui/common/suspender';
import { IAuthCurrentUser, useAuthCurrentUser, useAuthFirebaseTokenChange } from './hooks';

export type IAuthContext = {
  currentUser: IAuthCurrentUser;
  currentUserId: string;
};

export type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<IAuthContext>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { userId, isFirebaseAuthenticating } = useAuthFirebaseTokenChange();
  const { currentUser, isLoadingCurrentUser } = useAuthCurrentUser({
    userId,
  });

  console.log(userId);

  if (isFirebaseAuthenticating || isLoadingCurrentUser) {
    return <Suspender />;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUserId: userId,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};
