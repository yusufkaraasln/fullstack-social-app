import axios from "axios";
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./share.scss";

function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  const { user } = useContext(AuthContext);

  const [file, setFile] = React.useState(null);

  const desc = React.useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;

      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.post("/posts", newPost);
      desc.current.value = "";

      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div className="share">
      <div className="share-wrapper">
        <div className="share-wrapper-top">
          <img
            src={user.profilePic ? PF + user.profilePic : PF + "noPerson.png"}
            alt=""
          />
          <input
            type="text"
            placeholder={`What's happend ${
              user?.username
            } ?`}
            ref={desc}
          />

         
        </div>

        {
            file && (
              <div   className="share-wrapper-img">
                <img src={URL.createObjectURL(file)} alt="" />
                <i onClick={()=>setFile(null)} class="fa-solid fa-circle-xmark"></i>
              </div>
            )

          }


        <div className="share-wrapper-bottom">
          <form onSubmit={handleSubmit} className="share-wrapper-bottom-items">
            <label htmlFor="file">
              <div className="share-wrapper-bottom-items-item">
                <i class="fa-solid fa-photo-film"></i>
                <span>Photo or Video</span>
                <input
                  style={{
                    display: "none",
                  }}
                  id="file"
                  type="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </label>

            <div className="share-wrapper-bottom-items-item">
              <i class="fa-solid fa-tag"></i>
              <span>Tag</span>
            </div>
            <div className="share-wrapper-bottom-items-item">
              <i class="fa-solid fa-location-pin"></i>
              <span>Location</span>
            </div>
            <div className="share-wrapper-bottom-items-item">
              <i class="fa-solid fa-face-smile-wink"></i>
              <span>Feelings</span>
            </div>
            <div className="share-wrapper-bottom-items-item">
              <button type="submit">Share</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Share;
