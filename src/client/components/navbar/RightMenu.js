import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import style from './navbar.less'


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class RightMenu extends Component {
  render() {
    return (
      <Menu className={ style[ 'ant-menu-horizontal' ] } mode="horizontal">
        <Menu.Item className={ style[ 'ant-menu-item' ] } key="mail">
          <a href="">Login</a>
        </Menu.Item>
        <Menu.Item className={ style[ 'ant-menu-item' ] } key="app">
          <a href="">Register</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default RightMenu;
