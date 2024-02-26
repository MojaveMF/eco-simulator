import { InteractionHandler, InteractionHandlerTypes } from "@sapphire/framework";
import { ButtonInteraction } from "discord.js";
import { ErrorEmbed } from "../modules/discord/error";
import { GetUserFromUserid } from "../modules/ecosim";
import CreateItemPickerEmbed from "../modules/discord/items/picker/embed";
import CreateItemPickerComponent from "../modules/discord/items/picker/row";
import { IsAllowed } from "../modules/discord/internal";

async function HandleItems(interaction: ButtonInteraction, userid: number) {
    const user = await GetUserFromUserid(userid);

    const [embed, row] = await Promise.all([
        CreateItemPickerEmbed(user),
        CreateItemPickerComponent(user),
    ]);

    return interaction.reply({ embeds: [embed], components: [row] });
}

export class FriendsButton extends InteractionHandler {
    public constructor(ctx: InteractionHandler.LoaderContext, options: InteractionHandler.Options) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.Button,
        });
    }

    public async run(interaction: ButtonInteraction) {
        const [_, rawId] = interaction.customId.split(":");
        const userId = +rawId;

        try {
            await IsAllowed(interaction.user, interaction.member, interaction.channelId);
            await HandleItems(interaction, userId);
        } catch (err) {
            const errEmbed = await ErrorEmbed(err);
            interaction.reply({ ephemeral: true, embeds: [errEmbed] });
        }
    }

    public override parse(interaction: ButtonInteraction) {
        const split = interaction.customId.split(":");
        if (split.length != 2) return this.none();
        if (split[0] !== "items") return this.none();

        return this.some();
    }
}
