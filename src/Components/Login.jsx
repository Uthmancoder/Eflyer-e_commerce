import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";


const Login = () => {
    const [currentdata, setcurrentdata] = useState([]);

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

  return (
    <div className="signup_div bg-dark pt-4">
        <form className="form mx-auto  bg-light shadow">
    <div className="header">Sign In</div>
    <div className="inputs">
        <input placeholder="Email" className="input" type="text"/>
        <input placeholder="Password" className="input" type="password"/>
    <div className="checkbox-container">
        <label className="checkbox">
        <input type="checkbox" id="checkbox"/>
        </label>
        <label for="checkbox" className="checkbox-text">Remember me</label>
    </div>
    <button className="sigin-btn">Submit</button>
    <a className="forget" href="#">Forget password ?</a>
    <p className="signup-link">Don't have an account? <a href="#">Sign up</a></p>
    </div>
</form>
    </div>
  )
}

export default Login