import axios from "axios";
import config from "../config/config";

const API_SESSION = config.sessionAPI; 

export const login = async (user) => {
    try {
        const res = await axios.post(`${API_SESSION}/login`, user); 
        console.log(res);
    } catch (error) {
        console.error(error);
    }
}
