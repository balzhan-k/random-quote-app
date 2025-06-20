import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "./firebase";
import React from "react";

interface AuthState {
  email: string | null;
  uid: string | null;
}

type AuthAction =
  | { type: "LOGIN"; payload: { email: string; uid: string } }
  | { type: "SIGNUP"; payload: { email: string; uid: string } }
  | { type: "LOGOUT" };

const initialAuthState: AuthState = {
  email: null,
  uid: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
    case "SIGNUP":
      return {
        email: action.payload.email,
        uid: action.payload.uid,
      };
    case "LOGOUT":
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

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, initialAuthState);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: "LOGIN",
          payload: { email: user.email || "", uid: user.uid },
        });
      } else {
        dispatch({ type: "LOGOUT" });
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
      dispatch({ type: "LOGIN", payload: { email: userEmail || "", uid } });
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
      dispatch({ type: "SIGNUP", payload: { email: userEmail || "", uid } });
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { email: userEmail, uid } = result.user;
      dispatch({ type: "LOGIN", payload: { email: userEmail || "", uid } });
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      dispatch({ type: "LOGOUT" });
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
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
