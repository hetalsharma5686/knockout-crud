import { Router } from '@profiscience/knockout-contrib';
import ko from 'knockout';

import Employee from './../../model/Employee';
import EmployeeService from './../../services/EmployeeService';

const setEmployeesData = (employees) => {
    return ko.utils.arrayMap(employees, employee => {
        return {
            ...employee,
            isInEditMode: ko.observable(false)
        };
    });
};

class EmployeeDetailsViewModel {
    constructor(context) {
        this.employees = ko.observableArray(setEmployeesData(context.employees ?? []));
        this.searchText = ko.observable('');
        
        this.filteredEmployees = ko.computed(() => {
            return this.employees().filter(emp => {
                return Object.values(emp).find(value => {
                    return value.toString().toLowerCase().includes(this.searchText().toLowerCase());
                });
            });
        });
    }

    sortColumnBy = (columnName) => {
        const employees = this.employees();
        employees.sort((left, right) => left[columnName] === right[columnName] ? 0 : left[columnName] < right[columnName] ? -1 : 1);
        this.employees(employees);
    }

    getEmployeesData = async () => {
        const employees = await EmployeeService.getAllEmployees();
        this.employees(setEmployeesData(employees));
    }

    toggleEditMode = (employee, event) => {
        event.stopPropagation();
        employee.isInEditMode(!employee.isInEditMode());
    }

    updateEmployeeData = async (employee, event) => {
        event.stopPropagation();
        const updatedEmployee = ko.utils.extend(new Employee(), employee)
        await updatedEmployee.update();
        await this.getEmployeesData();
        this.toggleEditMode(employee, event);
    }

    removeEmployeeData = async (employee, event) => {
        event.stopPropagation();
        await EmployeeService.removeEmployeeById(employee.id);
        this.getEmployeesData();
    }

    openEmployeeView = (employee) => {
        Router.update(`${Router.getPathFromLocation()}${Router.getPathFromLocation().includes('/users/') ? '' : '/'}${employee.id}`);
    }
}

export default EmployeeDetailsViewModel;