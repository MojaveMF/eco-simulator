import { EmbedBuilder } from "discord.js";
import { User } from "../../ecosim";
import WrapEmbed from "../embed";

export default async function CreatedModerationEmbed(user: User): Promise<EmbedBuilder> {
    const headshot = await user.GetHeadshot();
    const embed = new EmbedBuilder()
        .setTitle(`Moderate ${user.name}`)
        .setDescription("Warning these will reflect on the website!")
        .setThumbnail(headshot);

    return WrapEmbed(embed);
}

export async function CreatedModeratedEmbed(user: User, reason: string): Promise<EmbedBuilder> {
    const headshot = await user.GetHeadshot();
    const embed = new EmbedBuilder()
        .setTitle(`Moderated ${user.name}`)
        .setDescription(`For the following reason: \n ${reason}`)
        .setThumbnail(headshot);

    return WrapEmbed(embed);
}

export async function CreateUnModerateEmbed(user: User): Promise<EmbedBuilder> {
    const headshot = await user.GetHeadshot();
    const embed = new EmbedBuilder()
        .setTitle(`Unmoderated ${user.name}`)
        .setDescription("They are able to use the site once again")
        .setThumbnail(headshot);

    return WrapEmbed(embed);
}
