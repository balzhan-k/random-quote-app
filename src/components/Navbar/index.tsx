import { useState } from "react"; //
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContextProvider";

enum Page {
  home = "Home",
  myCollection = "My Collection",
  signUp = "Sign Up",
  login = "Login",
}

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { uid, logout } = useAuth();
  const isAuthenticated = !!uid;
  const navigate = useNavigate();

  const handleNavigate = (page: Page) => {
    const path = getPathFromPage(page);
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  const getPathFromPage = (page: Page) => {
    switch (page) {
      case Page.home:
        return "/";
      case Page.myCollection:
        return "/my-collection";
      case Page.signUp:
        return "/signup";
      case Page.login:
        return "/login";
      default:
        return "/";
    }
  };

  return (
    <div className="bg-white text-gray-800 font-sans">
      <nav className="bg-white shadow-md py-4 px-4 flex justify-between items-center sm:px-6">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <span
            className="text-lg sm:text-xl font-bold cursor-pointer"
            onClick={() => handleNavigate(Page.home)}
            aria-label="Logo"
          >
            Quote Fetcher
          </span>
          <button
            className="sm:hidden text-gray-700 focus:outline-none focus:text-blue-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
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

        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        )}

        <ul
          className={`fixed inset-y-0 right-0 w-[70%] bg-white shadow-lg z-40
            flex flex-col items-center justify-center space-y-6 pt-16
            transform transition-transform duration-300 ease-in-out
            ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
            ${!mobileMenuOpen && "hidden"}
            sm:static sm:translate-x-0 sm:flex sm:flex-row sm:space-x-4 sm:space-y-0 sm:w-auto sm:bg-transparent sm:shadow-none sm:pt-0 sm:items-center sm:justify-end sm:z-auto
          `}
        >
          <button
            className="absolute top-4 right-4 text-gray-700 focus:outline-none sm:hidden"
            onClick={() => setMobileMenuOpen(false)}
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
          <li key={Page.home}>
            <button
              className="text-gray-700 font-semibold hover:text-blue-600 transition text-lg sm:text-base px-4 py-2 rounded-md w-full text-center"
              onClick={() => handleNavigate(Page.home)}
              aria-label="Home"
            >
              {Page.home}
            </button>
          </li>

          {isAuthenticated && (
            <>
              <li key={Page.myCollection}>
                <button
                  className="text-gray-700 font-semibold hover:text-blue-600 transition text-lg sm:text-base px-4 py-2 rounded-md w-full text-center"
                  onClick={() => handleNavigate(Page.myCollection)}
                >
                  My Collection
                </button>
              </li>
              <li key="logout">
                <button
                  className="text-gray-700 font-semibold hover:text-blue-600 transition text-lg sm:text-base px-4 py-2 rounded-md w-full text-center"
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  Logout
                </button>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <>
              <li key="login">
                <button
                  className="text-gray-700 font-semibold hover:text-blue-600 transition text-lg sm:text-base px-4 py-2 rounded-md w-full text-center"
                  onClick={() => handleNavigate(Page.login)}
                  aria-label="Log In"
                >
                  Log In
                </button>
              </li>
              <li key="signup">
                <button
                  className="text-gray-700 font-semibold hover:text-blue-600 transition text-lg sm:text-base px-4 py-2 rounded-md w-full text-center"
                  onClick={() => handleNavigate(Page.signUp)}
                  aria-label="Sign Up"
                >
                  Sign Up
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};
