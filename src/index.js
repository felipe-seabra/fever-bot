/* eslint-disable no-return-assign */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-restricted-syntax */
const { Client, Events, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();
const { TOKEN } = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Map();

const loadCommands = () => {
  const commandsPath = path.join(__dirname, 'commands');
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if (command.data && command.execute) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`${filePath} is missing 'data' or 'execute' property.`);
    }
  }
};

const setBotStatus = () => {
  client.user.setStatus('dnd');

  const data = [
    'Programming...',
    'type /help for more',
  ];

  let count = 0;

  setInterval(() =>
    client.user.setPresence({
      activities: [{
        name: `${data[(count += 1) % data.length]}`,
        type: 0,
      }],
    }), 30000);
};

client.once(Events.ClientReady, () => {
  console.log(`Bot logged in as ${client.user.tag}.`);
});

client.on('ready', () => {
  console.log(`${client.user.tag} is ready.`);
  loadCommands();
  setBotStatus();
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  const command = client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`Command '${interaction.commandName}' not found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply('Error executing command.');
  }
});

client.login(TOKEN);
