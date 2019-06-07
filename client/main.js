import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Shell from '../imports/ui/shell.jsx';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../imports/startup/accounts-config';

Meteor.startup(() => {
  render(<Shell />, document.getElementById('app'));
});
