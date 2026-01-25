import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const UploadWidget = ({ uwConfig, setState }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
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
          setState((prev) => [...prev, result.info.secure_url]);
        }
      },
    );

    widget.open();
  };

  return (
    <Button
      className="upload-btn"
      color="secondary"
      variant="outlined"
      size="small"
      onClick={openWidget}
      style={{
        marginTop: "5px",
      }}
    >
      Upload Image
    </Button>
  );
};

export default UploadWidget;
