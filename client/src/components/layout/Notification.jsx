import React, { useState, useEffect, useRef } from "react";
import { currentUserStore } from "../../data/currentUserStore"; // Import the Zustand store

export default function NotificationBell() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userName } = currentUserStore(); // Get userName from Zustand store
  const [notifications, setNotifications] = useState([ // Use local state to manage notifications
    { id: 1, message: "Sanjana Narla has requested to enroll in the 'JavaScript Mastery' Book club", requester: "Sanjana Narla", bookClub: "'JavaScript Mastery'" },
    { id: 2, message: "Abhimenyu has requested to enroll in the 'Cloud Computing' Book club", requester: "John Doe", bookClub: "'React for Beginners'" },
  ]);
  
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Effect to close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle the notification menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Simulate accepting or rejecting a request
  const handleAction = (action, id) => {
    console.log(`${action} request for notification with id: ${id}`);
    
    // Remove the notification by filtering out the accepted or rejected notification
    setNotifications((prevNotifications) => 
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleMenu}
        className="relative rounded-full mx-1 p-1 text-white text-sm hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span className="sr-only">View notifications</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-bell"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
      </button>

      {/* Context Menu */}
      <div
        ref={menuRef}
        className={isMenuOpen ? "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" : "hidden"}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabIndex="-1"
      >
        {/* Only show notifications for Shuba Nandini Gangam */}
        {/* {userName === "Sanjana Narla"? (
            <div className="px-4 py-2 text-sm text-gray-700">

            {getNotifications().map((notification, index) => (

              <div key={notification.id}>

                <a

                  href="#"

                  className="block px-4 py-2 text-sm text-gray-700 w-full text-left"

                  role="menuitem"

                  tabIndex="-1"

                >

                  {notification.message}

                </a>

              </div>

        )}; */}
        {userName === "Shuba Nandini Gangam" ? (
          notifications.map((notification, index) => (
            <div key={notification.id}>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                role="menuitem"
                tabIndex="-1"
              >
                {notification.message}
              </a>

              {/* Show action buttons for each notification */}
              <div className="flex justify-between px-4 py-2">
                <button
                  className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                  onClick={() => handleAction("Accept", notification.id)} // Pass id to remove
                >
                  Accept
                </button>
                <button
                  className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                  onClick={() => handleAction("Reject", notification.id)} // Pass id to remove
                >
                  Reject
                </button>
              </div>

              {/* Divider between notifications */}
              {index < notifications.length - 1 && <hr className="my-2 border-t border-gray-200" />}
            </div>
            
          ))
        ) : (
          <div className="px-4 py-2 text-sm text-gray-700">No notifications for you.</div>
        )}
      </div>
    </div>
  );
}
