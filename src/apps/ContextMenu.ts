import { IContextMenu } from "../interfaces/IContextMenu";
import { ILocalizations } from "../interfaces/ILocalizations";
import { IContextMenuTypes } from "../interfaces/IContextMenuTypes";

export class ContextMenu {
    data: IContextMenu = { name: undefined, type: undefined };

    setName(name: string): ContextMenu {
        this.data.name = name;

        return this;
    };
    setType(type: 'User' | 'Message' | number): ContextMenu {
        this.data.type = ({ User: 2, Message: 3 }[type as keyof IContextMenuTypes] ?? type);

        return this;
    };
    setNameLocalizations(localizations: ILocalizations): ContextMenu {
        this.data.name_localizations = localizations;

        return this;
    };
    setDmPermission(permission: boolean): ContextMenu {
        this.data.dm_permission = permission;

        return this;
    };
    setDefaultMemberPermissions(permissions: number): ContextMenu {
        this.data.default_member_permissions = permissions;

        return this;
    };
    JSON(): IContextMenu {
        return this.data;
    };

    static MaxContextMenusPerApplication: number = 10;
};