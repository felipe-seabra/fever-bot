import { Client, Events, GatewayIntentBits, Partials, Collection } from "discord.js";
import { loadEvents, loadCommands } from "./helpers";
import path from "path";

const TOKEN = process.env.TOKEN;

const { Guilds, GuildMembers, GuildMessages, MessageContent } =
  GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
  partials: [User, Message, GuildMember, ThreadMember],
});

client.events = new Collection();
client.commands = new Collection();

loadEvents(client, path.join(__dirname, "events"));
loadCommands(client, path.join(__dirname, "commands"));

const setBotStatus = () => {
  client.user.setStatus('dnd');

  const data = [
    'Waiting for commands',
    '/help for more',
    'jajajaja',
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

client.on('ready', () => {
  setBotStatus();
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) return;
  
  const commandName = interaction.commandName;
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
    await interaction.reply({
      content: "Houve um erro ao executar este comando.",
      ephemeral: true,
    });
  }
});

client.login(TOKEN);
