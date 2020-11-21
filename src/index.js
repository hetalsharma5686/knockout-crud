import ko from 'knockout';
import { Router } from '@profiscience/knockout-contrib-router';

import AppComponent from './components/app-component';
import NavbarComponent from './components/navbar-component';
import AuthComponent from './components/auth-component';
import SignupComponent from './components/signup-component';
import DashboardComponent from './components/dashboard-component';
import EmployeeDeailsComponent from './components/employee-details-component';
import EmployeeDataComponent from './components/employee-data-component';
import WeatherReportComponent from './components/weather-report-component';

import customBindigs from './custom-bindings/custom-bindings';
import routes from './routes/routes';
import middleware from './middleware/middleware';
import extenders from './extenders/extenders';

const isLoading = ko.observable(false);
const isAuthenticated = ko.observable(false);

Router.setConfig({
    base: 'https://hetalsharma5686.github.io/knockout-crud'
});

Router
.use((ctx) => middleware.isUserAuthenticated(ctx, isAuthenticated))
.use((ctx) => middleware.loadingMiddleware(ctx, isLoading));

Router.useRoutes(routes.routes);

ko.components.register('app-component', AppComponent);
ko.components.register('navbar-component', NavbarComponent);
ko.components.register('auth', AuthComponent);
ko.components.register('signup', SignupComponent);
ko.components.register('dashboard', DashboardComponent);
ko.components.register('employee-details', EmployeeDeailsComponent);
ko.components.register('employee-data', EmployeeDataComponent);
ko.components.register('weather-report', WeatherReportComponent);

// ko.bindingHandlers.setRoute = customBindigs.setRoute;
ko.bindingHandlers.onLoad = customBindigs.onLoad;

ko.extenders.required = extenders.required;
ko.extenders.pattern = extenders.pattern;

ko.applyBindings({isLoading, isAuthenticated});
