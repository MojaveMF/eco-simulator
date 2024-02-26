import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { User } from "../../ecosim";
import { number } from "zod";
import { DAY, SECCOND, WEEK } from "../../ecosim/users/moderation";

function ModerationId(id: number, duration: number): string {
    return `moderate:${id}:${duration}`;
}

export default async function CreateModerationRow(
    user: User
): Promise<ActionRowBuilder<ButtonBuilder>> {
    const WarningButton = new ButtonBuilder()
        .setLabel("Warning")
        .setEmoji("😥")
        .setCustomId(ModerationId(user.id, SECCOND))
        .setStyle(ButtonStyle.Danger);

    const DayBanButton = new ButtonBuilder()
        .setLabel("One Day")
        .setEmoji("🥲")
        .setCustomId(ModerationId(user.id, DAY))
        .setStyle(ButtonStyle.Danger);

    const WeekBanButton = new ButtonBuilder()
        .setLabel("One Week")
        .setEmoji("😭")
        .setCustomId(ModerationId(user.id, WEEK))
        .setStyle(ButtonStyle.Danger);

    const TerminateButton = new ButtonBuilder()
        .setLabel("Terminate")
        .setEmoji("☠️")
        .setCustomId(ModerationId(user.id, -1))
        .setStyle(ButtonStyle.Danger);

    const RemoveModeration = new ButtonBuilder()
        .setLabel("Remove Moderation")
        .setEmoji("😁")
        .setCustomId(`unmoderate:${user.id}`)
        .setStyle(ButtonStyle.Primary);

    return new ActionRowBuilder<ButtonBuilder>().setComponents(
        WarningButton,
        DayBanButton,
        WeekBanButton,
        TerminateButton,
        RemoveModeration
    );
}

export async function CreateModeratedRow(user: User) {
    const Label = new ButtonBuilder()
        .setLabel("Moderated")
        .setStyle(ButtonStyle.Secondary)
        .setCustomId("ignore")
        .setDisabled(true);

    const RemoveModeration = new ButtonBuilder()
        .setLabel("Undo")
        .setEmoji("🔁")
        .setCustomId(`unmoderate:${user.id}`)
        .setStyle(ButtonStyle.Primary);

    return new ActionRowBuilder<ButtonBuilder>().setComponents(Label, RemoveModeration);
}

export async function CreateUnModerateRow(user: User) {
    const Label = new ButtonBuilder()
        .setLabel("Liberated")
        .setStyle(ButtonStyle.Secondary)
        .setCustomId("ignore")
        .setDisabled(true);

    const RedoModeration = new ButtonBuilder()
        .setLabel("Moderate")
        .setCustomId(`moderation:${user.id}`)
        .setStyle(ButtonStyle.Danger);

    return new ActionRowBuilder<ButtonBuilder>().setComponents(Label, RedoModeration);
}
