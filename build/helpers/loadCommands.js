var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var loadCommands_exports = {};
__export(loadCommands_exports, {
  default: () => loadCommands
});
module.exports = __toCommonJS(loadCommands_exports);
var import_discord = require("discord.js");
var import_loadFiles = __toESM(require("./loadFiles"));
var import_ascii_table = __toESM(require("ascii-table"));
var import_path = __toESM(require("path"));
const { TOKEN, CLIENT_ID } = process.env;
function loadCommands(client, dirName) {
  client.commands.clear();
  const files = (0, import_loadFiles.default)(dirName, ".js");
  const table = new import_ascii_table.default("Commands").setHeading("Command", "Status");
  const commands = [];
  for (const file of files) {
    const command = require(import_path.default.join(dirName, file));
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
    table.addRow(file, "\u2705");
  }
  const rest = new import_discord.REST({ version: "10" }).setToken(TOKEN);
  (async () => {
    try {
      await rest.put(
        import_discord.Routes.applicationCommands(CLIENT_ID),
        { body: commands }
      );
    } catch (error) {
      console.error(error);
    }
  })();
  console.log(table.toString());
  return client.commands;
}
