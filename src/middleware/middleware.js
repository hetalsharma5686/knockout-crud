import EmployeeService from './../services/EmployeeService';

export default {
    isUserAuthenticated(ctx, isAuthenticated) {
        if (ctx.path === '/signup') {
            return;
        }

        const currentTime = new Date().getTime();
        const userToken = localStorage.getItem('userToken');
        const validity = localStorage.getItem('tokenValidity');

        if (!userToken || currentTime > validity) {
            isAuthenticated(false);
            if (ctx.path !== '/login') {
                ctx.redirect('/login');
            }
        } else {
            isAuthenticated(true);
            setTimeout(() => {
                ctx.redirect(ctx.path);
            }, 1500);
        } 
    },

    loadingMiddleware(ctx, isLoading) {
        return {
            async beforeRender() {
                isLoading(true);
            },
            afterRender() {
                isLoading(false);
            }
        }
    },

    async getEmployees(ctx) {
        const employees = await EmployeeService.getAllEmployees();
        return ctx.employees = employees;
    },

    async getEmployeeById(ctx) {
        const employee = await EmployeeService.getEmployeeById(Number(ctx.params.id));
        return ctx.employee = employee;
    }
}