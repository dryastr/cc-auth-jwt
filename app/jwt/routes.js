const handlers = require('./handlers');

const routes = [
    {
        method: 'POST',
        path: '/login',
        options: handlers.login
    },
    {
        method: 'GET',
        path: '/secret',
        options: handlers.secret
    }
];

module.exports = routes;