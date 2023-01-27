//Create a class of Intern that extends employee and adds a field for school name.
//Methods to return school and role
const Employee = require('./Employee');

class Intern extends Employee{
    constructor(name, id, email, school){
        super(name, id, email);
        this.school = school;
    }

    getSchool(){
        return this.school;
    }

    getRole(){
        return "Intern";
    }
}

module.exports = Intern;