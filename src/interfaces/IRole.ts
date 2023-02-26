import { IRoleTags } from "./IRoleTags";

export interface IRole {
    id: string,
    name: string,
    color: number,
    hoist: boolean,
    icon?: string,
    unicode_emoji?: string,
    position: number,
    permissions: string,
    managed: boolean,
    mentionable: boolean,
    tags?: IRoleTags
};