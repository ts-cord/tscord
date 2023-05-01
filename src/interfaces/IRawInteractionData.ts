import { IMessage } from "./IMessage";
import { RawUserData } from "./IRawUserData";
import { RawGuildData } from "./IRawGuildData";
import { Snowflake } from "../types/Snowflake";
import { GuildMemberData } from "./IGuildMemberData";
import { IInteractionData } from "./IInteractionData";
import { InteractionTypes } from "../props/InteractionTypes";

export interface RawInteractionData {
    id: Snowflake;
    application_id: Snowflake;
    type: InteractionTypes;
    data?: IInteractionData;
    guild: RawGuildData;
    channel_id?: Snowflake;
    member?: GuildMemberData;
    user?: RawUserData;
    token: string;
    version: number;
    message?: IMessage;
    app_permissions?: string;
    locale?: string;
    guild_locale?: string;
};