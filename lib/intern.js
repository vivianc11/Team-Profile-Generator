const Employee = require('./employee');

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }
    // Getters
    getSchool() {
        return this.school;
    }

    getRole() {
        return 'Intern';
    }
}

// Exporting
module.exports = Intern;