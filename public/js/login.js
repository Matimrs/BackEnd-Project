import axios from "axios";

const btn = document.getElementById('button');
const inptEmail = document.getElementById('email');
const inptPassword = document.getElementById('password');

const API_SESSION = 'http://localhost:8080/api/session';

const login = async (user) => {
    try {
        const res = await axios.post(`${API_SESSION}/login`, user);
    } catch (error) {
        console.error(error);
    }
}

btn.addEventListener('click', () => {
    if(inptEmail.value.trim() && inptPassword.value.trim()){
        const user = {
            email: inptEmail.value.trim(),
            password: inptPassword.value.trim()
        }
        login(user);
    }
});