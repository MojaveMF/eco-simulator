import { EmbedBuilder } from "discord.js";
import WrapEmbed from "./embed";

async function WrapError(error: unknown): Promise<string> {
    const strung = String(error);
    const description = "We Caught this excpetion" + "\n" + "```\n" + strung + "\n" + "```";
    return description;
}

export async function ErrorEmbed(error: unknown): Promise<EmbedBuilder> {
    const description = await WrapError(error);
    const embed = new EmbedBuilder().setTitle("Oh no!").setDescription(description);

    return WrapEmbed(embed);
}

export async function row() {}
