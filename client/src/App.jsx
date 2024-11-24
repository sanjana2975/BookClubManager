import React from 'react';
import {Route,Routes} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/home/Home";
import CreateBookClub from './components/cards/CreateBookClub';
import Organizer from './components/organizer/organizer';
import ManageBookClub from './components/cards/ManageBookClub';
import CourseContent from './components/organizer/CourseContent';

function App() {
  return (
    <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/organizer" element={<Organizer/>}></Route>
          <Route path="/manage" element={<ManageBookClub />}></Route>
      {/* <Route path ="/edit/:id" element={<CourseContent/>}></Route> */}
          <Route path="/organizer/:courseId/manage" element={<CourseContent />}></Route>
      </Routes>
  );
}

export default App;