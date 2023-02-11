const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('keta')
    .setDescription('Responde com Cala a bocona diabo!'),

  async execute(interaction) {
    await interaction.reply('Cala a bocona diabo!', { tts: true });
  },
};
