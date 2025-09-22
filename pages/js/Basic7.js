module.exports = class Person {

    age = 23

    get location() {

        return 'Montreal'
    }

    //constructor is a method which execute by default  when there is new object created of the class
    constructor(firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }

    fullName(){
      console.log(this.firstName + this.lastName);
    }

}


// let person = new Person("Tom", "Cruise");
// console.log(person.location);
// console.log(person.fullName());