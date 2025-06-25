import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaArrowRight } from "react-icons/fa";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleMode = () => setIsLogin(!isLogin);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  return (
    <div className="tw-css min-h-screen bg-gray-100 flex items-center justify-center p-6 py-10">
      <div className="bg-white rounded-xl shadow-xl grid md:grid-cols-2 gap-4 w-full max-w-5xl overflow-hidden">
        {/* Left: Auth Form */}
        <div className="w-full md:w-1/2 p-10">
          <div className="mb-8">
            <h1 className="text-lg font-semibold text-gray-700 tracking-wide">ACCOUNT</h1>
            <h2 className="text-3xl font-bold text-gray-900 mt-1">
              Sign {isLogin ? "in" : "up"} to your account
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Enter your credentials to {isLogin ? "view all insights" : "create your profile"}.
            </p>
          </div>

          <form className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email address</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
            >
              Submit <FaArrowRight className="text-sm" />
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            <FcGoogle className="text-xl" /> Sign in with Google
          </button>

          <p className="mt-6 text-sm text-center text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleMode}
              className="text-blue-600 hover:underline font-medium"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </div>

        {/* Right: Visual Side */}
        <div className="w-1/2 bg-gradient-to-tr from-indigo-200 to-blue-300 items-center justify-center p-6 relative">
          <img
            src="https://i.postimg.cc/8c0Bsf92/people-office-work-day-1.jpg"
            alt="Illustration"
            className="rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] w-full object-cover h-[90%]"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
