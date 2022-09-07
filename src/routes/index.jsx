import { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from 'Components/Layout';
import NotFound from 'Components/Shared/NotFound';
import Unfinished from 'Components/Shared/Unfinished';
import HomePage from 'Components/Shared/Homepage';
import PrivateRoute from './PrivateRoute';
const AdminRoutes = lazy(() => import('routes/admins'));
const superAdminRoutes = lazy(() => import('routes/superAdmins'));
const EmployeeRoutes = lazy(() => import('routes/employees'));
const AuthRoutes = lazy(() => import('routes/auth'));

const Routes = () => {
  const homePath = useSelector((state) => state.global.homePath);

  return (
    <Router>
      <Suspense fallback={<div />}>
        <Layout>
          <Switch>
            <Route exact path="/" component={HomePage}>
              {homePath !== '/' && <Redirect to={homePath} />}
            </Route>
            <PrivateRoute path="/employee" role="EMPLOYEE" component={EmployeeRoutes} />
            <PrivateRoute path="/admin" role="ADMIN" component={AdminRoutes} />
            <PrivateRoute path="/superadmin" role="SUPER ADMIN" component={superAdminRoutes} />
            <Route path="/auth" component={AuthRoutes} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Suspense>
    </Router>
  );
};

export default Routes;
