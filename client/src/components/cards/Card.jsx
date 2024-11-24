import React, { useState } from 'react';
import { Book, User, Users, Calendar, Info, Pencil } from 'lucide-react';
import Input from "./Input"

// Sub-component for displaying each section (Organizer, Book, Attendees, etc.)
const InfoSection = ({ icon, title, content, iconClass, textClass }) => {
  return (
    <div className="flex items-center space-x-3">
      {React.cloneElement(icon, { className: `w-5 h-5 ${iconClass}` })}
      <div>
        <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
        <p className={`text-gray-600 dark:text-gray-400 ${textClass}`}>{content}</p>
      </div>
    </div>
  );
};

function Card(props) {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // State for the edit modal
  const [enrollmentState, setEnrollmentState] = useState("Enroll"); // Default to "Enroll"
  const [password, setPassword] = useState(""); // State for password input

  // Function to close the modals
  const closeModal = () => {
    setShowModal(false);
    setShowEditModal(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Function to open the detailed view modal
  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = 'hidden'; // Disable body scrolling when modal is open
  };

  // Function to open the edit modal
  const openEditModal = () => {
    setShowEditModal(true);
    document.body.style.overflow = 'hidden'; // Disable body scrolling when modal is open
  };

  // Handle enrollment button click
  const handleEnrollmentClick = () => {
    if (enrollmentState === "Enroll") {
      setEnrollmentState("Request Sent");
    } else {
      setEnrollmentState("Enroll");
    }
  };

  // Handle form submission
  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted password:", password);
    closeModal(); // Close modal after submission
  };

  return (
    <>
      {/* The main card */}
      <div className="max-w-2xl w-full p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.bookClubName}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.description}</p>

        {/* Buttons Section on Default Card */}
        <div className="flex justify-between mt-4">
          {/* Know More Button */}
          <a
            href="#"
            onClick={openModal}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Know more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
          <div className="flex items-center gap-3">
            {/* Enroll Button */}
            {!props.isEnrolled && (
             <div className="flex items-center gap-3">
            <button
              onClick={handleEnrollmentClick}
              className={`px-4 py-2 rounded-lg text-white ${
                enrollmentState === "Enroll" ? "bg-blue-700 hover:bg-blue-700 focus:ring-blue-300" : "bg-green-500 hover:bg-green-600 focus:ring-green-300"
              } focus:ring-4 focus:outline-none`}
            >
              {enrollmentState}
            </button>
            </div>
            )}
            <Pencil onClick={openEditModal} className="cursor-pointer"/>
          </div>
        </div>
      </div>

      {/* Modal (Detailed View) */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md"
          onClick={closeModal} // Click outside the modal to close
        >
          <div
            className="relative bg-white rounded-lg p-6 max-w-lg w-full shadow-lg dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside the modal
          >
            <button onClick={closeModal} className="flex items-center justify-center absolute top-6 right-2 text-white bg-blue-600 rounded-full w-9 h-9 p-0">
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>

            <h2 className="text-3xl font-bold mb-4">{props.bookClubName}</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">{props.description}</p>

            {/* Organizer */}
            <InfoSection icon={<User />} title="Organizer" content={props.organizer} iconClass="text-green-600" />

            {/* Book */}
            <InfoSection icon={<Book />} title="Book" content={props.bookName} iconClass="text-blue-600" />

            {/* Attendees */}
            <InfoSection icon={<Users />} title="Attendees" content={`${props.noOfAttendees} members`} iconClass="text-purple-600" />

            {/* Cadence */}
            <InfoSection icon={<Calendar />} title="Cadence" content={props.cadence && props.cadence.charAt(0).toUpperCase() + props.cadence.slice(1)} iconClass="text-red-600" />

            {/* Status */}
            <div className="flex items-center space-x-3">
              <Info className="w-5 h-5 text-orange-600" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Status</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${props.status === 'inactive' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {props.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md"
          onClick={closeModal} // Click outside the modal to close
        >
          <div
            className="relative bg-white rounded-lg p-6 max-w-sm w-full shadow-lg dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside the modal
          >
            <h2 className="text-2xl font-bold mb-4">Edit Information</h2>
            <button onClick={closeModal} className="flex items-center justify-center absolute top-6 right-2 text-white bg-blue-600 rounded-full w-9 h-9 p-0">
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
            <form onSubmit={handleEditSubmit}>
              <Input 
                label="Auth Code" 
                id="123" 
                name="code"
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter code" 
                required
              />
              <button
                type="submit"
                className="w-full mt-4 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
