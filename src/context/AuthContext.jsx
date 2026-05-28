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
const getUserProfile = async () => {
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: token,
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
const sendVerificationEmail = async () => {
  try {
    const idToken = localStorage.getItem("token");

    if (!idToken) {
      alert("User token missing. Please login again.");
      return;
    }

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: idToken,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      switch (data.error.message) {
        case "INVALID_ID_TOKEN":
          throw new Error("Session expired. Please login again.");

        case "USER_NOT_FOUND":
          throw new Error("User not found.");

        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          throw new Error(
            "Too many attempts. Please try again later."
          );

        default:
          throw new Error(data.error.message);
      }
    }

    alert(
      "Check your email. You might have received a verification link."
    );
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};
const forgotPasswordHandler = async (email) => {
  try {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      switch (data.error.message) {
        case "EMAIL_NOT_FOUND":
          throw new Error("No account found with this email.");

        case "INVALID_EMAIL":
          throw new Error("Invalid email address.");

        case "MISSING_EMAIL":
          throw new Error("Please enter email.");

        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          throw new Error(
            "Too many attempts. Please try again later."
          );

        case "USER_DISABLED":
          throw new Error("This user account has been disabled.");

        default:
          throw new Error(data.error.message);
      }
    }

    alert(
      "Password reset link sent successfully. Please check your email."
    );
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};
  const contextValue = {
    token,
    isAuthenticated: !!token,
    signup,
    login,
    logout,
    updateProfile,
    getUserProfile,
    sendVerificationEmail,
    forgotPasswordHandler
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
