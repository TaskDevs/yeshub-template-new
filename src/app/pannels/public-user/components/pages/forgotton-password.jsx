import React, { useState } from "react";
import { forgottenPassword } from "../../../../context/auth/authApi";
import { useNavigate } from "react-router-dom";
import { Fingerprint } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setError("");

    try {
      const response = await forgottenPassword({ email }); // Send email as an object
      console.log("Response Data:", response); // Debugging response format

      if (response?.message) {
        setMessage(response.message); // Display success message
        setEmail("")
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/verify-reset-otp", { state: { email } });
        }, 2000);
      } else {
        setError(response?.error || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="tw-css site-bg-white my-5 min-h-screen py-5">
      <div className="pt-4 mt-4">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-lg-6 col-md-7">
            <div className="twm-log-reg-form-wrap">

              <div className="twm-log-reg-inner p-8 bg-white">
 
                <div className="flex flex-col items-center mb-6">
                  {/* Optional icon */}
                  <div className="bg-blue-100 p-3 rounded-full mb-3">
                    <Fingerprint size={30} />
                  </div>

                  <h2 className="text-2xl font-bold text-gray-800">Forgot password?</h2>
                  <p className="text-sm text-gray-500 text-center mt-2">
                    No worries, we will send you reset instructions.
                  </p>
                </div>

                {/* Show Success or Error Message */}
                {message && (
                  <div className="mb-4 bg-green-100 text-green-800 px-4 py-2 rounded-md text-sm">
                    {message}
                  </div>
                )}
                {error && (
                  <div className="mb-4 bg-red-100 text-red-800 px-4 py-2 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSendOtp} className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-2 px-4 text-sm font-medium rounded-md shadow-sm text-white ${isSubmitting ? "bg-green-700 cursor-not-allowed" : "bg-green-700 hover:bg-green-700"
                        }`}
                    >
                      {isSubmitting ? "Sending OTP..." : "Send OTP"}
                    </button>
                  </div>
                </form>
                <div className="mt-6 text-center">
                  <a
                    href="/login"
                    className="text-sm text-gray-600 hover:underline inline-flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to log in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
