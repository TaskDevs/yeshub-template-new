import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children, roleProp }) {
  const navigate = useNavigate();
  // const errorMessage = () =>
  //     toast(" User Unauthenticated!, login");
  //  const roleErrorMessage = () => toast(" User Unauthorized!");

  // useEffect(() => {
  // 	const isLoggedIn = sessionStorage.getItem("user");
  //     if (!isLoggedIn) {
  //         errorMessage();
  // 		navigate("/");
  // 	}
  // }, [navigate]);

  // useEffect(() => {
  //     if (!user) return;
  // 	const role = user.role;

  //     if (role !== roleProp) {
  //         roleErrorMessage();
  // 		navigate("/");
  // 	}
  // }, [navigate, roleProp, user]);

  return <>{children}</>;
}
