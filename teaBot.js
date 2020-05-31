const fs = require('fs')
const Discord = require('discord.js')
const { prefix, token} = require('./config.json')

const client = new Discord.Client()
const setupDB = require('./config/database')
setupDB()

client.commands = new Discord.Collection
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
}
// const emojiFinder = require('./support/emojiFinder')

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {

	if (message.author.bot) return

	const messageContent = message.content.toLowerCase()
	if (messageContent.includes('ignore')){
        return
    } 

	if(messageContent.includes(prefix)) {
		const args = messageContent.replace(prefix, '')
		const command = client.commands.find(command => args.includes(command.name))
		
		if (!command) {
            const randomResponse = [`✨`, '⭐', '👀', '🦋', '🌸', '🌼']
            message.channel.send(randomResponse[Math.floor(Math.random() * randomResponse.length)])
		} else {
			try {
				command.execute(message, args)
			} catch (error) {
				console.error(error, 'error')
				message.reply('Whoops I broke 😭')
			}
        }
    }
})
client.login(token)