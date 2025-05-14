import "./App.css";
import { useState } from "react";
import { ProfilePage } from "./pages/ProfilePage/index.jsx";
import { MainPage } from "./pages/MainPage/index.jsx";

const pages = {
  home: "Home",
  profile: "Profile",
};

function App() {
  const [currentPage, setCurrentPage] = useState(pages.home);

  return (
    <div className="text-center font-sans bg-green-700 min-h-screen">
      <nav className=" bg-gray-100 shadow-md">
        <ul className="flex justify-center space-x-6 p-4">
          <li>
            <button
              className="text-gray-700 font-semibold hover:text-blue-600 transition"
              onClick={() => setCurrentPage(pages.home)}
            >
              {pages.home}
            </button>
          </li>
          <li>
            <button
              className="text-gray-700 font-semibold hover:text-blue-600 transition"
              onClick={() => setCurrentPage(pages.profile)}
            >
              {pages.profile}
            </button>
          </li>
        </ul>
      </nav>
      {currentPage === pages.home && <MainPage />}
      {currentPage === pages.profile && <ProfilePage />}
    </div>
  );
}

export default App;

/*{quotes[currentIndex].quote}*/
