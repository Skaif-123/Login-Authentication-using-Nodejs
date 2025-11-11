import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Refreshhandler = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(
    ()=>{



if (localStorage.getItem("token")) {
    setIsAuthenticated(true);
    if (
      location.pathname == "/login" ||
      location.pathname == "/signup" ||
      location.pathname == "/"
    ) {
        navigate('/home');
    }
  }
    },[setIsAuthenticated,navigate,location]
  )
  

  return null;
};

export default Refreshhandler;
