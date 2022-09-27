const Intern = require('../lib/intern');

test ('Should create an intern', () => {
    const e = new Intern('internName', 1, 'internEmail', 'internSchool');
    expect(e.name).toBe('internName');
    expect(e.id).toBe(1);
    expect(e.email).toBe('internEmail');
    expect(e.school).toBe('internSchool');
})