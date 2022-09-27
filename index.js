const inquirer = require("inquirer");
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const Manager = require('./lib/manager');
const fs = require('fs');
const path = require('path');

const employees = [];

function init() {
    questions();
}

const questions = () => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'managerName',
            message: "What is the manager's name?"
        },
        {
            type: 'input',
            name: 'managerID',
            message: "What is the manager's ID?",
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: "What is the manager's Email?",
        },
        {
            type: 'input',
            name: 'managerOfficeNumber',
            message: "What's the manager's office number?",
        }
    ])
    .then((response) => {
        const manager = new Manager (
            response.managerName,
            response.managerID,
            response.managerEmail,
            response.managerOfficeNumber,
        )
        employees.push(manager);
        moreQuestions();
    })
}

const moreQuestions = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeRole',
            message: 'What role do you want to assign the employee?',
            choices: [
                'Intern',
                'Engineer'
            ]
        },
        {
            type: 'input',
            name: 'employeeName',
            message: "What's the employee's name?",
        },
        {
            type: 'input',
            name: 'employeeID',
            message: "What's the employee's ID?",
        },
        {
            type: 'input',
            name: 'employeeEmail',
            message: "What's the employee's Email?",
        },
        {
            type: 'input',
            name: 'internSchool',
            message: 'What school is the Intern from?',
            when: (answer) => answer.employeeRole === 'Intern',
        },
        {
            type: 'input',
            name: 'engineerGithub',
            message: "What is the engineer's GitHub username?",
            when: (answer) => answer.employeeRole === 'Engineer',
        },
        {
            type: 'confirm',
            name: 'repeatQuestions',
            message: 'Do you need to add more employees?'
        }
    ])
    .then((answers) => {
        if(answers.employeeRole === 'Intern') {
            const intern = new Intern(
                answers.employeeName,
                answers.employeeID,
                answers.employeeEmail,
                answers.internSchool
            );
            employees.push(intern);
        } else if (answers.employeeRole === 'Engineer') {
            const engineer = new Engineer(
                answers.employeeName,
                answers.employeeID,
                answers.employeeEmail,
                answers.engineerGithub
            );
            employees.push(engineer);
        }
        if (answers.repeatQuestions === true) {
            moreQuestions();
        } else {
            //create HTML file
            const DIST_DIR = path.resolve(__dirname, 'dist');
            const distPath = path.join(DIST_DIR, 'team.html')
            createFile(distPath, generateHTML(employees))
        }
    })
}

function createFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        err? console.error(`There was an error ${err}`) : console.log('File created!');
    })
}

const memberCard = (event) => {
    let roleContent;
    let icon = '';
    switch (event.getRole()) {
        case 'Manager':
            roleContent = `<i class="bi bi-telephone-fill"></i>: ${event.getOfficeNumber()}`;
            icon = `<i class="bi bi-briefcase-fill"></i>`;
            break;
        case 'Intern':
            roleContent = `<i class="bi bi-journal"></i>: ${event.getSchool()}`;
            icon = `<i class="bi bi-mortarboard-fill"></i>`;
            break;
        case 'Engineer':
            roleContent = `<i class="bi bi-github"></i>: <a href='https://github.com/${event.getGitHub()}' target='_blank'>${event.getGitHub()}</a>`;
            icon = `<i class="bi bi-wrench-adjustable"></i>`;
            break;
    }
    return `<div class="card" style="width: 18rem;">
                <div class="card-body bg-warning">
                    <h5 class="card-title"><strong>${event.getName().toUpperCase()}</strong></h5>
                    <p class="card-text">${icon} ${event.getRole()}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: <strong>${event.getId()}</strong></li>
                    <li class="list-group-item"> <i class="bi bi-envelope-fill"></i>: <strong><a href='mailto:${event.getEmail()}' target='_blank'>${event.getEmail()}</a></strong></li>
                    <li class="list-group-item"><strong>${roleContent}</strong></li>
                </ul>
            </div>`;
}

const displayTeamMembers = (employees) => {
    let teamArray = [];
    employees.forEach((event) => {
        teamArray.push(memberCard(event));
    });
    return teamArray.join('');
}

const generateHTML = (employees) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="	https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
        <title>Team Profile Generator</title>
    </head>
    
    <body>
        <header class="fs-1 text-center bg-primary text-white">Meet Members of the Team!</header>
        <div class="card-container d-flex justify-content-around mt-5">
        ${displayTeamMembers(employees)}
        </div>
    </body>
    </html>`;
}

init();