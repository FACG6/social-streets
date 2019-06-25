import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isAuthRoutes } from "constants/routes";
import ProtectedRoute from "./../auth/protectedRoute";

export default (handleUnauth, handleLogout, user) =>
  isAuthRoutes.map(route => {
    const { component: Component, path, isProtected } = route;
    if (isProtected)
      return (
        <ProtectedRoute
          {...route}
          user={user}
          render={props => <Component {...props} handleUnauth={handleUnauth} />}
        />
      );
    else if (path === "*")
      return (
        <Route
          path="*"
          key={route.key}
          render={() => (
            <Redirect
              to={user.role === "admin" ? "/admin/accounts" : "/posts"}
            />
          )}
        />
      );
    else
      return (
        <Route
          path="/logout"
          exact
          key={route.key}
          render={() => {
            handleLogout();
            return <Redirect to="/login" />;
          }}
        />
      );
  });
