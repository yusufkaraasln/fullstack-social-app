import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./topbar.scss";
import { AuthContext } from "../../context/AuthContext"
function Topbar() {


  const { user } = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER


  return (
    <div className="container">
      <div className="container-left">
        <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
          <span>Social Network</span>
        </Link>

      </div>
      <div className="container-center">
        <input placeholder="Search for everythink" type="text" />
      </div>
      <div className="container-right">
        <div className="container-right_item">
          <span>Homepage</span>
          <span>Timeline</span>
        </div>
        <div className="container-right_item">
          <div className="icon">
            {/* <Person className="icon" />
            <Notifications className="icon" />
            <Message className="icon" /> */}
          </div>
        </div>

        <Link to={`/profile/${user.username}`}>
          <div className="container-right_item">

            {
              <img src={user.profilePic ? PF + user.profilePic : PF + "person/noAvatar.png"} alt="" />


            }


          </div>

        </Link>
      </div>
    </div>
  );
}

export default Topbar;
