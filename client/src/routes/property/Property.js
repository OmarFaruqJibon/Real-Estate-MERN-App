import React from 'react';
import './property.scss';
import { singlePostData, userData } from './../../lib/dummy';
import Slider from '../../components/slider/Slider';

const Property = ({ id }) => {
    const data = singlePostData;
    const user = userData;
    return (
        <div className='property'>
            <div className="left-side">
                <div className="left-side-wrapper">
                    <div className="img-container">
                        <Slider />
                    </div>
                    <div className="info-container">
                        <div className="top">
                            <div className="property-info">
                                <h2 className="title">{data.title}</h2>
                                <p className="location">
                                    <img src="https://i.postimg.cc/52HLZYyw/location.png" alt="location" />
                                    <span>{data.address}</span>
                                </p>
                                <h4 className="price">$ {data.price}</h4>
                            </div>
                            <div className="user-info">
                                <img src={user.img} alt="user-image" />
                                <p>{user.name}</p>
                            </div>
                        </div>
                        <div className="bottom">
                            <p className="property-details">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. A nisi reprehenderit veniam assumenda ea, iste, illo magni error incidunt, illum est maiores ratione. Sed dolores eveniet sit, ullam minus nobis deserunt qui architecto est repellendus. Consequatur vel harum, excepturi maxime, eum incidunt amet minima iste pariatur ut necessitatibus atque architecto dignissimos earum est.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-side">
                <div className="right-side-wrapper"></div>
            </div>

        </div>
    );
};

export default Property;