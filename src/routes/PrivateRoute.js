import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Unauthorized from 'Components/Shared/Unauthorized';

const PrivateRoute = ({ component: RouteComponent, ...props }) => {
  const [token, setToken] = useState(sessionStorage.getItem('token') || null);
  const [role, setRole] = useState(sessionStorage.getItem('role') || null);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    setToken(sessionStorage.getItem('token') || null);
    setRole(sessionStorage.getItem('role') || null);
  });

  return (
    <Route
      {...props}
      render={(routeProps) => {
        if (!token || error) return <Redirect to="/auth/login" />;
        else if (role !== props.role) return <Unauthorized />;
        else return <RouteComponent {...routeProps} />;
      }}
    />
  );
};

export default PrivateRoute;
