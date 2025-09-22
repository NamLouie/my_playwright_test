//Inheritance = inherit the other modules or function from different classes/folder.

const Person = require("./Basic7"); //require - calling the classes from other folder

class Pet extends Person {

    get location() {

        return 'Philippines'
    }

      constructor(firstName, lastName){

        //call parent class contructor
        super(firstName, lastName)
    }

}


let pet = new Pet("mich", "ruro");
console.log(pet.fullName());
console.log(pet.location);