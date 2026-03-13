import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, ChannelType, MessageFlags } from 'discord.js';
import config from '../config.js';

export default {
    async execute(interaction, client) {
        // Boutons de création
        if (interaction.customId.startsWith('btn_ticket_')) {
            const type = interaction.customId.replace('btn_ticket_', '');
            const categoryId = config.ticketCategories[type];
            const ticketName = `ticket-${type}-${interaction.user.username}`.toLowerCase();

            const existing = interaction.guild.channels.cache.find(c => c.name === ticketName);
            if (existing) {
                return interaction.reply({ content: `❌ Déjà ouvert : ${existing}`, flags: [MessageFlags.Ephemeral] });
            }
            
            await interaction.reply({ content: "⏳ Création...", flags: [MessageFlags.Ephemeral] });

            const ticketChannel = await interaction.guild.channels.create({
                name: ticketName,
                type: ChannelType.GuildText,
                parent: categoryId,
                permissionOverwrites: [
                    { id: interaction.guild.id, deny: [PermissionFlagsBits.ViewChannel] },
                    { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
                    { id: config.staffRole, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
                ],
            });

            const embed = new EmbedBuilder()
                .setTitle(`Ticket ${type.toUpperCase()}`)
                .setDescription(`Bonjour ${interaction.user}, le staff <@&${config.staffRole}> arrive.`)
                .setColor(type === 'achat' ? 0x3BA55C : 0x5865F2);

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('close_ticket').setLabel('Fermer').setStyle(ButtonStyle.Danger)
            );

            await ticketChannel.send({ content: `<@&${config.staffRole}>`, embeds: [embed], components: [row] });
            await interaction.editReply({ content: `✅ Ticket : ${ticketChannel}` });
        }

        // Bouton de fermeture
        if (interaction.customId === 'close_ticket') {
            await interaction.reply("🔒 Fermeture dans 5s...");
            setTimeout(async () => {
                const channel = await interaction.guild.channels.fetch(interaction.channelId);
                if (channel) await channel.delete().catch(() => {});
            }, 5000);
        }
    }
};

