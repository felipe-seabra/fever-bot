const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder().setName("kareca").setDescription("Responde com um texto em TTS"),
  async execute(_client, interaction) {
    await interaction.reply({
      content: "Kar\xE9ca n\xF3ia, mais n\xF3ia dos n\xF3ias!",
      tts: true
    });
  }
};
