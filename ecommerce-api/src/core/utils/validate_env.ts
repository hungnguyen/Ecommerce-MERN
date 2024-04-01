import { cleanEnv, str } from 'envalid';

export const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    MONGODB_URI: str(),
  });
};