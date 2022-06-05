import axios from 'axios';

const API_URL = '/';

// Create standard task
const createTask = async (taskData: any) => {
  const response = await axios.post(API_URL + `tasks`, taskData);

  return response.data;
};

// Update standard task
const updateTask = async (taskData: any) => {
  const response = await axios.put(API_URL + `tasks/${taskData.id}`, taskData);

  return response.data;
};

// Get garden tasks
const getGardenTasks = async (gardenId: any) => {
  const response = await axios.get(API_URL + `gardens/${gardenId}`);

  if (response.data && response.data.tasks) {
    return response.data.tasks;
  }

  return response.data;
};

// Create garden task
const createGardenTask = async (gardenTaskData: any) => {
  const response = await axios.post(API_URL + `garden_tasks`, gardenTaskData);

  return response.data;
};

// Get employee tasks
const getEmpTasks = async () => {
  const response = await axios.get(API_URL + `my_tasks`);
  if (response.data) {
    return response.data.map((taskResponse: any) => taskResponse.task);
  }
  return response.data;
};

// Create employee task
const createEmpTask = async (empTaskData: any) => {
  const response = await axios.post(API_URL + `employee_tasks`, empTaskData);

  return response.data;
};

const taskService = {
  getGardenTasks,
  getEmpTasks,
  createGardenTask,
  createTask,
  updateTask,
  createEmpTask
};

export default taskService;
