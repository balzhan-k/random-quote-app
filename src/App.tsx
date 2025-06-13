import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

//имортироуем сюда все нужные компоненты
import { Navbar } from "./components/Navbar";
import { MainPage } from "./pages/MainPage";
import { MyCollectionPage } from "./pages/MyCollectionPage";
import { SignUpPage } from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";

//импортируем контекст авторизации для того чтобы использовать его в компонентах
import { useAuth } from "./AuthContextProvider";

function App() {
  const { uid } = useAuth();
  const isAuthenticated = !!uid;
  const navigate = useNavigate();

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
      </Routes>
      <Route path="*" element={<Navigate to="/" />} />
    </div>
  );
}

export default App;
