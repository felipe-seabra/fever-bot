const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gordo')
    .setDescription('Responde com um texto em TTS'),

  async execute(_client, interaction) {
    await interaction.reply({
      content: 'A PORRA DO GORDO NÃO CALA A BOCA!',
      tts: true,
    });
  },
};
