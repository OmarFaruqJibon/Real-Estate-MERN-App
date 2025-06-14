import { useState } from "react";
import './AddPost.scss';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import apiCall from './../../lib/apiCall';
import UploadWidget from './../../components/uploadWidget/UploadWidget';
import MultiStepForm from "../multiStepForm/MultiStepForm";

function AddPost() {
    const [value, setValue] = useState("");
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");


    // amenities ....................................

    const [amenities, setAmenities] = useState([]);

    const amenityOptions = [
        "Mosque/Prayer Room", "Lift", "WASA connection", "Hot water", "Cylinder Gas", "Generator",
        "Intercom", "Wi-Fi connectivity", "Satellite or cable TV", "Pool", "Garden", "Guest Parking",
        "Servant Toilet", "Security", "Fire exit", "Self Water supply", "Titas Gas", "Electricity",
        "Telephone line", "CCTV", "Security Alarm System", "Electronic security", "Gymnasium",
        "Solar panels", "Servant Room", "Fire Protection"
    ];
    const handleAmenityChange = (e) => {
        const { value, checked } = e.target;
        setAmenities(prev =>
            checked ? [...prev, value] : prev.filter(item => item !== value)
        );
    };


    // amenities ....................................


    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputs = Object.fromEntries(formData);

        try {
            const res = await apiCall.post("/posts", {
                postData: {
                    title: inputs.title,
                    price: parseInt(inputs.price),
                    address: inputs.address,
                    city: inputs.city,
                    bedroom: parseInt(inputs.bedroom),
                    bathroom: parseInt(inputs.bathroom),
                    type: inputs.type,
                    property: inputs.property,
                    latitude: inputs.latitude,
                    longitude: inputs.longitude,
                    images: images,
                },
                postDetail: {
                    size: parseInt(inputs.size),
                    school: parseInt(inputs.school),
                    bus: parseInt(inputs.bus),
                    hospital: parseInt(inputs.hospital),
                    status: inputs.status,
                    // description: value,
                    balcony: inputs.balcony,
                    garage: inputs.garage,
                    availableFloor: inputs.availableFloor,
                    totalFloor: inputs.totalFloor,
                    facing: inputs.facing,
                    furnishing: inputs.furnishing,
                    amenities: amenities,
                },
            });
            navigate("/" + res.data.id)

            console.log(res.data);
        } catch (err) {
            console.log(err);
            setError(error);
        }
    };

    const getOrdinalSuffix = (n) => {
        // Special case: numbers ending in 11, 12, 13 are always "th"
        if (n % 100 >= 11 && n % 100 <= 13) return 'th';

        // Otherwise, use the last digit to decide
        switch (n % 10) {
            case 1: return 'st'; // 1st
            case 2: return 'nd'; // 2nd
            case 3: return 'rd'; // 3rd
            default: return 'th'; // 4th, 5th, ..., 0th
        }
    };

    return (
        <div className="newPostPage">
            <div className="formContainer">

                <h1>List Your Property</h1>

                <div className="wrapper">

                    <form onSubmit={handleSubmit}>

                        {/* BASIC INFO */}

                        <div className="item">
                            <label htmlFor="type">Property For</label>
                            <select name="type">
                                <option value="rent" defaultChecked>
                                    Rent
                                </option>
                                <option value="buy">Buy</option>
                            </select>
                        </div>

                        <div className="item">
                            <label htmlFor="property">Property</label>
                            <select name="property">
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="condo">Condo</option>
                                <option value="land">Land</option>
                            </select>
                        </div>

                        <div className="item">
                            <label htmlFor="title">Title</label>
                            <input id="title" name="title" type="text" />
                        </div>

                        <div className="item">
                            <label htmlFor="price">Price</label>
                            <input id="price" name="price" type="number" />
                        </div>

                        <div className="item">
                            <label htmlFor="city">City</label>
                            <input id="city" name="city" type="text" />
                        </div>
                        <div className="item">
                            <label htmlFor="address">Full Address</label>
                            <input id="address" name="address" type="text" />
                        </div>
                        <div className="item">
                            <label htmlFor="status">Construction Status</label>
                            <select name="status">
                                <option value="ready">Ready</option>
                                <option value="underconstruction">Under Construction</option>
                                <option value="almostready">Almost Ready</option>
                                <option value="upcomming">Upcomming</option>
                                <option value="used">Used</option>
                            </select>
                        </div>
                        {/* BASIC INFO */}

                        {/* SIZES */}
                        <div className="item">
                            <label htmlFor="size">Total Size (sqft)</label>
                            <input min={0} id="size" name="size" type="number" />
                        </div>

                        <div className="item">
                            <label htmlFor="bedroom">Bedroom Number</label>
                            <input min={1} id="bedroom" name="bedroom" type="number" />
                        </div>

                        <div className="item">
                            <label htmlFor="bathroom">Bathroom Number</label>
                            <input min={1} id="bathroom" name="bathroom" type="number" />
                        </div>

                        <div className="item">
                            <label htmlFor="school">School</label>
                            <input min={0} id="school" name="school" type="number" />
                        </div>
                        <div className="item">
                            <label htmlFor="bus">bus</label>
                            <input min={0} id="bus" name="bus" type="number" />
                        </div>
                        <div className="item">
                            <label htmlFor="hospital">Hospital</label>
                            <input min={0} id="hospital" name="hospital" type="number" />
                        </div>
                        <div className="item">
                            <label htmlFor="balcony">Balcony</label>
                            <select name="balcony">
                                <option value="balcony1">1 Balcony</option>
                                <option value="balcony2">2 Balcony</option>
                                <option value="balcony3">3 Balcony</option>
                                <option value="balcony4">4 Balcony</option>
                                <option value="balcony4plus">4+ Balcony</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="garage">Garage</label>
                            <select name="garage">
                                <option value="No-Parking">No Parking</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="4+">4+</option>
                            </select>
                        </div>
                        {/* SIZES */}



                        {/* EXTRA INFO */}

                        <div className="item">
                            <label htmlFor="availableFloor">Available Floor </label>

                            <select name="availableFloor" defaultValue="1">
                                {Array.from({ length: 100 }, (_, i) => {
                                    const floor = i + 1;
                                    const suffix = getOrdinalSuffix(floor);
                                    return (
                                        <option key={floor} value={floor}>
                                            {floor}{suffix} Floor
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <div className="item">
                            <label htmlFor="totalFloor">Total Number of Floor </label>

                            <select name="totalFloor" defaultValue="1">
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
                            <select name="facing">
                                <option value="south">South Facing</option>
                                <option value="north">North Facing</option>
                                <option value="east">East Facing</option>
                                <option value="west">West Facing</option>
                            </select>
                        </div>

                        <div className="item">
                            <label htmlFor="furnishing">Furnishing</label>
                            <select name="furnishing">
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
                                            if (e.target.checked) {
                                                setAmenities([...amenityOptions]);
                                            } else {
                                                setAmenities([]);
                                            }
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



































                        {/* EXTRA INFO */}





                        {/* MAP LOCATION */}
                        <div className="item">
                            <label htmlFor="latitude">Latitude</label>
                            <input id="latitude" name="latitude" type="text" />
                        </div>

                        <div className="item">
                            <label htmlFor="longitude">Longitude</label>
                            <input id="longitude" name="longitude" type="text" />
                        </div>
                        {/* MAP LOCATION */}




                        <button className="addButton">List Property</button>
                        {error && <span>error</span>}
                    </form>
                </div>


                <div className="sideContainer">
                    {images.map((image, index) => (
                        <img src={image} key={index} alt="" />
                    ))}
                    <br /> <br />
                    <UploadWidget
                        uwConfig={{
                            multiple: true,
                            cloudName: "lamadev",
                            uploadPreset: "estate",
                            folder: "posts",
                        }}
                        setState={setImages}
                    />
                </div>
            </div>






        </div>
    );
}

export default AddPost;
