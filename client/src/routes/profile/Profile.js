import React from 'react';
import './profile.scss';
import List from './../list/List';
import Chat from '../../components/chat/Chat';

const Profile = () => {
    return (
        <div className="profilePage">
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <h3>User Information</h3>
                        <button>Update Profile</button>
                    </div>
                    <div className="info">
                        <img
                            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt=""
                        />
                        <span>
                            <b>Username:</b> John Doe
                        </span>
                        <span>
                            <b>E-mail:</b> john@gmail.com
                        </span>
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