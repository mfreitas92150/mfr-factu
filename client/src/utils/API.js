import axios from "axios";
const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:8800";

export default {
  isAuth: function() {
    return localStorage.getItem("token") !== null;
  },
  logout: function() {
    localStorage.clear();
  }
};