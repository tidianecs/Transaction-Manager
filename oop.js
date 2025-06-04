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

function showTransactions(transactions){
    let result = ""
    for(let i = 0; i < transactions.length; i++){
        let transac = i + 1 + ". " + transactions[i].type + ": " + transactions[i].ammount
        console.log(transac)
        result += transac + "<br>"
    }
    return result
}

let transactions = []

let amount_input = document.getElementById('amount_input')
let select_transac = document.getElementById('select_transac')
let add_btn = document.getElementById('addTransacBtn')
let output_transac_history = document.getElementById('transac_history')
let balance_output = document.getElementById('balance_output')

add_btn.addEventListener('click', function(){
    let typeTransac = select_transac.value
    let amountTransac = parseFloat(amount_input.value)
    if (isNaN(amountTransac) || amountTransac <= 0) {
        alert("Please choose valid number(s)");
        return;
    }
    addTransaction(typeTransac, amountTransac)
    amount_input.value = "";

    output_transac_history.innerHTML = showTransactions(transactions)
    balance_output.textContent = getBalance(transactions)
})


console.log("Your total Balance: " + getBalance(transactions))