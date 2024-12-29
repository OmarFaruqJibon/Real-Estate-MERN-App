import React, { useContext } from 'react';
import './profile.scss';
import List from './../list/List';
import Chat from '../../components/chat/Chat';
import apiCall from './../../lib/apiCall';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../../context/AuthContex';

const Profile = () => {
    const navigate = useNavigate();

    const { currentUser, updateUser } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await apiCall.post("/auth/logout");
            updateUser(null)
            // console.log("logout");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="profilePage">
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <h3>User Information</h3>
                        <button>Update Profile</button>
                    </div>
                    <div className="info">
                        <img src={currentUser.avater || "https://i.postimg.cc/J7dgwngh/profile-picture.png"} alt="profile-image" />

                        <span>
                            <b>Username:</b>  {currentUser.username}
                        </span>
                        <span>
                            <b>E-mail:</b>  {currentUser.email}
                        </span>
                        <button onClick={handleLogout} className='logout-btn'>Logout</button>
                    </div>
                    <div className="title">
                        <h3>My List</h3>
                        <button>Create New Post</button>
                    </div>
                    <List />
                    <div className="title">
                        <h3>Saved List</h3>
                    </div>
                    <List />
                </div>
            </div>
            <div className="chatContainer">
                <div className="wrapper">
                    <Chat />
                </div>
            </div>
        </div>
    );
};

export default Profile;