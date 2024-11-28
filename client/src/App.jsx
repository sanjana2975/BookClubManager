import React from 'react';
import {Route,Routes} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/cards/Home";
import CreateBookClub from './components/cards/CreateBookClub';
import Organizer from './components/organizer/organizer';
import ManageBookClub from './components/cards/Manage';
import CourseContent from './components/organizer/CourseContent';
import ManageViewContent from './components/cards/ManageViewContent';

function App() {
  return (
    <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/organizer" element={<Organizer/>}></Route>
          <Route path="/manage" element={<ManageBookClub />}></Route>
          <Route path="/organizer/:courseId/manage" element={<CourseContent />}></Route>
          <Route path="/manage/:courseId" element={<ManageViewContent/>}></Route>     
      </Routes>
  );
}

export default App;