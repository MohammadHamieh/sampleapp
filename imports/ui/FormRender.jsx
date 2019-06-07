/* eslint-disable linebreak-style */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import CForm from './Form.jsx';
import NoUser from './NoUser.jsx';

export default class Forming extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={NoUser} />
          <Route path="/:id" component={CForm} />
          <Route path="/newcontact" component={CForm} />
        </Switch>
      </div>
    );
  }
}
