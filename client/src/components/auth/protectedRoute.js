import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function protectedRoute({ isAuth, ...props }) {
  console.log(isAuth);
  return isAuth ? <Route {...props} /> : <Redirect to="/login" />;
}
