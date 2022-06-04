import axios from 'axios';

const API_URL = '/';

// Get task comments
const getTaskComments = async (taskId) => {
  const response = await axios.get(API_URL + `comments/${taskId}`);

  return response.data;
};

// Create task comment
const createTaskComment = async (taskCommentData) => {
  const response = await axios.post(API_URL + `comments`, taskCommentData);

  return response.data;
};

const commentService = {
  getTaskComments,
  createTaskComment
};

export default commentService;
