/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import {
  Input, Form, Tooltip, Icon, Row, Button, Col, Select,
} from 'antd';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router } from 'react-router-dom';
import { Contacts } from '../api/contacts';

class CForm extends Component {
  constructor(props) {
    super(props);
    const { contact } = props;
    this.state = {
      isEditing: false,
      name: '',
      work: '',
      phones: [],
      emails: [],
      groups: [],
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addContact = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  addContact() {
    this.handleEdit();
    this.setState({
      isEditing: true,
      name: '',
      work: '',
      phones: [],
      emails: [],
      groups: [],
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleEdit();
    Meteor.call('contacts.insert', {
      Name: this.state.name,
      Work: this.state.work,
      Phones: [this.state.phones],
      Emails: [this.state.emails],
      Groups: [this.state.groups],
    });
    this.setState({
      isEditing: false,
      name: '',
      work: '',
      phones: [],
      emails: [],
      groups: [],
    });
    return true;
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSelect(e) {
    this.setState({
      groups: `${e}`,
    });
  }

  handleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
    // Meteor.call('contacts.insert', {
    //   Name: 'bla', Work: 'blabla', Phones: ['96171928923'], Emails: ['mohammad@email.com'], Groups: ['shared']
    // });
  }
  // renderOptions(){
  //     return ( this.props.map((contact)=>
  //        <Option key={contact._id} group={contact.group}>{this.props.group}</Option>
  //        <Option>Hello there</Option>
  //     );
  // }

  render() {
    const Aption = Select.Option;
    const {
      name, phones, emails, groups, work, isEditing,
    } = this.state;
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Aption key={i.toString(36) + i}>{i.toString(36) + i}</Aption>);
    }

    return (


      <Router>
        <div>
          <Row>
            <Button type="primary" shape="circle" icon="plus" onClick={e => this.addContact(e)} />
          </Row>
          <Form onSubmit={e => this.handleSubmit(e)}>

            <Row>
              <br />
              <Form.Item>
                <Input
                  name="name"
                  placeholder="Enter contact name"
                  required
                  value={name}
                  onChange={e => this.handleChange(e)}
                  disabled={!isEditing}
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  suffix={(
                    <Tooltip title="Full name">
                      <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                  )}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  name="work"
                  value={work}
                  onChange={e => this.handleChange(e)}
                  disabled={!isEditing}
                  type="text"
                  placeholder="Enter contact work"
                  required
                  prefix={<Icon type="desktop" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  name="emails"
                  value={emails}
                  onChange={e => this.handleChange(e)}
                  disabled={!isEditing}
                  type="email"
                  placeholder="Enter contact email"
                  required
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  name="phones"
                  value={phones}
                  onChange={e => this.handleChange(e)}
                  disabled={!isEditing}
                  type="phone"
                  placeholder="Enter contact phone number"
                  required
                  prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />
              </Form.Item>
            </Row>
            <Row gutter={16}>
              <br />

              <Col span={6}>
                <Form.Item>
                  <Select
                    name="groups"
                    mode="multiple"
                    value={groups}
                    onChange={e => this.handleSelect(e)}
                    placeholder="Select Groups"
                    style={{ width: 120 }}
                    required
                    disabled={!isEditing}
                  >
                    {children}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Button type="primary" onClick={this.handleEdit} disabled={isEditing}>Edit Contact</Button>

              </Col>
              <Col span={6}>
                <Button htmlType="submit">Done</Button>
              </Col>

            </Row>
          </Form>
        </div>
      </Router>
    );
  }
}
export default withTracker(({ id }) => {
  let handle;
  try {
    handle = Meteor.subscribe('contact', { id });
  } catch (err) {
    console.log(err);
  }
  return {
    loading: handle.ready(),
    contact: Contacts.find({ _id: { id } }).fetch(),
  };
})(CForm);
