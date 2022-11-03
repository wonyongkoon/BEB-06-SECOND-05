import React from 'react';
// import Topbar from "../../components/topbar/Topbar.jsx";
import Sidebar from "../components/sidebar/Sidebar";
import Feed from "../components/Feed.js";
import Rightbar from "../components/rightbar/Rightbar";
import "../utils/home.css"

export default function MainPage() {
  const loadpage = "MainPage"
  return (
   <div>
        <div className="homeContainer">
          <Sidebar />
          <Feed loadpage={loadpage}/>
          <Rightbar />
        </div>
    </div>
  )};

  