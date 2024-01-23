const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder().setName("anao").setDescription("Responde com um texto em TTS"),
  async execute(_client, interaction) {
    await interaction.reply({
      content: "Vai estudar An\xE3o, para de copiar do ChatGPT!",
      tts: true
    });
  }
};
