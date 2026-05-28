import React, { lazy, Suspense } from "react";
import Layout from "../layout/Layout";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Login from "../../pages/Login";
import Home from "../../pages/Home";
import CompleteProfile from "../../pages/CompleteProfile";
import ForgotPassword from "../../pages/ForgotPassword";

const AuthPage=lazy(()=>import("../../pages/AuthPage"))
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
            <Route path="/" element={<Home/>}/>
        </Routes>
        
          <Routes>
            <Route path="/complete-profile" element={<CompleteProfile/>}/>
        </Routes>
        <Routes>
            <Route path="/signup" element={<AuthPage/>}/>
        </Routes>
        <Routes>
            <Route path="/login" element={<Login/>}/>
        </Routes>
        <Routes>
            <Route path="/forgot-password" element={<ForgotPassword/>}/>
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default AppRoutes;
