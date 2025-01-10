import axios from "./axios";

interface UserRequest {
  userId: string
  username: string;
  password: string;
  image?: string;
  role?: "USER" | "ADMIN";
}

export const editUsersRequest = (user: UserRequest) => {
  return axios.put(`/user/`, user);
};

