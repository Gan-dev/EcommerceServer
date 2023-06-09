const router = require("express").Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('./../models/User.model')

const { isAuthenticaded } = require('./../middlewares/verifyToken.middleware')
const saltRounds = 10

router.post('/signup', (req, res, next) => {
    const { email, password, username, birth, avatar } = req.body

    if (password.length < 2) {
        res.status(400).json({ message: 'Password must have at leats 2 characters' })
        return
    }
    User
        .findOne({ email })
        .then((foundUser) => {
            if (foundUser) {
                res.status(400).json({ message: "The use already exist." })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ email, password: hashedPassword, username, birth, avatar })
        })
        .then((createdUser) => {
            const { email, username, _id, avatar } = createdUser
            const user = { email, username, _id, avatar }
            res.status(200).json({ user })
        })
        .catch(err => next(err))

})

router.post('/login', (req, res, next) => {
    const { email, password } = req.body
    if (email == '' || password == '') {
        res.status(400).json({ message: "Provided email and password" })
        return
    }
    User
        .findOne({ email })
        .then((foundUser) => {
            if (!foundUser) {
                res.status(400).json({ message: "User not found :(" })
                return
            }
            if (bcrypt.compareSync(password, foundUser.password)) {
                const { _id, email, username, avatar, cart, birth } = foundUser

                const payload = { _id, email, username, avatar, cart, birth }
                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6H" }
                )
                res.json({ authToken: authToken })
            } else {
                res.status(401).json({ message: "Unable to authenticate the user" })
            }
        })
        .catch(err => next(err))
})

router.get('/verify', isAuthenticaded, (req, res, next) => {
    console.log(req.payload)
    res.status(200).json(req.payload)

})
module.exports = router