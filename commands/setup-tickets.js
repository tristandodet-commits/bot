import { 
    SlashCommandBuilder, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    PermissionFlagsBits,
    MessageFlags 
} from 'discord.js';
import config from '../config.js';

export default {
    data: new SlashCommandBuilder()
        .setName('setup-tickets')
        .setDescription('Déploie les panels de tickets pro')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        // Utilisation des flags pour éviter le warning de dépréciation
        await interaction.deferReply({ flags: [MessageFlags.Ephemeral] });

        const panels = [
            { 
                channelId: config.supportChannelId, 
                title: "🛠️ Support Technique", 
                desc: "Besoin d'aide ? Cliquez ci-dessous pour ouvrir un ticket.", 
                color: 0x5865F2, 
                id: "btn_ticket_support",
                emoji: "📩" // Changé pour plus de sécurité
            },
            { 
                channelId: config.achatChannelId, 
                title: "💰 Ticket Achat", 
                desc: "Pour passer commande, ouvrez un ticket.", 
                color: 0x3BA55C, 
                id: "btn_ticket_achat",
                emoji: "📩" // Changé pour plus de sécurité
            }
        ];

        try {
            for (const p of panels) {
                const channel = interaction.guild.channels.cache.get(p.channelId);
                
                if (!channel) {
                    console.error(`⚠️ Salon introuvable pour l'ID : ${p.channelId}`);
                    continue;
                }

                const embed = new EmbedBuilder()
                    .setTitle(p.title)
                    .setDescription(p.desc)
                    .setColor(p.color)
                    .setFooter({ text: "Builder Hub - Système Automatisé" });

                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(p.id)
                        .setLabel('Ouvrir un ticket')
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji(p.emoji) // Utilisation de l'emoji défini dans l'objet
                );

                await channel.send({ embeds: [embed], components: [row] });
            }

            await interaction.editReply("✅ Les panels Support et Achat ont été envoyés !");

        } catch (error) {
            console.error("Erreur setup-tickets:", error);
            await interaction.editReply("❌ Une erreur est survenue lors de l'envoi des panels.");
        }
    }
};