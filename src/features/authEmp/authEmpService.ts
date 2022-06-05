import axios from 'axios';

const API_URL = '/';

const registerEmp = async (employee: any) => {
  const response = await axios.post(API_URL + 'employees', employee);

  if (response.data) {
    response.data = {
      ...response.data.employee,
      avatar: response.data.avatar_url
    };

    localStorage.setItem('employee', JSON.stringify(response.data));
  }

  return response.data;
};

const loginEmp = async (userData: any) => {
  const response = await axios.post(API_URL + 'login_employee', userData);

  if (response.data) {
    response.data = {
      ...response.data.employee,
      avatar: response.data.avatar_url
    };

    localStorage.setItem('employee', JSON.stringify(response.data));
  }

  return response.data;
};

const logoutEmp = async () => {
  await axios.delete(API_URL + 'logout_employee');
  localStorage.removeItem('employee');
  return;
};

const editEmp = async (userData: any) => {
  const response = await axios.put(API_URL + `employees/${userData.id}`, {
    avatar: userData.avatar
  });

  if (response.data) {
    localStorage.setItem('employee', JSON.stringify(response.data));
  }

  return response.data;
};

const authEmpService = { registerEmp, logoutEmp, loginEmp, editEmp };

export default authEmpService;
