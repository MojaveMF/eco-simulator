import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import { User } from "../../ecosim";
import { ActionRow, ButtonStyle } from "discord.js";

export default async function CreateUserComponent(
    user: User
): Promise<ActionRowBuilder<ButtonBuilder>> {
    const ProfileURL = await user.GetProfile();

    const Profile = new ButtonBuilder()
        .setLabel("Profile")
        .setStyle(ButtonStyle.Link)
        .setURL(ProfileURL);

    const Friends = new ButtonBuilder()
        .setLabel("Friends")
        .setStyle(ButtonStyle.Secondary)
        .setCustomId("friends:" + String(user.id));

    const Items = new ButtonBuilder()
        .setLabel("Items")
        .setStyle(ButtonStyle.Secondary)
        .setCustomId("items:" + String(user.id));

    const Moderation = new ButtonBuilder()
        .setLabel("Moderation")
        .setStyle(ButtonStyle.Danger)
        .setCustomId("moderation:" + String(user.id));

    return new ActionRowBuilder<ButtonBuilder>().addComponents(Profile, Friends, Items, Moderation);
}
