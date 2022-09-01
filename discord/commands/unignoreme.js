const { SlashCommandBuilder } = require("discord.js");
const db = require("../../models");
const { smile } = require("../responseEmojiManager");
const logMessage = require("../utils/logMessage");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unignoreme")
        .setDescription("Undo ignoreme!"),
    callback: async function (interaction) {
        let reply;
        await interaction.deferReply();
        const ignoredUser = await db.models.IgnoreUser.findOne({
            where: { id: interaction.user.id }
        });
        if (ignoredUser) {
            await ignoredUser.destroy();
            reply = `Okay ${smile(interaction)}`;
        }
        else {
            reply = "I'm not ignoring you!";
        }
        logMessage(await interaction.editReply(reply));
    }
};