const teaController = require('../data/controllers/teaController')

module.exports = {
    name: 'new tea',
    description: 'make an entry in the tea db',
    async execute(message, args) {
        const name = args.replace('new tea', '').trim()
        await message.channel.send("Oooh, new tea! Respond to this message with `tea <steeping time> <tags>` and I'll add " + name + " to the database. Tags should be seperated from each other with a comma and a space.\nHere's an example:\ntea 3m black tea, mer's favs")
        try {
            const collected = await message.channel.awaitMessages(m =>{
                console.log(m)
                return m.content.toLowerCase().startsWith('tea')
            } , {max: 1, time: 10000, errors: ['time']})
            if (collected) {
                console.log(collected)
                const newArgs = collected.first().content.replace('tea', '').trim().split(' ')
                const [time] = newArgs
                const tags = newArgs.slice(1).join(' ').split(', ')
    
                console.log(time, tags)
    
                const duration = (time) => {
                    const i = time.length - 1
                    const timeNumber = time.replace(time[i], '')
                    console.log(timeNumber, time)
                    if (time[i] === 's') return timeNumber * 1000
                    else if (time[i] === 'm') return timeNumber * 60000
                    else if (time[i] === 'h') return timeNumber * 60 * 60000
                }
                
                const data = {
                    name,
                    time: duration(time),
                    tags: tags && tags
                }
    
                console.log(data)
    
                if (name, time) {
                    const newTea = await teaController.create(data)
                    newTea && message.channel.send(`Created ${newTea.name} with a steep time of ${newTea.time/60000}. Tagged: ${newTea.tags.join(', ')}`)
                    // message.channel.send('logging to console')    
                } else {
                    message.channel.send(`That data doesn't look right. Please try again!`)
                }
            } else {
                message.channel.send(`No reply received. Please try again!`)
            }
        } catch(err) {
            console.log(err)
            message.channel.send('console logging')
        }
        
    }
}