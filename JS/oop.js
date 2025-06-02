function getBalance(transactions){
    let balance = 0
    for(let i = 0; i < transactions.length; i++){
        if(transactions[i].type == 'income'){
            balance += transactions[i].ammount
        }else if(transactions[i].type == 'expense'){
            balance -= transactions[i].ammount
        }
    }
    return balance
}

function addTransaction(type, ammount){
    transactions.push({type: type, ammount: ammount})
}

function showTransactions(){
    for(let i = 0; i < transactions.length; i++){
        console.log(i + 1 + ". " + transactions[i].type + ": " + transactions[i].ammount)
    }
}

let transactions = []

addTransaction('income', 200)
addTransaction('expense', 70)
addTransaction('income', 10)

showTransactions()

console.log("Your total Balance: " + getBalance(transactions))