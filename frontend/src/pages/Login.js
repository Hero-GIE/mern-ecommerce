import React, { useContext, useState } from "react";
import loginIcon from "../asset/login.png";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // Start with password hidden
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData.message);
      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart();
    } else if (responseData.error) {
      toast.error(responseData.message);
    }
  };

  return (
    <section id="login" className="flex items-center justify-center py-13 mt-36">
      <div className="bg-white p-3 w-full max-w-sm rounded shadow-lg shadow-gray-500">
        <div className="w-32 h-32 mx-auto mb-3">
          <img src={loginIcon} alt="login" className="object-contain" />
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              required
              onChange={handleOnChange}
              value={data.email}
              name="email"
            />
          </div>
          <div className="relative mt-3">
            {/* Updated Password Field */}
            <TextField
              required
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleOnChange}
              name="password"
              value={data.password}
              type={showPassword ? "text" : "password"}
            />
            {/* Password Visibility Toggle Icon */}
            <span
              className="absolute top-9 right-3 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            <Link
              to={"/forgot-password"}
              className="block w-fit ml-auto hover:underline hover:text-Orange text-sm text-blue-400 mt-2"
            >
              Forgot password?
            </Link>
          </div>
          <button
            className="bg-Orange text-white w-full max-w-[200px] px-6 py-2 rounded-2xl hover:bg-orange-400 hover:scale-110 transition-all mx-auto block mt-6"
          >
            Login
          </button>
        </form>
        <p className="mt-5 text-center text-sm">
          Don't have an account?{" "}
          <Link
            to={"/sign-up"}
            className="hover:underline hover:text-Orange text-blue-400"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
