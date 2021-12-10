import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectLogin } from "../store/user";

function RequireAuth({ children }) {
  const isLogin = useSelector(selectLogin);
  let location = useLocation();

  if (!isLogin) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default RequireAuth;