import axios from 'axios';

const API_URL = '/organization_employees';

// Get all organization's employees

const getOrgEmployees = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

const orgEmployeesService = { getOrgEmployees };

export default orgEmployeesService;
