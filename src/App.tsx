import { useState } from "react";
import { ProfilePage } from "./pages/ProfilePage/index";
import { MainPage } from "./pages/MainPage/index";

enum Page {
  home = "Home",
  profile = "Profile",
  about = "About",
}

const allPages = Object.values(Page);

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.home);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-800">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9.006 14.19a2.25 2.25 0 0 0-2.13-1.543H2.25v3.659m1.5-2.25h1.701m4.168-1.077L9.006 14.19a2.25 2.25 0 0 1-2.13-1.543H2.25V7.258m1.5 2.25H5.904m8.168 1.077l.807 1.714a2.25 2.25 0 0 0 2.13 1.543H21.75V8.192m-1.5 2.25h1.701M8.168 11.223l-.807 1.714a2.25 2.25 0 0 1-2.13 1.543H2.25V7.258m1.5 2.25H5.904m8.168 1.077l.807 1.714a2.25 2.25 0 0 0 2.13 1.543H21.75V8.192m-1.5 2.25h1.701" />
          </svg>
          <span className="text-xl font-bold cursor-pointer" onClick={() => setCurrentPage(Page.home)}>Quote Fetcher</span>
        </div>
        <ul className="flex space-x-6 items-center">
          {allPages.filter(page => page !== Page.profile).map((page) => (
            <li key={page}>
              <button
                className="text-gray-700 font-semibold hover:text-blue-600 transition"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </li>
          ))}
          <li>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition">Sign Up</button>
          </li>
          <li>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-semibold hover:bg-gray-50 transition">Login</button>
          </li>
        </ul>
      </nav>
      {currentPage === Page.home && <MainPage />}
      {currentPage === Page.profile && <ProfilePage />}
      {currentPage === Page.about && <div>About Page Content</div>}
    </div>
  );
}

export default App;
