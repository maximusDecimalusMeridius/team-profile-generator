const makePage = require('./util/generateHtml');
const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const fs = require('fs');

let employeeArray = [];

const addEmployee = (employee) => {
    employeeArray.push(employee);
}

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
        addEmployee(newManager);
        console.log(`Please choose an option: 
        `)
        buildMenu();
    })
}

const buildMenu = () => {
    
    inquirer.prompt([
        {
        type: 'list',
        message: 'I\'d like to: ',
        choices: [
            {name: "Add an Engineer", value: 1},
            {name: "Add an Intern", value: 2},
            {name: "Finish building my team!", value: 3},
        ],
        name: 'menuChoice'
        }
    ])
    .then((answer) => {
        switch(answer.menuChoice){

            case 1:
                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'Enter the engineer\'s name: ',
                        name: 'name'
                    },
                    {
                        type: 'input',
                        message: 'Enter the engineer\'s employee ID: ',
                        name: 'id'
                    },
                    {
                        type: 'input',
                        message: 'Enter the engineer\'s email address: ',
                        name: 'email'
                    },
                    {
                        type: 'input',
                        message: 'Enter the engineer\'s github username: ',
                        name: 'github'
                    }
                ])
                .then((answers) => {
                    const newEng = new Engineer(answers.name, answers.id, answers.email, answers.github);                    
                    addEmployee(newEng);
                    console.log(`
Engineer Added!
----------------------------
Please select another option
                    
                    `)
                    buildMenu();
                })
                break;
            
            case 2:
                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'Enter the intern\'s name: ',
                        name: 'name'
                    },
                    {
                        type: 'input',
                        message: 'Enter the intern\'s employee ID: ',
                        name: 'id'
                    },
                    {
                        type: 'input',
                        message: 'Enter the intern\'s email address: ',
                        name: 'email'
                    },
                    {
                        type: 'input',
                        message: 'Enter the intern\'s school: ',
                        name: 'school'
                    }
                ])
                .then((answers) => {
                    const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);                    
                    addEmployee(newIntern);
                    console.log(`
Intern Added!
----------------------------
Please select another option
                    
                    `)
                    buildMenu();
                })
                break;
            
            case 3:
                const html = makePage(employeeArray)
                fs.writeFile('./dist/index.html', html, (error) => {
                    if(error){
                        console.log("Error writing file!");
                    }
                });
                console.table(employeeArray);    
                console.log("Thank you for building a team - view your page at...")
                break;

            default:
                console.log("Something went wrong!");
                break;
        }
    })
}

runIt();