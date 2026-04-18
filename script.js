const form = document.getElementById('transaction-form');
const list = document.getElementById('transaction-list');
const balanceDisplay = document.getElementById('total-balance');
let transactions = [];

// Inicializar Gráfico
const ctx = document.getElementById('financeChart').getContext('2d');
let financeChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Ingresos', 'Gastos'],
        datasets: [{
            data: [0, 0],
            backgroundColor: ['#22c55e', '#ef4444'],
            borderWidth: 0
        }]
    },
    options: { plugins: { legend: { labels: { color: 'white' } } } }
});

function updateUI() {
    list.innerHTML = '';
    let income = 0;
    let expense = 0;

    transactions.forEach((t, index) => {
        const li = document.createElement('li');
        li.classList.add('item', t.type);
        li.innerHTML = `${t.desc} <span>${t.type === 'income' ? '+' : '-'}$${t.amount}</span>`;
        list.appendChild(li);

        if (t.type === 'income') income += t.amount;
        else expense += t.amount;
    });

    const total = income - expense;
    balanceDisplay.innerText = `$${total.toFixed(2)}`;
    
    // Actualizar Gráfico
    financeChart.data.datasets[0].data = [income, expense];
    financeChart.update();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTransaction = {
        desc: document.getElementById('desc').value,
        amount: parseFloat(document.getElementById('amount').value),
        type: document.getElementById('type').value
    };

    transactions.push(newTransaction);
    form.reset();
    updateUI();
});
