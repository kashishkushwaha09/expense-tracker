import React, { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API_KEY = "AIzaSyCvImdLW-QPJpNfOTNbhFkggxLferQdw1Q";
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const authenticate = async (url, email, password) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error.message);
    }

    setToken(data.idToken);
    localStorage.setItem("token", data.idToken);

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
  const signup = async (email, password) => {
   return authenticate(
     `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    email,
    password
   )
  };
  
  const login = async (email, password) => {
    return authenticate(
       `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
       email,
       password
    )
   
  };
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  const updateProfile = async (fullName, photoUrl) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: token,
          displayName: fullName,
          photoUrl: photoUrl,
          returnSecureToken: true,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error.message);
    }

    console.log(data);

     return {
      success: true,
      data,
    };

  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error.message,
    };
  }
};
  const contextValue = {
    token,
    isAuthenticated: !!token,
    signup,
    login,
    logout,
    updateProfile,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
