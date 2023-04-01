export interface IEditThreadOptions {
    name?: string,
    archived?: boolean,
    auto_archive_duration?: boolean,
    locked?: boolean,
    invitable?: boolean,
    rate_limit_per_user?: number,
    flags?: {
        PINNED?: number,
        REQUIRE_TAG?: number
    },
    applied_tags?: string[]
};