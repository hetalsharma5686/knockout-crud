import middlewares from './../middleware/middleware';

export default {
    routes: {
        '/login': 'auth',
        '/signup': 'signup',
        '/': 'dashboard',
        '/users': {
            '/': [
                middlewares.getEmployees,
                'employee-details'
            ],
            '/:id': [
                middlewares.getEmployeeById,
                'employee-data'
            ]
        },
        '/weather': 'weather-report',
        '/logout': (ctx) => {
            localStorage.removeItem('userToken');
            localStorage.removeItem('tokenValidity');
            ctx.redirect('/login');
        }
    }
}