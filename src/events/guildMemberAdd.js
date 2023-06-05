import { EmbedBuilder, userMention } from "discord.js";

const CHANNEL_NAME = process.env.CHANNEL_NAME;
const MEME_URL = process.env.MEME_URL || "";

const event = {
  name: "guildMemberAdd",
  async execute(member) {
    const channel = member.guild.channels.cache.find(
      (channel) => channel.name === CHANNEL_NAME
    );
    const welcomeMessage = await getWelcomeMessage(member.id);
    channel.send(welcomeMessage);
  },
};

const getWelcomeMessage = (userId) => {
  return {
    content: `Welcome ${userMention(userId)},
    Hope you have great time here!
  `,
  };
};

const getWelcomeMessageWithMeme = async (userId) => {
  const meme = await getMeme();

  return {
    content: `Welcome ${userMention(userId)},
    Here's a meme for you to enjoy!`,
    embeds: [meme],
  };
};

const getMeme = async () => {
  return new EmbedBuilder().setImage(MEME_URL);
};

export default event;
