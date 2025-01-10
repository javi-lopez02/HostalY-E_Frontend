import axios from "./axios";

export const getDrinksRequest = () => {
  return axios.get(`/drinks`);
};