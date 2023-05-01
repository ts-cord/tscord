import { ILocalizations } from "./ILocalizations";
import { ContextMenuTypes } from "../props/ContextMenuTypes";

export interface ContextMenuData {
    name: string | undefined;
    type: ContextMenuTypes | undefined;
    name_localizations?: ILocalizations;
    dm_permission?: boolean;
    default_member_permissions?: number;
};