const Employee = require('./lib/employee');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const Manager = require('./lib/manager');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const employees = [];

function init() {

}

const questions = () => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'managerName',
            message: "What is the manager's name?",
            validate: (response) => {
                return validation.required(response);
            }
        },
        {
            type: 'input',
            name: 'managerID',
            message: "What is the manager's ID?",
            validate: (response) => {
                return validation.required(response);
            }
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: "What is the manager's Email?",
            validate: (response) => {
                return validation.required(response);
            }
        },
        {
            type: 'input',
            name: 'managerOfficeNumber',
            message: "What's the manager's office number?",
            validate: (response) => {
                return validation.required(response);
            }
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

}