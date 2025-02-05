import axios from "axios";
import { createContext, useState } from "react";



export const PostMessagesContext = createContext(null);


export const PostMessagesProvider = ({ children }) => {
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");


    // TODO: PULL LOGGEDIN USER ID AND RECEIPIENT USER ID AND ATTACH TO THE PAYLOAD AND URL

    const postMessageUrl = `${process.env.REACT_APP_PASE_URL}`

    const sendMessage = async () => {
        setError("");
        setSuccess("");

        try {
            const res = await axios.post(postMessageUrl, { message });
            console.log("post-res", res)

            setSuccess("message sent successfully");
        } catch (error) {
            setError(error?.message || " An error occurred while sending a message")
        }
    }


    const value = {
			success,
			setMessage,
			error,
			sendMessage,
		};

    return (
			<PostMessagesContext.Provider value={value}>
				{children}
			</PostMessagesContext.Provider>
		);

}
