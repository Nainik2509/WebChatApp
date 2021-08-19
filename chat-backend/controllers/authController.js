const User = require('../models').User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/app')

exports.login = async (req, res, next) => {
    const { email, password } = req.body

    try {

        const secret = require('crypto').randomBytes(64).toString('hex')

        // find the user
        const user = await User.findOne({
            where: { email }
        })

        // check if the user found
        if (!user) return res.status(404).json({ message: 'User not found' })

        // check if the password matches
        if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: 'Incorrect Password' })

        // generate auth token
        const userWithToken = generateToken(user.get({ raw: true }))

        return res.send(userWithToken)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}

exports.register = async (req, res, next) => {

}

const generateToken = (user) => {
    delete user.password
    const token = jwt.sign(user, config.appKey, { expiresIn: 86400 })
    return { ...user, ...{ token } }

}