import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess } from "../utility/utlityToast.js";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!username || !password || !role || !email) {
      return handleError("All fields are required");
    } else {
      try {
        await axios.post("http://localhost:3000/api/auth/register/",{username,email,password,role})
         setUsername("")
        setPassword("")
        setEmail("")
        setRole("")
        return handleSuccess("Registration successful");
       
      } catch (error) {
        return handleError("some error while registering");
      }
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center items-center h-screen w-screen">
        <h1 className="font-bold mb-2">Registration Form</h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="form-container h-fit w-fit rounded-xl shadow-2xl hover:border-2 flex flex-col justify-center text-center p-2"
        >
          <div className="component flex flex-row gap-1 justify-between items-center p-2 mt-2">
            <label htmlFor="username">Username :</label>
            <input
              type="text"
              id="username"
              className="border-amber-200 border-2 rounded-lg px-2 py-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="component flex flex-row gap-1 justify-between items-center p-2 mt-2">
            <label htmlFor="Email">Email :</label>
            <input
              type="email"
              id="email"
              className="border-amber-200 border-2 rounded-lg px-2 py-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="component flex  gap-1 justify-between items-center p-2 mt-2">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              className="border-amber-200 border-2 rounded-lg px-2 py-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="component flex flex-row gap-1 justify-between items-center p-2 mt-2">
            <label htmlFor="role">Role :</label>
            <input
              type="text"
              id="role"
              className="border-amber-200 border-2 rounded-lg px-2 py-1"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <div className="component flex  gap-1 justify-center items-center p-2 mt-2 ">
            <button
              type="submit"
              className="bg-violet-800 px-2 py-2 rounded-lg hover:font-bold cursor-pointer text-white"
            >
              Register
            </button>
          </div>
          <div className="mb-2">
            <p className="text-blue-500">
              Already have an account?{" "}
              <Link className="text-blue-800 underline hover:font-bold" to="/">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
