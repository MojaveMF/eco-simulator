import { InteractionHandler, InteractionHandlerTypes } from "@sapphire/framework";
import { ButtonInteraction } from "discord.js";
import { ErrorEmbed } from "../modules/discord/error";
import { GetUserFromUserid } from "../modules/ecosim";
import CreateUserEmbed from "../modules/discord/user/embed";
import CreateUserComponent from "../modules/discord/user/row";

async function HandleInformation(interaction: ButtonInteraction, userid: number) {
    const user = await GetUserFromUserid(userid);
    const [embed, row] = await Promise.all([CreateUserEmbed(user), CreateUserComponent(user)]);

    return interaction.reply({ embeds: [embed], components: [row] });
}

export class CreatorButton extends InteractionHandler {
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
            await HandleInformation(interaction, userId);
        } catch (err) {
            const errEmbed = await ErrorEmbed(err);
            interaction.reply({ ephemeral: true, embeds: [errEmbed] });
        }
    }

    public override parse(interaction: ButtonInteraction) {
        const split = interaction.customId.split(":");
        if (split.length != 2) return this.none();
        if (split[0] !== "info") return this.none();

        return this.some();
    }
}
