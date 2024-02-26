import { InteractionHandler, InteractionHandlerTypes } from "@sapphire/framework";
import { ButtonInteraction } from "discord.js";
import { ErrorEmbed } from "../modules/discord/error";
import { IsAllowed } from "../modules/discord/internal";
import CreateModerationModal from "../modules/discord/moderation/modal";
import { GetUserFromUserid } from "../modules/ecosim";
import { CreateModeratedRow } from "../modules/discord/moderation/row";
import { CreatedModeratedEmbed } from "../modules/discord/moderation/embed";

async function ProcessModeration(interaction: ButtonInteraction) {
    const [_, userIdRaw, durationRaw] = interaction.customId.split(":");
    const [userId, duration] = [+userIdRaw, +durationRaw];

    await interaction.showModal(await CreateModerationModal(userId, duration));
    const response = await interaction
        .awaitModalSubmit({
            time: 60000,
            filter: (i) => i.user.id === interaction.user.id,
        })
        .catch(() => null);

    if (response) {
        const reason = response.fields.getTextInputValue("reason");
        const user = await GetUserFromUserid(userId);

        if (duration < 1) {
            await user.Moderate(reason, interaction.user.displayName);
        } else {
            await user.Moderate(reason, interaction.user.displayName, duration);
        }

        const [embed, row] = await Promise.all([
            CreatedModeratedEmbed(user, reason),
            CreateModeratedRow(user),
        ]);

        return response.reply({ embeds: [embed], components: [row] });
    }
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
        if (split[0] !== "moderate") return this.none();

        return this.some();
    }
}
