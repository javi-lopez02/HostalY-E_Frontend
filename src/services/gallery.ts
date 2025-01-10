import axios from "./axios";

export const getGalleryRequest = () => {
  return axios.get(`/gallery`);
};