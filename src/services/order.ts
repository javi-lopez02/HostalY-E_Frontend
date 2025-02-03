import axios from "./axios";

export const getOrderRequest = () => {
  return axios.get(`products/order`);
};

export const addItemOfertRequest = (id: string, quantity: number) => {
  return axios.post(`oferts/order?p=${id}`, {quantity});
};

export const addItemGastronomicRequest = (id: string, quantity: number) => {
  return axios.post(`gastronomics/order?p=${id}`, {quantity});
};

export const addItemDessertRequest = (id: string, quantity: number) => {
  return axios.post(`desserts/order?p=${id}`, {quantity});
};

export const updateGastronomicItemRequest = (id: string, quantity: number, price: number) => {
  return axios.put(`gastronomic/order?p=${id}`, {quantity, price});
};

export const updateDessertItemRequest = (id: string, quantity: number, price: number) => {
  return axios.put(`dessert/order?p=${id}`, {quantity, price});
};

export const updateOrderRequest = (id: string) => {
  return axios.put(`/order?p=${id}`)
}

export const deleteOrderItemRequest = (id: string) => {
  return axios.delete(`products/order?p=${id}`);
};