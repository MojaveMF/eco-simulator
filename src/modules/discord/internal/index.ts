import { APIInteractionGuildMember, GuildMember, PermissionsBitField, User } from "discord.js";
import config from "../../../config";

const DEBUG_USERS = ["454821956223762453"];

export async function ParseTime(time: string) {
    const UNIX = Math.round(Date.parse(time) / 1000);
    return `<t:${UNIX}:R>`;
}

export async function TruncateLength(str: string, length: number) {
    if (str.length <= length) return str;
    return str.substring(0, length);
}

export async function IsAllowedRoles(member: GuildMember) {
    if (member.roles.cache.hasAny(...config.Discord.Guild.AdminRoles)) return;
    throw "Invalid Permisions [MISSING ROLES]";
}

export async function IsAllowed(
    user: User,
    member: GuildMember | APIInteractionGuildMember | null,
    channelId: string | null,
    admin = false
) {
    /* Check if blud is admin */
    if (admin) {
        if (member != null) {
            if (DEBUG_USERS.includes(user.id)) return;
            if (config.Discord.Guild.AuthorizedUsers.includes(user.id)) return;

            if (Array.isArray(member.roles)) {
                throw "INVALID TYPE DETECTED";
            } else {
                await IsAllowedRoles(member as GuildMember);
            }
        }
    }
    /* Check if blud can talk */
    if (member == null || channelId == null) {
        /* Dms who give af */
        return;
    }
    if (Array.isArray(member.roles)) {
        throw "INVALID TYPE DETECTED";
    }

    const typed = member as GuildMember;
    if (!typed.permissionsIn(channelId).has(PermissionsBitField.Flags.SendMessages)) {
        throw "You cant speak in this channel";
    }
}
