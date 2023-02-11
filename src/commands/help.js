const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const botCommands = new EmbedBuilder()
  .setColor('Orange')
  .setTitle('Comandos do Bot')
  .addFields(
    { name: '\u200B', value: '\u200B' },
    { name: '/ping', value: 'Responde com "Pong!"', inline: true },
    { name: '/git', value: 'Lista os comandos mais utilizados no GitHub', inline: true },
    { name: '/docs', value: 'Um seletor de linguages de programação', inline: true },
    { name: '\u200B', value: '\u200B' },
    { name: '/help', value: 'Lista os comandos do Bot', inline: true },
    { name: '/serverinfo', value: 'Mostra as informações do servidor', inline: true },
    {
      name: '/clear',
      value: 'Apaga até 50 mensagens que não tenham mais de 14 dias',
      inline: true,
    },
  );

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Listar comandos do Bot'),

  async execute(client, interaction) {
    await interaction.reply({ embeds: [botCommands] });
  },
};
