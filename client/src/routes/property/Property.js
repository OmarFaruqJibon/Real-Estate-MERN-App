import React from 'react';
import './property.scss';
import { singlePostData, userData } from './../../lib/dummy';
import Slider from '../../components/slider/Slider';
import Map from './../../components/map/Map';

const Property = ({ id }) => {

    return (
        <div className="singlePage">
            <div className="details">
                <div className="wrapper">
                    <Slider images={singlePostData.images} />
                    <div className="info">
                        <div className="top">
                            <div className="post">
                                <h2>{singlePostData.title}</h2>
                                <div className="address">
                                    <img src="https://i.postimg.cc/52HLZYyw/location.png" alt="" />
                                    <span>{singlePostData.address}</span>
                                </div>
                                <div className="price">$ {singlePostData.price}</div>
                            </div>
                            <div className="user">
                                <img src={userData.img} alt="" />
                                <span>{userData.name}</span>
                            </div>
                        </div>
                        <div className="bottom">{singlePostData.description}</div>
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
                                <p>Renter is responsible</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="https://i.postimg.cc/qgVW0FG3/hand.png" alt="" />
                            <div className="featureText">
                                <span>Pet Policy</span>
                                <p>Pets Allowed</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="https://i.postimg.cc/qgVW0FG3/hand.png" alt="" />
                            <div className="featureText">
                                <span>Property Fees</span>
                                <p>Must have 3x the rent in total household income</p>
                            </div>
                        </div>
                    </div>
                    <p className="title">Sizes</p>
                    <div className="sizes">
                        <div className="size">
                            <img src="https://i.postimg.cc/zD6r0tT5/room.png" alt="" />
                            <span>80 sqft</span>
                        </div>
                        <div className="size">
                            <img src="https://i.postimg.cc/T14h90rB/bed-1.png" alt="" />
                            <span>2 beds</span>
                        </div>
                        <div className="size">
                            <img src="https://i.postimg.cc/ZRYRz2H1/bathroom-1.png" alt="" />
                            <span>1 bathroom</span>
                        </div>
                    </div>
                    <p className="title">Nearby Places</p>
                    <div className="listHorizontal">
                        <div className="feature">
                            <img src="https://i.postimg.cc/T3XXXKk4/school.png" alt="" />
                            <div className="featureText">
                                <span>School</span>
                                <p>250m away</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="https://i.postimg.cc/K8rhcmwv/bus-stop.png" alt="" />
                            <div className="featureText">
                                <span>Bus Stop</span>
                                <p>100m away</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="https://i.postimg.cc/tC6Hf3z6/restuarant.png" alt="" />
                            <div className="featureText">
                                <span>Restaurant</span>
                                <p>200m away</p>
                            </div>
                        </div>
                    </div>
                    <p className="title">Location</p>
                    <div className="mapContainer">
                        <Map items={[singlePostData]} />
                    </div>
                    <div className="buttons">
                        <button>
                            <img src="https://i.postimg.cc/X74w1F2r/chat-1.png" alt="" />

                            Send a Message
                        </button>
                        <button>
                            <img src="https://i.postimg.cc/tRh3zDz0/bookmark-1.png" alt="" />
                            Save the Place
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Property;