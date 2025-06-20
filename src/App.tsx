import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { MainPage } from "./pages/MainPage";
import { MyCollectionPage } from "./pages/MyCollectionPage";
import { SignUpPage } from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";

import { useAuth } from "./AuthContextProvider";

function App() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-800 font-sans">
        <p className="text-xl font-semibold">Loading authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <Navbar />

      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route
          path="/my-collection"
          element={
            isAuthenticated ? <MyCollectionPage /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <SignUpPage
                onLoginClick={() => navigate("/login")}
                onSignUpSuccess={() => navigate("/")}
              />
            )
          }
        />

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <LoginPage
                onSignUpClick={() => navigate("/signup")}
                onLoginSuccess={() => navigate("/")}
              />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
