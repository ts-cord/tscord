import { GuildMemberData } from "./IGuildMemberData";

export interface RawInviteStageInstance {
    members: GuildMemberData[];
    participant_count: number;
    speaker_count: number;
    topic: string;
};