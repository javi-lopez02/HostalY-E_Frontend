import axios from "./axios";

export const getEventsRequest = () => {
  return axios.get(`/events`);
};