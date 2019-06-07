/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */

import React, { PureComponent } from 'react';
import {
  Avatar, Row, Col,
} from 'antd';
import { Link } from 'react-router-dom';
// import CForm from './Form.jsx';
import moment from 'moment';

class ContactDisplay extends PureComponent {
  render() {
    const { contact } = this.props;
    return (
      <Row>
        <li style={{ listStyleType: 'none' }}>
          <Link to={`/${contact._id}`}>
            <Col span={6}>
              <Avatar src="/avatar.PNG" size="large" />
            </Col>
            <Col span={18}>
              <h5 style={{ fontFamily: 'Times New Roman', fontStyle: 'Bold' }}>{contact.Name}</h5>
              <h5 style={{ fontStyle: 'italic', fontFamily: 'Times New Roman' }}>{moment(contact.createdAt).format('DD/MM/YYYY')}</h5>
            </Col>
            <hr />
          </Link>
        </li>
      </Row>
    );
  }
}
export default ContactDisplay;
