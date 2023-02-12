import React, { useEffect } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.scss";
import { useState } from "react";
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react";


function Feed({ username }) {

  const [posts, setPosts] = useState([])

  const { user } = useContext(AuthContext)




  useEffect(() => {

    const getPosts = async () => {

      const res =
        username
          ? await axios.get("/posts/profile/" + username)
          : await axios.get("/posts/timeline/" + user._id)
      setPosts(res.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }))

    }
    getPosts()




  }, [username, user._id])

  return (
    <div className="feed">
      <div className="feed-wrapper">
        {(!username || username === user.username) && <Share />}
        {
          posts.map(post => (
            <Post key={post._id} post={post} />
          ))
        }




      </div>
    </div>
  );
}

export default Feed;
