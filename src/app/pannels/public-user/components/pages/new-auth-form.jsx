import React, { useState } from 'react';
import { IoMdMail } from 'react-icons/io';
import { FaLock, FaUser } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaGoogle } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const NewAuthForm = ({ currentState }) => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    let isValid = true;
    const newErrors = {};

    if (currentState === "signIn") {
      if (!formData.usernameOrEmail) {
        newErrors.usernameOrEmail = "Username or email is required.";
        isValid = false;
      }
      if (!formData.password) {
        newErrors.password = "Password is required.";
        isValid = false;
      }
      if (isValid) {
        console.log("Sign In Data:", formData);
        alert("Sign In Successful (Simulated)!");
        // In a real application, you would send this data to your backend.
      }
    } else {
      // currentState is "signUp"
      if (!formData.username) {
        newErrors.username = "Username is required.";
        isValid = false;
      }
      if (!formData.email) {
        newErrors.email = "Email is required.";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format.";
        isValid = false;
      }
      if (!formData.password) {
        newErrors.password = "Password is required.";
        isValid = false;
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long.";
        isValid = false;
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirm password is required.";
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
        isValid = false;
      }

      if (isValid) {
        console.log("Sign Up Data:", formData);
        alert("Sign Up Successful (Simulated)!");
        // In a real application, you would send this data to your backend.
      }
    }

    setErrors(newErrors);
  };

  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md">
    <form onSubmit={handleSubmit} className="space-y-6">
      {currentState === "signIn" ? (
        <>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoMdMail className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="usernameOrEmail"
              type="text"
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              required
              placeholder="Email address"
            />
          </div>
          {errors.usernameOrEmail && (
            <p className="text-red-500 text-xs italic">
              {errors.usernameOrEmail}
            </p>
          )}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? < AiOutlineEye className="h-5 w-5 text-gray-500" /> : <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />}
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs italic">
              {errors.password}
            </p>
          )}
        </>
      ) : (
        <>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Username"
            />
          </div>
          {errors.username && (
            <p className="text-red-500 text-xs italic">
              {errors.username}
            </p>
          )}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoMdMail className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" /> : <AiOutlineEye className="h-5 w-5 text-gray-500" />}
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs italic">
              {errors.password}
            </p>
          )}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm Password"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs italic">
              {errors.confirmPassword}
            </p>
          )}
        </>
      )}

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <input type="checkbox" id="remember" className="mr-2" />
          <label htmlFor="remember" className="text-gray-700 text-sm">Remember me</label>
        </div>
        <button type="button" className="border-0 bg-none focus:outline-none text-green-800 hover:text-green-700 text-sm">Forgot Password</button>
      </div>

      <button
        className="w-full bg-green-800 hover:bg-[#140b31] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        {currentState === "signIn" ? "Sign In" : "Sign Up"}
      </button>


      <div className="relative my-4">
  <span className="absolute left-1/2 -top-3 transform -translate-x-1/2 bg-white px-2 text-gray-500 text-sm whitespace-nowrap">
    Or continue with
  </span>

  <div className="border-t border-gray-300" />
</div>


      <div className="flex justify-between">
        <button className='flex border border-gray-300 p-1 shadow-sm w-full rounded justify-center items-center'>
            <span><FaGoogle color="#4285F4"  /></span>
            Google</button>
        <button className='flex border border-gray-300 p-1 shadow-sm w-full rounded justify-center items-center'>
            <span><FaLinkedin color="#4285F4"  /></span>
            Linkedin</button>
      </div>
    </form>
    </div>
  );
};

export default NewAuthForm;
