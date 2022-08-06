

import Sidebar from "../../components/sidebar/Sidebar"

import "./profile.scss"
import Feed from "../../components/feed/Feed"

import data from "../../friendData.json"
import Topbar from "../../components/topbar/Topbar"
import React, { useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const PF = process.env.REACT_APP_PUBLIC_FOLDER



function Profile() {

    const [user, setUser] = React.useState({})

    const username = useParams().username


    useEffect(() => {

        const getUser = async () => {

            const res = await axios.get(`/users?username=${username}`)
            setUser(res.data)

        }
        getUser()


    }, [username])


    return (
        <>
            <Topbar></Topbar>
            <div className="profile">

                <Sidebar />

                <div className="profile-container">

                    <div className="profile-container-top">
                        <div className="profile-container-top-wallpaper">
                            <img src={user.wallpaper || "https://source.unsplash.com/random/1415x400"} alt="" />


                            <div className="profile-container-top-wallpaper-info">

                                <img src={ user.profilePic ? PF+user.profilePic : PF+"person/noAvatar.png"} alt="" />
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
                            <div className="profile-container-bottom-details-info">

                                <span>User Information</span>
                                <ul>
                                    <li><strong>City:</strong> {user.city}</li>
                                    <li><strong>From:</strong> {user.from}</li>
                                    <li><strong>Relationship:</strong>
                                    
                                    {
                                        user.relationShip === 1 ? "Single"
                                        : user.relationShip === 2 ? "Married" : ""
                                    }
                                    
                                    </li>
                                </ul>


                            </div>
                            <div className="profile-container-bottom-details-friends">
                                {
                                    data.map((item, i) => (

                                        <div className="profile-container-bottom-details-friends-wrap" key={i}>
                                            <img src={item.image} alt="" />

                                            <span>{item.name}</span>
                                        </div>

                                    ))
                                }


                            </div>


                        </div>


                    </div>




                </div>

            </div>

        </>
    )


}


export default Profile