import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ContactDisplay from './contactDisplayer.js';
import { Contacts } from '../api/contacts.js';
import SearchBar from '../ui/SearchBar.js';
import CForm from '../ui/Form.js';
import 'antd/dist/antd.css';
import {
  Row, Col, Input, Alert,
} from 'antd';
import { Meteor } from 'meteor/meteor';

class App extends Component {
  renderContactDisplay() { // renders the profile summary under contact list
    return this.props.contacts.map(contact => (
      <ContactDisplay key={contact._id} contact={contact} />
    ));
  }

  searchContacts() { // the search function that we will use to find contacts by.
    return '';
  }

  render() {
    const { isReady } = this.props;
    return (
      <div>
        <Row>
          <Col span={24}>
            <Alert message="PhoneBook" type="info" />
          </Col>
        </Row>
        <Row>
          <Col span={8}>

            <p>Contact List</p>
            <Input.Search
              placeholder="Input your search"
              onSearch={value => console.log(value)}
              enterButton
                    />
            <p>here we will put the contacts</p>
            {/* calls the render function */}
            {isReady ? <ul>{this.renderContactDisplay()}</ul> : <p>loading</p>}
          </Col>
          <Col span={12}>
            <p>here is the Form</p>
            <CForm />
          </Col>
        </Row>
      </div>

    );
  }
}

export default withTracker(() => { // this is the component that finds our Contacts from the database and retruns them
  let handle;
  try {
    handle = Meteor.subscribe('contacts');
  } catch (error) {
    console.log(error);
  }
  return {
    isReady: handle.ready(),
    contacts: Contacts.find({}).fetch(),
  };
})(App);
