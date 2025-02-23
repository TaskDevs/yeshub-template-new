import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PinInput from "react-pin-input";
import Loader from "../../../../common/loader";
import { GlobalApiData } from "../../../../context/global/globalContextApi";
import { VerifyReset,forgottenPassword } from "../../../../context/auth/authApi";
import toast from 'react-hot-toast';

function VerifyResetOtp() {
  const { isLoading } = useContext(GlobalApiData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get email from previous page OR from localStorage if refreshed
  const email = location.state?.email || localStorage.getItem("verifyEmail") || "";
  const [otp, setOtp] = useState("");
  const [expiryTime, setExpiryTime] = useState(null);
  const [showTopMessage, setShowTopMessage] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // If no email, redirect to login
  if (!email) {
    navigate("/login");
  }

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowTopMessage(false); // Hide the message before verification
  
    // Validate email and OTP fields
    if (!email || !otp) {
      setErrorMessage("Please enter both email and OTP.");
      setShowTopMessage(true); // Show the message if validation fails
      setIsSubmitting(false);
      return;
    }
  
    try {
      const response = await VerifyReset({ email, otp });
      console.log("API Response:", response);
  
      // Handle the response based on success or failure
      if (response?.message === "OTP verified successfully.") {
        setSuccess(true); // Show success message
        setErrorMessage(""); 
  
        // Redirect after a brief delay to reset-password page
        setTimeout(() => {
          navigate("/reset-password", { state: { email } }); // Pass email to the next page
        }, 2000);
      } else if (response?.message === "OTP expired") {
        setSuccess(false); // Show failure message
        setErrorMessage("OTP has expired. Please request a new one.");
      } else {
        setSuccess(false); // Show failure message
        setErrorMessage(response?.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setSuccess(false); // In case of error
      setErrorMessage("Something went wrong. Please try again.");
    }
  
    setShowTopMessage(true); 
    setIsSubmitting(false); 
  };
  

  const ResendOtps = async (e) => {
    e.preventDefault();
    console.log(email);
  
    if (!email) {
      setErrorMessage("Please enter your email.");
      return;
    }
  
    try {
      const res = await forgottenPassword({ email });
  
      if (res?.message) {
        toast.success(res.message, { position: "top-right", autoClose: 3000 });
        console.log("Response:", res);
        setErrorMessage(res.message); 
  
        // Set expiry time from response
        setExpiryTime(res.expired_at); 
      } else {
        setErrorMessage("OTP resent successfully!");
      }
    } catch (err) {
      console.error("Resend OTP Error:", err);
      setErrorMessage(err.response?.message || "Something went wrong. Please try again.");
    }
  };
  return (
    <>
      {isLoading && <Loader />}

      <div className="section-full site-bg-white my-5">
        <div className="container-fluid pt-5 mt-5">
          <div className="row justify-content-center">
            <div className="col-xl-4 col-lg-6 col-md-7">
              <div className="twm-log-reg-form-wrap">
                <div className="twm-log-reg-inner">
                  <div className="twm-log-reg-head">
                    <span className="log-reg-form-title">Verify Reset OTP</span>
                  </div>

                  {/* Show email where OTP was sent */}
                  <p className="text-center">OTP sent to: <strong>{email}</strong></p>

                  <form onSubmit={handleOtpVerification}>
                    {/* OTP input field */}
                    <div className="form-group mb-3 text-center">
                      <PinInput
                        length={6}
                        type="numeric"
                        inputMode="numeric"
                        style={{ display: "flex", justifyContent: "center", gap: "10px" }}
                        inputStyle={{
                          border: "1px solid #ced4da",
                          borderRadius: "8px",
                          width: "45px",
                          height: "50px",
                          fontSize: "22px",
                          textAlign: "center",
                          backgroundColor: "#fff",
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                        onChange={(value) => setOtp(value)}
                        onComplete={(value) => setOtp(value)}
                      />
                    </div>

                    {/* Show OTP Message Alert */}
                    {showTopMessage && (
                      <div
                        className={`alert ${success ? "alert-success" : "alert-danger"}`}
                        style={{
                          padding: "15px",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                          maxWidth: "400px",
                          margin: "10px auto",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span
                            style={{
                              fontSize: "18px",
                              fontWeight: "bold",
                              color: success ? "#155724" : "#721c24",
                            }}
                          >
                            {success ? "✅" : "⚠️"}
                          </span>
                          <span>{success ? "OTP verified successfully!" : errorMessage}</span>
                        </div>
                        <button
                          type="button"
                          className="btn-close"
                          aria-label="Close"
                          onClick={() => setShowTopMessage(false)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "18px",
                            color: success ? "#155724" : "#721c24",
                          }}
                        >
                          ✖
                        </button>
                      </div>
                    )}

                    {/* Verify OTP Button */}
                    <div className="form-group">
                      <button type="submit" className="site-button" disabled={isSubmitting || otp.length !== 6}>
                        {isSubmitting ? "Verifying..." : "Verify OTP"}
                      </button>
                    </div>

                    {/* Resend OTP Link */}
                    <div className="text-center mt-3">
                    {expiryTime && (
                  <p className="text-center text-danger">
                    OTP expires in: <strong>{expiryTime}</strong>
                  </p>
                )}
                      <button
                        type="button"
                        className="btn btn-link"
                        onClick={ResendOtps}
                      >
                        Didn&apos;t receive OTP? Resend
                      </button>
                    </div>

                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyResetOtp;
