import React from "react";
import "./sidebar.scss";
import data from "../../friendData.json";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-items">
        <ul>
          <li>
          <i class="fa-solid fa-rss"></i>
            Feed
          </li>
          <li>
          <i class="fa-solid fa-message"></i>
            Chats
          </li>
          <li>
          <i class="fa-solid fa-play"></i>
            Videos
          </li>
          <li>
          <i class="fa-solid fa-user-group"></i>
          Groups
          </li>
          <li>
          <i class="fa-solid fa-bookmark"></i>
          Bookmarks
          </li>
          <li>
          <i class="fa-solid fa-graduation-cap"></i>
            Courses

          </li>
          <li>
          <i class="fa-solid fa-calendar"></i>
          Events
          </li>
          <li>
          <i class="fa-solid fa-briefcase"></i>
            Jobs
          </li>
          <li>
            <button>Dark Mode</button>
          </li>
        </ul>
      </div>
      <div className="sidebar-friend-list">
        <div className="sidebar-friend-list-item">
        <ul>
          <Friend></Friend>
        </ul>
        </div>
      </div>
    </div>
  );
}


function Friend() {
  
return (
  data.map(friend=>(
    <li>
      <img src={friend.image}   />
      <span>{friend.name}</span>
    </li>
  ))
)

}

export default Sidebar;
