const Engineer = require('../lib/engineer');

test ('Should create an engineer', () => {
    const e = new Engineer('engineerName', 1, 'engineerEmail', 'github');
    expect(e.name).toBe('engineerName');
    expect(e.id).toBe(1);
    expect(e.email).toBe('engineerEmail');
    expect(e.github).toBe('github');
})