/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */

import React, { PureComponent } from 'react';

import { Menu, Dropdown, Icon } from 'antd';

const menu = (
  <Menu>
    <Menu.Item key="0">
    </Menu.Item>
  </Menu>
);
class GroupMenue extends PureComponent {
  render() {
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" href="http://www.google.com">
          <Icon width="2em" height="2em" type="down-circle" />
        </a>
      </Dropdown>
    );
  }
}
export default GroupMenue;
