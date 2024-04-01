import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const inspectedAxios = (baseURL) => {
  const axiosInstance = axios.create({
    baseURL,
    timeout: 45000,
  });
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const data = { ...error, errorCode: "Ops!" };
      if (error.response && error.response.status >= 500) {
        data.errorCode = "◑﹏◐";
        data.errorMessage = "Error en el servidor";
      }
      if (error.response && error.response.status === 401) {
        data.errorCode = "Error!";
      }
      if (error.response && error.response.status === 400) {
        data.errorMessage = error.response.message;
      }
      if (error.response && error.response.status === 404) {
        data.errorCode = "¯\\_(ツ)_/¯";
        data.errorMessage = "Petición perdida en el limbo";
      }
      return Promise.reject(data);
    }
  );
  return axiosInstance;
};

export const AuthService = () => axios.create({ baseURL: `${apiUrl}auth` });
export const DashboardService = () =>
  axios.create({ baseURL: `${apiUrl}dashboard` });
export const ProducersService = () => inspectedAxios(`${apiUrl}producers`);
export const FarmsService = () => inspectedAxios(`${apiUrl}farms`);
export const RolesService = () => inspectedAxios(`${apiUrl}roles`);
export const SamplesService = () => inspectedAxios(`${apiUrl}samples`);
export const ProcessService = () => inspectedAxios(`${apiUrl}process`);
export const EventsService = () => inspectedAxios(`${apiUrl}events`);
export const UserService = () => inspectedAxios(`${apiUrl}user`);
export const UsersService = () => inspectedAxios(`${apiUrl}users`);
