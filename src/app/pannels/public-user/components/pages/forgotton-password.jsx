import React, { useState } from "react";
import { forgottenPassword } from "../../../../context/auth/authApi";
import { useNavigate } from "react-router-dom";

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
    <div className="section-full site-bg-white my-5">
      <div className="container-fluid pt-4 mt-4">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-lg-6 col-md-7">
            <div className="twm-log-reg-form-wrap">
              <div className="twm-log-reg-inner">
                <div className="twm-log-reg-head">
                  <span className="log-reg-form-title">Request OTP</span>
                </div>

                {/* Show Success or Error Message */}
                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSendOtp}>
                  <div className="form-group">
                    <label>Please provide your email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <button type="submit" className="site-button" disabled={isSubmitting}>
                      {isSubmitting ? "Sending OTP..." : "Send OTP"}
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
