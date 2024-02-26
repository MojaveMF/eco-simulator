import { InteractionHandler, InteractionHandlerTypes } from "@sapphire/framework";
import { StringSelectMenuInteraction } from "discord.js";
import { GetUserFromUserid } from "../modules/ecosim";
import CreateUserEmbed from "../modules/discord/user/embed";
import CreateUserComponent from "../modules/discord/user/row";
import { ErrorEmbed } from "../modules/discord/error";
import { IsAllowed } from "../modules/discord/internal";

async function ProcessUser(interaction: StringSelectMenuInteraction, id: number) {
    const user = await GetUserFromUserid(id);

    const [embed, row] = await Promise.all([CreateUserEmbed(user), CreateUserComponent(user)]);

    await interaction.reply({ embeds: [embed], components: [row] });
}

export class FriendSelectionHandler extends InteractionHandler {
    public constructor(ctx: InteractionHandler.LoaderContext, options: InteractionHandler.Options) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.SelectMenu,
        });
    }

    public async run(interaction: StringSelectMenuInteraction) {
        const userid = +interaction.values[0];
        try {
            await IsAllowed(interaction.user, interaction.member, interaction.channelId);
            await ProcessUser(interaction, userid);
        } catch (err) {
            const errEmbed = await ErrorEmbed(err);
            return interaction.reply({ ephemeral: true, embeds: [errEmbed] });
        }
    }

    public override parse(interaction: StringSelectMenuInteraction) {
        if (interaction.customId != "friend-info") return this.none();
        return this.some();
    }
}
