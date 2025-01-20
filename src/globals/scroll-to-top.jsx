import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { applyDefaultSkinStyle } from "./constants";


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });


    applyDefaultSkinStyle();
  }, [pathname]);

  return null;
};

export default ScrollToTop;

