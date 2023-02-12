import Sidebar from "../../components/sidebar/Sidebar";

import "./profile.scss";
import Feed from "../../components/feed/Feed";

import Topbar from "../../components/topbar/Topbar";
import React, { useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

function Profile() {
  const { user: currentUser, dispatch } = React.useContext(AuthContext);
  const [user, setUser] = React.useState({});
  const [friends, setFriends] = React.useState([]);
  const [followed, setFollowed] = React.useState(
    currentUser.followings.includes(user?.id)
  );

  const username = useParams().username;

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    getUser();
  }, [username]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const frinendList = await axios.get("/users/friends/" + user._id);

        setFriends(frinendList.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFriends();
  }, [user._id]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });

        dispatch({ type: "FOLLOW", payload: user._id });
      } else {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  };

  return (
    <>
      <Topbar></Topbar>
      <div className="profile">
        <Sidebar />

        <div className="profile-container">
          <div className="profile-container-top">
            <div className="profile-container-top-wallpaper">
              <img
                src={
                  user.wallpaper ||
                  "https://source.unsplash.com/random/1415x400"
                }
                alt=""
              />

              <div className="profile-container-top-wallpaper-info">
                <img
                  src={
                    user.profilePic ? PF + user.profilePic : PF + "noPerson.png"
                  }
                  alt=""
                />
                <span>{user.username}</span>
                <p>{user.desc}</p>
              </div>
            </div>
          </div>
          <div className="profile-container-bottom">
            <div className="profile-container-feed">
              <Feed username={username}></Feed>
            </div>
            <div className="profile-container-bottom-details">
              {username !== currentUser.username && (
                <div className="profile-container-bottom-details-info follow">
                  <button onClick={handleClick}>
                    {followed ? <span>Unfollow</span> : <span>Follow</span>}
                  </button>
                </div>
              )}
              <div className="profile-container-bottom-details-info">
                <span>User Information</span>
                <ul>
                  <li>
                    <strong>City:</strong> {user.city}
                  </li>
                  <li>
                    <strong>From:</strong> {user.from}
                  </li>
                  <li>
                    <strong>Relationship:</strong>

                    {user.relationShip === 1
                      ? "Single"
                      : user.relationShip === 2
                      ? "Married"
                      : ""}
                  </li>
                </ul>
              </div>
              {friends.length > 0 && (
                <div className="profile-container-bottom-details-friends">
                  {friends.map((item, i) => (
                    <Link to={"/profile/" + item.username}>
                      <div
                        className="profile-container-bottom-details-friends-wrap"
                        key={i}
                      >
                        <img
                          src={
                            item.profilePic
                              ? PF + item.profilePic
                              : PF + "noPerson.png"
                          }
                          alt=""
                        />

                        <span>{item.username}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
