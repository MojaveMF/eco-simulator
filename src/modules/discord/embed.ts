import { EmbedBuilder } from "discord.js";
import config from "../../config";

/*
    This exist since its less lines of code
*/
export default async function WrapEmbed(embed: EmbedBuilder): Promise<EmbedBuilder> {
    embed.setAuthor({ name: config.Server.Website });
    embed.setTimestamp(new Date());
    return embed;
}
