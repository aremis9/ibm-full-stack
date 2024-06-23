import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
const Budget = () => {
    const { budget, expenses, currency } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);

    const budgetLimit = 20000
    const totalExpenses = expenses.reduce((total, item) => {
        return (total = total + item.cost);
    }, 0);

    const handleBudgetChange = (event) => {
        let budgetInputValue = event.target.value

        if (budgetInputValue > budgetLimit) {
            alert("The budget must not exceed £" + budgetLimit);
        } else if (budgetInputValue < totalExpenses) {
            alert("You cannot reduce the budget value lower than the spending.");
        } else {
            setNewBudget(event.target.value);
        }
    }


    return (
        <div className='alert alert-secondary'>
        <span>Budget: {currency}</span>
            <input type="number" step="10" value={newBudget} onChange={handleBudgetChange}></input>
        </div>
    );
};
export default Budget;