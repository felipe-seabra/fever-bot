const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder().setName("clear").setDescription("Exclui mensagens, selecione entre 1 e 100").addNumberOption((option) => option.setName("valor").setDescription("Quantidade para excluir").setRequired(true)),
  async execute(_client, interaction) {
    const [{ value }] = interaction.options._hoistedOptions;
    const messages = await interaction.channel.messages.fetch({ limit: value });
    const fourteenDaysAgo = Date.now() - 14 * 24 * 60 * 60 * 1e3;
    const messagesToDelete = messages.filter((message) => message.createdTimestamp > fourteenDaysAgo);
    interaction.channel.bulkDelete(messagesToDelete).then(() => interaction.reply(`\u{1F5D1}\uFE0F\u{1F5D1}\uFE0F Foi exclu\xEDdo ${messagesToDelete.size} mensagens! 

D\xC1 UMA SEGURADA A\xCD!!! \u{1F5D1}\uFE0F\u{1F5D1}\uFE0F`)).catch((error) => interaction.reply(`Ocorreu um erro ao excluir mensagens: ${error}`));
  }
};
