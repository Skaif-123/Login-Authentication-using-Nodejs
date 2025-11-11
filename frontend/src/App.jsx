import { Navigate, Route, Routes } from "react-router-dom";

import { useState } from "react";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Refreshhandler from "./components/Refreshhandler.jsx";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  
  return (
    <>
      <Refreshhandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path={"/"} element={<Navigate to={"/login"} />}></Route>
        <Route path={"/login"} element={<Login />}></Route>
        <Route path={"/signup"} element={<SignUp />}></Route>
        <Route
          path={"/home"}
          element={<PrivateRoute element={<Home />} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
