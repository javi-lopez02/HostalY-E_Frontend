import axios from "./axios";

export const getOfertsRequest = () => {
  return axios.get(`/oferts`);
};