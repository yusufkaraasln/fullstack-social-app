import React from 'react'
import { AuthContext } from '../../context/AuthContext'
import "./rightbar.scss"
function Rightbar() {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const {user} = React.useContext(AuthContext)


  return (
    <div className='rightbar'>


      <div className="rightbar-card">
        <div className="rightbar-card-top">
          <img src={user.profilePic ? PF+user.profilePic: PF+"noPerson.png"} alt="" />

          <span>{user.username}</span>

        </div>

        <div className="rightbar-card-bottom">
          <span>Türkiye</span>
          <span>Sakarya</span>
        </div>


      </div>




    </div>
  )
}

export default Rightbar