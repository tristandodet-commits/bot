import { SlashCommandBuilder, PermissionFlagsBits, ChannelType } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Supprime des messages ou réinitialise le salon')
        .addStringOption(option =>
            option.setName('mode')
                .setDescription('Le type de nettoyage souhaité')
                .setRequired(true)
                .addChoices(
                    { name: 'Nombre précis', value: 'count' },
                    { name: 'Tout le salon (Clone)', value: 'all' }
                ))
        .addIntegerOption(option =>
            option.setName('nombre')
                .setDescription('Nombre de messages (1-100) - Ignoré si "Tout le salon" est choisi')
                .setMinValue(1)
                .setMaxValue(100))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction) {
        const mode = interaction.options.getString('mode');
        const amount = interaction.options.getInteger('nombre');

        // --- Cas 1 : Tout le salon ---
        if (mode === 'all') {
            const position = interaction.channel.position;
            const newChannel = await interaction.channel.clone();
            
            await interaction.channel.delete();
            await newChannel.setPosition(position);
            
            return newChannel.send({ content: "✨ Le salon a été réinitialisé !" }).then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }

        // --- Cas 2 : Nombre précis ---
        if (!amount) {
            return interaction.reply({ 
                content: "❌ Vous devez préciser un nombre de messages pour ce mode.", 
                ephemeral: true 
            });
        }

        try {
            const messages = await interaction.channel.bulkDelete(amount, true);
            return interaction.reply({
                content: `🗑️ **${messages.size}** messages ont été supprimés.`,
                ephemeral: true
            });
        } catch (err) {
            console.error(err);
            return interaction.reply({
                content: "Une erreur est survenue. Note : les messages de plus de 14 jours ne peuvent pas être supprimés en masse.",
                ephemeral: true
            });
        }
    },
};