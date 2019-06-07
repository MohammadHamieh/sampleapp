/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';
import { Empty, Button } from 'antd';
import {  Link } from 'react-router-dom';

class NoUser extends PureComponent {
  render() {
    return (
        <Empty
          image="/user.png"
          imageStyle={{
            height: 60,
          }}
          description={(
            <span>
           Select a Contact to display or
              {' '}
            </span>
)}
        >
          <Link to="/new"><Button type="primary">Add Contact</Button></Link>
        </Empty>
    );
  }
}
export default NoUser;
