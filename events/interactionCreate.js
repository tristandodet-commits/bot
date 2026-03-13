import { MessageFlags } from 'discord.js';

export default {
    name: 'interactionCreate',
    async execute(interaction, client) {
        // --- 1. COMMANDES SLASH ---
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                const method = interaction.deferred ? 'editReply' : 'reply';
                await interaction[method]({ content: 'Erreur commande.', flags: [MessageFlags.Ephemeral] });
            }
        }

        // --- 2. BOUTONS (Tickets) ---
        if (interaction.isButton()) {
            const { default: ticketHandler } = await import('./interactionCreateTickets.js');
            await ticketHandler.execute(interaction, client);
        }

        // --- 3. MODALS (Annonce) ---
        if (interaction.isModalSubmit()) {
            const { default: annonceHandler } = await import('./interactionAnnonce.js');
            await annonceHandler.execute(interaction, client);
        }
    }
};