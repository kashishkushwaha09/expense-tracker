import React, { useState, useContext } from "react";
import InputField from "./InputField";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    main: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    const { email, password } = formData;

    let newErrors = {
      main: "",
      email: "",
      password: "",
    };

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setError(newErrors);

    return !Object.values(newErrors).some((item) => item);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    setError({
      main: "",
      email: "",
      password: "",
    });

    try {
      const isValid = isFormValid();

      if (!isValid) return;

      const { email, password } = formData;

      const resp = await login(email, password);

      console.log(resp);
      if(!resp){
        throw new Error("")
      }
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);

      setError((prev) => ({
        ...prev,
        main: error.message || "Something went wrong",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleSubmit}>
          <InputField
            type="email"
            label="Email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={error.email}
          />

          <InputField
            type="password"
            label="Password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            error={error.password}
          />

          <div className="text-end mb-3">
            <Link to="/forgot-password" className="text-decoration-none">
              Forgot Password?
            </Link>
          </div>

          {error.main && (
            <div className="alert alert-danger" role="alert">
              {error.main}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill text-white fw-semibold"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div
            className="alert alert-info d-flex justify-content-between align-items-center mt-3"
            role="alert"
          >
            <span>Don't have an account?</span>

            <Link to="/signup" className="alert-link">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
