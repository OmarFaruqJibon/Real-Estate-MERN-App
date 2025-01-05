import React, { useContext, useState } from 'react';
import './property.scss';
import Slider from '../../components/slider/Slider';
import Map from './../../components/map/Map';
import { useLoaderData, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import apiCall from '../../lib/apiCall';
import { AuthContext } from '../../context/AuthContex';
const Property = ({ id }) => {

    const post = useLoaderData()
    console.log(post);


    const [saved, setSaved] = useState(post?.isSaved);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    // console.log(currentUser.id);



    const handleSave = async () => {
        if (!currentUser) {
            navigate("/login");
        }
        setSaved((prev) => !prev);
        try {
            await apiCall.post("/users/save", { postId: post?.id, });
        } catch (err) {
            console.log("error found in property js");
            console.log(err);
            setSaved((prev) => !prev);
        }
    };




    return (
        <div className="singlePage">
            <div className="details">
                <div className="wrapper">

                    <Slider images={post?.images} />

                    <div className="info">
                        <div className="top">
                            <div className="post">

                                <h2>{post?.title}</h2>
                                <div className="address">
                                    <img src="https://i.postimg.cc/52HLZYyw/location.png" alt="" />
                                    <span>{post?.address}</span>
                                </div>
                                <div className="price">$ {post?.price}</div>
                            </div>

                            {/* Post creator information */}
                            <div className="user">
                                <img src={post?.user.avatar} alt="" />
                                <span>{post?.user.username}</span>
                            </div>

                        </div>

                        <div className="bottom"
                            dangerouslySetInnerHTML={
                                {
                                    __html: DOMPurify.sanitize(post?.postDetail.description),
                                }}>
                        </div>

                    </div>
                </div>
            </div>
            <div className="features">
                <div className="wrapper">
                    <p className="title">General</p>

                    <div className="listVertical">

                        <div className="feature">
                            <img src="https://i.postimg.cc/rFGfKjCM/utilities-1.png" alt="" />
                            <div className="featureText">
                                <span>Utilities</span>
                                {post?.postDetail.utilities === "owner" ? (
                                    <p>Owner is responsible</p>
                                ) : (
                                    <p>Tenant is responsible</p>
                                )}
                            </div>
                        </div>

                        <div className="feature">
                            <img src="https://i.postimg.cc/qgVW0FG3/hand.png" alt="" />
                            <div className="featureText">
                                <span>Pet Policy</span>
                                {post?.postDetail.policy === "allowed" ? (
                                    <p>Pets Allowed</p>
                                ) : (
                                    <p>Pets not Allowed</p>
                                )}
                            </div>
                        </div>

                        <div className="feature">
                            <img src="https://i.postimg.cc/qgVW0FG3/hand.png" alt="" />
                            <div className="featureText">
                                <span>Property Fees</span>
                                <p>{post?.postDetail.fees}</p>
                            </div>
                        </div>
                    </div>


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
                            <span>{post?.bathroom} bathroom</span>
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
                    <p className="title">Location</p>
                    <div className="mapContainer">
                        <Map items={[post]} />
                    </div>
                    <div className="buttons">
                        <button>
                            <img src="https://i.postimg.cc/X74w1F2r/chat-1.png" alt="" />

                            Send a Message
                        </button>


                        {/* <button>
                            <img src="https://i.postimg.cc/tRh3zDz0/bookmark-1.png" alt="" />
                            Save the Place
                        </button> */}


                        <button
                            onClick={handleSave}
                            style={{
                                backgroundColor: saved ? "#fece51" : "white",
                            }}
                        >
                            <img src="https://i.postimg.cc/tRh3zDz0/bookmark-1.png" alt="" />
                            {saved ? "Place Saved" : "Save the Place"}
                        </button>




                    </div>
                </div>
            </div>
        </div>
    );
};

export default Property;