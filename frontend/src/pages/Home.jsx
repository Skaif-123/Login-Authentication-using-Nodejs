import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../utility/utlityToast";

const Home = () => {
  const [username, setUsername] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  const fetchProducts = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/",
        config
      );
      setProducts(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const loggingOut = () => {
    localStorage.clear();
    handleSuccess("Logging out successful");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <>
      <ToastContainer />
      <div className="main-container h-screen w-screen flex flex-col justify-center text-center ">
        <div className="username text-2xl text-red-600 font-bold">
          Welcome {username}
        </div>
        <div className="content max-w-2xl mx-auto p-6">
          {products &&
            products.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-gray-800 font-medium">{item.name}</span>
                <span className="text-green-600 font-bold">${item.price}</span>
              </div>
            ))}
        </div>
        <div className="button">
          <button
            onClick={() => {
              loggingOut();
            }}
            className="bg-violet-800 px-2 py-2 rounded-lg hover:font-bold cursor-pointer text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
