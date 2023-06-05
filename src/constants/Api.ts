import { AxiosInstance, default as axios } from "axios";
import { api as DiscordAPIURL } from "./constants.json";

/** Base for all requests */

export const rest: AxiosInstance = axios.create({
    baseURL: DiscordAPIURL
});