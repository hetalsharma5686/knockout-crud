import ko from 'knockout';

import EmployeeService from './../services/EmployeeService';

class Employee {
    constructor (id, name, gender, email, contact, knownTechnologies) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.email = email;
        this.contact = contact;
        this.knownTechnologies = knownTechnologies;
    }

    save = async () => {
        const resp = await EmployeeService.saveEmployeeData(this);
        if (resp) {
            alert('Data has been saved successfully');
        } else {
            alert('Something went wrong while saving employee data!');
        }
    }

    update = async () => {
        const resp = await EmployeeService.updateEmployeeDataById(this.id, this);
        if (resp) {
            alert('Data has been updated successfully');
        } else {
            alert('Something went wrong while updating employee data!');
        }
    }
}

export default Employee;