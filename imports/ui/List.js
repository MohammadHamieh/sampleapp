/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import 'antd/dist/antd.css';
import { Row, Col, Input } from 'antd';
import { Meteor } from 'meteor/meteor';
import { Contacts } from '../api/contacts';
import ContactDisplay from './contactDisplayer.jsx';
import GroupMenue from './menue';

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
    };
  }

  renderContactDisplay() {
    return this.props.contacts.map(contact => (
      <ContactDisplay key={contact._id} contact={contact} />
    ));
  }

//   handleSearch(e) {
//     e.preventDefault();
//     this.setState({
//       search: e.target.value,
//     });
//   }

  render() {
    const { isReady } = this.props;
    return (
      <div>
        <Row gutter={8}>
          <Col span={20}>
            <Input.Search
              placeholder="Input your search"
              onSearch={value => console.log(value)}
              enterButton
            />
          </Col>
          <Col span={2}>
            <GroupMenue />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={22}>
            {isReady ? <ul>{this.renderContactDisplay()}</ul> : <p>Loading...</p>}
          </Col>
        </Row>
      </div>
    );
  }
}
export default withTracker(() => {
  let handle;
  try {
    handle = Meteor.subscribe('contacts');
  } catch (err) {
    console.log(err);
  }
  return {
    isReady: handle.ready(),
    contacts: Contacts.find({}, { sort: { createdAt: -1 } }).fetch(),
    //searchedContacts: Contacts.find({ Name: this.props.contacts.Name }).fetch(),
  };
})(ContactList);
