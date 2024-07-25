import axios from 'axios';
import { envs } from './config';

export const httpClient = axios.create({
  baseURL: envs.API_URL,
  headers: {
    Authorization: envs.API_KEY,
  },
  timeout: 60000,
  withCredentials: false,
});
