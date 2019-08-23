const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('./auth-model')

router.post('/register', (req, res) => {
  // implement registration
  const newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 4);
  newUser.password = hash

  Users.addUser(newUser)
    .then(user => res.status(201).json(user))
    .catch(error => res.status(500).json(error))
});

router.post('/login', (req, res) => {
  // implement login
});


router.get('/', (req, res) => {
  Users.getUsers()
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json(error))
})

module.exports = router;
