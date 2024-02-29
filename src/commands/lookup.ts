import { Subcommand } from "@sapphire/plugin-subcommands";
import {
    Asset,
    GetAssetInfo,
    GetAssetInfoFromName,
    GetUserFromUserid,
    GetUserFromUsername,
    User,
} from "../modules/ecosim";
import { ErrorEmbed } from "../modules/discord/error";
import CreateUserEmbed from "../modules/discord/user/embed";
import CreateUserComponent from "../modules/discord/user/row";
import CreateAssetEmbed from "../modules/discord/asset/embed";
import CreateAssetComponent from "../modules/discord/asset/row";

async function ExtractIdentifier(
    interaction: Subcommand.ChatInputCommandInteraction
): Promise<string | number> {
    const name = interaction.options.getString("name", false);
    const id = interaction.options.getNumber("id", false);

    if (name != null) {
        return name;
    }
    if (id != null) {
        return id;
    }

    throw "Name or Id required";
}

async function GetUserFromIdentifier(identifier: string | number): Promise<User> {
    if (typeof identifier == "string") {
        return GetUserFromUsername(identifier);
    }
    if (typeof identifier == "number") {
        return GetUserFromUserid(identifier);
    }

    throw "Invalid type for identifier";
}

async function GetAssetFromIdentifier(identifier: string | number): Promise<Asset> {
    if (typeof identifier == "string") {
        return GetAssetInfoFromName(identifier);
    }
    if (typeof identifier == "number") {
        return GetAssetInfo(identifier);
    }

    throw "Invalid type for identifier";
}

async function ProcessUser(interaction: Subcommand.ChatInputCommandInteraction) {
    const id = await ExtractIdentifier(interaction);
    const user = await GetUserFromIdentifier(id);

    const [embed, row] = await Promise.all([CreateUserEmbed(user), CreateUserComponent(user)]);

    await interaction.reply({ embeds: [embed], components: [row] });
}

async function ProcessAsset(interaction: Subcommand.ChatInputCommandInteraction) {
    const id = await ExtractIdentifier(interaction);
    const asset = await GetAssetFromIdentifier(id);

    const [embed, row] = await Promise.all([CreateAssetEmbed(asset), CreateAssetComponent(asset)]);

    await interaction.reply({ embeds: [embed], components: [row] });
}

export class Lookup extends Subcommand {
    public constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
        super(context, {
            ...options,
            name: "lookup",
            subcommands: [
                { name: "user", chatInputRun: "chatInputUser", default: true },
                { name: "asset", chatInputRun: "chatInputAsset" },
            ],
        });
    }

    public async chatInputUser(interaction: Subcommand.ChatInputCommandInteraction) {
        try {
            await ProcessUser(interaction);
        } catch (err) {
            const errEmbed = await ErrorEmbed(err);
            interaction.reply({ ephemeral: true, embeds: [errEmbed] });
        }
    }
    public async chatInputAsset(interaction: Subcommand.ChatInputCommandInteraction) {
        try {
            await ProcessAsset(interaction);
        } catch (err) {
            const errEmbed = await ErrorEmbed(err);
            interaction.reply({ ephemeral: true, embeds: [errEmbed] });
        }
    }

    registerApplicationCommands(registry: Subcommand.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder
                .setName("lookup")
                .setDescription("lookup a user or asset on the website")
                .addSubcommand((command) =>
                    command
                        .setName("user")
                        .setDescription("lookup a user")
                        .addStringOption((option) =>
                            option
                                .setName("name")
                                .setAutocomplete(true)
                                .setRequired(false)
                                .setDescription("username of the user you plan to lookup")
                        )
                        .addNumberOption((option) =>
                            option
                                .setName("id")
                                .setAutocomplete(false)
                                .setRequired(false)
                                .setDescription("userid of the user you plan to lookup")
                        )
                )
                .addSubcommand((command) =>
                    command
                        .setName("asset")
                        .setDescription("lookup an asset")
                        .addStringOption((option) =>
                            option
                                .setName("name")
                                .setAutocomplete(true)
                                .setDescription("name of the asset you plan to lookup")
                                .setRequired(false)
                        )
                        .addNumberOption((option) =>
                            option
                                .setName("id")
                                .setAutocomplete(false)
                                .setRequired(false)
                                .setDescription("assetid of the asset you plan to lookup")
                        )
                )
        );
    }
}
