import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { AuthApiData } from "../../../../context/auth/authContextApi";
import { useAuth } from "../../../../context/auth/AuthContext";

const NewAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { loginWithGoogle, loginWithLinkedIn } = AuthApiData();
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!isLogin && !formData.name) newErrors.name = "Name is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(
        isLogin ? "/api/auth/login" : "/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ general: errorData.message || "Something went wrong" });
        return;
      }

      const data = await response.json();
      login(data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error during authentication:", err);
      setErrors({ general: "Network error. Please try again." });
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const res = await loginWithGoogle(decoded);
      if (res.success) {
        login(res.token);
        navigate("/dashboard");
      } else {
        setErrors({ general: res.message || "Google login failed" });
      }
    } catch (err) {
      console.error("Google login error:", err);
      setErrors({ general: "Google login failed" });
    }
  };

  const handleGoogleError = () => {
    setErrors({ general: "Google login failed" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login to Your Account" : "Create a New Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {errors.general && (
            <p className="text-red-500 text-sm italic text-center">{errors.general}</p>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition duration-200"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="flex justify-between items-center mt-4 text-sm">
          <button
            type="button"
            className="text-green-800 hover:text-green-700"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Create an account" : "Already have an account?"}
          </button>
        </div>

        <div className="my-6 text-center text-gray-500">Or continue with</div>

        <div className="flex flex-col gap-3">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
          />

          <button
            onClick={loginWithLinkedIn}
            className="flex items-center justify-center w-full py-2 px-4 bg-[#0A66C2] text-white rounded-lg shadow-md hover:bg-[#004182] transition-colors duration-200"
          >
            <FaLinkedin className="mr-2" size={20} />
            Sign in with LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewAuthForm;
