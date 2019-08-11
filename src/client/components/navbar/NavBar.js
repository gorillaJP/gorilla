import React, { Component } from 'react';
import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
import { Drawer, Button } from 'antd';
import style from './navbar.less'
import { connect } from 'react-redux'
import { Menu, Icon, Dropdown } from 'antd';

const MenuItemGroup = Menu.ItemGroup;

const SubMenu = Menu.SubMenu;

class NavBar extends Component {

	constructor(props) {
		super(props)
		this.state = {}
	}

	state = {
		visible: false
	}
	showDrawer = () => {
		this.setState({
			visible: true,
		});
	};

	onClose = () => {
		this.setState({
			visible: false,
		});
	};

	render() {

		//get the short name to display in login icon
		let letteredName = getLetteredName(this.props)

		return (
			<nav className={style.menuBar}>
				<div className={style.logo}>
					<a href="" className={style.link}>Gorilla</a>
				</div>
				<div className={style.menuCon}>
					<div className={style.leftMenu}>
						<LeftMenu />
					</div>

					{this.props.session ?
						<div className={style.nameTagContainer}>


							<Dropdown overlay={

								(
									<Menu>
										<Menu.Item size="large">
											<a target="_blank" rel="noopener noreferrer" onClick={() => { }}>
												Profile
      										</a>
										</Menu.Item>
										<Menu.Item size="large">
											<a target="_blank" rel="noopener noreferrer" onClick={this.props.logout}>
												Logout
      										</a>
										</Menu.Item>
									</Menu>
								)
							}>
								<a className="ant-dropdown-link" href="#">
									<div className={style.nameTag} >
										{
											letteredName
										}
									</div>
								</a>
							</Dropdown>


						</div>
						:
						<div className={style.rightMenu}>
							<RightMenu />
						</div>
					}

					{!this.props.session ?
						<Button className={style.barsMenu} type="primary" onClick={this.showDrawer}>
							<span className={style.barsBtn}></span>
						</Button>
						: undefined
					}
					<Drawer
						title="Basic Drawer"
						placement="right"
						closable={false}
						onClose={this.onClose}
						visible={this.state.visible}
					>
					</Drawer>


				</div>
			</nav>);
	}
}

const getLetteredName = (props) => {
	let letteredName = ""
	if (props.session && props.session.user && props.session.user.name) {

		const nameParts = props.session.user.name.split(" ")

		if (nameParts.length > 1) {
			letteredName = nameParts[0].charAt(0) + nameParts[1].charAt(0)
		}
		else {
			letteredName = nameParts[0].charAt(0)
		}
	}
	return letteredName
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => { dispatch({ type: 'LOGOUT' }) }
	}
}

const mapStateToProps = state => {

	if (state) {
		return {
			session: state.session
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
