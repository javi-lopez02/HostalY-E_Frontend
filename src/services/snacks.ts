import axios from "./axios";

export const getSnacksRequest = () => {
  return axios.get(`/snacks`);
};