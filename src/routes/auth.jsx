import { Switch, Route } from 'react-router-dom';
import Login from 'Components/Auth/Login';
import Register from 'Components/Auth/RegisterForm';
import NotFound from 'Components/Shared/NotFound';

const Auth = () => {
  return (
    <Switch>
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/register" component={Register} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Auth;
