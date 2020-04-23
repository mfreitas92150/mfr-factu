import axios from "axios";

const axiosJsonParams = {
  headers: {
    "Content-Type": "application/json",
  },
};
const burl = "http://localhost:8800";

export const login = async (email: string, password: string) => {
  const response = await axios.post(
    `${burl}/user/login`,
    { email, password },
    axiosJsonParams
  );
  localStorage.setItem("token", response.data.token);
  // TODO fix! we must not manipulate window when using a router
  // @ts-ignore
  window.location = "/";
};

export const isAuth = () => {
  return localStorage.getItem("token") !== null;
};

export const logout = () => {
  localStorage.clear();
};
