import React, { useState } from "react";

export default function NewAuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="tw-css flex h-screen font-sans">
      {/* Left Side - Form */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-6">
            <div className="text-purple-700 text-4xl font-bold">★</div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-semibold mb-2">
            {isLogin ? "Welcome back !" : "Create your account"}
          </h2>
          <p className="text-gray-600 mb-6">
            {isLogin
              ? "Enter to get unlimited access to data & information."
              : "Sign up to get started with our services."}
          </p>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Enter your mail address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Password *
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Enter password"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  placeholder="Confirm password"
                />
              </div>
            )}

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              {isLogin && (
                <a href="#" className="text-purple-600">
                  Forgot your password ?
                </a>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-2 text-sm text-gray-500">Or, Login with</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Google Signup/Login */}
           <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign up with google
          </button>

          {/* Toggle */}
          <p className="text-sm text-center mt-4">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <button
                  className="text-purple-600"
                  onClick={() => setIsLogin(false)}
                >
                  Register here
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  className="text-purple-600"
                  onClick={() => setIsLogin(true)}
                >
                  Log in here
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Right Side - Abstract Design */}
   {/* Right Side - Image */}
<div className="w-1/2 h-screen">
  <img
    src="https://i.postimg.cc/MZVtF4pC/candid-shot-beautiful-young-african-american-couple-sitting-kitchen-table-front-open-laptop.jpg"
    alt="Auth Illustration"
    className="w-full h-full object-contain"
  />
</div>


    </div>
  );
}
