/* eslint-disable linebreak-style */
import React from 'react';

import {
  Modal, Form, Input, Radio,
} from 'antd';


// eslint-disable-next-line
export default class ForminModal extends React.Component {
  constructor(props) {
    super(props);
    this.onHandleCreate = this.onHandleCreate.bind(this);
  }

  onHandleCreate(e) {
    console.log(e);
    this.props.onCreate(`${e}`);
    console.log(`${e.name}`);
  }

  render() {
    const {
      visible, onCancel, onCreate, form,
    } = this.props;
    return (
      <Modal
        visible={visible}
        title="Create a new collection"
        okText="Create"
        onCancel={onCancel}
        onOk={e => this.onHandleCreate(e)}
      >
        <Form layout="vertical" onSubmit={e => this.onHandleCreate(e)}>
          <Form.Item label="Title">
            <Input
              name={this.value}
              placeholder="Enter group name"
              required
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
