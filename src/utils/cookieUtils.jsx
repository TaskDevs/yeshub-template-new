import Cookies from "universal-cookie";
const cookies = new Cookies();

const cookieMethods = {
    setCookies: (accessToken, refreshToken) => {
        // Store both tokens in cookies
        cookies.set("accessToken", accessToken);
        cookies.set("refreshToken", refreshToken);
    },
    getCookies: () => {
        // Retrieve both tokens from cookies
        let data = {
            accessToken: cookies.get("accessToken"),
            refreshToken: cookies.get("refreshToken"),
        };
        return data;
    },
    deleteCookies: () => {
        // Remove both tokens from cookies
        cookies.remove("accessToken");
        cookies.remove("refreshToken");
    },
};

export default cookieMethods;
