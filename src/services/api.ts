import axios from "services/axios.customize";

export const loginAPI = (email: string, password: string) => {
  const urlBackend = "/api/v1/auth/login";

  const body = {
    username: email,
    password: password,
  };

  const config = {
    headers: {
      delay: 3000,
    },
  };

  return axios.post<IBackendRes<ILogin>>(urlBackend, body, config);
};

export const registerAPI = (
  fullName: string,
  email: string,
  password: string,
  phone: string
) => {
  const urlBackend = "/api/v1/user/register";

  const body = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };

  return axios.post<IBackendRes<ILogin>>(urlBackend, body);
};

export const fetchAccountAPI = () => {
  const urlBackend = "/api/v1/auth/account";

  const config = {
    headers: {
      delay: 1000,
    },
  };

  return axios.get<IBackendRes<IFetchAccount>>(urlBackend, config);
};

export const logoutAPI = () => {
  const urlBackend = "/api/v1/auth/logout";

  const config = {
    headers: {
      delay: 1000,
    },
  };

  return axios.post<IBackendRes<IRegister>>(urlBackend, config);
};

export const getUserAPI = (query: string) => {
  const urlBackend = `/api/v1/user?${query}`;

  return axios.get<IBackendRes<IModelPaginate<IUserTable>>>(urlBackend);
};

export const createUserAPI = (
  fullName: string,
  email: string,
  password: string,
  phone: string
) => {
  const urlBackend = "/api/v1/user";

  const body = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };

  return axios.post<IBackendRes<ILogin>>(urlBackend, body);
};

export const bulkCreateUserAPI = (
  users: {
    fullName: string;
    password: string;
    email: string;
    phone: string;
  }[]
) => {
  const urlBackend = "/api/v1/user/bulk-create";
  const body = users;

  return axios.post<IBackendRes<IBulkCreateUser>>(urlBackend, body);
};

export const updateUserAPI = (
  _id: string,
  fullName: string,
  email: string,
  phone: string
) => {
  const urlBackend = "/api/v1/user";
  const body = {
    _id: _id,
    fullName: fullName,
    email: email,
    phone: phone,
  };

  return axios.put<IBackendRes<IBulkCreateUser>>(urlBackend, body);
};

export const deleteUserAPI = (_id: string) => {
  const urlBackend = `/api/v1/user/${_id}`;

  return axios.delete<IBackendRes<IBulkCreateUser>>(urlBackend);
};
