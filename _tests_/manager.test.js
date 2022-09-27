const Manager = require('../lib/manager');

test ('Should create a manager', () => {
    const e = new Manager('managerName', 1, 'managerEmail', 2);
    expect(e.name).toBe('managerName');
    expect(e.id).toBe('1');
    expect(e.email).toBe('managerEmail');
    expect(e.officeNumber).toBe(2);
})