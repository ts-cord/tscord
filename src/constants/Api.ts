import { DISCORD_API_URL } from "./constants.json";
import { AxiosInstance, default as axios } from "axios";

/** Base for all requests */

export const rest: AxiosInstance = axios.create({
    baseURL: DISCORD_API_URL
});