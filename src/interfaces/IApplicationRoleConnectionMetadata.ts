import { ILocalizations } from "./ILocalizations";
import { ApplicationRoleConnectionMetadataTypes } from "../props/ApplicationRoleConnectionMetadataTypes";

export interface ApplicationRoleConnectionMetadata {
    type: ApplicationRoleConnectionMetadataTypes;
    key: string;
    name: string;
    name_localizations?: ILocalizations;
    description: string;
    description_localizations?: ILocalizations;
};