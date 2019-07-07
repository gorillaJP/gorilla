import React, { Component } from 'react';
import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
import { Drawer, Button } from 'antd';
import style from './navbar.less'
import { connect } from 'react-redux'



class NavBar extends Component {

	constructor( props ) {
		super( props )
		this.state = {}
	}


	state = {
		current: 'mail',
		visible: false
	}
	showDrawer = () => {
		this.setState( {
			visible: true,
		} );
	};

	onClose = () => {
		this.setState( {
			visible: false,
		} );
	};

	render() {
		return (
			<nav className={ style.menuBar }>
				<div className={ style.logo }>
					<a href="" className={ style.link }>Gorilla</a>
				</div>
				<div className={ style.menuCon }>
					<div className={ style.leftMenu }>
						<LeftMenu />
					</div>

					{ this.props.session ?
						<div className={ style.nameTagContainer }>
							<div className={ style.nameTag } >
								{/* this.props.session.user.firstname.charAt( 0 ) + this.props.session.user.surname.charAt( 0 ) */ }
								DS
          					</div>
						</div>
						:
						<div className={ style.rightMenu }>
							<RightMenu />
						</div>
					}

					{ !this.props.session ?
						<Button className={ style.barsMenu } type="primary" onClick={ this.showDrawer }>
							<span className={ style.barsBtn }></span>
						</Button>
						: undefined
					}
					<Drawer
						title="Basic Drawer"
						placement="right"
						closable={ false }
						onClose={ this.onClose }
						visible={ this.state.visible }
					>
					</Drawer>


				</div>
			</nav> );
	}
}


const mapStateToProps = state => {



	if ( state ) {
		return {
			session: state.session
		}
	}
}

export default connect( mapStateToProps, undefined )( NavBar )
