import dotenv from 'dotenv';

dotenv.config();

export const envs = {
  PORT: process.env.PORT as string,
  API_URL: process.env.API_URL as string,
  API_KEY: process.env.API_KEY as string,
};
