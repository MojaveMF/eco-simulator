import { ActionRowBuilder, TextInputBuilder } from "@discordjs/builders";
import { ModalBuilder, TextInputStyle } from "discord.js";

export default async function CreateModerationModal(userId: number, duration: number) {
    const modal = new ModalBuilder()
        .setTitle("Moderate")
        .setCustomId(`moderation-final:${userId}:${duration}`);

    const ReasonInput = new TextInputBuilder()
        .setCustomId("reason")
        .setLabel("Moderation Reason")
        .setStyle(TextInputStyle.Paragraph);

    const ActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(ReasonInput);

    return modal.addComponents(ActionRow);
}
