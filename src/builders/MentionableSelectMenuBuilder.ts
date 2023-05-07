import { MentionableSelectMenuData, SelectMenuTypes } from "../types";
import { BasicSelectMenuBuilder } from "./BasicSelectMenuBuilder";

export class MentionableSelectMenuBuilder extends BasicSelectMenuBuilder {
    data: Partial<MentionableSelectMenuData>;

    constructor(data: Partial<MentionableSelectMenuData>) {
        super(data);

        this.data = { ...data, type: SelectMenuTypes.MentionableSelect as SelectMenuTypes.MentionableSelect };
    };
};