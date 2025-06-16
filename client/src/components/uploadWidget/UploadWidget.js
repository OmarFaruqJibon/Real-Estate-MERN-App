import { useEffect, useState } from "react";

const UploadWidget = ({ uwConfig, setState }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Load the Cloudinary Upload Widget script if not already loaded
        if (!window.cloudinary) {
            const script = document.createElement("script");
            script.src = "https://upload-widget.cloudinary.com/global/all.js";
            script.async = true;
            script.onload = () => setLoaded(true);
            document.body.appendChild(script);
        } else {
            setLoaded(true);
        }
    }, []);

    const openWidget = () => {
        if (!loaded) return;

        const widget = window.cloudinary.createUploadWidget(
            uwConfig,
            (error, result) => {
                if (!error && result && result.event === "success") {
                    // Append the uploaded image URL to the state
                    setState((prev) => [...prev, result.info.secure_url]);
                }
            }
        );

        widget.open();
    };

    return (
        <button
            type="button"
            className="upload-btn"
            onClick={openWidget}
            style={{
                marginTop: "10px",
                padding: "8px 16px",
                backgroundColor: "#3498db",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
            }}
        >
            Upload Image
        </button>
    );
};

export default UploadWidget;
