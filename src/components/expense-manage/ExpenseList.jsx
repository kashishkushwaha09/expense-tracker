import { Table, Badge } from "react-bootstrap";

const ExpenseList = ({ expenses }) => {
  const total = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h6 className="mb-0 fw-semibold">Expenses</h6>

        <Badge
          pill
          bg="success"
          className="px-3 py-2"
        >
          Total: ₹{total}
        </Badge>
      </div>

      {expenses.length === 0 ? (
        <div className="text-center py-5 text-secondary">
          <div style={{ fontSize: "2rem" }}>📦</div>

          <p className="mt-2 mb-0">
            No expenses yet. Add one above!
          </p>
        </div>
      ) : (
        <Table
          hover
          responsive
          variant="dark"
          className="align-middle"
        >
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.category}</td>
                <td>₹{expense.amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ExpenseList;