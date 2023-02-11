const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Exclui 50 mensagens'),

  async execute(interaction) {
    const amount = 50;

    const messages = await interaction.channel.messages.fetch({ limit: amount });
    const fourteenDaysAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
    const messagesToDelete = messages
      .filter((message) => message.createdTimestamp > fourteenDaysAgo);

    interaction.channel.bulkDelete(messagesToDelete)
      .then(() => interaction.reply(`🗑️🗑️ Foi excluído ${messagesToDelete.size} mensagens! \n
DÁ UMA SEGURADA AÍ!!! 🗑️🗑️`))
      .catch((error) => interaction.reply(`Ocorreu um erro ao excluir mensagens: ${error}`));
  },

};
