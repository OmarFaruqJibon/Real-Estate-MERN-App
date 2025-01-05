import React from 'react';
import './slider.scss';
import { useState } from "react";


function Slider({ images }) {

    if (!images || images.length === 0) {
        console.log("No images available");
    }
    // return <div>{images[0].title}</div>; // Access safely



    const [imageIndex, setImageIndex] = useState(null);
    // console.log(images);

    const changeSlide = (direction) => {
        if (direction === "left") {
            if (imageIndex === 0) {
                setImageIndex(images?.length - 1);
            } else {
                setImageIndex(imageIndex - 1);
            }
        } else {
            if (imageIndex === images?.length - 1) {
                setImageIndex(0);
            } else {
                setImageIndex(imageIndex + 1);
            }
        }
    };

    return (
        <div className="slider">
            {imageIndex !== null && (
                <div className="fullSlider">
                    <div className="arrow" onClick={() => changeSlide("left")}>
                        <img src="/arrow.png" alt="" />
                    </div>
                    <div className="imgContainer">
                        <img src={images[imageIndex]} alt="" />
                    </div>
                    <div className="arrow" onClick={() => changeSlide("right")}>
                        <img src="/arrow.png" className="right" alt="" />
                    </div>
                    <div className="close" onClick={() => setImageIndex(null)}>
                        X
                    </div>
                </div>
            )}
            <div className="bigImage">
                <img src={images[0]} alt="" onClick={() => setImageIndex(0)} />
            </div>

            <div className="smallImages">
                {images.slice(1).map((image, index) => (
                    <img
                        src={image}
                        alt=""
                        key={index}
                        onClick={() => setImageIndex(index + 1)}
                    />
                ))}
            </div>
        </div>
    );
}


export default Slider;