import { InteractionHandler, InteractionHandlerTypes } from "@sapphire/framework";
import { StringSelectMenuInteraction } from "discord.js";
import { GetUserFromUserid } from "../modules/ecosim";
import { AssetType } from "../modules/ecosim/assets/enums/AssetType";
import CreateDisplayAssetsEmbed from "../modules/discord/items/shower/embed";
import CreateDisplayAssetsComponent from "../modules/discord/items/shower/row";
import { ErrorEmbed } from "../modules/discord/error";
import { IsAllowed } from "../modules/discord/internal";

async function ProcessAssets(
    interaction: StringSelectMenuInteraction,
    userid: number,
    type: number
) {
    const user = await GetUserFromUserid(userid);
    const assets = await user.GetItems(type as AssetType);

    const [embed, component] = await Promise.all([
        CreateDisplayAssetsEmbed(user, type as AssetType, assets),
        CreateDisplayAssetsComponent(assets),
    ]);

    return interaction.reply({ embeds: [embed], components: [component] });
}

export class AssetSelectionHandler extends InteractionHandler {
    public constructor(ctx: InteractionHandler.LoaderContext, options: InteractionHandler.Options) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.SelectMenu,
        });
    }

    public async run(interaction: StringSelectMenuInteraction) {
        const [type, id] = interaction.values[0].split(":");
        try {
            await IsAllowed(interaction.user, interaction.member, interaction.channelId);
            await ProcessAssets(interaction, +id, +type);
        } catch (err) {
            const errEmbed = await ErrorEmbed(
                String(err) + " Most likely the users inventory is private or dosent own any."
            );
            return interaction.reply({ ephemeral: true, embeds: [errEmbed] });
        }
    }

    public override parse(interaction: StringSelectMenuInteraction) {
        if (interaction.customId != "user-assets") return this.none();
        return this.some();
    }
}
