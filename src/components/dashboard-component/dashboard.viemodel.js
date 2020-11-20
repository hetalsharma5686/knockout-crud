import ko from 'knockout';

import Employee from './../../model/Employee';

class DashboardViewModel {
    constructor(params) {
        this.name = ko.observable('').extend({
            required: "Name is required"
        });
        this.gender = ko.observable('male');
        this.email = ko.observable('').extend({
            required: "Email is required",
            rateLimit: 300,
            pattern: {
                value: /^[a-zA-Z0-9]+(._[a-zA-Z0-9]+)*\@[a-zA-Z]{2,10}\.[a-zA-Z]{2,5}$/,
                message: "Invalid Email!"
            }
        });
        this.contact = ko.observable('').extend({
            rateLimit: 300,
            pattern: {
                value: /^\d{10}$/,
                message: "Invalid Contact Number!" 
            }
        });
        this.knownTechnologies = ko.observableArray([]);

        this.isValid = ko.pureComputed(() => {
            if ((this.name.hasError() !== undefined && this.name.hasError() === false) &&
                (this.email.hasError() !== undefined && this.email.hasError() === false) &&
                (this.contact.hasError() !== undefined && this.contact.hasError() === false)) {
                return true;
            }
            return false;
        });
    }

    setDefaults() {
        this.name(null).gender('male').email(null).contact(null).knownTechnologies([]);
    }

    async addEmployeeData() {
        const employee = new Employee(Math.floor(Math.random() * 100000), this.name(), this.gender(), this.email(), this.contact(), this.knownTechnologies().join(', '));
        employee.save();
        this.setDefaults();
    }
}

export default DashboardViewModel;