import React from "react";
import { Redirect, Route } from "react-router-dom";
import AdminLayout from "components/utils/AdminLayout";

export default function protectedRoute({ isAuth, isAdmin, user, ...props }) {
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
