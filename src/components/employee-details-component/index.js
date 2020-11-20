import ko from 'knockout';

import employeeDetailsTemplate from './employee-details.template.html';
import EmployeeDetailsViewModel from './employee-details.viewmodel';

import EmployeeRowComponent from './employee-row-component';

ko.components.register('employee-row', EmployeeRowComponent);

export default {
    viewModel: EmployeeDetailsViewModel,
    template: employeeDetailsTemplate
};