import { InteractionHandler, InteractionHandlerTypes } from "@sapphire/framework";
import { ButtonInteraction } from "discord.js";
import { ErrorEmbed } from "../modules/discord/error";
import { GetUserFromUserid } from "../modules/ecosim";
import CreateFriendsEmbed from "../modules/discord/friends/embed";
import CreateFriendsComponent from "../modules/discord/friends/row";

async function HandleFriends(interaction: ButtonInteraction, userid: number) {
    const user = await GetUserFromUserid(userid);
    const friends = await user.GetFriends();

    const [embed, row] = await Promise.all([
        CreateFriendsEmbed(user, friends),
        CreateFriendsComponent(friends),
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
            await HandleFriends(interaction, userId);
        } catch (err) {
            const errEmbed = await ErrorEmbed(err);
            interaction.reply({ ephemeral: true, embeds: [errEmbed] });
        }
    }

    public override parse(interaction: ButtonInteraction) {
        const split = interaction.customId.split(":");
        if (split.length != 2) return this.none();
        if (split[0] !== "friends") return this.none();

        return this.some();
    }
}
