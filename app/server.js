const Hapi = require('@hapi/hapi');
require('dotenv').config();

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.NODE_ENV !== 'production' ? process.env.LOCAL_ENV : process.env.PROD_ENV
    });

    await server.register(require('./jwt'));

    server.route(require('./routes'));

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);

    process.on('unhandledRejection', (err) => {
        console.log(err);
        process.exit(1);
    });
};

init();
