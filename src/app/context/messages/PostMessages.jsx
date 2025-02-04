import axios from "axios";
import { createContext, useState } from "react";



export const PostMessagesContext = createContext(null);


export const PostMessagesProvider = ({ children }) => {
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");


    const postMessageUrl = `${process.env.REACT_APP_PASE_URL}`

    const sendMessage = async () => {
        try {
            const res = await axios.post(postMessageUrl, { message });
            console.log("post-res", res)
        } catch (error) {
            
        }
    }
    
}
