import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('set-info')
        .setDescription('Affiche les infos détaillées d’un set LEGO')
        .addStringOption(option =>
            option.setName('set')
                .setDescription('Choisis un set dans la liste')
                .setRequired(true)
                .addChoices(
                    { name: 'Bugatti Chiron (42083)', value: '42083' },
                    { name: 'Lamborghini Sián FKP 37 (42115)', value: '42115' },
                    { name: 'McLaren P1 (42172)', value: '42172' },
                    { name: 'Mercedes AMG F1 W14 (42171)', value: '42171' },
                    { name: 'Porsche 911 RSR (42096)', value: '42096' },
                    { name: 'Porsche 911 GT3 RS (42056)', value: '42056' },
                    { name: 'Mercedes Benz G500 (42177)', value: '42177' },
                    { name: 'Red Bull F1 (42141)', value: '42141' },
                    { name: 'Ferrari F1 (42143)', value: '42143' },
                    { name: 'Star Destroyer Venator (75367)', value: '75367' },
                    { name: 'Stranger Things (75810)', value: '75810' },
                    { name: 'Barad-Dûr (10333)', value: '10333' },
                    { name: 'Étoile de la Mort (75159)', value: '75159' },
                    { name: 'Razor Crest UCS (75331)', value: '75331' },
                    { name: 'Avengers Tower (76269)', value: '76269' },
                    { name: 'Titanic (10294)', value: '10294' },
                    { name: 'Tour Eiffel (10307)', value: '10307' }
                )
        ),

    async execute(interaction) { // <--- L'accolade manquait ici
        const setID = interaction.options.getString('set');

        const legoSets = {
            "42083": { nom: "Bugatti Chiron", annee: 2018, pieces: 3599, prix: "230€", dispo: "❌ Retiré", rare: "⭐ Élevée", revente: "350€" },
            "42115": { nom: "Lamborghini Sián FKP 37", annee: 2020, pieces: 3696, prix: "230€", dispo: "❌ Retiré", rare: "⭐ Élevée", revente: "350€" },
            "42172": { nom: "McLaren P1", annee: 2024, pieces: 3893, prix: "230€", dispo: "✅ En vente", rare: "⭐ Moyenne", revente: "350€" },
            "42171": { nom: "Mercedes AMG F1 W14", annee: 2024, pieces: 1643, prix: "135€", dispo: "✅ En vente", rare: "⭐ Faible/Moyenne", revente: "200-220€" },
            "42096": { nom: "Porsche 911 RSR", annee: 2019, pieces: 1580, prix: "110€", dispo: "❌ Retiré", rare: "⭐ Moyenne", revente: "200€" },
            "42056": { nom: "Porsche 911 GT3 RS", annee: 2016, pieces: 2704, prix: "315€", dispo: "❌ Retiré", rare: "⭐⭐⭐ Très élevée", revente: "500€" },
            "42177": { nom: "Mercedes Benz G500", annee: 2024, pieces: 2891, prix: "165€", dispo: "✅ En vente", rare: "⭐ Moyenne", revente: "230-250€" },
            "42141": { nom: "Red Bull F1", annee: 2022, pieces: 1432, prix: "135€", dispo: "❌ Retiré", rare: "⭐ Moyenne", revente: "200-220€" },
            "42143": { nom: "Ferrari F1", annee: 2022, pieces: 1677, prix: "135€", dispo: "❌ Retiré", rare: "⭐ Moyenne", revente: "200-220€" },
            "75367": { nom: "Star Destroyer Venator", annee: 2023, pieces: 5374, prix: "280€", dispo: "✅ En vente", rare: "⭐ Élevée", revente: "500-550€" },
            "75810": { nom: "Stranger Things – The Upside Down", annee: 2019, pieces: 2287, prix: "330€", dispo: "❌ Retiré", rare: "⭐⭐⭐ Très élevée", revente: "600-650€" },
            "10333": { nom: "Barad-Dûr (Seigneur des Anneaux)", annee: 2024, pieces: 5471, prix: "300€", dispo: "✅ En vente", rare: "⭐ Moyenne", revente: "500-550€" },
            "75159": { nom: "Étoile de la Mort", annee: 2016, pieces: 4016, prix: "425€", dispo: "❌ Retiré", rare: "⭐⭐⭐ Très élevée", revente: "800-850€" },
            "75331": { nom: "Razor Crest UCS", annee: 2022, pieces: 6187, prix: "330€", dispo: "❌ Retiré", rare: "⭐⭐ Élevée", revente: "500-550€" },
            "76269": { nom: "Avengers Tower", annee: 2023, pieces: 5201, prix: "280€", dispo: "✅ En vente", rare: "⭐ Moyenne", revente: "450-500€" },
            "10294": { nom: "Titanic", annee: 2021, pieces: 9090, prix: "325€", dispo: "✅ En vente", rare: "⭐⭐ Élevée", revente: "500-550€" },
            "10307": { nom: "Tour Eiffel", annee: 2022, pieces: 10001, prix: "346€", dispo: "✅ En vente", rare: "⭐⭐ Élevée", revente: "550-600€" }
        };

        const info = legoSets[setID];

        if (!info) return interaction.reply({ content: "Set introuvable.", ephemeral: true });

        await interaction.reply(
`🧱 **${info.nom}**

🆔 **Set :** ${setID}
📅 **Année :** ${info.annee}
🧩 **Pièces :** ${info.pieces}
💰 **Prix Fournisseur :** ${info.prix}
📦 **Disponibilité :** ${info.dispo}
✨ **Rareté :** ${info.rare}
📈 **Est. Revente :** ${info.revente}`
        );
    }
};