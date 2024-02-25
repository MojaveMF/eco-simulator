import { InteractionHandler, InteractionHandlerTypes } from "@sapphire/framework";
import { StringSelectMenuInteraction } from "discord.js";
import { GetAssetInfo } from "../modules/ecosim";
import { ErrorEmbed } from "../modules/discord/error";
import CreateAssetEmbed from "../modules/discord/asset/embed";
import CreateAssetComponent from "../modules/discord/asset/row";

async function ProcessAssets(interaction: StringSelectMenuInteraction, assetId: number) {
    const asset = await GetAssetInfo(assetId);

    const [embed, component] = await Promise.all([
        CreateAssetEmbed(asset),
        CreateAssetComponent(asset),
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
        const [id] = interaction.values[0].split(":");
        try {
            await ProcessAssets(interaction, +id);
        } catch (err) {
            const errEmbed = await ErrorEmbed(err);
            return interaction.reply({ ephemeral: true, embeds: [errEmbed] });
        }
    }

    public override parse(interaction: StringSelectMenuInteraction) {
        if (interaction.customId != "asset-info") return this.none();
        return this.some();
    }
}
