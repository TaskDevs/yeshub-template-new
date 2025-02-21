import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../../../common/loader";
import { GlobalApiData } from "../../../../context/global/globalContextApi";
import { changePassword } from "../../../../context/auth/authApi";
import toast from 'react-hot-toast';
function ResetPasswordPage() {
  const { isLoading } = useContext(GlobalApiData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get email from previous page OR from localStorage if refreshed
  const email = location.state?.email || localStorage.getItem("verifyEmail") || "";

  // If no email, redirect to login
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showTopMessage, setShowTopMessage] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowTopMessage(false);

  
    if (!password || !confirmPassword) {
      setErrorMessage("Please fill both password fields.");
      setShowTopMessage(true);
      setIsSubmitting(false);
      return;
    }
  
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setShowTopMessage(true);
      setIsSubmitting(false);
      return;
    }
  
    try {
      const response = await changePassword({
        email,
        password,
        password_confirmation: confirmPassword,
      });
  
      if (response.success) {
        setSuccess(true);
        setErrorMessage(""); // Clear error message
        toast.success(response.message, { position: "top-right", autoClose: 3000 });
        setTimeout(() => navigate("/login"), 2000); // Redirect after successful password reset
      } else {
        setSuccess(false);
        setErrorMessage(response.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setSuccess(false);
      setErrorMessage("Something went wrong. Please try again.");
    }
  
    setShowTopMessage(true);
    setIsSubmitting(false);
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
                    <span className="log-reg-form-title">Reset Password</span>
                  </div>

                  {/* Show email where OTP was sent */}
                  <form onSubmit={handlePasswordReset}>
                    {/* Password input */}
                    <div className="form-group mb-3">
                      <label htmlFor="password">New Password</label>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter your new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    {/* Confirm password input */}
                    <div className="form-group mb-3">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        placeholder="Confirm your new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>

                    {/* Show Message Alert */}
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
                          <span>{success ? "Password reset successfully!" : errorMessage}</span>
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


                    {/* Submit Button */}
                    <div className="form-group">
                      <button
                        type="submit"
                        className="site-button"
                        disabled={isSubmitting || password.length < 6 || confirmPassword.length < 6}
                      >
                        {isSubmitting ? "Resetting..." : "Reset Password"}
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

export default ResetPasswordPage;
