// import axios, { AxiosResponse } from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//     accept: "application/json",
//   },
// });

// const handleResponse = (response: AxiosResponse<any>) => {
//   if (response.status === 401 || response.status === 403) {
//     // localStorage.removeItem('auth');
//     // localStorage.removeItem('token');
//     // window.location = '/signin' as any;
//   }
//   return response;
// };

// api.interceptors.request.use(async (req) => {
//   const token = JSON.parse(localStorage.getItem("token") || "");
//   req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

// api.interceptors.response.use(
//   (response) => {
//     return handleResponse(response);
//   },
//   (error) => {
//     handleResponse(error.response);
//     throw error;
//   }
// );

// export default api;

import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "https://wakeful-wrist-production.up.railway.app",
  // baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

api.interceptors.request.use(async (req) => {
  const token = JSON.parse(localStorage.getItem("token") || "");
  req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Rest of the code...

export default api;
