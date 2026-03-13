import { EmbedBuilder } from 'discord.js';

export default {
    name: 'guildMemberAdd',
    async execute(member) {
        const WELCOME_CHANNEL_ID = '1480232867580739725'; 
        const AUTO_ROLE_ID = '1480226973342236672'; 

        const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
        
        // Attribution du rôle
        try {
            const role = member.guild.roles.cache.get(AUTO_ROLE_ID);
            if (role) await member.roles.add(role);
        } catch (err) {
            console.error("Erreur rôle :", err);
        }

        if (!channel) return;

        const welcomeEmbed = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle(`Bienvenue, ${member.user.username} !`)
            .setDescription(
                `Ravis de t'accueillir sur **${member.guild.name}** !\n\n` +
                `> 📑 Passe voir le <#1480232909808992256> pour éviter les soucis.\n` +
                `> 🎭 N'hésite pas à t'informer avec le salon <#1480233044278513815>.\n\n` +
                `*Nous sommes maintenant **${member.guild.memberCount}** membres !*`
            )
            .setThumbnail(member.user.displayAvatarURL({ forceStatic: false, size: 512 }))
            .setTimestamp();
            
        channel.send({ 
            content: `Bienvenue ${member} !`, 
            embeds: [welcomeEmbed] 
        }).catch(console.error);
    },
};