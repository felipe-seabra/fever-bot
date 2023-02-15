const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('keta')
    .setDescription('Responde com um texto'),

  async execute(client, interaction) {
    await interaction.reply({
      content: 'Cala a bocona diabo!',
      tts: true,
    });
  },
};
