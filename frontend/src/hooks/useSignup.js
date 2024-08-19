// import React from 'react'
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
const useSignup = () =>
{
  const { setAuthUser } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const signup = async ({ fullName, username, password, confirmPassword, gender }) =>
  {
    const success = handleInputErrors({ fullName, username, password, confirmPassword, gender })
    if (!success) return;
    setLoading(true);
    try
    {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ fullName, username, password, confirmPassword, gender })
      });
      const data = await res.json();

      if (data.error)
      {
        throw new Error(data.error)
      }
      // local storage
      localStorage.setItem("chat-user", JSON.stringify(data));

      // context
      setAuthUser(data);
      console.log(data);

    } catch (error)
    {
      toast.error(error.message);
    } finally
    {
      setLoading(false);
    }
  }

  return { loading, signup }
}

export default useSignup


function handleInputErrors({ fullName, username, password, confirmPassword, gender })
{
  if (!fullName || !username || !password || !confirmPassword || !gender)
  {
    toast.error("something missing");
    return false
  }

  if (password !== confirmPassword)
  {
    toast.error("passwords don't match");
    return false
  }
  if (password.length < 6)
  {
    toast.error("password must be at least 6 characters");
    return false

  }

  return true
}