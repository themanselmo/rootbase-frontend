import axios from "axios";

const API_URL = "/";

const register = async (userData) => {
  const response = await axios.post(API_URL + "organizations", userData);
  if (response.data) {
    localStorage.setItem("organization", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("organization", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("organization");
};

const authService = { register, logout, login };

export default authService;
