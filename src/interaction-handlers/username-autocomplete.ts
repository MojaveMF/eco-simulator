import { InteractionHandler, InteractionHandlerTypes } from "@sapphire/framework";
import { AutocompleteInteraction } from "discord.js";
import { SearchUsers } from "../modules/ecosim/users/search";

export class UsernameHandler extends InteractionHandler {
    public constructor(ctx: InteractionHandler.LoaderContext, options: InteractionHandler.Options) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.Autocomplete,
        });
    }

    public override async run(interaction: AutocompleteInteraction) {
        try {
            const username = interaction.options.getFocused(true);

            if (username.value.length < 3 || 24 < username.value.length) return;

            const results = await SearchUsers(username.value, 10, 0);
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
        if (interaction.options.getSubcommand() != "user") return this.none();

        return this.some();
    }
}
