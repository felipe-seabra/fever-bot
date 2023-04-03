import { REST, Routes } from 'discord.js';
import loadFiles from "./loadFiles";
import ascii from "ascii-table";
import path from "path";

const { TOKEN, CLIENT_ID } = process.env;

export default function loadCommands(client, dirName) {
  client.commands.clear();

  const files = loadFiles(dirName, ".js");
  const table = new ascii("Commands").setHeading("Command", "Status");

  const commands = [];

  for (const file of files) {
    const command = require(path.join(dirName, file));

    commands.push(command.data.toJSON());

    client.commands.set(command.data.name, command);

    table.addRow(file, "✅");
  }
  const rest = new REST({ version: '10' }).setToken(TOKEN);

  (async () => {
    try {
      await rest.put(
        Routes.applicationCommands(CLIENT_ID),
        { body: commands },
      );
    } catch (error) {
      console.error(error);
    }
  })();

  console.log(table.toString());

  return client.commands;
}
