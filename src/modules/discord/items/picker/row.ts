import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
} from "discord.js";
import { AssetType } from "../../../ecosim/assets/enums/AssetType";
import { User } from "../../../ecosim";

const AssetTypes = [
    AssetType.Hat,
    AssetType.Face,
    AssetType.Gears,
    AssetType.Package,
    AssetType.TShirt,
];

async function CreateItemPicker(
    UserId: number,
    Name: string,
    Type: AssetType
): Promise<StringSelectMenuOptionBuilder> {
    const option = new StringSelectMenuOptionBuilder()
        .setLabel(Name)
        .setValue(String(Type) + ":" + String(UserId))
        .setEmoji("🔍");

    return option;
}

function IntoPair(type: AssetType): { name: string; value: AssetType } {
    return { value: type, name: AssetType[type] };
}

export default async function CreateItemPickerComponent(
    user: User
): Promise<ActionRowBuilder<StringSelectMenuBuilder>> {
    const options = await Promise.all(
        AssetTypes.map(IntoPair).map(({ value, name }) => CreateItemPicker(user.id, name, value))
    );

    const selection = new StringSelectMenuBuilder({
        customId: "user-assets",
        placeholder: "Select an asset type",
    }).addOptions(options);

    return new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(selection);
}
