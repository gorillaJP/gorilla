import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import style from './navbar.less'
import LoginModal from '../bodyContent/loginModal/LoginModal'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'



const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class RightMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {
    return (
      <React.Fragment>

        <Menu className={style['ant-menu-horizontal']} mode="horizontal">
          <Menu.Item className={style['ant-menu-item']} key="mail">
            <Link to='/login'>Login</Link>
          </Menu.Item>
          <Menu.Item className={style['ant-menu-item']} key="app">
            <Link to='/register'>Register</Link>
            {
              /**
               *  <a href="">Register</a>
               */
            }
          </Menu.Item>
        </Menu>



      </React.Fragment >
    )
  }
}

const mapStateToProps = state => {

  if (state) {
    return {
      session: state.session
    }
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu)

