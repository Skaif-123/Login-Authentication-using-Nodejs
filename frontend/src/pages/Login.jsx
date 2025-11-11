import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utility/utlityToast.js";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        return handleError("All the  fields that are required");
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/auth/login/",
          { username, password }
        );

        if (response) {
          const { bearer_token, message, success } = response.data;
          const { _id, username, email, role } = response.data.loginInfoUser;
          localStorage.setItem("token", bearer_token);
          localStorage.setItem("username", username);
          localStorage.setItem("role", role);
          handleSuccess(message);
          setTimeout(() => {
            setUsername("");
            setPassword("");
            navigate("/home");
         
          }, 500);
        }
      }
    } catch (error) {
      return handleError("Something went wrong!!!");
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center items-center h-screen w-screen">
        <h1 className="font-bold mb-2">LOGIN FORM</h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="form-container h-fit w-fit rounded-xl shadow-2xl hover:border-2 flex flex-col justify-center text-center"
        >
          <div className="component flex flex-row gap-1 justify-center items-center p-2 mt-2">
            <label htmlFor="username">Username :</label>
            <input
              type="text"
              id="username"
              className="border-amber-200 border-2 rounded-lg px-2 py-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="component flex  gap-1 justify-center items-center p-2 mt-2">
            <label htmlFor="password">Password :</label>
            <input
              type="text"
              id="password"
              className="border-amber-200 border-2 rounded-lg px-2 py-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="component flex  gap-1 justify-center items-center p-2 mt-2 hover:font-bold">
            <button
              type="submit"
              className="bg-violet-800 px-2 py-2 rounded-lg  cursor-pointer text-white"
            >
              Login
            </button>
          </div>
          <div className="mb-2">
            <p className="text-blue-500">
              Don't have an account?{" "}
              <Link
                className="text-blue-800 underline hover:font-bold"
                to="/signup"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
