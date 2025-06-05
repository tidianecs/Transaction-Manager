const supabaseUrl = 'https://gphegbsryuccsrfhctey.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwaGVnYnNyeXVjY3NyZmhjdGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNTY5MjcsImV4cCI6MjA2NDYzMjkyN30.MBWYUwZsSZsJRMpZlj3XisoI9USWHR_Yyuq9wXp44NE'
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

function updateView(){
    showTransactions().then(result => {
        output_transac_history.innerHTML = result
    })
    getBalance().then(balance => {
        balance_output.textContent = balance
    })
}

async function getBalance(){
    let balance = 0
    const {data, error} = await supabase
        .from('transactions')
        .select('*')
    let types = data.map(item => item.type)
    let amounts = data.map(item => item.amount) 

    for(let i = 0; i < types.length; i++){
        if(types[i] == 'income'){
            balance += amounts[i]
        }else if(types[i] == 'expense'){
            balance -= amounts[i]
        }
    }
    if (error){
        alert('getBalance Error', error)
    }else{
        console.log(balance)
        return balance
    }
}

async function addTransaction(type, amount){
    const {data, error} = await supabase
        .from('transactions')
        .insert([
            {type: type, amount: amount}
        ])
    if(error){
        alert("Insertion Error: ", error)
    }else{
        alert("Insertion Successfull")
    }
    updateView()
}

async function deleteTransaction(id) {
    const {data, error} = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
    updateView()
}

async function showTransactions(){
    let result = ""
    const {data, error} = await supabase
        .from('transactions')
        .select('*')
    data.forEach(item => {
        const date = new Date(item.created_at)
        const formattedDate = date.toLocaleString()
        if(item.type == 'income'){
            result += `
            <div class="flex justify-between items-center mb-2 bg-blue-500 rounded p-2">
                <div class="flex flex-col">
                    <span>${item.type}: ${item.amount}</span>
                    <span class="text-sm">${formattedDate}</span>
                </div>
                <button onclick="deleteTransaction('${item.id}')" class="bg-red-500 mx-2 px-1 rounded hover:bg-red-600">🗑️</button>
            </div>
        `
        }else if(item.type == 'expense'){
            result += `
            <div class="flex justify-between items-center mb-2 bg-pink-500 rounded p-2">
                <div class="flex flex-col">
                    <span>${item.type}: ${item.amount}</span>
                    <span class="text-sm">${formattedDate}</span>
                </div>
                <button onclick="deleteTransaction('${item.id}')" class="bg-red-500 mx-2 px-1 rounded hover:bg-red-600">🗑️</button>
            </div>
        `
        }
    });
    if(error){
        alert('showTransactions Error', error)
    }else{
        return result
    }
}


let amount_input = document.getElementById('amount_input')
let select_transac = document.getElementById('select_transac')
let add_btn = document.getElementById('addTransacBtn')
let output_transac_history = document.getElementById('transac_history')
let balance_output = document.getElementById('balance_output')

add_btn.addEventListener('click', async function(){
    let typeTransac = select_transac.value
    let amountTransac = parseFloat(amount_input.value)
    if (isNaN(amountTransac) || amountTransac <= 0) {
        alert("Please choose valid number(s)");
        return;
    }
    addTransaction(typeTransac, amountTransac)
    amount_input.value = "";
    updateView()
})

updateView()
