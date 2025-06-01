import { useState } from "react";
import { ProfilePage } from "./pages/ProfilePage/index";
import { MainPage } from "./pages/MainPage/index";

enum Page {
  home = "Home",
  profile = "Profile",
  signup = "Sign Up",
  login = "Login",
}

const allPages = Object.values(Page);

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.home);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <nav className="bg-white shadow-md py-4 px-4 flex justify-between items-center sm:px-6">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <span className="text-lg sm:text-xl font-bold cursor-pointer" onClick={() => handlePageChange(Page.home)}>Quote Fetcher</span>
          <button
            className="sm:hidden text-gray-700 focus:outline-none focus:text-blue-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              )}
            </svg>
          </button>
        </div>

        {/* Backdrop for mobile menu */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}

        {/* Mobile menu / Desktop navigation */}
        <ul
          className={`
            // Mobile styles
            fixed inset-y-0 right-0 w-[70%] bg-white shadow-lg z-40
            flex flex-col items-center justify-center space-y-6 pt-16
            transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            ${!isMenuOpen && 'hidden'}
        
            // Override on sm and up (tablet and desktop)
            sm:static sm:translate-x-0 sm:flex sm:flex-row sm:space-x-4 sm:space-y-0 sm:w-auto sm:bg-transparent sm:shadow-none sm:pt-0 sm:items-center sm:justify-end sm:z-auto
          `}
        >
          <button
            className="absolute top-4 right-4 text-gray-700 focus:outline-none sm:hidden"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          {allPages.map((page) => (
            <li key={page}>
              <button
                className="text-gray-700 font-semibold hover:text-blue-600 transition text-lg sm:text-base px-4 py-2 rounded-md w-full text-center"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {currentPage === Page.home && <MainPage />}
      {currentPage === Page.profile && <ProfilePage />}
      {currentPage === Page.signup && <div>Sign Up Page Content</div>}
      {currentPage === Page.login && <div>Login Page Content</div>}
    </div>
  );
}

export default App;
