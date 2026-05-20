import React, { createContext } from 'react'
import { useState } from 'react';

export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const API_KEY="AIzaSyCvImdLW-QPJpNfOTNbhFkggxLferQdw1Q";
    const [token, setToken] = useState(null);
    const signup=async(email,password)=>{
     try {
       
        const response=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,{
            method:"POST",
            headers:{
                "Content-type":"application-json",
            },
            body:JSON.stringify({
                email,
                password,
                returnSecureToken:true
            }),
        })
        const data=await response.json();
        setToken(data?.idToken);
        localStorage.setItem(token,data?.idToken)
        console.log(data);
        return data;
     } catch (error) {
        console.error(error);
        return null;
     }
    }
    const login = async (email,password) => {
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password:password,
          returnSecureToken: true,
        }),
      }
    );

    const data = await response.json();
     setToken(data?.idToken);
        localStorage.setItem(token,data?.idToken);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const logout=()=>{
    setToken(null);
    localStorage.removeItem("token");
}
    const contextValue = {
    token,
    isAuthenticated: !!token,
    signup,
    login,
    logout,
  };
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}