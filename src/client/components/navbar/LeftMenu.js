import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import style from './navbar.less'


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class LeftMenu extends Component {
  render() {
    return (
      <Menu className={ style[ 'ant-menu-horizontal' ] } mode="horizontal">
        <Menu.Item className={ [ style[ 'ant-menu-item' ], style[ '.ant-drawer-body' ] ].join( ' ' ) } key="mail">
          <a href="">Companies</a>
        </Menu.Item>
        <SubMenu className={ style[ 'ant-menu-submenu-title' ] } title={ <span >Blogs</span> }>
          <MenuItemGroup title="Item 1" >
            <Menu.Item className={ style[ 'ant-menu-item' ] } key="setting:1">Option 1</Menu.Item>
            <Menu.Item className={ style[ 'ant-menu-item' ] } key="setting:2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Item 2">
            <Menu.Item className={ style[ 'ant-menu-item' ] } key="setting:3">Option 3</Menu.Item>
            <Menu.Item className={ style[ 'ant-menu-item' ] } key="setting:4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <Menu.Item className={ style[ 'ant-menu-item' ] } key="alipay">
          <a href="">Industries</a>
        </Menu.Item>
      </Menu >
    );
  }
}

export default LeftMenu;
