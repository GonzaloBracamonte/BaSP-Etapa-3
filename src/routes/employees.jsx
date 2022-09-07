import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from 'Components/Employee/Home';
import EmployeeProfile from 'Components/Employee/UserProfile';
import WorkedHours from 'Components/Employee/WorkedHours';
import Projects from 'Components/Employee/MyProjects';
import Unfinished from 'Components/Shared/Unfinished';
import NotFound from 'Components/Shared/NotFound';

const Employee = () => {
  return (
    <Switch>
      <Route exact path="/employee/home" component={Home} />
      <Route exact path="/employee">
        <Redirect to="/employee/home" />
      </Route>
      <Route exact path="/employee/workedhours" component={WorkedHours} />
      <Route exact path="/employee/projects" component={Projects} />
      <Route exact path="/employee/profile" component={EmployeeProfile} />
      {/* ONLY FOR PMs */}
      {/* projects of this PM */}
      <Route exact path="/employee/projects" component={Unfinished} />

      {/* Single project */}
      <Route exact path="/employee/projects/:id" component={Unfinished} />
      {/* employee hours on this project */}
      <Route exact path="/employee/projects/:id/:employee" component={Unfinished} />
      {/* Reports */}
      <Route exact path="/employee/reports" component={Unfinished} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Employee;
