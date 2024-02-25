/*
    Import as type so we dont cause import loop
*/
import { EmbedBuilder } from "discord.js";
import type { User } from "../../ecosim";
import { ParseTime, TruncateLength } from "../internal";
import WrapEmbed from "../embed";

export default async function CreateUserEmbed(user: User) {
    const description =
        user.description == null
            ? "`This user has no description`"
            : await TruncateLength(user.description, 190);

    const [Thumbnail, Headshot] = await Promise.all([user.GetThumbnail(), user.GetHeadshot()]);
    const [Followers, Following, Friends, TimeStamp] = await Promise.all([
        user.GetFollowersCount(),
        user.GetFollowingCount(),
        user.GetFriendsCount(),
        ParseTime(user.created),
    ]);

    const embed = new EmbedBuilder()
        .setTitle(user.name)
        .setDescription(description)
        .setThumbnail(Headshot)
        .setImage(Thumbnail)
        .setFields(
            { name: "Followers", value: String(Followers), inline: true },
            { name: "Following", value: String(Following), inline: true },
            { name: "Friends", value: String(Friends), inline: true },
            { name: "Created", value: TimeStamp, inline: true },
            { name: "UserId", value: String(user.id), inline: true },
            { name: "Banned", value: user.isBanned ? "Yes" : "No", inline: true }
        );

    return await WrapEmbed(embed);
}
