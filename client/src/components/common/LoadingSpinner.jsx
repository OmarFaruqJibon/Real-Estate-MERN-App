// client/src/components/common/LoadingSpinner.jsx
import "./LoadingSpinner.scss";

const LoadingSpinner = ({ fullScreen = false, text = "Loading..." }) => {
  return (
    <div className={fullScreen ? "loader-overlay" : "loader-inline"}>
      <div className="loader-wrapper">
        <div className="loader-ring"></div>
        <div className="loader-ring inner"></div>
      </div>
      {fullScreen && <p className="loader-text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
