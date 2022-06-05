import axios from 'axios';

const API_URL = '/';

const registerOrg = async (userData: any) => {
  const response = await axios.post(API_URL + 'organizations', userData);
  if (response.data) {
    localStorage.setItem('organization', JSON.stringify(response.data));
  }
  return response.data;
};

const loginOrg = async (userData: any) => {
  const response = await axios.post(API_URL + 'login', userData);
  if (response.data) {
    localStorage.setItem('organization', JSON.stringify(response.data));
  }
  return response.data;
};

const logoutOrg = () => {
  localStorage.removeItem('organization');
};

const authService = { registerOrg, logoutOrg, loginOrg };

export default authService;
