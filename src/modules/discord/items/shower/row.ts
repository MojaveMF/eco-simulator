import {
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
} from "discord.js";
import { Asset } from "../../../ecosim";
import { TruncateLength } from "../../internal";

export default async function CreateDisplayAssetsComponent(assets: Asset[]) {
    const components = [];
    for (let i = 0; i < Math.min(25, assets.length); i++) {
        const asset = assets[i];
        const description =
            asset.description == null || asset.description.length < 1
                ? "This Asset has no description"
                : await TruncateLength(asset.description, 100);

        const option = new StringSelectMenuOptionBuilder()
            .setEmoji("🔨")
            .setLabel(await TruncateLength(asset.name, 100))
            .setDescription(description)
            .setValue(String(asset.id));

        components.push(option);
    }
    const selection = new StringSelectMenuBuilder({
        custom_id: "asset-info",
        placeholder: "Select an asset",
    }).addOptions(components);

    const actionRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selection);

    return actionRow;
}
