import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import Loader from "../loader";
import { GlobalApiData } from "../../context/global/globalContextApi";
import { SIGNINFIELD } from "../../../globals/sign-in-data";
import { login } from "../../context/auth/authApi";
import JobZImage from "../jobz-img";
import cookieMethods from "../../../utils/cookieUtils";

function SignInPopup() {
  const {
    isLoading,
    setIsLoading,
    roleOption,
    setRoleOption,
    isSubmitting,
    setIsSubmitting,
  } = useContext(GlobalApiData);

  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("rememberedUser"));
    return (
      savedUser ||
      SIGNINFIELD.fieldDetail.reduce(
        (acc, field) => {
          acc[field.name] = "";
          return acc;
        },
        { rememberMe: false }
      )
    );
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!formData.role) {
      setFormData((prev) => ({ ...prev, role: "user" }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     const response = await login(formData);
  //     if (response && response.token) {
  //       // Store token and user role
  //       sessionStorage.setItem("authToken", response.token);
  //       sessionStorage.setItem("userRole", response.role);

  //       if (formData.rememberMe) {
  //         sessionStorage.setItem("rememberedUser", JSON.stringify(formData));
  //       } else {
  //         sessionStorage.removeItem("rememberedUser");
  //       }

  //       // Redirect based on role
  //       switch (response.role) {
  //         case "admin":
  //           navigate("/admin");
  //           break;
  //         case "employer":
  //           navigate("/");
  //           break;
  //         case "user":
  //         default:
  //           navigate("/");
  //           break;
  //       }

  //       setFormData(
  //         SIGNINFIELD.fieldDetail.reduce(
  //           (acc, field) => {
  //             acc[field.name] = "";
  //             return acc;
  //           },
  //           { rememberMe: false }
  //         )
  //       );
  //     } else {
  //       console.error("Login failed: No token received");
  //     }
  //   } catch (error) {
  //     console.error("Login failed", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };


  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await login(formData);
      if (response && response.token && response.refresh_token) {
        const { token, refresh_token, role } = response;
  
        // Store both tokens in sessionStorage and cookies
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("userRole", role);
        cookieMethods.setCookies(token, refresh_token);  // Store both access and refresh tokens
  
        if (formData.rememberMe) {
          sessionStorage.setItem("rememberedUser", JSON.stringify(formData));
        } else {
          sessionStorage.removeItem("rememberedUser");
        }
  
        // Redirect based on role
        switch (role) {
          case "admin":
            navigate('/admin');
            break;
          case "employer":
            navigate('/');
            break;
          case "user":
          default:
            navigate('/');
            break;
        }
      } else {
        console.error("Login failed: No token received");
      }
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      {isLoading && <Loader />}

      {!isLoading && (
        <div
          className="modal fade twm-sign-up"
          id="sign_up_popup2"
          aria-hidden="true"
          aria-labelledby="sign_up_popupLabel2"
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title" id="sign_up_popupLabel2">
                  Login
                </h2>
                <p>Login and get access to all the features of YesHub</p>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>

              <div className="modal-body">
                <div className="twm-tabs-style-2">
                  <div className="tab-content">
                    <form
                      onSubmit={handleLogin}
                      className="tab-pane fade show active"
                    >
                      <div className="row">
                        {SIGNINFIELD?.fieldDetail?.map((field) => (
                          <div className="col-lg-12" key={field.name}>
                            <div className="form-group mb-3">
                              {field.type === "password" ? (
                                <div className="ls-inputicon-box-signup ls-inputicon-box">
                                  <input
                                    name={field.name}
                                    type={isVisible ? "text" : "password"}
                                    required
                                    className="form-control"
                                    placeholder={field.placeholder}
                                    value={formData[field.name] || ""}
                                    onChange={handleInputChange}
                                    minLength={8}
                                    maxLength={20}
                                  />
                                  <div
                                    className="eye-icon"
                                    onClick={() =>
                                      setIsVisible((prev) => !prev)
                                    }
                                    style={{
                                      position: "absolute",
                                      right: "10px",
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {isVisible ? (
                                      <IoMdEye size={20} />
                                    ) : (
                                      <IoIosEyeOff size={20} />
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <input
                                  name={field.name}
                                  type={field.type}
                                  required
                                  className="form-control"
                                  placeholder={field.placeholder}
                                  value={formData[field.name] || ""}
                                  onChange={handleInputChange}
                                />
                              )}
                            </div>
                          </div>
                        ))}

                        <div className="col-lg-12">
                          <div className="form-group mb-3">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="rememberMe"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleInputChange}
                              />
                              <label
                                className="form-check-label rem-forgot"
                                htmlFor="rememberMe"
                              >
                                Remember me{" "}
                                <a href="/forgotton-password">Forgot Password?</a>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <button
                            type="submit"
                            className="site-button"
                            data-bs-dismiss="modal"
                            disabled={isSubmitting}
                          >
                            Log in
                          </button>
                        </div>
                        <div className="mt-3 mb-3">
                          Don't have an account?
                          <button
                            className="twm-backto-login"
                            data-bs-target="#sign_up_popup"
                            data-bs-toggle="modal"
                            data-bs-dismiss="modal"
                          >
                            Sign Up
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <span className="modal-f-title">Login or Sign up with</span>
                <ul className="twm-modal-social">
                  <li>
                    <a
                      href="https://in.linkedin.com/"
                      className="linkedin-clr m-2"
                    >
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.google.com/"
                      className="google-clr m-2"
                    >
                      <i className="fab fa-google" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignInPopup;
