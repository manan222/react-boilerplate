import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Login from "../../../components/login/Login";
import SignUp from "../../../components/signup/SignUp";

const AuthRoutes = () => {
    return ( 
           <>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            </>
      );
}
 
export default AuthRoutes;