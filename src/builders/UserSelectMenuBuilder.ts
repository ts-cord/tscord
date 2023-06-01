import { SelectMenuTypes, UserSelectMenuData } from "../types";
import { BasicSelectMenuBuilder } from "./BasicSelectMenuBuilder";

export class UserSelectMenuBuilder extends BasicSelectMenuBuilder {
	data: Partial<UserSelectMenuData>;

	constructor(data: Partial<UserSelectMenuData>) {
		super(data);

		this.data = { ...data, type: SelectMenuTypes.UserSelect };
	}
}