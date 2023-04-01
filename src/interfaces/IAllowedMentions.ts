export interface IAllowedMentions {
    parse?: ('roles' | 'users' | 'everyone')[],
    roles?: string[],
    users?: string[],
    replied_user?: boolean
};