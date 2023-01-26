const Employee = require('./lib/Employee');
const inquirer = require('inquirer');
const Manager = require('./lib/Manager');

let employeeArray = [];

const runIt = () => {
    
    console.log(`Welcome to World of Employee Logs!
    
    `)
    
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the manager\'s name: ',
            name: 'name'
        },
        {
            type: 'input',
            message: 'Enter the manager\'s employee ID: ',
            name: 'id'
        },
        {
            type: 'input',
            message: 'Enter the manager\'s email address: ',
            name: 'email'
        },
        {
            type: 'input',
            message: 'Enter the manager\'s office number: ',
            name: 'officeNumber'
        }
    ])
    .then((answers) => {
        const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        console.log(newManager);
        buildMenu();
    })
}

const buildMenu = () => {
    inquirer.prompt([
        {
        type: 'list',
        message: 'Choose an option: ',
        choices: [
            {name: "Add an Engineer", value: 1},
            {name: "Add an Intern", value: 2},
            {name: "Finish building your team!", value: 3},
        ],
        name: 'menuChoice'
        }
    ])
    .then((answer) => {
        switch(answer.menuChoice){

            case 1:
                break;
            
            case 2:
                break;
            
            case 3:
                break;

            default:
                console.log("Something went wrong!");
                break;
        }
    })
}

runIt();