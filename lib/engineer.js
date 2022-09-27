const Employee = require('./employee');

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }
    // Getters
    getGitHub() {
        return this.github;
    }

    getRole(){
        return 'Engineer';
    }
}

// Exporting
module.exports = Engineer;