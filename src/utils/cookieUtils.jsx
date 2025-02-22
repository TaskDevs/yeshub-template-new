import Cookies from "universal-cookie";
const cookies = new Cookies();

const cookieMethods = {
    // setCookies: (accessToken, refreshToken) => {
    //     // Store both tokens in cookies
    //     cookies.set("accessToken", accessToken);
    //     cookies.set("refreshToken", refreshToken);
    // }
    // 
    setCookies: (accessToken, refreshToken) => {
        cookies.set("accessToken", accessToken, { path: "/", secure: true, sameSite: "strict" });
        cookies.set("refreshToken", refreshToken, { path: "/", secure: true, sameSite: "strict" });
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
        cookies.remove("accessToken", { path: "/", secure: true, sameSite: "strict" });
        cookies.remove("refreshToken", { path: "/", secure: true, sameSite: "strict" });
    },
    
};

export default cookieMethods;