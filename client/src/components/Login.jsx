import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from "./cards/Input"; 
import {currentUserStore}  from "../data/currentUserStore.js";

const Login = () => {
  const navigate = useNavigate();
  const { userName, setUserName } = currentUserStore();
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    navigate('/home');
  };

  return (
    <>
      <nav className="bg-blue-900">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
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
            <Link to="/login" className="flex items-center pr-2">
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="flex rounded-full bg-blue-900 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
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
              </div>
            </Link>
          </div>
        </div>
      </nav>
      <div className="flex pb-20 min-h-screen flex-col justify-center items-center bg-gray-100 px-6 lg:px-8 overflow-hidden">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="flex gap-2 items-center mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
            <img
              className="h-12 w-auto"
              src="https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png"
              alt="Mathworks"
            />
            Welcome to Book Club Manager
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
               <Input 
                label="User Name" 
                id="userName" 
                name="userName" 
                type="text" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                placeholder="Enter your User Name" 
                required 
              />
              <Input 
                label="Password" 
                id="password" 
                name="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password" 
                required 
              />
              <button
                type="submit"
                className="flex mt-4 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
