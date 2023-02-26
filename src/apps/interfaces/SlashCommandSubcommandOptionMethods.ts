import { ISlashCommandOptions } from "../../interfaces/ISlashCommandOptions";
import { SlashCommandGlobalMethods } from "./SlashCommandGlobalMethods";

export interface SlashCommandSubcommandOptionMethods extends SlashCommandGlobalMethods {
    options?: ISlashCommandOptions[]
};