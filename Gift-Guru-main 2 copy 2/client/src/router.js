// routes.js
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Questionnaire from './Questionnaire';

function Router({children}) {

    return (
      <Switch>
        <Route path="/questionnaire">
          <Questionnaire />
        </Route>
        {children}
      </Switch>
    );
}

export default Router;
