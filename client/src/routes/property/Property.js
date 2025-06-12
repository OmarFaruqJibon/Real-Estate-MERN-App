import React, { useContext, useState } from 'react';
import './property.scss';
import Slider from '../../components/slider/Slider';
import Map from './../../components/map/Map';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import apiCall from '../../lib/apiCall';
import { AuthContext } from '../../context/AuthContex';
import { ChevronRight, Mail, Phone, Send, SendHorizontal } from 'lucide-react';

const Property = ({ id }) => {
    const phoneNumber = "+880 1887715152";
    const post = useLoaderData()

    const [saved, setSaved] = useState(post?.isSaved);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSave = async () => {
        if (!currentUser) {
            navigate("/login");
        }
        setSaved((prev) => !prev);
        try {
            await apiCall.post("/users/save", { postId: post?.id, });
        } catch (err) {
            console.log("error found in saving post!");
            console.log(err);
            setSaved((prev) => !prev);
        }
    };

    // const handleSendMessage = async (e) => {
    //     if (!currentUser) {
    //         navigate("/login");
    //     }
    //     try {
    //         await apiCall.post("/chats", { receiverId: e, });
    //         // Redirect to the profile page
    //         navigate(`/profile`);

    //         // Force a refresh of the profile page to fetch the latest data
    //         window.location.reload();

    //     } catch (err) {
    //         console.log("error found in sending message btn");
    //         console.log(err);
    //     }
    // };

    const handleSendMessage = async (userId) => {
        if (!currentUser) {
            navigate("/login");
            return;
        }

        try {
            // Send a request to create or get the chat
            const response = await apiCall.post("/chats", { receiverId: userId });

            // Redirect to the profile page with the chatId in the state
            navigate("/profile", { state: { chatId: response.data.id } });

        } catch (err) {
            console.log("Error found in sending message btn", err);
        }
    };

    return (
        <div className="singlePage">


            <div className="details">

                <div className="wrapper">

                    <Slider images={post?.images} />

                    <div className="info">

                        {/* TITLE, LOCATION AND PRICE */}
                        <div className="top">

                            <div className="post">

                                {/* TITLE & ADRESS */}
                                <h2>{post?.title}</h2>
                                <div className="address">
                                    <img src="https://i.postimg.cc/mg8RNbwp/location.png" alt="location" />
                                    <span>{post?.address}</span>
                                </div>
                            </div>

                            {/* PRICE */}
                            <div className="price">
                                <span>BDT {post?.price}</span>
                            </div>
                        </div>

                        <div className="property-sizes">
                            <div className="wrapper">

                                <p className="title">Sizes</p>
                                <div className="sizes">
                                    <div className="size">
                                        <img src="https://i.postimg.cc/zD6r0tT5/room.png" alt="" />
                                        <span>{post?.postDetail.size} sqft</span>
                                    </div>
                                    <div className="size">
                                        <img src="https://i.postimg.cc/T14h90rB/bed-1.png" alt="" />
                                        <span>{post?.bedroom} beds</span>
                                    </div>
                                    <div className="size">
                                        <img src="https://i.postimg.cc/ZRYRz2H1/bathroom-1.png" alt="" />
                                        <span>{post?.bathroom} baths</span>
                                    </div>
                                </div>

                                <p className="title">Nearby Places</p>
                                <div className="listHorizontal">
                                    <div className="feature">
                                        <img src="https://i.postimg.cc/T3XXXKk4/school.png" alt="" />
                                        <div className="featureText">
                                            <span>School</span>
                                            <p>{post?.postDetail.school}m away</p>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <img src="https://i.postimg.cc/K8rhcmwv/bus-stop.png" alt="" />
                                        <div className="featureText">
                                            <span>Bus Stop</span>
                                            <p>{post?.postDetail.bus}m away</p>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <img src="https://i.postimg.cc/tC6Hf3z6/restuarant.png" alt="" />
                                        <div className="featureText">
                                            <span>Hospital</span>
                                            <p>{post?.postDetail.hospital}m away</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* property description */}
                        {/* <div className="property-description"
                            dangerouslySetInnerHTML={
                                {
                                    __html: DOMPurify.sanitize(post?.postDetail.description),
                                }}>
                        </div> */}



                        <div className="property-summary">
                            <h3 className="summary-title">Property Summary</h3>
                            <div className="summary-wrapper">

                                <div className="left">
                                    <p>
                                        <ChevronRight strokeWidth={2} />
                                        Property Type :
                                    </p>
                                    <p>
                                        <ChevronRight strokeWidth={2} />
                                        Property For :
                                    </p>
                                    <p>
                                        <ChevronRight strokeWidth={2} />
                                        Property Size :
                                    </p>
                                    <p>
                                        <ChevronRight strokeWidth={2} />
                                        Bedroom :
                                    </p>

                                    <p>
                                        <ChevronRight strokeWidth={2} />
                                        Bathroom :
                                    </p>
                                    <p>
                                        <ChevronRight strokeWidth={2} />
                                        Total Floor :
                                    </p>
                                    <p>
                                        <ChevronRight strokeWidth={2} />
                                        Facing :
                                    </p>
                                </div>
                                <div className="right">
                                    <p>
                                        <ChevronRight strokeWidth={2} />
                                        Location :
                                    </p>

                                    <p>
                                        <ChevronRight strokeWidth={2} />
                                        Floor Avaiable On :
                                    </p>

                                    <p>
                                        <ChevronRight strokeWidth={2} />
                                        Construction Status :
                                    </p>
                                    <p>
                                        <ChevronRight strokeWidth={2} />
                                        Balconies :
                                    </p>
                                    <p>
                                        <ChevronRight strokeWidth={2} />
                                        Garages :
                                    </p>
                                    <p>
                                        <ChevronRight strokeWidth={2} />
                                        Furnishing :
                                    </p>
                                    <p>
                                        <ChevronRight strokeWidth={2} />
                                        Land Area :
                                    </p>

                                </div>
                            </div>
                        </div>


                        {/* Property Features */}

                        <div className="property-features">
                            <h3 className="property-features-title">Property Features</h3>
                            <div className="property-features-wrapper">

                            </div>

                        </div>

                        {/* Floor plan */}

                        <div className="floor-plan">
                            <h3 className="floor-plan-title">Floor Plan</h3>
                            <div className="floor-plan-wrapper">

                            </div>

                        </div>





                    </div>
                </div>
            </div>






            {/* CONTAINS MAP, SELLER INFORMATION */}
            <div className="others-info">
                <div className="wrapper">




                    <div className="seller-details">
                        <h3 className="title">Property Owner Details</h3>

                        <div className="contact-info">
                            <img src={currentUser.avatar || "https://i.postimg.cc/J7dgwngh/profile-picture.png"} alt="profile-image" />

                            <span>
                                {currentUser.username.toUpperCase()}
                            </span>
                            <span style={{ color: "#09aa57", fontSize: "14px" }}>
                                Property ID:
                            </span>
                            <span className="phone">
                                <Phone width={20} color='#09aa57' />
                                +880 1887715152
                            </span>
                        </div>

                        <div className="action-btn">
                            <div className="call">
                                <a href={`tel:${phoneNumber}`}>
                                    <button>
                                        Call Now
                                    </button>
                                </a>
                            </div>
                            <div className="chat">
                                <Link to={"/profile"}>
                                    <button
                                        onClick={() => handleSendMessage(post.userId)}
                                    >
                                        {/* <img src="https://i.postimg.cc/X74w1F2r/chat-1.png" alt="" /> */}
                                        {/* <SendHorizontal size={15} color='white' /> */}
                                        Chat Online
                                    </button>
                                </Link>
                            </div>
                        </div>

                    </div>






                    <div className="mapContainer">
                        <p className="title">MAP VIEW</p>
                        <Map items={[post]} />
                    </div>




                    {/* SAVE POST BUTTON */}
                    {/* <div className="buttons">
                        
                        <button
                            onClick={handleSave}
                            style={{
                                backgroundColor: saved ? "#fece51" : "white",
                            }}
                        >
                            <img src="https://i.postimg.cc/tRh3zDz0/bookmark-1.png" alt="" />
                            {saved ? "Place Saved" : "Save the Place"}
                        </button>

                    </div> */}

                </div>
            </div>






        </div>
    );
};

export default Property;