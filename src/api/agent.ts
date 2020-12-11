import axios, { AxiosResponse } from 'axios';
import { ILoginFormInput } from './../models/loginFormInput';
import { RegisterParams } from './../models/registerFormInputs';
import { IUserPayload } from './../redux/refucers/userReducer';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Users = {
  getCurrent: (): Promise<IUserPayload> => requests.get('/users/current'),
  isUnique: (username: string): Promise<boolean> => requests.get(`/users/${username}`),
  login: (loginInput: ILoginFormInput): Promise<IUserPayload> =>
    requests.post('/users/login', loginInput),
  register: (registerInput: RegisterParams): Promise<IUserPayload> =>
    requests.post('/users/register', registerInput),
};

export default { Users };
