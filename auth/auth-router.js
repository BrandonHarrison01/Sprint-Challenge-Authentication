const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('./auth-model')
const restricted = require('./authenticate-middleware')

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
  const { username, password } = req.body

  Users.userLogin(username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}`,
          token,
        })
      } else {
        res.status(401).json({ message: 'Invalid Credentials' })
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
});


router.get('/', restricted, (req, res) => {
  Users.getUsers()
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json(error))
})

function getToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }
  const secret = 'sshhhh'
  return jwt.sign(payload, secret)
}

module.exports = router;
