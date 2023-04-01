import { SlashCommandGlobalMethods } from "./SlashCommandGlobalMethods";
import { ISlashCommandOptions } from "../../interfaces/ISlashCommandOptions";

export interface SlashCommandSubcommandOptionMethods extends SlashCommandGlobalMethods {
    options?: ISlashCommandOptions[]
};