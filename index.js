const config = require("./config.json");
var Discord = require("discord.js");
var client = new Discord.Client();
var isReady = true;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    activity: { name: "Red kinda sus" },
    status: "dnd",
  });
});

client.on("message", (message) => {
  if (isReady && message.content === "!sus") {
    isReady = false;
    var voiceChannel = message.member.voiceChannel;
    message.member.voice.channel
      .join()
      .then((connection) => {
        const dispatcher = connection.play("./audio/sus.mp3");
        dispatcher.on("finish", (end) => {
          message.member.voice.channel.leave();
        });
      })
      .catch((err) => console.log(err));
    isReady = true;
  }
});

client.login(config.token);
