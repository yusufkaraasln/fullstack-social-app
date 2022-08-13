import React from "react";
import { useEffect } from "react";
import "./post.scss";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Post({ post }) {
  const [like, setLike] = React.useState(parseInt(post.likes.length));
  const [isLiked, setIsLiked] = React.useState(false);
  const [user, setUser] = React.useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    getUser();
  }, [post.userId]);

  const handleLike = async () => {
    try {
      await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (e) {}

    setIsLiked(!isLiked);

    return setLike(isLiked ? like - 1 : like + 1);
  };

  return (
    <div className="post">
      <div className="post-top">
        <div className="post-top-right">
          <Link to={`/profile/${user.username}`}>
            <img
              src={user.profilePic ? PF + user.profilePic : PF + "noPerson.png"}
              alt=""
            />
          </Link>
          <span>{user.username}</span>

          <p>{format(post.createdAt)}</p>
        </div>
        <div className="post-top-left">
          <i class="fa-solid fa-ellipsis-h"></i>
        </div>
      </div>
      <div className="post-center">
        <p>{post?.desc}</p>
        {post?.img ? (
          <img
            style={{ cursor: "pointer" }}
            onDoubleClick={handleLike}
            src={PF + post.img}
            alt=""
          />
        ) : null}
      </div>
      <div className="post-bottom">
        <div className="post-bottom-left">
          <i
            onClick={handleLike}
            style={isLiked ? { color: "rgb(255, 91, 91)" } : { color: "gray" }}
            class="fa-solid fa-heart"
          ></i>
          <span>{like}</span>
        </div>
        <div className="post-bottom-right">
          <i class="fa-solid fa-comment"></i>
          <span>{post.comment}</span>
        </div>
      </div>
    </div>
  );
}

export default Post;


