import React from "react";
import ReactDOM from "react-dom";
import { Affix, Button, PageHeader, Icon } from "antd";
import '../components/LoginDrawer'



import { Menu, Col, Row, Divider } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import LoginModel from '../components/LoginModel'
import LoginDrawer from "../components/LoginDrawer";


class Header extends React.Component {


  render() {
    return (

      <PageHeader >

        <Icon type="menu" style={ { fontSize: '50px' } } />

        <Menu mode="horizontal">

          <SubMenu
            title={
              <span className="submenu-title-wrapper">

                <div style={ { fontSize: '16px', fontWeight: "bold" } }>
                  CITY
                </div>
              </span>
            }>

            <Menu.Item key="setting:11">Colombo</Menu.Item>
            <Menu.Item key="setting:12">Galle</Menu.Item>
            <Menu.Item key="setting:13">Matara</Menu.Item>
            <Menu.Item key="setting:14">Kandy</Menu.Item>

          </SubMenu>


          <SubMenu
            title={
              <span className="submenu-title-wrapper">
                <div style={ { fontSize: '16px', fontWeight: "bold" } }>
                  FIELDS
                </div>
              </span>
            }>

            <Menu.Item key="setting:1">Information Technology</Menu.Item>
            <Menu.Item key="setting:2">Marketing</Menu.Item>
            <Menu.Item key="setting:3">Civil</Menu.Item>
            <Menu.Item key="setting:4">Sales</Menu.Item>

          </SubMenu>

          <SubMenu
            title={
              <span className="submenu-title-wrapper">
                <div style={ { fontSize: '16px', fontWeight: "bold" } }>
                  CATEGORIES
                </div>
              </span>
            }>

            <Menu.Item key="setting:21">Information Technology</Menu.Item>
            <Menu.Item key="setting:22">Marketing</Menu.Item>
            <Menu.Item key="setting:23">Civil</Menu.Item>
            <Menu.Item key="setting:24">Sales</Menu.Item>

          </SubMenu>

          <Menu.Item style={ { float: 'right' } }>
            <LoginModel lable="EMPLOYER LOGIN" />
          </Menu.Item>

          <Menu.Item style={ { float: 'right' } } >
            <LoginModel lable="JOB SEEKER LOGIN" />
          </Menu.Item>

        </Menu>
      </PageHeader>

    );
  }
}

export default Header