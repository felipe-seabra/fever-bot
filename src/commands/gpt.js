/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-lines-per-function */
const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gpt')
    .setDescription('Faça uma pergunta para o Fever AI')
    .addStringOption((option) =>
      option.setName('pergunta')
        .setDescription('Pergunta:')
        .setRequired(true)),
  cooldown: 3,
  permissions: [
    PermissionsBitField.Flags.Connect,
    PermissionsBitField.Flags.Speak,
    PermissionsBitField.Flags.AddReactions,
    PermissionsBitField.Flags.ManageMessages,
  ],

  async execute(_client, interaction) {
    const [{ value }] = interaction.options._hoistedOptions;

    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORGANIZATION,
    });

    const openai = new OpenAIApi(config);

    const generateCompletion = async (question) => {
      if (question.length > 4000) return null;
      try {
        const completion = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: question,
          max_tokens: 4000,
          temperature: 0.7 });
        return completion.data.choices[0].text.trim();
      } catch (err) {
        if (err.response) {
          console.error(err.response.status);
          console.error(err.response.data);
        } else {
          console.error(err.message);
        }
        return null;
      }
    };

    const response = await generateCompletion(`${value}?`);
    if (!response) {
      await interaction.reply({
        content: 'Erro ao executar o comando, tente novamente! APENAS PERGUNTAS SIMPLES!',
        tts: false,
      });
    } else {
      await interaction.reply({
        content: response,
        tts: true,
      });
    }
  },
};
