import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import { Asset } from "../../ecosim";
import { ActionRow, ButtonStyle } from "discord.js";

export default async function CreateAssetComponent(
    asset: Asset
): Promise<ActionRowBuilder<ButtonBuilder>> {
    const CatalogUrl = await asset.GetCatalog();

    const Catalog = new ButtonBuilder()
        .setLabel("Store")
        .setStyle(ButtonStyle.Link)
        .setURL(CatalogUrl);

    const Creator = new ButtonBuilder()
        .setLabel("Creator")
        .setStyle(ButtonStyle.Secondary)
        .setCustomId("info:" + String(asset.creatorTargetId));

    return new ActionRowBuilder<ButtonBuilder>().addComponents(Catalog, Creator);
}
