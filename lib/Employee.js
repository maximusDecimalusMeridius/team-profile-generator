//Create a class of Employee that contains the name, id, and email of the object.
//Methods to return name, id, email, and role
class Employee {
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName(){
        return this.name;
    }

    getId(){
        return this.id;
    }

    getEmail(){
        return this.email;
    }

    getRole(){
        return "Employee";
    }
}

module.exports = Employee;