import Swal from "sweetalert2";
import { createSample, parsedNewEvent, removeEmptyAndUndefined } from "utils";
import {
  AuthService,
  DashboardService,
  ProducersService,
  FarmsService,
  RolesService,
  SamplesService,
  UserService,
  UsersService,
  ProcessService,
  EventsService,
} from "./service";

const basicAuthHeader = {
  ApiKey: "abbd3684-b51e-4397-b272-6d17294c332e",
};

const tokenAuthHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});

function addInterceptors(HTTPClient) {
  HTTPClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status === 401) {
        Swal.fire({
          title: "Sesión expirada",
          text: "Para continuar, inicie sesión de nuevo",
          icon: "error",
          confirmButtonText: "Iniciar Sesión",
        }).then(() => {
          document.cookie = "cacao= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
          window.location.replace("/");
        });
        return Promise.reject();
      }
      return Promise.reject(error);
    }
  );
}

const loginApi = (body) =>
  AuthService()
    .request({
      method: "post",
      url: "login",
      data: body,
      headers: basicAuthHeader,
    })
    .then(({ data }) => data.token);

const recoverPassword = (body) =>
  AuthService()
    .request({
      method: "post",
      url: "recover-password",
      data: body,
      headers: basicAuthHeader,
    })
    .then(({ data }) => data.token);

const checkResetPassword = (token) =>
  AuthService()
    .request({
      method: "get",
      url: `reset-password/${token}`,
      headers: basicAuthHeader,
    })
    .then(({ data }) => data);

const resetPassword = (body, token) =>
  AuthService()
    .request({
      method: "post",
      url: `reset-password/${token}`,
      data: body,
      headers: basicAuthHeader,
    })
    .then(({ data }) => data.token);

const validToken = (token) =>
  AuthService()
    .request({
      method: "get",
      url: "validToken",
      headers: tokenAuthHeader(token),
    })
    .then(({ data }) => data.token);

const getDashboardInfo = (token) =>
  DashboardService()
    .request({
      method: "get",
      url: "",
      headers: tokenAuthHeader(token),
    })
    .then(({ data }) => data);

const getInfoUser = (token) => {
  const HTTPClient = UserService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "get",
    url: "me",
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const addUser = (body, token) => {
  const HTTPClient = UserService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "post",
    url: "register",
    data: body,
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const modifyUser = (id, body, token) => {
  const HTTPClient = UserService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "put",
    url: `/${id}`,
    data: body,
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const updateInfo = (body, token) => {
  const HTTPClient = UserService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "put",
    url: "/me",
    data: body,
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const updatePassword = (body, token) => {
  const HTTPClient = UserService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "put",
    url: "/update-password",
    data: body,
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const fetchUsers = (token, url = "") => {
  const HTTPClient = UsersService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "get",
    url,
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const fetchOwners = (token) => {
  const HTTPClient = UsersService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "get",
    url: "?hasFilter=true&app=true",
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const fetchRoles = () => {
  const HTTPClient = RolesService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "get",
    url: "",
    headers: basicAuthHeader,
  }).then(({ data }) => data);
};

const fetchProducers = (token) => {
  const HTTPClient = ProducersService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "get",
    url: "",
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const fetchProducer = (id, token) => {
  const HTTPClient = ProducersService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "get",
    url: `/${id}`,
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const addProducer = (body, token) => {
  const HTTPClient = ProducersService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "post",
    url: "",
    data: removeEmptyAndUndefined(body),
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const editProducer = (id, body, token) => {
  const HTTPClient = ProducersService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "put",
    url: `/${id}`,
    data: removeEmptyAndUndefined(body),
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const fetchFarms = (token) => {
  const HTTPClient = FarmsService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "get",
    url: "",
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const addFarm = (body, token) => {
  const HTTPClient = FarmsService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "post",
    url: "",
    data: removeEmptyAndUndefined(body),
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const editFarm = (id, body, token) => {
  const HTTPClient = FarmsService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "put",
    url: `/${id}`,
    data: removeEmptyAndUndefined(body),
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const fetchSamplesStates = (token) => {
  const HTTPClient = SamplesService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "get",
    url: "/states",
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const fetchSamples = (token) => {
  const HTTPClient = SamplesService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "get",
    url: "",
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const fetchSamplesReady = (token) => {
  const HTTPClient = SamplesService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "get",
    url: "/ready-to-test",
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const fetchSample = (id, token) => {
  const HTTPClient = SamplesService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "get",
    url: `/${id}`,
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const addSample = (body, token) => {
  const HTTPClient = SamplesService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "post",
    url: "",
    data: createSample(body),
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const editSample = (id, body, token) => {
  const HTTPClient = SamplesService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "put",
    url: `/${id}`,
    data: body,
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const updateProcess = (id, body, token) => {
  const HTTPClient = ProcessService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "put",
    url: `/${id}`,
    data: removeEmptyAndUndefined(body),
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const fetchEvents = (token) => {
  const HTTPClient = EventsService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "get",
    url: "",
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const fetchEvent = (id, token) => {
  const HTTPClient = EventsService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "get",
    url: `/${id}`,
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const createEvent = (body, token) => {
  const HTTPClient = EventsService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "post",
    url: "",
    data: parsedNewEvent(removeEmptyAndUndefined(body)),
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

const fetchReport = (id, token) => {
  const HTTPClient = SamplesService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: "get",
    url: `/report?id=${id}`,
    headers: tokenAuthHeader(token),
  }).then(({ data }) => data);
};

export {
  loginApi,
  checkResetPassword,
  updatePassword,
  recoverPassword,
  resetPassword,
  validToken,
  fetchRoles,
  fetchUsers,
  fetchOwners,
  getDashboardInfo,
  getInfoUser,
  addUser,
  modifyUser,
  updateInfo,
  fetchProducers,
  fetchProducer,
  addProducer,
  editProducer,
  fetchFarms,
  addFarm,
  editFarm,
  fetchSamplesStates,
  fetchSamples,
  fetchSamplesReady,
  fetchSample,
  addSample,
  editSample,
  updateProcess,
  fetchEvents,
  fetchEvent,
  createEvent,
  fetchReport,
};
