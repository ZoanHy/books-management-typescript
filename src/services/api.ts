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
