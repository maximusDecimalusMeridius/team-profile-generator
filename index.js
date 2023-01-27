//Import node packages
const inquirer = require('inquirer');
const fs = require('fs');

//Import utility function to create and return HTML output string
const makePage = require('./util/generateHtml');

//Import required class constructors
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

//Initialize an empty array
let employeeArray = [];

//Add the employee passed in to the employeeArray
const addEmployee = (employee) => {
    employeeArray.push(employee);
}

//Main program block to run index.js
const runIt = () => {
    
    //One-time welcome message
    console.log(`Welcome to World of Employee Logs!
    
    `)
    
    //Get manager info before building team
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
    //then create a new Manager object with the input responses, adding it to the employee array
    //prompt user to choose an option and call buildMenu() to build the team
    .then((answers) => {
        const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        addEmployee(newManager);
        console.log(`Please choose an option: 
        `)
        buildMenu();
    })
}

//Recursive function when user chooses to add an engineer or intern
//Offers three options - Add an engineer, Add an intern, or Finish building the team
//If no users are entered, just the manager's profile is output
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

            //#region 1st case - Add an engineer prompt tree, then create a new Engineer, push to employeeArray, call buildMenu()
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
            //#endregion
            //#region 2nd case - Add an intern prompt tree, then create a new Intern, push to employeeArray, call buildMenu()
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
            //#endregion
            //#region 3rd case - Set html to the string returned by makePage when passing employeeArray, then write to ./dist/index.html
            case 3:
                const html = makePage(employeeArray)
                fs.writeFile('./dist/index.html', html, (error) => {
                    if(error){
                        console.log("Error writing file!");
                    }
                });
                //confirm data entered via the console in console.table
                console.table(employeeArray);    
                console.log("Thank you for building a team - view your page in ./dlist/index.html")
                break;
            //#endregion
            default:
                console.log("Something went wrong!");
                break;
        }
    })
}

//Calls program the first time
runIt();