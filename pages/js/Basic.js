//Datatypes and Variable

// console.log("Hello world!");

// let a = 5;
// let b = "text";
// let c = true;

// console.log((typeof (a))); 
// console.log((typeof (b)));
// console.log((typeof (c)));
const Person = require('./Basic7');

let expenses = [20, 10, 30, 50, 100];
let sumTotal = 0;
let arrayList = [];
for ( i = 0; i < expenses.length; i++){
    sumTotal += expenses[i];

    
}

console.log(sumTotal);


let studentNames = ["Louie", "Shane", "Dan", "Rong"];
studentNames.unshift("Rush");
studentNames.pop();
studentNames.sort();

console.log(studentNames);

let person =new Person("Michael", "Port");
console.log(person.fullName());


let productPrices = [49, 200, 300, 500, 2000];


// let discoutedPrices = productPrices.map(price => price * 0.10)
let discoutedPrices = productPrices.map(price => price - (price * 0.10)).filter(price => price < 50).reduce((sum , value) => sum+value, 0 );

console.log(discoutedPrices);

