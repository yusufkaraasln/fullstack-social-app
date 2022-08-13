import React from 'react'

import "../../pages/messenger/messenger.css"


function OnlineChat() {
  return (
    <div class="online-contacts">
        <ul>
         
          <li class="active">
            <a href="#">
              <img
                src="https://pbs.twimg.com/profile_images/1396768627593031686/tNBLcRUG_400x400.jpg"
                alt=""
              />
              <div class="contact">
                <div class="name">Yusuf Karaaslan</div>
              </div>
              <div class="notification"></div>
            </a>
          </li>
         
        </ul>
      </div>
  )
}

export default OnlineChat