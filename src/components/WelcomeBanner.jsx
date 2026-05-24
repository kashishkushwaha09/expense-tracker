import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
 import { useNavigate } from "react-router-dom";

const WelcomeBanner = () => {
   
const navigate = useNavigate();
  return (
    <Container fluid className="mt-2">
      <Row
        className="align-items-center justify-content-between border rounded p-3 shadow-sm bg-light"
      >
        <Col md="auto">
          <h6 className="mb-0 fst-italic">
            Welcome to Expense Tracker!!!
          </h6>
        </Col>

        <Col md="auto">
          <div className="bg-danger-subtle px-3 py-2 rounded-pill">
            <span className="me-1">
              Your profile is incomplete.
            </span>

            <Button
              variant="link"
              className="p-0 text-decoration-none fw-semibold"
                onClick={() => navigate("/complete-profile")}
            >
              Complete now
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default WelcomeBanner;