import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// Define the authentication state type
interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  token: string | null;
}

// Define action types
type AuthAction =
  | { type: 'LOGIN'; payload: { user: string; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'SIGNUP'; payload: { user: string; token: string } };

// Initial state
const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

// Auth Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
    case 'SIGNUP':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

// Define the context type
interface AuthContextType extends AuthState {
  login: (user: string, token: string) => void;
  logout: () => void;
  signup: (user: string, token: string) => void;
}

// Create the Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const login = (user: string, token: string) => {
    dispatch({ type: 'LOGIN', payload: { user, token } });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const signup = (user: string, token: string) => {
    dispatch({ type: 'SIGNUP', payload: { user, token } });
  };

  const contextValue = {
    ...state,
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 