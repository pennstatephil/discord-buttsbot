const { SlashCommand, utils } = require("discord-bot");
const { MessageActionRow, MessageButton } = require("discord.js");
const { permissionValue } = require("../../config/bot.json");

module.exports = new SlashCommand("invite", function (interaction) {
    utils.replyVerbose(interaction, {
        content: `Invite me to another server!`,
        components: [new MessageActionRow({
            components: [new MessageButton({
                style: "LINK",
                label: "Invite",
                url: `https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=${permissionValue}&scope=bot%20applications.commands`
            })]
        })]
    })
        .catch(console.error);
}, { description: "I'll send a link so you can invite me somewhere else!" });
