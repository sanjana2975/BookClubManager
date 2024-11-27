import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Notification from "./Notification";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-900">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center text-center gap-2">
            <span className="text-white text-xl font-serif italic tracking-wide drop-shadow-lg">
              Book Clubs Manager
            </span>
            <svg
              className="w-6 h-6 -mb-1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 7v14" />
              <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
            </svg>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex items-center justify-center sm:justify-end">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/home"
                  className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/manage"
                  className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Manage
                </Link>
                <Link
                  to="/organizer"
                  className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Organizer
                </Link>
              </div>
            </div>
          </div>

          {/* Notification and User Menu */}
          <div className="relative flex items-center space-x-4">
            {/* Notification Button */}
            <Notification/>

            {/* User Menu */}
            <div className="relative ml-3" ref={menuRef}>
              <div>
                <button
                  type="button"
                  onClick={toggleMenu}
                  className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded={isMenuOpen}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-user"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </button>
              </div>

              {/* Context Menu */}
              <div
                className={
                  isMenuOpen
                    ? "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    : "hidden"
                }
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
              >
                <a
                  href="https://mathworksinc.service-now.com/esc"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left first:rounded-t-md"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-0"
                  target="_blank"
                >
                  Help
                </a>
                <a
                  href="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left last:rounded-t-md"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-1"
                >
                  Log out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
