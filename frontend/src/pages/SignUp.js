import React, { useState } from 'react';
import loginIcons from '../asset/signup.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField'; // Assuming Material UI is being used
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((prev) => ({
      ...prev,
      profilePic: imagePic
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      } else if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Passwords do not match");
    }
  };

  return (
    <section
      id='signup'
      className="flex items-center justify-center py-13 mt-16"
    >
      <div className='bg-white p-3 w-full max-w-sm rounded shadow-lg shadow-gray-500'>
        
        {/* Profile Picture Upload Section */}
        <div className='w-32 h-32 mx-auto mb-6 relative overflow-hidden rounded-full'>
          <img src={data.profilePic || loginIcons} alt='Profile Pic' className='object-cover w-full h-full' />
          <form>
            <label>
              <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                Upload Image
              </div>
              <input type='file' className='hidden' onChange={handleUploadPic} />
            </label>
          </form>
        </div>

        {/* SignUp Form */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-9'>
          {/* Name Field */}
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={data.name}
            onChange={handleOnChange}
            fullWidth
            required
          />

          {/* Email Field */}
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            value={data.email}
            onChange={handleOnChange}
            fullWidth
            required
          />

          {/* Password Field */}
          <div className='relative'>
            <TextField
              label="Password"
              variant="outlined"
              name="password"
              type={showPassword ? "text" : "password"}
              value={data.password}
              onChange={handleOnChange}
              fullWidth
              required
            />
            <span
              className='absolute top-5 right-3 cursor-pointer'
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password Field */}
          <div className='relative'>
            <TextField
              label="Confirm Password"
              variant="outlined"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={data.confirmPassword}
              onChange={handleOnChange}
              fullWidth
              required
            />
            <span
              className='absolute top-5 right-3 cursor-pointer'
              onClick={() => setShowConfirmPassword(prev => !prev)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Submit Button */}
          <button  className="bg-Orange text-white w-full max-w-[200px] px-6 py-2 rounded-2xl hover:bg-orange-400 hover:scale-110 transition-all mx-auto block mt-6">
            Sign Up
          </button>
        </form>

        <p className='mt-4 text-center text-sm'>
          Already have an account?{" "}
          <Link to="/login" className='text-blue-500 hover:underline hover:text-Orange'>
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
