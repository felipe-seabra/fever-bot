const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kareca')
    .setDescription('Responde com um texto em TTS'),

  async execute(_client, interaction) {
    await interaction.reply({
      content: 'Karéca nóia, mais nóia dos nóias!',
      tts: true,
    });
  },
};
