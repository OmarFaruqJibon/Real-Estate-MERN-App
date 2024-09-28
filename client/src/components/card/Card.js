import React from 'react';
import './card.scss';
import { Link } from 'react-router-dom';

const Card = ({ item }) => {
    return (
        <div className="single-card">
            <div className="img-container">
                <Link to={`/${item.id}`}>
                    <img src={item.img} alt="" />
                </Link>
            </div>

            <div className="text-container">

                <Link to={`${item.id}`}><h3 className='item-title'>{item.title}</h3></Link>

                <p className="item-location">
                    <img src="https://i.postimg.cc/52HLZYyw/location.png" alt="location" />
                    <span>{item.address}</span>
                </p>

                <h3 className="item-price">$ {item.price}</h3>


                <div className="bottom-info">

                    <div className="rooms">

                        <p>
                            <img src="https://i.postimg.cc/T14h90rB/bed-1.png" alt="bedroom" />
                            <span>{item.bedroom} Bedroom</span>
                        </p>

                        <p>
                            <img src="https://i.postimg.cc/ZRYRz2H1/bathroom-1.png" alt="bathroom" />
                            <span>{item.bathroom} Bathroom</span>
                        </p>
                    </div>


                    <div className="card-action">
                        <span><img src="https://i.postimg.cc/tRh3zDz0/bookmark-1.png" alt="save" /></span>
                        <span><img src="https://i.postimg.cc/X74w1F2r/chat-1.png" alt="chat" /></span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Card;