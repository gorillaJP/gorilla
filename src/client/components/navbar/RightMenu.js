import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import style from './navbar.less'
import LoginModal from '../bodyContent/loginModal/LoginModal'
import { connect } from 'react-redux'


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class RightMenu extends Component {

  constructor( props ) {
    super( props )
    this.state = {}
    this.popUpLoginModel = this.popUpLoginModel.bind( this )
  }

  componentWillReceiveProps( newProps ) {

    this.setState( { showLoginModel: this.state.showLoginModel && !newProps.session } )

  }

  popUpLoginModel = () => {
    console.log( 'clicked' )
    this.setState( { showLoginModel: true } )
  }

  render() {
    return (
      <React.Fragment>

        <Menu className={ style[ 'ant-menu-horizontal' ] } mode="horizontal">
          <Menu.Item className={ style[ 'ant-menu-item' ] } key="mail" onClick={ this.props.onLoginButtonClick }>
            <a>Login</a>
          </Menu.Item>
          <Menu.Item className={ style[ 'ant-menu-item' ] } key="app">
            <a href="">Register</a>
          </Menu.Item>
        </Menu>

        <LoginModal />



      </React.Fragment >
    )
  }
}

const mapStateToProps = state => {

  if ( state ) {
    return {
      session: state.session
    }
  }
}

const mapDispatchToProps = ( dispatch ) => {

  return {
    onLoginButtonClick: () => {
      dispatch( { type: 'LOGIN_BUTTON_CLICK' } )
    }
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( RightMenu )

