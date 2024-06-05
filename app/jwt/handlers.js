const jsonwebtoken = require('jsonwebtoken');
const Bcrypt = require('bcrypt');
const users = require('../models/users');
// require('dotenv').config();

const validate = async ({ username, password }) => {
    const account = users.find(user => user.username === username);
    if (!account || !(await Bcrypt.compare(password, account.password))) {
        return false;
    }
    return account;
};

const handlers = {
    login: {
        handler: async (request, h) => {
            const account = await validate(request.payload);
            if (!account) {
                return h.response({
                    status: 'fail',
                    message: 'Invalid credentials'
                }).code(400);
            }
            const token = jsonwebtoken.sign({
                user: { username: account.username, id: account.id, name: account.name }
            }, process.env.JWT_KEY, {
                audience: process.env.JWT_AUD,
                issuer: process.env.JWT_ISS
            });
            return h.response({
                status: 'success',
                message: 'Credentials are valid',
                data: token
            }).code(200);
        }
    },
    secret: {
        auth: 'jwt_strategy',
        handler: (request, h) => {
            return h.response({
                status: 'success',
                message: 'Authentication verified',
                data: request.auth.credentials.user
            }).code(200);
        }
    }
};

module.exports = handlers;
