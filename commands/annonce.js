import { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('annonce')
        .setDescription('Ouvre un panel pour envoyer une annonce'),
    async execute(interaction) {
        // Création du Modal
        const modal = new ModalBuilder()
            .setCustomId('modal_annonce')
            .setTitle('Créer une Annonce');

        // Champ : Titre
        const titleInput = new TextInputBuilder()
            .setCustomId('annonce_titre')
            .setLabel("Titre de l'annonce")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Entrez un titre accrocheur...')
            .setRequired(true);

        // Champ : Message
        const messageInput = new TextInputBuilder()
            .setCustomId('annonce_texte')
            .setLabel("Texte de l'annonce")
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('Écrivez votre contenu ici...')
            .setRequired(true);

        // Ajout des champs au modal
        const firstRow = new ActionRowBuilder().addComponents(titleInput);
        const secondRow = new ActionRowBuilder().addComponents(messageInput);
        modal.addComponents(firstRow, secondRow);

        // On affiche le modal
        await interaction.showModal(modal);
    },
};