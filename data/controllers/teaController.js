const Tea = require('../models/Tea')

module.exports.create = async(data) => {
    const mongoose = require('mongoose')
    if (!mongoose.connection.readyState) {
        return {error: 'DB down'}
    }
    try {
        const tea = new Tea(data)
        const newTea = await tea.save()
        return newTea
    } catch(err) {
        console.log(err)
        return {error: 'DB save error'}
    }
}

module.exports.destroy = async(id) => {
    const mongoose = require('mongoose')
    if (!mongoose.connection.readyState) {
        return {error: 'DB down'}
    }
    try {
        const deletedTea = await Tea.findByIdAndDelete(id)
        return deletedTea
    } catch(err) {
        console.log(err)
        return {error: 'DB delete error'}
    }
}

module.exports.update = async(id, data) => {
    const mongoose = require('mongoose')
    if (!mongoose.connection.readyState) {
        return {error: 'DB down'}
    }
    try {
        const newTea = await Tea.findByIdAndUpdate(id, data, {new: true, runValidators: true})
        return newTea
    } catch(err) {
        console.log(err)
        return {error: 'DB update error'}
    }
}

module.exports.listByGuild = async(guild) => {
    if (!mongoose.connection.readyState) {
        return {error: 'DB down'}
    }
    try {
        const teas = await Tea.find(guild)
        return teas
    } catch(err) {
        console.log(err)
        return {error: 'DB List error'}
    }
}

module.exports.show = async(id) => {
    const mongoose = require('mongoose')
    if (!mongoose.connection.readyState) {
        return {error: 'DB down'}
    }
    try {
        const tea = await Tea.findById(id)
        return tea
    } catch(err) {
        console.log(err)
        return {error: 'DB show error'}
    }
}

module.exports.listByTag = async(tag) => {
    const mongoose = require('mongoose')
    if (!mongoose.connection.readyState) {
        return {error: 'DB down'}
    }
    try {
        const teas = await Tea.find({tags: tag})
        return teas
    } catch (err) {
        console.log(err)
        return {error: 'Find by tag error'}
    }
}