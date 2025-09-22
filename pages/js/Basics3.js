let marks = [20, 30, 40, 100, 50, 90];
sumMarks = marks.splice(1, 4); //geting the start and slice in the end of an array
console.log(sumMarks);
console.log("************************");

marks[0] = 1;

console.log(marks[0]);
console.log(marks);
console.log(marks.length); // checking the length of an array

marks.push(68); //pushing at the end of an array
marks.pop(); //removing the end of an array
marks.unshift(13); // adding in the start of an array

console.log("************************");
console.log(marks.indexOf(100)); //checking the value index in the array
console.log(marks.includes(31)); //checking if the value is in the array
console.log(marks);

console.log("************************");


let sum = 0;
for (i = 0; i < marks.length; i++){

    sum = sum + marks[i];

}

let total = marks.reduce((sum, mark)=>sum+mark,0); //better use reduce if the logic are always iterate

console.log(total);
console.log(sum);

console.log("************************");

let scores = [13, 14, 15, 20];
let evenNumbers = [];

//get the even Numbers in the Array
for ( k = 0; k < scores.length; k++){
    if(scores[k]%2 == 0){
        evenNumbers.push(scores[k])
    }
}

let newArrayEvenNumbers = scores.filter(scores=>scores%2==0); //better to use filter if the value is in the array
let mappedArray = newArrayEvenNumbers.map(scores => scores*3);
let totalArray = mappedArray.reduce((sum, val) => sum+val,0);

console.log(evenNumbers);
console.log(newArrayEvenNumbers);
console.log(mappedArray);
console.log(totalArray);

console.log("************************");
let scores1 = [16, 14, 15, 20, 50, 60];

let sumValue = scores1.filter(scores => scores%2 == 0).map(scores => scores*3).reduce((sum, value) => sum+value,0);
console.log(sumValue); 
//42 , 60, 180 

console.log(scores1.sort((a, b) => a - b)); // sorts
