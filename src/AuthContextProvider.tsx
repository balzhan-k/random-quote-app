import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase'; // путь к firebase.ts
import React from 'react';

interface AuthState {
  user: string | null;
  token: string | null;
  isAuthenticated: boolean;
  uid: string | null;
}

type AuthAction =
  | { type: 'LOGIN'; payload: { user: string; token: string; uid: string } }
  | { type: 'SIGNUP'; payload: { user: string; token: string; uid: string } }
  | { type: 'LOGOUT' };

const initialAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  uid: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
    case 'SIGNUP':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        uid: action.payload.uid,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        uid: null,
      };
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, initialAuthState);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      const uid = userCredential.user.uid;
      dispatch({ type: 'LOGIN', payload: { user: email, token, uid } });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      const uid = userCredential.user.uid;
      dispatch({ type: 'SIGNUP', payload: { user: email, token, uid } });
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      dispatch({ type: 'LOGIN', payload: { user: user.email || user.uid, token, uid: user.uid } });
    } catch (error) {
      console.error('Google Sign-In error:', error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    dispatch({ type: 'LOGOUT' });
  };

  const contextValue = {
    ...state,
    login,
    signup,
    logout,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
