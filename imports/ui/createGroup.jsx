/* eslint-disable linebreak-style */
import React from 'react';

import {
  Button, Modal, Form, Input, Radio,
} from 'antd';
import { Meteor } from 'meteor/meteor';
import ForminModal from './CollectionCreateForm.jsx';

class CollectionsPage extends React.Component {
    state = {
      visible: false,
    };

    showModal = () => {
      this.setState({ visible: true });
    };

    handleCancel = () => {
      this.setState({ visible: false });
    };

    handleCreate = (e) => {

      console.log(e);

      // Meteor.call('addGroup', `${e}`);
      // this.setState({ visible: false });
    };

    saveFormRef = (formRef) => {
      this.formRef = formRef;
    };

    render() {
      return (
        <div>
          <Button type="primary" onClick={this.showModal}>
            New Collection
          </Button>
          <ForminModal
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={e => this.handleCreate(e)}
          />
        </div>
      );
    }
}
export default CollectionsPage;
