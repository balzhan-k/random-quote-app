import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";
import React, {
  useReducer,
  useState,
  useEffect,
  createContext,
  FC,
  useContext,
} from "react";

interface AuthState {
  email: string | null;
  uid: string | null;
}

enum AuthActionType {
  LOGIN = "LOGIN",
  SIGNUP = "SIGNUP",
  LOGOUT = "LOGOUT",
}

type AuthAction =
  | { type: AuthActionType.LOGIN; payload: { email: string; uid: string } }
  | { type: AuthActionType.SIGNUP; payload: { email: string; uid: string } }
  | { type: AuthActionType.LOGOUT };

const initialAuthState: AuthState = {
  email: null,
  uid: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionType.LOGIN:
    case AuthActionType.SIGNUP:
      return {
        email: action.payload.email,
        uid: action.payload.uid,
      };
    case AuthActionType.LOGOUT:
      return {
        email: null,
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
  loginWithGoogle: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: AuthActionType.LOGIN,
          payload: { email: user.email || "", uid: user.uid },
        });
      } else {
        dispatch({ type: AuthActionType.LOGOUT });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { email: userEmail, uid } = userCredential.user;
      dispatch({
        type: AuthActionType.LOGIN,
        payload: { email: userEmail || "", uid },
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { email: userEmail, uid } = userCredential.user;
      dispatch({
        type: AuthActionType.SIGNUP,
        payload: { email: userEmail || "", uid },
      });
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { email: userEmail, uid } = result.user;
      dispatch({
        type: AuthActionType.LOGIN,
        payload: { email: userEmail || "", uid },
      });
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      dispatch({ type: AuthActionType.LOGOUT });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const contextValue: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    loginWithGoogle,
    isAuthenticated: !!state.uid,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
