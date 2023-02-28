import { Navigate } from "react-router-dom";

const PrivateRoute = ({ auth: {isAuthenticated }, children }) => {
  console.log("Private route works!");
  return isAuthenticated ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
