import axios from "axios";

const api = axios.create({
  baseURL: "https://nodejs.rbs.md:5000/api/v1",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/";
    }
    return error;
  }
);

export default api;
