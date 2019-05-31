/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */

import React, { PureComponent } from 'react';
import {
  Avatar, Row, Col,
} from 'antd';
import { BrowserRouter as Router, Link } from 'react-router-dom';
// import CForm from './Form.jsx';


class ContactDisplay extends PureComponent {
  render() {
    const { contact } = this.props;
    return (
      <Router>
        <div>
          <Row>
            <li>
              <Link to={`/${contact._id}`}>
                <Col span={6}>
                  <Avatar src="/avatar.PNG" size="large" />
                </Col>
                <Col span={18}>
                  <h5>{contact.Name}</h5>
                  <br />
                </Col>
              </Link>
            </li>
          </Row>
          {/* <Route path="/:id" component={CForm} /> */}
        </div>
      </Router>

    );
  }
}
export default ContactDisplay;
