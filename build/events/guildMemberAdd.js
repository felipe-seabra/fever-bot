var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var guildMemberAdd_exports = {};
__export(guildMemberAdd_exports, {
  default: () => guildMemberAdd_default
});
module.exports = __toCommonJS(guildMemberAdd_exports);
var import_discord = require("discord.js");
const CHANNEL_NAME = process.env.CHANNEL_NAME;
const MEME_URL = process.env.MEME_URL || "";
const event = {
  name: "guildMemberAdd",
  async execute(member) {
    const channel = member.guild.channels.cache.find(
      (channel2) => channel2.name === CHANNEL_NAME
    );
    const welcomeMessage = await getWelcomeMessage(member.id);
    channel.send(welcomeMessage);
  }
};
const getWelcomeMessage = (userId) => {
  return {
    content: `Welcome ${(0, import_discord.userMention)(userId)},
    Hope you have great time here!
  `
  };
};
const getWelcomeMessageWithMeme = async (userId) => {
  const meme = await getMeme();
  return {
    content: `Welcome ${(0, import_discord.userMention)(userId)},
    Here's a meme for you to enjoy!`,
    embeds: [meme]
  };
};
const getMeme = async () => {
  return new import_discord.EmbedBuilder().setImage(MEME_URL);
};
var guildMemberAdd_default = event;
