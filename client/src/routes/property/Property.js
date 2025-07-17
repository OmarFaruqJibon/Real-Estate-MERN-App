import React, { useContext, useState } from "react";
import "./property.scss";
import Slider from "../../components/slider/Slider";
import Map from "./../../components/map/Map";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import apiCall from "../../lib/apiCall";
import { AuthContext } from "../../context/AuthContex";
import { ChevronRight, CircleCheck, Phone } from "lucide-react";
import Footer from "../../components/footer/Footer";

const Property = ({ id }) => {
  const post = useLoaderData();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  // const [saved, setSaved] = useState(post?.isSaved);
  // const handleSave = async () => {
  //     if (!currentUser) {
  //         navigate("/login");
  //     }
  //     setSaved((prev) => !prev);
  //     try {
  //         await apiCall.post("/users/save", { postId: post?.id, });
  //     } catch (err) {
  //         console.log("error found in saving post!");
  //         console.log(err);
  //         setSaved((prev) => !prev);
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
      navigate("/chats", { state: { chatId: response.data.id } });
    } catch (err) {
      console.log("Error found in sending message btn", err);
    }
  };

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const propertyType = {
    apartment: "Apartment",
    house: "House",
    condo: "Condo",
    land: "Land",
  };
  const propertyFor = {
    buy: "Buy",
    rent: "Rent",
  };
  const statusLabels = {
    ready: "Ready",
    underconstruction: "Under Construction",
    almostready: "Almost Ready",
    upcoming: "Upcoming",
    used: "Used",
  };
  const facingLabels = {
    south: "South Facing",
    north: "North Facing",
    east: "East Facing",
    west: "West Facing",
  };
  const furnishingLabels = {
    furnished: "Furnished",
    unfurnished: "Unfurnished",
    semiFurnished: "Semi-Furnished",
  };

  return (
    <>
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
                    <img
                      src="https://i.postimg.cc/mg8RNbwp/location.png"
                      alt="location"
                    />
                    <span>{post?.address}</span>
                  </div>
                </div>

                {/* PRICE */}
                <div className="price">
                  <span>৳ {post?.price}</span>
                </div>
              </div>

              <div className="property-sizes">
                <div className="wrapper">
                  <p className="title">Sizes</p>
                  <div className="sizes">
                    <div className="size">
                      <img
                        src="https://i.postimg.cc/zD6r0tT5/room.png"
                        alt=""
                      />
                      <span>{post?.size} sqft</span>
                    </div>
                    <div className="size">
                      <img
                        src="https://i.postimg.cc/T14h90rB/bed-1.png"
                        alt=""
                      />
                      <span>{post?.bedroom} beds</span>
                    </div>
                    <div className="size">
                      <img
                        src="https://i.postimg.cc/ZRYRz2H1/bathroom-1.png"
                        alt=""
                      />
                      <span>{post?.bathroom} baths</span>
                    </div>
                  </div>

                  <p className="title">Nearby Places</p>
                  <div className="listHorizontal">
                    <div className="feature">
                      <img
                        src="https://i.postimg.cc/T3XXXKk4/school.png"
                        alt=""
                      />
                      <div className="featureText">
                        <span>School</span>
                        <p>{post?.postDetail.school} m away</p>
                      </div>
                    </div>
                    <div className="feature">
                      <img
                        src="https://i.postimg.cc/K8rhcmwv/bus-stop.png"
                        alt=""
                      />
                      <div className="featureText">
                        <span>Bus Stop</span>
                        <p>{post?.postDetail.bus} m away</p>
                      </div>
                    </div>
                    <div className="feature">
                      <img
                        src="https://i.postimg.cc/tC6Hf3z6/restuarant.png"
                        alt=""
                      />
                      <div className="featureText">
                        <span>Hospital</span>
                        <p>{post?.postDetail.hospital} m away</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="property-summary">
                <h3 className="summary-title">Property Summary</h3>
                <div className="summary-wrapper">
                  <div className="left">
                    <p>
                      <ChevronRight strokeWidth={2} />
                      List Date : {formattedDate}
                    </p>
                    <p>
                      <ChevronRight strokeWidth={2} />
                      Property Type :{" "}
                      {propertyType[post?.property] || "Unknown"}
                    </p>
                    <p>
                      <ChevronRight strokeWidth={2} />
                      Property For : {propertyFor[post?.type] || "Unknown"}
                    </p>
                    <p>
                      <ChevronRight strokeWidth={2} />
                      Property Size : {post?.postDetail.size} SQFT
                    </p>
                    <p>
                      <ChevronRight strokeWidth={2} />
                      Bedroom : {post?.bedroom}
                    </p>

                    <p>
                      <ChevronRight strokeWidth={2} />
                      Bathroom : {post?.bathroom}
                    </p>

                    <p>
                      <ChevronRight strokeWidth={2} />
                      Facing : {facingLabels[post?.postDetail?.facing] || "N/A"}
                    </p>
                  </div>
                  <div className="right">
                    <p>
                      <ChevronRight strokeWidth={2} />
                      Location : {post?.address}
                    </p>

                    <p>
                      <ChevronRight strokeWidth={2} />
                      Floor Avaiable On : {post?.postDetail?.availableFloor}
                    </p>
                    <p>
                      <ChevronRight strokeWidth={2} />
                      Total Floor : {post?.postDetail?.totalFloor}
                    </p>

                    <p>
                      <ChevronRight strokeWidth={2} />
                      Construction Status :{" "}
                      {statusLabels[post?.postDetail?.status] || "N/A"}
                    </p>
                    <p>
                      <ChevronRight strokeWidth={2} />
                      Balconies : {post?.postDetail?.balcony}
                    </p>
                    <p>
                      <ChevronRight strokeWidth={2} />
                      Garages : {post?.postDetail?.garage}
                    </p>
                    <p>
                      <ChevronRight strokeWidth={2} />
                      Furnishing :{" "}
                      {furnishingLabels[post?.postDetail?.furnishing] || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Property Features */}
              <div className="property-features">
                <h3 className="property-features-title">Property Features</h3>
                <div className="property-features-wrapper">
                  {post?.postDetail?.amenities.map((amenity, index) => (
                    <div key={index} className="amenity-item">
                      <CircleCheck strokeWidth={2} size={20} />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              {/* Floor plan */}
              <div className="floor-plan">
                <h3 className="floor-plan-title">Floor Plans</h3>
                <div className="floor-plan-wrapper">
                  {post?.postDetail?.floorPlans.map((floorPlan, index) => (
                    <img
                      key={index}
                      src={floorPlan}
                      alt="Floor-Plan-Image"
                      onClick={() => setSelectedImage(floorPlan)}
                    />
                  ))}
                </div>

                {/* Modal */}
                {selectedImage && (
                  <div
                    className="image-modal"
                    onClick={() => setSelectedImage(null)}
                  >
                    <img src={selectedImage} alt="Large Floor Plan" />
                  </div>
                )}
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
                <Link to={`/profile/${post.userId}`}>
                  <img
                    src={
                      post?.user.avatar ||
                      "https://i.postimg.cc/J7dgwngh/profile-picture.png"
                    }
                    alt="profile-image"
                  />
                </Link>

                <Link to={`/profile/${post.userId}`}>
                  <span>{post?.user?.username.toUpperCase()}</span>
                </Link>
                <span style={{ color: "#09aa57", fontSize: "14px" }}>
                  Property ID: {post?.postDetail?.propertyId}
                </span>
                <span className="phone">
                  <Phone width={20} color="#09aa57" />
                  {post?.postDetail?.phone || "+880 1XXXXXXXXX"}
                </span>
              </div>

              <div className="action-btn">
                <div className="call">
                  <a href={`tel:${post?.postDetail?.phone}`}>
                    <button>Call Now</button>
                  </a>
                </div>

                <div className="chat">
                  <Link
                    to="/chats"
                    state={{ chatId: post.chatId, userId: post.userId }} // send chatId or userId if available
                  >
                    <button onClick={() => handleSendMessage(post.userId)}>
                      Chat Online
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mapContainer">
              <p className="title">Location in Map</p>
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

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Property;
