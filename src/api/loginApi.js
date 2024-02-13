import axios from "axios";

const API_SESSION = 'http://localhost:8080/api/session';

export const login = async (user) => {
    try {
        const res = await axios.post(`${API_SESSION}/login`, user);
        console.log(res);
    } catch (error) {
        console.error(error);
    }
}
