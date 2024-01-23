var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_discord = require("discord.js");
var import_helpers = require("./helpers");
var import_path = __toESM(require("path"));
const TOKEN = process.env.TOKEN;
const { Guilds, GuildMembers, GuildMessages, MessageContent } = import_discord.GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = import_discord.Partials;
const client = new import_discord.Client({
  intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
  partials: [User, Message, GuildMember, ThreadMember]
});
client.events = new import_discord.Collection();
client.commands = new import_discord.Collection();
(0, import_helpers.loadEvents)(client, import_path.default.join(__dirname, "events"));
(0, import_helpers.loadCommands)(client, import_path.default.join(__dirname, "commands"));
const setBotStatus = () => {
  client.user.setStatus("dnd");
  const data = [
    "Waiting for commands",
    "/help for more",
    "jajajaja"
  ];
  let count = 0;
  setInterval(() => client.user.setPresence({
    activities: [{
      name: `${data[(count += 1) % data.length]}`,
      type: 0
    }]
  }), 3e4);
};
client.on("ready", () => {
  setBotStatus();
});
client.on(import_discord.Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand())
    return;
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
      ephemeral: true
    });
  }
});
client.login(TOKEN);
