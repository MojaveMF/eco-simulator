import { EmbedBuilder } from "discord.js";
import { User } from "../../../ecosim";
import WrapEmbed from "../../embed";

export default async function CreateItemPickerEmbed(user: User): Promise<EmbedBuilder> {
    const embed = new EmbedBuilder()
        .setTitle(`${user.name}'s Items`)
        .setDescription("Pick from the following to display items");

    return WrapEmbed(embed);
}
