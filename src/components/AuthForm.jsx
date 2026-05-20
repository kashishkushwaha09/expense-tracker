import React, { useState } from 'react'
import InputField from './InputField'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AuthForm = () => {
  const [formData,setFormData]=useState({
    email:"",
    password:"",
    confirmPassword:""
  })
  const [error,setError]=useState({
    main:"",
    email:"",
    password:"",
    confirmPassword:""
  });
 const {signup,login}=useContext(AuthContext);
  const handleChange=(e)=>{
    const { name, value } = e.target;
    setFormData((prev)=>({
      ...prev, [name]:value
    }))
  }
  const isFormValid=()=>{
      const {email,password,confirmPassword}=formData;
       let newErrors = {
    main: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
      if(password.length<6){
         newErrors.password =
      "Password must be at least 6 characters";
      }
       if(password !== confirmPassword){
         newErrors.confirmPassword =
      "Passwords do not match";
      }
      setError(newErrors);
      return !Object.values(newErrors).some((item)=>item);
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
     const isValid=isFormValid();
     if(isValid){
        const {email,password}=formData;
       const resp=await signup(email,password);

     }
  }
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
  <div className="card shadow p-4" style={{ width: "400px" }}>
    <h3 className="text-center mb-4">Sign Up</h3>

    <form onSubmit={handleSubmit}>
      {/* Email */}
      <InputField
      type="email"
      label="Email"
      name="email"
      placeholder={"Enter your email"}
      value={formData.email}
      onChange={handleChange}
      error={error.email}
      />
        <InputField
      type="text"
      label="Password"
      name="password"
      placeholder={"Password"}
      value={formData.password}
      onChange={handleChange}
      error={error.password}
      />
        <InputField
      type="text"
      label="Confirm Password"
      name="confirmPassword"
      placeholder={"Confirm Password"}
      value={formData.confirmPassword}
      onChange={handleChange}
      error={error.confirmPassword}
      />

      {/* Button */}
      <button type="submit" className="btn btn-primary w-100 rounded-pill text-white fw-semibold">
        Sign Up
      </button>
      {error.main && <div class="alert alert-danger mt-2" role="alert">
  A simple danger alert—check it out!
</div>}
<div
  className="alert alert-info d-flex justify-content-between align-items-center mt-3"
  role="alert"
>
  <span>Already have an account?</span>

  <a href="/login" className="alert-link">
    Login
  </a>
</div>
    </form>
  </div>
</div>
  )
}

export default AuthForm