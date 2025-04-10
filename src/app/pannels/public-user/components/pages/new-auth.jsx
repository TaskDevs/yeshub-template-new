import React, { useState } from 'react'
import NewSignIn from './new-sign-in'
import NewSignUp from './new-sign-up'


function NewAuth({ state: initialState }) {
  const [state, setState] = useState(initialState || "signIn");

  const toggleAuth = () => {
    setState(prevState => (prevState === "signIn" ? "signUp" : "signIn"));
  };

  return (
    <div className="tw-css flex flex-col md:flex-row w-full min-h-screen bg-[#D1D5DB]">
      {/* Slanted image section */}
      <div className="relative w-full md:w-1/2 md:h-auto overflow-hidden min-h-screen bg-[#f0f6fe]" style={{
        clipPath: "polygon(0 0, 90% 0, 100% 100%, 0% 100%)",
      }}>
        <img src="/assets/images/login-bg.png" alt="" className="size-full object-cover absolute inset-0 bg-cover bg-center" />
      </div>

      {/* Auth form section */}
      <div className="w-full md:w-1/2 flex items-center flex-col justify-center h-full px-6 py-12 ">

        <div className="size-8 overflow-hidden mr-3">
          <img
            src="/yes-logo-1.png"
            alt="John Doe"
            className=""
          />
        </div>

        <p className="text-gray-700 capitalize">{`Please enter your details to ${state === "signIn" ? "sign in" : "sign up"}`}</p>
        <div className="w-full max-w-md">
          {state === "signIn" ? (
            <NewSignIn onAuthToggle={toggleAuth} />
          ) : (
            <NewSignUp onAuthToggle={toggleAuth} />
          )}
        </div>

        <p className="text-center text-gray-600 text-sm mt-4">
          {state === "signIn" ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            className="font-bold border-0 outline-none bg-none text-green-800 hover:underline focus:outline-none"
            onClick={toggleAuth}
          >
            {state === "signIn" ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}


export default NewAuth

