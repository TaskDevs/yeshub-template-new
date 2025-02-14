import Cookies from "universal-cookie"
const cookies = new Cookies()

const cookieMethods = {
    setCookies: (accessToken) => {
        cookies.set("accessToken", accessToken)
    },
    getCookies: () => {
        let data = {
            accessToken: cookies.get("accesstoken")
        }
        return data
    },
    deleteCookies: () => {
        cookies.remove("accessToken")
    }
}

export default cookieMethods