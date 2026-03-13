import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Affiche des informations sur un utilisateur')
        .addUserOption(option => option.setName('cible').setDescription('L\'utilisateur à inspecter')),

    async execute(interaction) {
        const user = interaction.options.getUser('cible') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id);

        const embed = new EmbedBuilder()
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: 'ID', value: user.id, inline: true },
                { name: 'Robot ?', value: user.bot ? 'Oui' : 'Non', inline: true },
                { name: 'Rejoint le', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
                { name: 'Compte créé le', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: `Rôles [${member.roles.cache.size - 1}]`, value: member.roles.cache.filter(r => r.id !== interaction.guild.id).map(r => r.name).join(', ') || 'Aucun' }
            )
            .setColor('#5865F2');

        await interaction.reply({ embeds: [embed] });
    },
};