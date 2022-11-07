import React from "react";
import "./sidebar.css";
import image from "../rightbar/iu2.jpeg"


const Sidebar = () => {

  return (
    <div className="sidebar">
    <div className="sidebarWrapper ">
      <div >
        <div >
          <img
            alt="logo"
            style={{
              height: 150,
              width: 150,
              border: "4px solid #fff",
              borderRadius: "50%"
            }}
            src={image}
          />
        </div>
        <div>
          <h4 className="sideTitle">yoo</h4>
        </div>
          <div className="sideText">testyoo</div>
          <div className="sideText">yooyoosoo8989@gmail.com</div>
        </div>
      </div>
      </div>
  )
    {/* // return (
    //     <div className="sidebar">

    //         <div className="sidebarWrapper">

    //                 <ul className="sidebarList">
    //                       <li className="sidebarListItem">
    //                         <Group className="sidebarIcon"/>
    //                         <span className="sidebarListItemText">Friends</span>
    //                       </li>

    //                       <li className="sidebarListItem">
    //                         <RssFeed className="sidebarIcon"/>
    //                         <span className="sidebarListItemText">Feed</span>
    //                       </li>

    //                       <li className="sidebarListItem">
    //                         <Chat className="sidebarIcon"/>
    //                         <span className="sidebarListItemText">Messages</span>
    //                       </li>

    //                       <li className="sidebarListItem">
    //                         <PlayCircleFilledOutlined className="sidebarIcon"/>
    //                         <span className="sidebarListItemText">Videos</span>
    //                       </li>

    //                       <li className="sidebarListItem">
    //                         <Bookmark className="sidebarIcon"/>
    //                         <span className="sidebarListItemText">Bookmarks</span>
    //                       </li>

    //                       <li className="sidebarListItem">
    //                         <WorkOutline className="sidebarIcon"/>
    //                         <span className="sidebarListItemText">Jobs</span>
    //                       </li>

    //                       <li className="sidebarListItem">
    //                         <School className="sidebarIcon"/>
    //                         <span className="sidebarListItemText">Courses</span>
    //                       </li>

    //                       <li className="sidebarListItem">
    //                         <Event className="sidebarIcon"/>
    //                         <span className="sidebarListItemText">Now</span>
    //                       </li>
    //                 </ul>
    //         </div>

    //     </div>
    // ) */}
}

export default Sidebar
