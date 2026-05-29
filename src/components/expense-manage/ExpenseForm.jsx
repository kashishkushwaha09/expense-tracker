import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const ExpenseForm = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    amount: "",
    category: "",
    description: "",
  });

  const [submitError, setSubmitError] = useState("");
  const validate = () => {
    const newErrors = {};

    if (!formData.amount.trim()) {
      newErrors.amount = "Amount is required";
    } else if (Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSubmitError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();

    if (!isValid) {
      setSubmitError("Please fix the errors before submitting.");
      return;
    }

    onAddExpense(formData);

    setFormData({
      amount: "",
      category: "",
      description: "",
    });
    setSubmitError("");
  };

  return (
    <>
      <div className="d-flex align-items-center gap-3 mb-4">
        <div
          className="bg-success-subtle rounded p-2 d-flex align-items-center justify-content-center"
          style={{ width: 40, height: 40 }}
        >
          💰
        </div>

        <h5 className="mb-0 fw-semibold">Add Expense</h5>
      </div>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="text-uppercase small">
                Amount (₹)
              </Form.Label>

              <Form.Control
                type="number"
                placeholder="₹0.00"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="bg-light text-dark border-secondary"
                 isInvalid={!!errors.amount}
              />
              <Form.Control.Feedback type="invalid">
                {errors.amount}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="text-uppercase small">Category</Form.Label>

              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="bg-light text-dark border-secondary"
                 isInvalid={!!errors.category}
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.category}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label className="text-uppercase small">Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="What was this expense for?"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="bg-light text-dark border-secondary"
             isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>{" "}
        </Form.Group>
        {submitError && (
          <div className="text-danger fw-semibold mb-3">{submitError}</div>
        )}
        <Button type="submit" variant="dark" className="w-100">
          + Add Expense
        </Button>
      </Form>
    </>
  );
};

export default ExpenseForm;
