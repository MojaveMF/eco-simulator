import { EmbedBuilder } from "discord.js";
import { Asset, User } from "../../../ecosim";
import WrapEmbed from "../../embed";
import { AssetType } from "../../../ecosim/assets/enums/AssetType";

async function createDescription(length: number) {
    const displayLength = Math.min(length, 25);
    const description = "Displaying `" + String(displayLength) + "/25` assets (Discord Limitation)";

    return description;
}

export default async function CreateDisplayAssetsEmbed(
    user: User,
    type: AssetType,
    assets: Asset[]
): Promise<EmbedBuilder> {
    const description = await createDescription(assets.length);
    const embed = new EmbedBuilder()
        .setTitle(`${user.name}'s ${AssetType[type]}`)
        .setDescription(description);

    return WrapEmbed(embed);
}
