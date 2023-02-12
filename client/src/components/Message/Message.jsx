import React from "react";
import {format} from "timeago.js"
function Message({ me ,message}) {
  return (
    <div class={me ? "message me" : "message"}>
      <div class="bubble">
        {message?.text}
        
      </div>
      <div class="time">{ 
        format(message?.createdAt)
      }</div>
    </div>
  );
}

export default Message;
