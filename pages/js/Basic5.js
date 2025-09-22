let night = "Tuesday ";

console.log(night.length);
let SlicedNight = night.slice(0,4);
let splitNight = night.split("s");




console.log(SlicedNight);
console.log(night[2]);
console.log(splitNight[1].length);
console.log(splitNight[1].trim().length);

let date = '23';
let nextDate = '28';

let diff = parseInt(nextDate) - parseInt(date);
console.log(diff);
diff.toString();

let newQuote = night + "today is Funday!";
console.log(newQuote);

console.log(newQuote.indexOf('day', 5));


console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
let count = 0;
let value = newQuote.indexOf('day');
// find how many day occured in the array;
while(value !== -1){
    count++;
    value = newQuote.indexOf('day', value + 1);
}

console.log(count);
