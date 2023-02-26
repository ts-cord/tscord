import axios from 'axios';
import * as constants from './constants.json';

export const api = axios.create({
  baseURL: constants.api
});