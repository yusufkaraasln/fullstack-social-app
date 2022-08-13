import React, { useRef } from "react";

import "./messenger.css";
import Conversation from "../../components/conversation/Conversation";
import Topbar from "../../components/topbar/Topbar";
import Message from "../../components/Message/Message";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useEffect } from "react";
import { io } from "socket.io-client";

function Messenger() {
  const { user } = React.useContext(AuthContext);
  const [conversation, setConversation] = React.useState([]);
  const [currentChat, setCurrentChat] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [arrivalMessages, setArrivalMessages] = React.useState(null);

  const scrollRef = useRef();

  const [newMessage, setNewMessage] = React.useState("");

  const socket = useRef();
   

    useEffect(() => {
      socket.current = io("http://localhost:8900");
      socket.current.on("getMessage",data=>{
        setArrivalMessages({
          sender: data.senderId,
          text:data.text,
          createdAt: Date.now()
        })
      })
    },[])

    useEffect(() => {

       arrivalMessages &&
       currentChat?.members.includes(arrivalMessages.sender) &&
       setMessages(prev=>[...prev,arrivalMessages])
    

    }, [arrivalMessages,currentChat])


  useEffect(() => {
    socket.current.emit("sendUser",user._id)
    socket.current.on("getUsers",users=>{
      console.log(users)
    })

  },[user])


  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(`conversations/${user._id}`);
        setConversation(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getConversation();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`messages/${currentChat?._id}`);
        setMessages(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMessageData = {
      conversationId: currentChat._id,
      text: newMessage,
      sender: user._id,
    };

    const receiverId = currentChat.members.find(member=>member !== user._id);

    socket.current.emit("sendMessage",{
      senderId: user._id,
      receiverId,
      text: newMessage,
    })


    try {
      const res = await axios.post("/messages", newMessageData);
      setMessages([...messages, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

    
    



  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Topbar></Topbar>
      <div className="chat">
        {conversation.map((c) => (
          <div className="chat" onClick={() => setCurrentChat(c)}>
            <Conversation conversation={c} currentUser={user} />
          </div>
        ))}
        <div class="content">
          {/* <div class="message-header">
        <div class="user-info">
          <img
            src="https://pbs.twimg.com/profile_images/1396768627593031686/tNBLcRUG_400x400.jpg"
            alt=""
          />
          <div class="user">
            <div class="name">Yusuf Karaaslan</div>
            <div class="time">10 dk önce</div>
          </div>
        </div>

        <div class="actions">
          <ul>
            <li>
              <a href="#">
                <i class="fa fa-info-circle"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-ellipsis-v"> </i>
              </a>
            </li>
          </ul>
        </div>
      </div> */}

          <div>
            {currentChat ? (
              <>
                {messages.map((m) => (
                  <div class="message-content" ref={scrollRef}>
                    <Message message={m} me={m.sender === user._id} />
                  </div>
                ))}
              </>
            ) : (
              <p style={{ margin: "auto", fontSize: "3rem", color: "#b0b3b8" }}>
                Open a conversation and start a chat.
              </p>
            )}
          </div>

          <div class="message-form">
            <ul>
              <li>
                <a href=" ">
                  <i class="fa fa-laugh"></i>
                </a>
              </li>

              <li class="input">
                <form onSubmit={handleSubmit}>
                  <input
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Write something..."
                  />
                </form>
              </li>
              <li>
                <button onClick={handleSubmit}>Send</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
