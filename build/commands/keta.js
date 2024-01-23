const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder().setName("keta").setDescription("Responde com um texto em TTS"),
  async execute(_client, interaction) {
    await interaction.reply({
      content: "Cala a bocona diabo!",
      tts: true
    });
  }
};
