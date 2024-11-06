import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  DATE_NAGER_API_BASE_URL: get('DATE_NAGER_API_BASE_URL').required().asUrlString(),
  COUNTRIES_NOW_API_BASE_URL: get('COUNTRIES_NOW_API_BASE_URL').required().asUrlString(),
};
