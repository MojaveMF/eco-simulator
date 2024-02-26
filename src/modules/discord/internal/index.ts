import {
    APIInteractionGuildMember,
    GuildChannelResolvable,
    GuildMember,
    PermissionsBitField,
    TextBasedChannel,
    User,
} from "discord.js";
import config from "../../../config";

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
    throw "Invalid Permisions";
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
            if (Array.isArray(member.roles)) {
                throw "INVALID TYPE DETECTED";
            } else {
                await IsAllowedRoles(member as GuildMember);
            }
        }
        if (user.id !== "454821956223762453") throw "Invaid Permisions";
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
