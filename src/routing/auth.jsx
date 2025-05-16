// utils/auth.js
export function isAuthenticated() {
  return !!sessionStorage.getItem("authToken");
}
