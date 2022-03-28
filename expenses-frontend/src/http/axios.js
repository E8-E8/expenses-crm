import axios from "axios";

let jwt = localStorage.getItem("jwt");
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export default api;
