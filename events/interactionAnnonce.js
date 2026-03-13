import { EmbedBuilder, MessageFlags } from 'discord.js';

export default {
    async execute(interaction, client) {
        if (interaction.customId === 'modal_annonce') {
            const titre = interaction.fields.getTextInputValue('annonce_titre');
            const texte = interaction.fields.getTextInputValue('annonce_texte');

            const embed = new EmbedBuilder()
                .setTitle(titre)
                .setDescription(texte)
                .setColor(0x5865F2)
                .setFooter({ text: `Annonce de ${interaction.user.username}` })
              

            await interaction.channel.send({ embeds: [embed] });
            await interaction.reply({ content: "✅ Annonce publiée !", flags: [MessageFlags.Ephemeral] });
        }
    }
};