import { InteractionHandler, InteractionHandlerTypes } from "@sapphire/framework";
import { ButtonInteraction } from "discord.js";
import { ErrorEmbed } from "../modules/discord/error";
import { GetUserFromUserid } from "../modules/ecosim";
import { CreateUnModerateRow } from "../modules/discord/moderation/row";
import { IsAllowed } from "../modules/discord/internal";
import { CreateUnModerateEmbed } from "../modules/discord/moderation/embed";

async function ProcessModeration(interaction: ButtonInteraction) {
    const [_, userId] = interaction.customId.split(":");
    const user = await GetUserFromUserid(+userId);
    await user.RemoveModeration();
    const [embed, row] = await Promise.all([
        CreateUnModerateEmbed(user),
        CreateUnModerateRow(user),
    ]);

    return interaction.reply({ embeds: [embed], components: [row] });
}

export class ModerationHandler extends InteractionHandler {
    public constructor(ctx: InteractionHandler.LoaderContext, options: InteractionHandler.Options) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.Button,
        });
    }

    public override async run(interaction: ButtonInteraction) {
        try {
            await IsAllowed(interaction.user, interaction.member, interaction.channelId, true);
            await ProcessModeration(interaction);
        } catch (err) {
            const errEmbed = await ErrorEmbed(err);
            interaction.reply({ ephemeral: true, embeds: [errEmbed] });
        }
    }

    public override async parse(interaction: ButtonInteraction) {
        const split = interaction.customId.split(":");
        if (split.length < 2) return this.none();
        if (split[0] !== "unmoderate") return this.none();

        return this.some();
    }
}
