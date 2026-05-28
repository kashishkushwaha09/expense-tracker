import React, { useState } from "react";
import { useContext } from "react";
import { Card, Form, Button, Container } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { forgotPasswordHandler } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;

    try {
      setLoading(true);

      await forgotPasswordHandler(email);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card
        className="shadow p-4 rounded-4"
        style={{ width: "100%", maxWidth: "450px" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold">Forgot Password</h2>
          <p className="text-muted mb-0">
            Enter your email to reset your password
          </p>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label>Email Address</Form.Label>

            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            variant="dark"
            type="submit"
            className="w-100 rounded-3"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </Form>

        <div className="text-center mt-4">
          <a href="/login" className="text-decoration-none fw-medium">
            Back to Login
          </a>
        </div>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
