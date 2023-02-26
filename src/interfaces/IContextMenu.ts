import { ILocalizations } from "./ILocalizations";

export interface IContextMenu {
    name: string | undefined,
    type: number | undefined,
    name_localizations?: ILocalizations,
    dm_permission?: boolean,
    default_member_permissions?: number
};