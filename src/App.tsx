import { useState } from "react";
import { ProfilePage } from "./pages/ProfilePage/index";
import { MainPage } from "./pages/MainPage/index";

enum Page {
  home = "Home",
  profile = "Profile",
}

const allPages = Object.values(Page);

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.home);

  return (
    <div className="class text-center font-sans bg-green-700 min-h-screen">
      <nav className="bg-green-50 shadow-md ">
        <ul className="flex justify-end space-x-6 p-4 max-w-5xl">
          {allPages.map((page) => (
            <li>
              <button
                className="text-gray-700 font-semibold hover:text-green-700 transition"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </li>
          ))}


        </ul>
      </nav>
      {currentPage === Page.home && (<MainPage />)}
      {currentPage === Page.profile && <ProfilePage />}
    </div>
  );
}

export default App;
