import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function protectedRoute({ isAuth, isAdmin, user, ...props }) {
  console.log("is  Auth", isAuth);
  console.log("is  Admin", isAdmin);
  console.log("User : ", user);
  console.log("props", props);
  return isAuth ? (
    isAdmin ? (
      user.role === "admin" ? (
        <Route {...props} />
      ) : (
        <Redirect to="/page-not-found" />
      )
    ) : user.role === "member" ? (
      <Route {...props} />
    ) : (
      <Redirect to="/page-not-found" />
    )
  ) : (
    <Redirect to="/login" />
  );
}
