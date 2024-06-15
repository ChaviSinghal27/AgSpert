import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return <>{isAuthenticated === false ? <Navigate to="/login" /> : children}</>;
}
