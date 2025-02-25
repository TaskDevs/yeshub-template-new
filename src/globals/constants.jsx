export const baseURL = process.env.PUBLIC_URL;
export const REACT_BASE_URL = process.env.REACT_APP_BASE_URL;
export const LOCAL_BACKEND_URL = process.env.REACT_APP_LOCAL_BACKEND_URL;
export const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
//export const BACKEND_FULL_URL = process.env.REACT_APP_BACKEND_FULL_URL;
export const HOST = window.location.hostname;
export const timeOut = { timeout: 10000 };

//RETRIEVE USER IDS
export const userId = sessionStorage.getItem("userId");
export const OAuthUserId = sessionStorage.getItem("OAuthUserId")

//STATUS CODE
export const SUCCESS_STATUS = 201;
export const SUCCESS_STATUS_TEXT = "success";
export const BAD_REQUEST_STATUS = 401;
export const SERVER_ERROR = 500;
export const LIST_ON_PAGES = 20;

export const default_skin = "6";

export const popupType = {
  DELETE: "DELETE",
  LOGOUT: "LOGOUT",
  DELETE_PROFILE: "DELETE_PROFILE",
  DELETE_CATEGORY: "DELETE_CATEGORY",
  DELETE_EDUCATION: "DELETE_EDUCATION",
  DELETE_SKILLS: "DELETE_SKILLS",
   DELETE_PORTFOLIO: "DELETE_PORTFOLIO",
   DELETE_APPLIED_JOB: "DELETE_APPLIED_JOB",
};

export const formType = {
  LOGIN_CANDIDATE: "LOGIN_CANDIDATE",
  LOGIN_EMPLOYER: "LOGIN_EMPLOYER",
};

export function publicUrlFor(path) {
  return baseURL + "/assets/" + path;
}

export function loadScript(src, fromPublic) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement("script");

    script.src =
      fromPublic === undefined || fromPublic == null || fromPublic
        ? publicUrlFor(src)
        : src;

    script.addEventListener("load", function () {
      resolve();
    });
    script.addEventListener("error", function (e) {
      reject(e);
    });
    document.body.appendChild(script);
    document.body.removeChild(script);
  });
}

export function setMenuActive(currentpath, path) {
  return currentpath === path ? "active" : "";
}

export function applyDefaultSkinStyle() {
  updateSkinStyle(default_skin, true, false);
}

export function updateSkinStyle(skin, headerLogoLight, footerLogoLight) {
  var _skin_style = document.getElementById("skin_style");
  var _skin_header_logo = document.getElementById("skin_header_logo");
  var _skin_header_logo_light = document.getElementById(
    "skin_header_logo_light"
  );
  var _skin_footer_dark_logo = document.getElementById("skin_footer_dark_logo");
  var _skin_footer_light_logo = document.getElementById(
    "skin_footer_light_logo"
  );
  var _skin_page_logo = document.getElementById("skin_page_logo");
  var _skin_maintain_logo = document.getElementById("skin_maintain_logo");
  var _skin_header_inner_logo_12 = document.getElementById(
    "skin_header_inner_logo_12"
  );
  var _skin_header_inner_logo_15 = document.getElementById(
    "skin_header_inner_logo_15"
  );
  const _logo = publicUrlFor("images/yes-lg-2.png");
  const _logo_light = publicUrlFor("images/yes-lg-2.png");
  const _logo_white = publicUrlFor("images/yes-lg-2.png");

  if (_skin_style)
    _skin_style.href = publicUrlFor("css/skins-type/skin-" + skin + ".css");

  if (_skin_header_logo) _skin_header_logo.src = _logo;

  if (_skin_header_logo_light)
    // initially light, on switcher change => it should change
    _skin_header_logo_light.src = headerLogoLight ? _logo_light : _logo;

  if (_skin_footer_dark_logo)
    _skin_footer_dark_logo.src = footerLogoLight
      ? _logo_white
      : publicUrlFor("images/skins-logo/logo-skin-" + skin + "-ftr.png");

  if (_skin_footer_light_logo) _skin_footer_light_logo.src = _logo;

  if (_skin_page_logo) _skin_page_logo.src = _logo;

  if (_skin_maintain_logo)
    _skin_maintain_logo.src = publicUrlFor(
      "images/skins-logo/mainten-logo-" + skin + ".png"
    );

  if (_skin_header_inner_logo_12)
    _skin_header_inner_logo_12.src = publicUrlFor(
      "images/skins-logo/yes-lg-2.png"
    );

  if (_skin_header_inner_logo_15)
    _skin_header_inner_logo_15.src = publicUrlFor(
      "images/skins-logo/yes-lg-2.png"
    );
}
