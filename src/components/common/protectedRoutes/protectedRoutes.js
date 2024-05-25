import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => (
  <Route
    path={path}
    {...rest}
    render={(props) =>
      !localStorage.getItem("userToken") ? (
        <Redirect to="/login" />
      ) : Component ? (
        <Component {...props} user={localStorage.getItem("userToken")} />
      ) : (
        render(props)
      )
    }
  />
);

export default ProtectedRoute;
