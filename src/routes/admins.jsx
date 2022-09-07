import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NewProject from 'Components/Admin/CreateProject';
import Unfinished from 'Components/Shared/Unfinished';
import NotFound from 'Components/Shared/NotFound';

const Admin = () => {
  return (
    <Switch>
      <Route exact path="/admin" component={Unfinished} />
      <Route exact path="/admin/projects" component={Unfinished} />
      <Route exact path="/admin/projects/add" component={NewProject} />
      <Route exact path="/admin/projects/:id" component={Unfinished} />
      <Route exact path="/admin/edit-project/:id" component={Unfinished} />
      <Route exact path="/admin/reports" component={Unfinished} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Admin;
