import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';

import Shell from '../imports/ui/shell';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

Meteor.startup(() => {
  render(<Shell />, document.getElementById('app'));
});
