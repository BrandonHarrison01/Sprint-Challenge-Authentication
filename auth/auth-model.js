const db = require('../database/dbConfig')

module.exports = {
    addUser,
    getUsers
}

function addUser(newUser) {
    return db('users').insert(newUser)
}

function getUsers() {
    return db('users')
}