import axios from "axios";

const axiosJsonParams = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(
    `/user/login`,
    { email, password },
    axiosJsonParams
  );
  localStorage.setItem("token", response.data.token);
};

export const signup = async (email: string, password: string) => {
  await axios.post(`/user/signup`, { email, password }, axiosJsonParams);
};

export const isAuth = () => {
  return localStorage.getItem("token") !== null;
};

export const logout = () => {
  localStorage.clear();
};
