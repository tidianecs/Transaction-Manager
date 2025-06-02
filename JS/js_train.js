class Admin{
    constructor(name, age, why){
        this.name = name;
        this.age = age;
        this.why = why;
    }
    openingSentence(){
        console.log("Welcome to Calculator2000! I'm " + this.name + " the creator of Calculator2000 and i'm only " + this.age + " bc i hate " + this.why);
    }
}

function add(x, y){
    return x + y;
}
function sub(x, y){
    return x - y;
}
function mul(x, y){
    return x * y;
}
function div(x, y){
    return x / y;
}

const admin1 = new Admin("Tidiane", 19, "Math");
admin1.openingSentence();
choice_mode = prompt("1. Addition 2. Substraction\n 3. Multiplication 4. Division");

if (choice_mode == 1){
    x = parseInt(prompt("Enter a first number"));
    y = parseInt(prompt("Enter a second number"));

    console.log(x + " + " + y + " = " + add(x, y));
}
else if(choice_mode == 2){
    x = parseInt(prompt("Enter a first number"));
    y = parseInt(prompt("Enter a second number"));

    console.log(x + " - " + y + " = " + sub(x, y));
}
else if(choice_mode == 3){
    x = parseInt(prompt("Enter a first number"));
    y = parseInt(prompt("Enter a second number"));

    console.log(x + " * " + y + " = " + mul(x, y));
}
else if(choice_mode == 4){
    x = parseInt(prompt("Enter a first number"));
    y = parseInt(prompt("Enter a second number"));

    console.log(x + " / " + y + " = " + div(x, y));
}
else{
    alert("Error you should choose a num btw 1-4!");
}