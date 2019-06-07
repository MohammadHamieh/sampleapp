/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import 'antd/dist/antd.css';
import {
  Row, Col, Input, Select,
} from 'antd';
import { Meteor } from 'meteor/meteor';
import { Contacts, Groups } from '../api/contacts';
import ContactDisplay from './contactDisplayer.jsx';
import GroupMenue from './menue';
import CreateGroup from './createGroup.jsx';

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      groupSearch: 'Shared',
      contactList: this.props.contacts,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.changeGroup = this.changeGroup.bind(this);
  }

  changeGroup(e) {
    const groupContacts = this.props.contacts.filter(
      contact => contact.Groups.find(e) !== undefined,
    );
    console.log(groupContacts);
    this.setState(prevState => ({
      conactList: groupContacts,
    }));
  }

  handleSearch(e) {
    this.setState(prevState => ({ search: `${e}` }));
  }

  renderContactDisplay() {
    let filtered;
    if (this.state.search === null || this.state.search === '') {
      filtered = this.props.contacts;
    } else {
      filtered = this.props.contacts.filter(
        contact => contact.Name.toLowerCase().indexOf(this.state.search) !== -1,
      );
    }
    return filtered.map(contact => (
      <ContactDisplay key={contact._id} contact={contact} />
    ));
  }

  render() {
    const Aption = Select.Option;
    const { isReady, groups } = this.props;
    console.log(groups);
    return (
      <div>
        <Row gutter={8}>
          <Col span={20}>
            <Input.Search
              placeholder="Input your search"
              onSearch={e => this.handleSearch(e)}
              enterButton
            />
          </Col>
          <Col span={2}>
            {/* <Select
              name="groups"
              mode="multiple"
              value={groups}
              onChange={e => this.changeGroup(e)}
              placeholder="Select Groups"
              style={{ width: 120 }}
              required
            >
              {
                      groups.map(group => (
                        <Aption key={group._id}>{group.name}</Aption>
                      ))
                    }
            </Select> */}

          </Col>
        </Row>
        <Row>
          <Col spam={20}>
            <CreateGroup />
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
  let contactsHandle;
  let GroupsHandle;

  try {
    contactsHandle = Meteor.subscribe('contacts');
    GroupsHandle = Meteor.subscribe('groups');
  } catch (err) {
    console.log(err);
  }
  return {
    isReady: contactsHandle.ready() && GroupsHandle.ready(),
    contacts: Contacts.find({}, { sort: { createdAt: -1 } }).fetch(),
    groups: Groups.find({}).fetch(),
    currentUser: Meteor.user(),
    // searchedContacts: Contacts.find({ Name: this.props.contacts.Name }).fetch(),
  };
})(ContactList);
