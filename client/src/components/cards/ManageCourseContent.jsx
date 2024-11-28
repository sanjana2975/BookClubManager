import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import useBookClubStore from "../../data/BookClubStore";

function ManageCourseContent(props) {
  const deleteClubFromStore = useBookClubStore((state) => state.deleteClub);

 const handleDelete = async () => {
  try {
    const response = await axios.delete('/api/bookclubs/delete/' + props.Id);
    console.log('Delete response:', response.data);
    deleteClubFromStore(props.Id);  
  } catch (error) {
    console.error('Error deleting book club:', error.response?.data?.message || error.message);
  }
};

  return (
    <div className="w-[42rem] h-27 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="h-full flex flex-col gap-2 p-4">
        {/* Content Container */}
        <div className="flex flex-col flex-grow">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
            {props.Name}
          </h5>

          <p className="mb-4 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
            {props.Description}
          </p>

          {!props.hideButton && (
            <div className="mt-auto flex justify-between">
              <Link 
                to={`/manage/${props.Id}`} 
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                View Course
                {/* <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="lucide lucide-pencil"
                >
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                  <path d="m15 5 4 4"></path>
                </svg> */}
              </Link>
              {/* <button onClick={handleDelete} className="inline-flex items-center gap-2 p-2 text-sm font-medium text-center text-red-500 bg-transparent hover:text-red-600 focus:outline-none">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="lucide lucide-trash">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>  */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageCourseContent;
