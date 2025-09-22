const required = true;

if (require) {
    console.log("Satisfied customer!")
} else {
    console.log("Unsatisfied customer!")
}

i = 0;
while ( i < 10){
    i++;
    console.log(i);
}


do{
    i++
} while(i < 10){
    console.log(i);
}

console.log("************************")
//print 1-10
for(k=0; k <= 10; k++){
    console.log(k);
}

console.log("************************")
n = 0;
for( o = 1; o <= 100; o++){
    if ( o%2 == 0 && o%5 == 0){
        console.log(o);
        n++
        if(n == 3)
            break;
    }
}