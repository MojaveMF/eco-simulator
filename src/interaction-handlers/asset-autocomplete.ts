import { InteractionHandler, InteractionHandlerTypes } from "@sapphire/framework";
import { AutocompleteInteraction } from "discord.js";
import { SearchUsers } from "../modules/ecosim/users/search";
import { SearchAssets } from "../modules/ecosim/assets/search";

export class UsernameHandler extends InteractionHandler {
    public constructor(ctx: InteractionHandler.LoaderContext, options: InteractionHandler.Options) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.Autocomplete,
        });
    }

    public override async run(interaction: AutocompleteInteraction) {
        try {
            const { value } = interaction.options.getFocused(true);

            if (value.length < 3 || 24 < value.length) return;

            const results = await SearchAssets(value, undefined, 10);
            return interaction.respond(
                results
                    .map((value) => ({ name: value.name, value: value.name }))
                    .sort((a, b) => a.value.length - b.value.length)
            );
        } catch (err) {
            /* Any errors in here are NON Fatal i just want to mute them */
        }
    }
    public override async parse(interaction: AutocompleteInteraction) {
        if (!interaction.command) return this.none();
        if (interaction.command.name !== "lookup") return this.none();
        if (interaction.options.getSubcommand() != "asset") return this.none();

        return this.some();
    }
}
