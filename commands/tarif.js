import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('tarifs')
        .setDescription('Affiche les informations sur nos tarifs'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('💰 Informations Tarifaires')
            .setDescription(
                "Les tarifs dépendent entièrement de la complexité de votre projet.\n\n" +
                "Si vous êtes intéressé, ouvrez un **ticket-achat** dans le salon dédié."
            )
            .setColor(0x5865F2)
            

        // En supprimant "flags" ou "ephemeral: true", le message devient public
        await interaction.reply({ 
            embeds: [embed] 
        });
    },
};