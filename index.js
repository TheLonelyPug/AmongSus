const discord = require('discord.js');
const client = new discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity('Sussing people in ${client.guilds.cache.size} server(s)');

    client.api.applications(client.user.id).guilds('859008045740064769').commands.post({
        data: {
            name: "sus",
            description: "Joins VC and plays sus!"
        }
    });

    client.ws.on('INTERACTION_CREATE', async interaction => {
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;
        if(command == 'sus') {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "Hello World!"
                    }
                }
            });
        }
    });
});

async function createAPIMessage(interaction, content) {
    const apiMessage = await discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
        .resolveData()
        .resolveFiles();

    return { ...apiMessage.data, files: apiMessage.files };
}

client.login(require('./config.json').token);
