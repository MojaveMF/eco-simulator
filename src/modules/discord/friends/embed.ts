import { EmbedBuilder } from "discord.js";
import { User } from "../../ecosim";
import WrapEmbed from "../embed";

async function createDescription(length: number) {
    const displayLength = Math.min(length, 25);
    const description =
        "Displaying `" + String(displayLength) + "/25` friends (Discord Limitation)";

    return description;
}

export default async function CreateFriendsEmbed(
    user: User,
    friends: User[]
): Promise<EmbedBuilder> {
    const description = await createDescription(friends.length);
    const embed = new EmbedBuilder().setTitle(`${user.name}'s friends`).setDescription(description);

    return WrapEmbed(embed);
}
