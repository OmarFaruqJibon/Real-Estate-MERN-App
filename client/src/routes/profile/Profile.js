import React, { Suspense, useContext, useEffect, useState } from 'react';
import './profile.scss';
import Chat from '../../components/chat/Chat';
import apiCall from './../../lib/apiCall';
import { Link, useNavigate, useLoaderData, Await, useLocation } from 'react-router-dom';
import { AuthContext } from './../../context/AuthContex';
// import List from './../../components/list/List';

const Profile = () => {
    const data = useLoaderData();

    const location = useLocation();
    const { userId } = location.state || {}; // Extract userId from state
    // console.log(userId);
    const { currentUser, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [chatId, setChatId] = useState(null);
    // Extract chatId from the navigation state
    useEffect(() => {
        if (location.state?.chatId) {
            setChatId(location.state.chatId);
        }
    }, [location.state]);



    const handleLogout = async () => {
        try {
            await apiCall.post("/auth/logout");
            updateUser(null)

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
                        <Link to="/profile/update">
                            <button>Update Profile</button>
                        </Link>
                    </div>

                    <div className="info">
                        <img src={currentUser.avatar || "https://i.postimg.cc/J7dgwngh/profile-picture.png"} alt="profile-image" />

                        <span>
                            <b>Username:</b>  {currentUser.username.toUpperCase()}
                        </span>
                        <span>
                            <b>E-mail:</b>  {currentUser.email}
                        </span>
                        <button onClick={handleLogout} className='logout-btn'>Logout</button>
                    </div>

                    {/* My LIST SECTION */}
                    {/* <div className="title">
                        <h3>My List</h3>
                        <Link to={"/addPost"}><button>Create New Post</button></Link>
                    </div>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={data?.postResponse}
                            errorElement={<p>Error loading posts!</p>}
                        >
                            {(postResponse) =>
                                <List posts={postResponse.data.userPosts} />
                            }
                        </Await>
                    </Suspense> */}


                    {/* SAVED LIST SECTION */}
                    {/* <div className="title">
                        <h3>Saved List</h3>
                    </div>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={data?.postResponse}
                            errorElement={<p>Error loading posts!</p>}
                        >
                            {(postResponse) =>
                                <List posts={postResponse.data.savedPosts} />
                            }
                        </Await>
                    </Suspense> */}

                </div>
            </div>





            {/* CHAT SECTION */}
            <div className="chatContainer">
                <div className="wrapper">

                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={data?.chatResponse}
                            errorElement={<p>Error loading chats!</p>}
                        >
                            {(chatResponse) =>
                                <Chat chats={chatResponse.data} openChatId={chatId} />
                            }
                        </Await>
                    </Suspense>



                </div>
            </div>

        </div>
    );
};

export default Profile;