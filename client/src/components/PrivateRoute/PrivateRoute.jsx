import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContex";

const PrivateRoute = ({ allowedRoles, children }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return <Navigate to="/signin" />;
  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
