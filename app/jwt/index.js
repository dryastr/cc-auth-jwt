const jwt = {
    name: 'jwt-authentication',
    version: '1.0.0',
    register: async function (server, options) {
        await server.register(require('@hapi/jwt'));
        
        server.auth.strategy('jwt_strategy', 'jwt', {
            keys: process.env.JWT_KEY,
            verify: {
                aud: process.env.JWT_AUD,
                iss: process.env.JWT_ISS,
                sub: false,
                maxAgeSec: 5 * 60,
                timeSkewSec: 15
            },
            validate: (artifacts, request, h) => {
                return {
                    isValid: true,
                    credentials: artifacts.decoded.payload.user
                };
            }
        });
        
        server.route(require('./routes'));
        console.log('info', 'Plugin registered: authentication with jwt strategy');
    }
};

module.exports = jwt;
