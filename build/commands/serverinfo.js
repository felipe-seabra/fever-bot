const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder().setName("serverinfo").setDescription("Replies with basic server info"),
  async execute(_client, interaction) {
    await interaction.reply(
      `Server name: ${interaction.guild.name}
Total members: ${interaction.guild.memberCount}`
    );
  }
};
