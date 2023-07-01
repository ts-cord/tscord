import { RawApplication } from "./application";
import { UnavailableGuildData } from "./guild";
import { RawDiscordAPIUserData } from "./user";

export interface BasicEventPayload<T = object> {
    op: GatewayOpcodes;
    s: number | null;
    t: string | null;
    d: T;
}

export enum GatewayOpcodes {
    Discpatch,
    Heartbeat,
    Identity,
    PresenceUpdate,
    VoiceStateUpdate,
    Resume,
    Reconnect,
    RequestGuildMembers,
    InvalidSession,
    Hello,
    HeartbeatACK
}

export interface BasicDispatchPayload {
    d: unknown;
    op: GatewayOpcodes;
    s: number;
    t: string;
}

export interface ReadyEventPayload extends BasicDispatchPayload {
    d: {
        v: number;
        user: RawDiscordAPIUserData;
        guilds: UnavailableGuildData[];
        session_id: string;
        resume_gateawy_url: string;
        shard?: [number, number];
        application: Pick<RawApplication, "id" | "flags">;
    };
    t: "Ready"
}

export interface TypeCordError {
    message: string;
    options?: ErrorOptions;
    code: number;
}