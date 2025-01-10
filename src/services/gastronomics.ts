import axios from "./axios";

export const getGastronomicsRequest = () => {
  return axios.get(`/gastronomics`);
};