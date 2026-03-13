import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import config from '../config.js';

export default {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Révoquer le bannissement d\'un utilisateur')
    .addStringOption(option => option.setName('userid').setDescription('ID Discord de l\'utilisateur').setRequired(true))
    .addStringOption(option => option.setName('raison').setDescription('La raison du débannissement'))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const userId = interaction.options.getString('userid');
    const reason = interaction.options.getString('raison') || 'Aucune raison fournie';

    try {
      await interaction.guild.members.unban(userId, reason);

      const logEmbed = new EmbedBuilder()
        .setTitle('🔓 Membre Débanni')
        .setColor('#57f287')
        .addFields(
          { name: 'ID Utilisateur', value: userId, inline: true },
          { name: 'Modérateur', value: `${interaction.user.tag}`, inline: true },
          { name: 'Raison', value: reason }
        )
        .setTimestamp();

      const logChannel = interaction.guild.channels.cache.get(config.logunbanChannelId);
      if (logChannel) logChannel.send({ embeds: [logEmbed] });

      await interaction.reply({ content: `✅ L'utilisateur (${userId}) a été débanni.`, ephemeral: true });
    } catch (error) {
      await interaction.reply({ content: "❌ Impossible de trouver un bannissement pour cet ID.", ephemeral: true });
    }
  },
};