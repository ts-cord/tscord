import { RoleSelectMenuData, SelectMenuTypes } from "../types";
import { BasicSelectMenuBuilder } from "./BasicSelectMenuBuilder";

export class RoleSelectMenuBuilder extends BasicSelectMenuBuilder {
    data: Partial<RoleSelectMenuData>;

    constructor(data: Partial<RoleSelectMenuData>) {
        super(data);

        this.data = { ...data, type: SelectMenuTypes.RoleSelect as SelectMenuTypes.RoleSelect };
    }
}