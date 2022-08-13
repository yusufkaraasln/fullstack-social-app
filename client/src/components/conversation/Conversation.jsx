import axios from "axios";
import { useEffect, useState } from "react";
import "../../pages/messenger/messenger.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);


  return (
    <div class="sidebar">
      <div class="search">
        <input type="text" placeholder="Ara..." />
        <i class="fa fa-search"></i>
      </div>

      <div class="contacts">
        <ul>
          <li>
            <a href="#">
              <img
                src={user?.profilePic ? user.profilePic : PF + "NoPerson.png"}
                alt=""
              />
              <div class="contact">
                <div class="name">{user?.username}</div>
                <div class="message">Merhaba, bu bir test mesajıdır.</div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

 
