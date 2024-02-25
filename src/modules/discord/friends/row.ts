import {
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
} from "discord.js";
import { User } from "../../ecosim";
import { TruncateLength } from "../internal";

export default async function CreateFriendsComponent(friends: User[]) {
    const components = [];
    if (friends.length < 1) throw "User has no friends (lol)";
    for (let i = 0; i < Math.min(25, friends.length); i++) {
        const friend = friends[i];
        const description =
            friend.description == null
                ? "No Description"
                : await TruncateLength(friend.description, 100);

        const option = new StringSelectMenuOptionBuilder()
            .setEmoji("👥")
            .setLabel(friend.name)
            .setDescription(description)
            .setValue(String(friend.id));

        components.push(option);
    }
    const selection = new StringSelectMenuBuilder({
        custom_id: "friend-info",
        placeholder: "Select a user",
    }).addOptions(components);
    const actionRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selection);

    return actionRow;
}
