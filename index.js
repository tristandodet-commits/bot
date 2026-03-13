import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
    Client, 
    Collection, 
    GatewayIntentBits, 
    REST, 
    Routes, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle 
} from 'discord.js';
import config from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialisation du client avec les Intents nécessaires
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent 
  ] 
});

client.commands = new Collection();
const commands = [];

// --- 1. CHARGEMENT DES COMMANDES ---
const commandsPath = path.join(__dirname, 'commands'); 
if (!fs.existsSync(commandsPath)) fs.mkdirSync(commandsPath);

const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = `./commands/${file}`;
  const { default: command } = await import(filePath);
  
  if (command && 'data' in command) {
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
  }
}

// --- 2. CHARGEMENT DES ÉVÉNEMENTS ---
const eventsPath = path.join(__dirname, 'events');
if (!fs.existsSync(eventsPath)) fs.mkdirSync(eventsPath);

const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = `./events/${file}`;
    const { default: event } = await import(filePath);
    
    // On passe "client" en argument supplémentaire pour que les events y aient accès
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// --- 3. ENREGISTREMENT DES COMMANDES SLASH ---
const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
    try {
        console.log('🚀 Actualisation des commandes Slash...');
        await rest.put(
            Routes.applicationGuildCommands(config.clientId, config.guildId),
            { body: commands },
        );
        console.log('✅ Commandes Slash enregistrées.');
    } catch (error) {
        console.error("Erreur lors de l'enregistrement des commandes:", error);
    }
})();

// --- 4. FONCTION AUTOMATIQUE DU PANEL TICKETS ---
// Cette fonction vérifie au démarrage si les panels existent, sinon elle les crée.
async function setupTicketPanel(guild) {
    const panels = [
        { id: config.supportChannelId, title: "Support Technique", desc: "Besoin d'aide ? Cliquez ci-dessous pour ouvrir un ticket.", color: 0x5865F2, customId: "btn_ticket_support" },
        { id: config.achatChannelId, title: "Espace Achat", desc: "Pour passer commande ou voir nos services, ouvrez un ticket.", color: 0x3BA55C, customId: "btn_ticket_achat" }
    ];

    for (const p of panels) {
        const channel = guild.channels.cache.get(p.id);
        if (!channel) {
            console.warn(`⚠️ Salon introuvable pour le panel: ${p.title}`);
            continue;
        }

        const messages = await channel.messages.fetch({ limit: 10 });
        const exists = messages.find(m => m.author.id === client.user.id && m.embeds[0]?.title === p.title);

        if (!exists) {
            const embed = new EmbedBuilder()
                .setTitle(p.title)
                .setDescription(p.desc)
                .setColor(p.color)
                .setFooter({ text: 'Builder Hub System' });

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(p.customId)
                    .setLabel('Ouvrir un ticket')
                    .setEmoji('🎫')
                    .setStyle(ButtonStyle.Primary)
            );

            await channel.send({ embeds: [embed], components: [row] });
            console.log(`📦 Panel "${p.title}" envoyé.`);
        }
    }
}

// Remplace 'ready' par 'clientReady' pour éviter le warning
client.once('Ready', async () => {
    console.log(`🤖 Bot en ligne : ${client.user.tag}`);
    // On a supprimé setupTicketPanel(guild) ici pour que ça ne s'envoie que via la commande
});

import express from 'express'; // Utilise import au lieu de require

const app = express();
const port = process.env.PORT || 3000; // Render définit automatiquement un PORT

app.get('/', (req, res) => {
  res.send('Bot is alive!');
});

app.listen(port, () => {
  console.log(`✅ Serveur de monitoring lancé sur le port ${port}`);
});

// --- Reste de ton code (Client, Collection, etc.) ---

client.login(process.env.TOKEN);