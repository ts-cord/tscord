import { AxiosInstance, default as axios } from "axios";
import { DISCORD_API_URL as DiscordAPIURL } from "./constants.json";

/** Base for all requests */

export const rest: AxiosInstance = axios.create({
    baseURL: DiscordAPIURL
});