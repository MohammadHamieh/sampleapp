/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import {
  Input, Form, Tooltip, Icon, Row, Button, Col, Select, message, Modal,
} from 'antd';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Contacts, Groups } from '../api/contacts';

const { confirm } = Modal;
class CForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: this.checkEditing(),
      visible: false,
      name: '',
      work: '',
      phones: [],
      emails: [],
      groups: [],
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addContact = this.addContact.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.checkEditing = this.checkEditing.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.checkIfId = this.checkIfId.bind(this);
    this.showodal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  checkEditing() {
    let editing;
    const { id } = this.props.match.params;
    id === 'new' ? editing = true : editing = false;

    return editing;
  }

  addContact() {
    this.setState({
      isEditing: this.checkEditing(),
      name: '',
      work: '',
      phones: [],
      emails: [],
      groups: [],
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isEditing: !this.state.isEditing });
    const { id } = this.props.match.params;
    if (id === 'new') {
      Meteor.call('contacts.insert', {
        Name: this.state.name,
        Work: this.state.work,
        Phones: [this.state.phones],
        Emails: [this.state.emails],
        Groups: [this.state.groups],
      }, (error, result) => {
        if (error) {
          return error;
        }
        return message.success('Contact Added :)');
      });
      this.setState({
        isEditing: false,
        name: '',
        work: '',
        phones: [],
        emails: [],
        groups: [],
      });
    } else {
      this.doEdit();
    }
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

  // showConfirmDelte(e) {
  //   e.preventDefault();
  //   confirm({
  //     title: 'Are you sure you want to delete this Contact?',
  //     okText: 'Yes',
  //     okType: 'danger',
  //     cancelText: 'No',
  //     onOk() {
  //       this.handleDelete();
  //     },
  //     onCancel() {
  //     },
  //   });
  // }

  doEdit() {
    this.setState({ isEditing: !this.state.isEditing });
    Meteor.call('contacts.edit', this.props.match.params.id, {
      Name: this.state.name,
      Work: this.state.work,
      Phones: [this.state.phones],
      Emails: [this.state.emails],
      Groups: [this.state.groups],

    });
  }

  checkIfId() {
    if (this.props.match.params.id !== 'new' && this.props.match.params.id !== '/') {
      this.setState(prev => (
        {
          Name: this.props.contact.Name || '',
          Work: this.props.contact.Work,
          Phones: [this.props.contact.Phones],
          Emails: [this.props.contact.Emails],
          Groups: [this.props.contact.Groups],

        }
      ));
      console.log(this.props.contact);
    }
  }

  handleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleDelete() {
    const { id } = this.props.match.params;
    Meteor.call('contacts.delete', id, (error, result) => {
      if (error) {
        return message.error(error);
      }
      return message.success('Contact Delted');
    });
    this.setState({
      visible: false,
    });
  }

  render() {
    const Aption = Select.Option;
    const {
      name, phones, emails, groups, work, isEditing,
    } = this.state;
    return (


      <div>
        <Row>
          <Link to="/new">
            <Button type="primary" shape="circle" icon="plus" onClick={e => this.addContact(e)} />
          </Link>
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
                  {
                      this.props.groups.map(group => (
                        <Aption key={group._id}>{group.name}</Aption>
                      ))
                    }
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Button type="primary" onClick={this.handleEdit} disabled={isEditing}>Edit Contact</Button>

            </Col>
            <Col span={6}>
              <Button type="danger" onClick={e => this.showModal(e)} disabled={isEditing}>Delete Contact</Button>
              <Modal
                title={<Icon type="question-circle" theme="twoTone" twoToneColor="#ffae42" />}
                visible={this.state.visible}
                onOk={e => this.handleDelete(e)}
                onCancel={this.handleCancel}
              >
                <h5>Are you sure you want to delete?</h5>

              </Modal>

            </Col>
            <Col span={6}>
              <Button htmlType="submit">Done</Button>
            </Col>

          </Row>
        </Form>
      </div>
    );
  }
}
export default withTracker(({ match }) => {
  let contactHandle;
  let groupsHandle;

  try {
    contactHandle = Meteor.subscribe('contact');
    groupsHandle = Meteor.subscribe('groups');
  } catch (err) {
    console.log(err);
  }
  return {
    loading: contactHandle.ready() && groupsHandle.ready(),
    contact: Contacts.findOne({ _id: match.params.id }),
    groups: Groups.find({}).fetch(),
  };
})(CForm);
