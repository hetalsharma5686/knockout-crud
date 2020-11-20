class EmployeeService {
    static getAllEmployees = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const employees = JSON.parse(localStorage.getItem('employees'));
                if (employees && employees.length > 0) {
                    resolve(employees);
                } else {
                    reject();
                }
            }, 800);
        });
    }

    static getEmployeeById = (employeeId) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const employees = JSON.parse(localStorage.getItem('employees'));
                const employee = employees.find((emp) => employeeId === emp.id);
                employee ? resolve(employee) : reject();
            }, 800);
        });
    }

    static saveEmployeeData = (employee) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const employees = JSON.parse(localStorage.getItem('employees')) || [];
                employees.push(employee);
                localStorage.setItem('employees', JSON.stringify(employees));
                employee ? resolve(employee) : reject();
            }, 800);
        });
    }

    static updateEmployeeDataById = (employeeId, employeeDataTobeUpdate) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const employees = JSON.parse(localStorage.getItem('employees')) || [];
                const employee = employees.find((emp) => employeeId === emp.id);
                const updatedEmployee = {
                    ...employee,
                    ...employeeDataTobeUpdate
                };
                employees[employees.indexOf(employee)] = updatedEmployee;
                localStorage.setItem('employees', JSON.stringify(employees));
                employee ? resolve(employee) : reject();
            }, 800);
        });
    }

    static removeEmployeeById = (employeeId) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const employees = JSON.parse(localStorage.getItem('employees')) || [];
                const employeeIndex = employees.findIndex((emp) => employeeId === emp.id);
                employees.splice(employeeIndex, 1);
                localStorage.setItem('employees', JSON.stringify(employees));
                employees ? resolve(employees) : reject([]);
            }, 800);
        });
    }
}

export default EmployeeService;