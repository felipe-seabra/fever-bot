/* eslint-disable max-len */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
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

const loadEvents = () => {
  const eventsPath = path.join(__dirname, 'events');
  const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
};

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

const handleCommand = async (interaction) => {
  if (!interaction || !interaction.isChatInputCommand()) {
    console.error(`Invalid interaction received: ${interaction}`);
    return;
  }

  const { commandName } = interaction;
  if (!commandName) {
    console.error(`No command name found in interaction: ${interaction}`);
    return;
  }

  const command = client.commands.get(commandName);
  if (!command) {
    console.error(`Command not found: ${commandName}`);
    await interaction.reply(`The command '${commandName}' was not found.`);
    return;
  }

  try {
    await command.execute(client, interaction);
  } catch (error) {
    console.error(`Error executing command '${commandName}': ${error}`);
    await interaction.reply(`An error occurred while executing the '${commandName}' command.`);
  }
};

client.once(Events.ClientReady, () => {
  console.log(`Bot logged in as ${client.user.tag}.`);
});

client.on('ready', () => {
  console.log(`${client.user.tag} is ready.`);
  loadEvents();
  loadCommands();
  setBotStatus();
});

// Listener de interações com o bot
client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isStringSelectMenu()) {
    const selected = interaction.values[0];
    if (selected === 'javascript') {
      await interaction
        .reply('Documentação do Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript');
    } else if (selected === 'python') {
      await interaction
        .reply('Documentação do Python: https://www.python.org');
    } else if (selected === 'csharp') {
      await interaction
        .reply('Documentação do C#: https://learn.microsoft.com/en-us/dotnet/csharp/');
    } else if (selected === 'discordjs') {
      await interaction
        .reply('Documentação do Discord.js: https://discordjs.guide/#before-you-begin');
    }
  }
  await handleCommand(interaction);
});

client.login(TOKEN);
