import React from "react";
import "./App.css";
import DashboardRoutes from "./routes/dashboardRoutes/DashboardRoutes";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// import Login from "./components/login/Login";
// import SignUp from "./components/signup/SignUp";
import AuthRoutes from "./routes/dashboardRoutes/authRoutes/AuthRoutes";


function App() {
  return (
    <>
      <Router>
        <Switch>
          <AuthRoutes/>
          <DashboardRoutes />
        </Switch>
      </Router>
    </>
  );
}

export default App;
