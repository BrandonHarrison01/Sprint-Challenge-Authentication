const db = require('../database/dbConfig')

module.exports = {
    addUser,
    getUsers,
    userLogin
}

async function addUser(newUser) {
    const [id] = await db('users').insert(newUser)
    console.log('id', id)
    return findById(id)
}

function userLogin(username) {
    return db('users').where({ username })
}

function getUsers() {
    return db('users')
}

function findById(id) {
    return db('users').where({ id }).first()
}
