import axios from "services/axios.customize";

export const loginAPI = (username: string, password: string) => {
  const urlBackend = "/api/v1/auth/login";

  return axios.post<IBackendRes<ILogin>>(urlBackend, { username, password });
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
