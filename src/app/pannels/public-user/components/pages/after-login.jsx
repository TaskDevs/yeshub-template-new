import { NavLink, useNavigate } from "react-router-dom";
import JobZImage from "../../../../common/jobz-img";
import {
  canRoute,
  candidate,
  empRoute,
  employer,
  publicUser,
} from "../../../../../globals/route-names";
import Loader from "../../../../common/loader";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { GlobalApiData } from "../../../../context/global/globalContextApi";
import { useContext } from "react";

function AfterLoginPage() {
  const {
    isLoading,
    setIsLoading,
    roleOption,
    setRoleOption,
    isVisible,
    setIsVisible,
    isSubmitting,
    setIsSubmitting,
  } = useContext(GlobalApiData);
  return <></>;
}

export default AfterLoginPage;