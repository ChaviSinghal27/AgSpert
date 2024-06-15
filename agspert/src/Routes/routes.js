import { Route, Routes } from "react-router-dom";

import Home from "../Home/home";
import PrivateRoute from "./privateRoutes";
import Login from "../Login/login";

export default function Approutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />{" "}
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
