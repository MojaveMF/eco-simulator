/*
    Import as type so we dont cause import loop
*/
import { EmbedBuilder } from "discord.js";
import type { Asset } from "../../ecosim";
import { ParseTime } from "../internal";
import WrapEmbed from "../embed";

function TruncateLength(str: string, length: number) {
    if (str.length <= length) return str;
    return str.substring(0, length - 3) + "...";
}

export default async function CreateAssetEmbed(user: Asset) {
    const description =
        user.description == null
            ? "`This user has no description`"
            : TruncateLength(user.description, 190);

    const Thumbnail = await user.GetThumbnail();
    const embed = new EmbedBuilder()
        .setTitle(user.name)
        .setDescription(description)
        .setImage(Thumbnail)
        .setFields(
            { name: "Sales", value: String(user.saleCount), inline: true },
            { name: "Price In Robux", value: String(user.price), inline: true },
            { name: "Price In Tickets", value: String(user.priceTickets), inline: true }
        );

    return await WrapEmbed(embed);
}
