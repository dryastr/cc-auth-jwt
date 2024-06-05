const routes = [
    {
        method: 'GET',
        path: '/',
        options: {
            auth: false,
            handler: (request, h) => {
                return 'Halo, selamat datang di percobaan auth API.';
            }
        }
    },
    {
        method: '*',
        path: '/{any*}',
        options: {
            auth: false,
            handler: (request, h) => {
                return h.response({
                    status: 'fail',
                    message: 'API tidak ditemukan'
                }).code(404);
            }
        }
    }
];

module.exports = routes;
