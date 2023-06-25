import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
    const [currentdata, setcurrentdata] = useState([]);
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    useEffect(() => {
    axios
      .get("http://localhost:1243/users")
      .then((res) => res.data)
      .then((data) => {
        setcurrentdata(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const signin = (ev) => {
    ev.preventDefault();
    
    const user = currentdata.find((el) => el.email === email && el.password === password);
  
    if (user) {
      // User found, handle successful signin
      console.log("User signed in successfully:", user);
      // Perform any additional actions or redirect the user
      toast.success("Sign in successful");
    } else {
      // User not found, handle signin failure
      console.log("Invalid credentials");
      // Display an error message or perform any additional actions
      toast.error("Invalid credentials");
    }
  };
  





  return (
    <div className="signup_div bg-dark pt-4">
        <form className="form mx-auto  bg-light shadow">
    <div className="header">Sign In</div>
    <div className="inputs">
        <input onChange={(e)=> setemail(e.target.value)} placeholder="Email" className="input  form-control" type="text"/>
        <input onChange={(e)=> setpassword(e.target.value)} placeholder="Password" className="input form-control" type="password"/>
    <div className="checkbox-container">
        <label className="checkbox">
        <input type="checkbox" id="checkbox"/>
        </label>
        <label for="checkbox" className="checkbox-text">Remember me</label>
    </div>
    <button onClick={signin} className="sigin-btn">Submit</button>
    <a className="forget" href="#">Forget password ?</a>
    <p className="signup-link">Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
</form>
<ToastContainer/>
    </div>
  )
}

export default Login