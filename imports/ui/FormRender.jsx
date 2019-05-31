/* eslint-disable linebreak-style */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CForm from './Form.jsx';

export default class Forming extends Component {
  render() {
    return (
      <Router>
        <Route path="/:id" component={CForm} />
      </Router>
    );
  }
}
