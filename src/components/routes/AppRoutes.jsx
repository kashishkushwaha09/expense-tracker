import React, { lazy, Suspense } from "react";
import Layout from "../layout/Layout";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const AuthPage = lazy(() => import("../../pages/AuthPage"));
const Login = lazy(() => import("../../pages/Login"));
const Home = lazy(() => import("../../pages/Home"));
const CompleteProfile = lazy(() =>
  import("../../pages/CompleteProfile")
);
const ForgotPassword = lazy(() =>
  import("../../pages/ForgotPassword")
);
const AppRoutes = () => {
  return (
    <Layout>
      <Suspense
        fallback={
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        }
      >
        <Routes>
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/complete-profile"
            element={
              <ProtectedRoute>
                <CompleteProfile />
              </ProtectedRoute>
            }
          />

          {/* Public Routes */}
          <Route path="/signup" element={<PublicRoute><AuthPage /></PublicRoute>} />

          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

          <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default AppRoutes;
