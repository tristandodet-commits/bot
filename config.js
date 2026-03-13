import 'dotenv/config';

export default {
  // Informations de connexion
  token: process.env.TOKEN, //
  clientId: process.env.CLIENT_ID, //
  guildId: process.env.GUILD_ID, //

  // Salons pour les panels de tickets
  supportChannelId: process.env.SUPPORT_CHANNEL_ID, //
  achatChannelId: process.env.ACHAT_CHANNEL_ID, //

  // Salons de logs
  logbanChannelId: process.env.LOGBAN_CHANNEL_ID, //
  logunbanChannelId: process.env.LOGUNBAN_CHANNEL_ID, //

  // Catégories pour la création des tickets
  ticketCategories: {
    support: process.env.TICKET_CAT_SUPPORT, //
    achat: process.env.TICKET_CAT_ACHAT //
  },

  // Rôle de modération
  staffRole: process.env.STAFF_ROLE_ID //
};