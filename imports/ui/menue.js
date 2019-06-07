/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */

import React, { PureComponent } from 'react';

import {
  Menu, Dropdown, Icon, Button, Select,
} from 'antd';


class GroupMenue extends PureComponent {
  constructor(props) {
    super(props);
    this.handleGroup = this.handleGroup.bind(this);
  }

  handleGroup(e) {
    this.props.changeGroup(e);
    console.log(e);
  }

  render() {
    const Aption = Select.Option;
    const { groups } = this.props;
    return (
      <Select
        name="groups"
        mode="multiple"
        value={groups}
        onChange={e => this.handleGroup(e)}
        placeholder="Select Groups"
        style={{ width: 120 }}
        required
      >
        {
                      groups.map(group => (
                        <Aption key={group._id}>{group.name}</Aption>
                      ))
                    }
      </Select>
    );
  }
}
export default GroupMenue;
