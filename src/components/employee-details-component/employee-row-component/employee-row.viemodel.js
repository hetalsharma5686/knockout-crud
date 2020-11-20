import ko from 'knockout';

class EmployeeRowViewModel {
    constructor (params) {
        this.name = ko.observable('');
        this.employee = params.employee;

        this.editData = (data, event) => {
            this.name(this.employee.name);
            params.editEmployeeData(this.employee, event);
        }

        this.updateData = async (data, event) => {
            this.employee.name = this.name();
            await params.updateEmployeeData(this.employee, event);
        }

        this.removeData = async (data, event) => await params.removeEmployeeData(this.employee, event);
    }
}

export default EmployeeRowViewModel;