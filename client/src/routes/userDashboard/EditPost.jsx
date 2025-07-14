import { useEffect, useState } from "react";
import "../addPost/AddPost.scss";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import apiCall from "../../lib/apiCall";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";

function EditPost() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [floorPlans, setFloorPlans] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { postId } = useParams();

  const amenityOptions = [
    "Mosque/Prayer Room",
    "Lift",
    "WASA connection",
    "Hot water",
    "Cylinder Gas",
    "Generator",
    "Intercom",
    "Wi-Fi connectivity",
    "Satellite or cable TV",
    "Pool",
    "Garden",
    "Guest Parking",
    "Servant Toilet",
    "Security",
    "Fire exit",
    "Self Water supply",
    "Titas Gas",
    "Electricity",
    "Telephone line",
    "CCTV",
    "Security Alarm System",
    "Electronic security",
    "Gymnasium",
    "Solar panels",
    "Servant Room",
    "Fire Protection",
  ];

  const getOrdinalSuffix = (n) => {
    if (n % 100 >= 11 && n % 100 <= 13) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await apiCall.get(`/posts/${postId}`);
        const data = res.data;
        setFormData(data);
        setImages(data.images || []);
        setFloorPlans(data.postDetail?.floorPlans || []);
        setAmenities(data.postDetail?.amenities || []);
      } catch (err) {
        console.error("Failed to load post", err);
        navigate("/dashboard/posts");
      }
    };
    fetchPost();
  }, [postId, navigate]);

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setAmenities((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputData = Object.fromEntries(new FormData(e.target));

    try {
      await apiCall.put(`/posts/${postId}`, {
        title: inputData.title,
        price: parseInt(inputData.price),
        address: inputData.address,
        city: inputData.city,
        bedroom: parseInt(inputData.bedroom),
        bathroom: parseInt(inputData.bathroom),
        type: inputData.type,
        property: inputData.property,
        latitude: inputData.latitude,
        longitude: inputData.longitude,
        images,
        size: parseInt(inputData.size),
        postDetail: {
          propertyId: parseInt(inputData.propertyId),
          school: parseInt(inputData.school),
          bus: parseInt(inputData.bus),
          hospital: parseInt(inputData.hospital),
          status: inputData.status,
          balcony: inputData.balcony,
          garage: inputData.garage,
          availableFloor: inputData.availableFloor,
          totalFloor: inputData.totalFloor,
          facing: inputData.facing,
          furnishing: inputData.furnishing,
          phone: inputData.phone,
          amenities,
          floorPlans,
        },
      });
      alert("Post updated! Waiting for admin approval.");
      navigate("/dashboard/posts");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Edit Property</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="propertyId">Property ID</label>
              <input
                id="propertyId"
                name="propertyId"
                type="number"
                defaultValue={formData.postDetail.propertyId}
                readOnly
              />
            </div>

            <div className="item">
              <label htmlFor="type">Property For</label>
              <select name="type" defaultValue={formData.type} required>
                <option value="sell">Sell</option>
                <option value="rent">Rent</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="property">Property</label>
              <select name="property" defaultValue={formData.property} required>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={formData.title}
                required
              />
            </div>

            <div className="item">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                defaultValue={formData.price}
                required
              />
            </div>

            <div className="item">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                defaultValue={formData.city}
                required
              />
            </div>

            <div className="item">
              <label htmlFor="address">Full Address</label>
              <input
                id="address"
                name="address"
                type="text"
                defaultValue={formData.address}
                required
              />
            </div>

            <div className="item">
              <label htmlFor="status">Construction Status</label>
              <select
                name="status"
                defaultValue={formData.postDetail.status}
                required
              >
                <option value="ready">Ready</option>
                <option value="underconstruction">Under Construction</option>
                <option value="almostready">Almost Ready</option>
                <option value="upcomming">Upcomming</option>
                <option value="used">Used</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input
                id="size"
                name="size"
                type="number"
                defaultValue={formData.size}
                required
              />
            </div>

            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input
                id="bedroom"
                name="bedroom"
                type="number"
                defaultValue={formData.bedroom}
                required
              />
            </div>

            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input
                id="bathroom"
                name="bathroom"
                type="number"
                defaultValue={formData.bathroom}
                required
              />
            </div>

            <div className="item">
              <label htmlFor="school">School</label>
              <input
                id="school"
                name="school"
                type="number"
                defaultValue={formData.postDetail.school}
              />
            </div>

            <div className="item">
              <label htmlFor="bus">Bus</label>
              <input
                id="bus"
                name="bus"
                type="number"
                defaultValue={formData.postDetail.bus}
              />
            </div>

            <div className="item">
              <label htmlFor="hospital">Hospital</label>
              <input
                id="hospital"
                name="hospital"
                type="number"
                defaultValue={formData.postDetail.hospital}
              />
            </div>

            <div className="item">
              <label htmlFor="balcony">Balcony</label>
              <select
                name="balcony"
                defaultValue={formData.postDetail.balcony}
                required
              >
                <option value="1">1 Balcony</option>
                <option value="2">2 Balcony</option>
                <option value="3">3 Balcony</option>
                <option value="4">4 Balcony</option>
                <option value="4+">4+ Balcony</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="garage">Garage</label>
              <select
                name="garage"
                defaultValue={formData.postDetail.garage}
                required
              >
                <option value="No-Parking">No Parking</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="4+">4+</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="availableFloor">Available Floor</label>
              <select
                name="availableFloor"
                defaultValue={formData.postDetail.availableFloor}
                required
              >
                {Array.from({ length: 100 }, (_, i) => {
                  const floor = i + 1;
                  const suffix = getOrdinalSuffix(floor);
                  return (
                    <option key={floor} value={floor}>
                      {floor}
                      {suffix} Floor
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="item">
              <label htmlFor="totalFloor">Total Number of Floor</label>
              <select
                name="totalFloor"
                defaultValue={formData.postDetail.totalFloor}
              >
                {Array.from({ length: 100 }, (_, i) => {
                  const floor = i + 1;
                  return (
                    <option key={floor} value={floor}>
                      {floor}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="item">
              <label htmlFor="facing">Facing</label>
              <select name="facing" defaultValue={formData.postDetail.facing}>
                <option value="south">South Facing</option>
                <option value="north">North Facing</option>
                <option value="east">East Facing</option>
                <option value="west">West Facing</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="furnishing">Furnishing</label>
              <select
                name="furnishing"
                defaultValue={formData.postDetail.furnishing}
              >
                <option value="furnished">Furnished</option>
                <option value="unfurnished">Unfurnished</option>
                <option value="semiFurnished">Semi-Furnished</option>
              </select>
            </div>

            <div className="item">
              <label>Amenities</label>
              <div className="amenities-grid">
                <label>
                  <input
                    type="checkbox"
                    checked={amenities.length === amenityOptions.length}
                    onChange={(e) => {
                      setAmenities(e.target.checked ? [...amenityOptions] : []);
                    }}
                  />
                  <strong>Select All</strong>
                </label>
                {amenityOptions.map((amenity, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      value={amenity}
                      checked={amenities.includes(amenity)}
                      onChange={handleAmenityChange}
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>

            <div className="item">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="number"
                defaultValue={formData.postDetail.phone}
                required
              />
            </div>

            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input
                id="latitude"
                name="latitude"
                type="text"
                defaultValue={formData.latitude}
                required
              />
            </div>

            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input
                id="longitude"
                name="longitude"
                type="text"
                defaultValue={formData.longitude}
                required
              />
            </div>

            <p style={{ textAlign: "center", marginTop: "40px" }}>Attachment</p>

            <div className="item">
              <label>Property Pictures</label>
              <div className="imgContainer">
                {images.map((image, index) => (
                  <div className="imgWrapper" key={index}>
                    <img src={image} alt="Property" />

                    <IconButton
                      color="error"
                      className="removeBtn"
                      onClick={() =>
                        setImages((prev) => prev.filter((img) => img !== image))
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
                <UploadWidget
                  uwConfig={{
                    multiple: true,
                    cloudName: "dnfxchy4r",
                    uploadPreset: "estate",
                    folder: "posts",
                  }}
                  setState={setImages}
                />
              </div>
            </div>

            <div className="item">
              <label>Floor Plans</label>
              <div className="imgContainer">
                {floorPlans.map((plan, index) => (
                  <div className="imgWrapper" key={index}>
                    <img src={plan} alt="Floor Plan" />

                    <IconButton
                      color="error"
                      className="removeBtn"
                      onClick={() =>
                        setFloorPlans((prev) =>
                          prev.filter((fp) => fp !== plan)
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}

                <UploadWidget
                  uwConfig={{
                    multiple: true,
                    cloudName: "dnfxchy4r",
                    uploadPreset: "estate",
                    folder: "posts",
                  }}
                  setState={setFloorPlans}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" className="addButton">
                Update Property
              </button>

              <button
                type="button"
                className="cancelButton"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>

            {error && <span>{error}</span>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
