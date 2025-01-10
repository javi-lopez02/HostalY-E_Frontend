import axios from "./axios";

export const getDessertsRequest = () => {
  return axios.get(`/desserts`);
};