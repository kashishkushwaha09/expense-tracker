import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses((prev) => [
      {
        id: Date.now(),
        ...expense,
      },
      ...prev,
    ]);
  };

  return (
    <div className="container-fluid py-4">
      <div className="card bg-light text-dark mx-auto">
        <div className="card-body p-4">
          <div className="mx-auto" style={{ maxWidth: "900px" }}>
            <ExpenseForm onAddExpense={addExpense} />
          </div>

          <hr className="my-4" />

          <ExpenseList expenses={expenses} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
