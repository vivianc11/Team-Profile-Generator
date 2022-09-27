const Employee = require('../lib/employee');

test ('Should create an employee', () => {
    const event = new Employee('employeeName', 0, 'employeeEmail');
    expect(event.name).toBe('employeeName')
    expect(event.id).toBe(0);
    expect(event.email).toBe('employeeEmail');
})