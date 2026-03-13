import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import config from '../config.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bannir un utilisateur du serveur')
    .addUserOption(option => option.setName('cible').setDescription('L\'utilisateur à bannir').setRequired(true))
    .addStringOption(option => option.setName('raison').setDescription('La raison du bannissement'))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('cible');
    const reason = interaction.options.getString('raison') || 'Aucune raison fournie';
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);

    // Vérification de la hiérarchie
    if (member && !member.bannable) {
      return interaction.reply({ content: "❌ Je ne peux pas bannir cet utilisateur (rôle trop élevé).", ephemeral: true });
    }

    await interaction.guild.members.ban(user, { reason });

    const logEmbed = new EmbedBuilder()
      .setTitle('🔨 Membre Banni')
      .setColor('#ed4245')
      .addFields(
        { name: 'Utilisateur', value: `${user.tag} (${user.id})`, inline: true },
        { name: 'Modérateur', value: `${interaction.user.tag}`, inline: true },
        { name: 'Raison', value: reason }
      )
      .setTimestamp();

    const logChannel = interaction.guild.channels.cache.get(config.logbanChannelId);
    if (logChannel) logChannel.send({ embeds: [logEmbed] });

    await interaction.reply({ content: `✅ **${user.tag}** a été banni définitivement.`, ephemeral: true });
  },
};