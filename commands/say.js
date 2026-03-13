import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Fait parler le bot')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Le message à envoyer')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages), // Optionnel : restreint aux modérateurs

    async execute(interaction) {
        const message = interaction.options.getString('message');
        
        // On envoie le message dans le salon
        await interaction.channel.send(message);

        // On répond discrètement à l'utilisateur pour confirmer
        await interaction.reply({ content: 'Message envoyé !', ephemeral: true });
    },
};