import React, { useState } from "react";
import NewSignIn from "./new-sign-in";
import NewSignUp from "./new-sign-up";

function NewAuth({ state: initialState }) {
  const [state, setState] = useState(initialState || "signIn");

  const toggleAuth = () => {
    setState((prevState) => (prevState === "signIn" ? "signUp" : "signIn"));
  };

  return (
    <div className="tw-css min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="grid md:grid-cols-2 w-full bg-white login-shadow rounded-xl overflow-hidden">
        {/* Left: Auth Form Section */}
        <div className="w-full px-8 py-10 flex flex-col items-center justify-center">
          <div className="w-25 h-10 mb-4">
            <img src="/yes.png" alt="Logo" className="object-contain h-full" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {state === "signIn"
              ? "Sign in to your account"
              : "Create your account"}
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Please enter your details to{" "}
            {state === "signIn" ? "sign in" : "sign up"}
          </p>

          <div className="w-full max-w-sm">
            {state === "signIn" ? (
              <NewSignIn onAuthToggle={toggleAuth} />
            ) : (
              <NewSignUp onAuthToggle={toggleAuth} />
            )}
          </div>

          <p className="text-center text-sm text-gray-600 mt-1">
            {state === "signIn"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              type="button"
              onClick={toggleAuth}
              className="text-green-800 font-semibold hover:underline"
            >
              {state === "signIn" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        {/* Right: Image Section */}
        <div className="relative w-full h-full login-image">
          <img
            src="https://i.postimg.cc/8c0Bsf92/people-office-work-day-1.jpg"
            alt="Side Visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default NewAuth;
