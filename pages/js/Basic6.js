//object is a collection of properties

let person = {
    firstName : "John",
    lastName : "Doe",
    age : 22,
    fullName: function(){
        console.log(this.firstName + this.lastName);
    }
}
console.log(person.fullName());

console.log(person.firstName);
console.log(person['lastName']);

person.lastName = "DoeJoe";
console.log(person.lastName);

person.gender = "Male";
console.log('gender' in person);

console.log("*********************************")
for (let key in person){
    console.log(person[key]);
}


