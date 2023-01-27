//Create a class of Manager that extends employee and adds a field for office number.
//Methods to return office number and role
const Employee = require('./Employee');

class Manager extends Employee{
    constructor(name, id, email, officeNumber){
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getOfficeNumber(){
        return this.officeNumber;
    }

    getRole(){
        return "Manager";
    }
}

module.exports = Manager;