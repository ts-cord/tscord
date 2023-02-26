import { IMember } from "./IMember";

export interface IInviteStageInstance {
    members: IMember[],
    participant_count: number,
    speaker_count: number,
    topic: string
};