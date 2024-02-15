const{ Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds,  GatewayIntentBits.GuildMessages,  GatewayIntentBits.MessageContent] });
client.login("MTIwNzY3NDkyMjY2NzYxMDEyMw.GT0A53.f7GmKBLLf0abzp5cT8TaALhHDMMnPwdKTxSdho");

const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: "", // This is the default and can be omitted
  });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("messageCreate", async (msg) =>{
    if(msg.author.bot) return
    
    if(!msg.mentions.has(client.user)) return

    msg.content = msg.content.replace(/<@\d+>/g, "")

    let response = await msg.reply("Antwort wird Generiert")

    async function main() {
        const completion = await openai.chat.completions.create({
          promt: msg.content,
          model: 'gpt-3.5-turbo',
        });
        console.log(completion.data.choises[0].text);
        response.edit(completion.data.choises[0].text)
      }
})

