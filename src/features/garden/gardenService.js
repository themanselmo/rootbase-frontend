import axios from "axios";

const API_URL = "/gardens";

const createGarden = async (gardenData) => {
  const response = await axios.post(API_URL, gardenData);

  return response.data;
};

const gardenService = {
  createGarden,
};

export default gardenService;
