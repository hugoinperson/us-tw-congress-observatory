import React from 'react'
import logo from '../../assets/images/favicon.png'
import { Link } from 'react-router'
// { Styles }
import { StyleSheet, css } from 'aphrodite'
import appStyles from '../../styles/app.css'
import colors from '../../styles/colors.css'

// ---------------- React Component ----------------

const AppHeader = (props) => {
	return (
		<div className={css(style.header)}>
			<Link to="/home" className={css(style.homeItem)}>
				<div className={css(style.title)}>
					<img className={css(style.logo)} src={logo} />
					<div>US-Taiwan Congress Observatory</div>
				</div>
			</Link>
			<div className={css(style.menu)}>
				<Link to="/bills" className={css(style.menuItem)}><li>BILLS</li></Link>
				<Link to="/votes" className={css(style.menuItem)}><li>VOTES</li></Link>
				<Link to="/members" className={css(style.menuItem)}><li>CONGRESS MEMBERS</li></Link>
				<Link to="/about" className={css(style.menuItem)}><li>ABOUT</li></Link>
			</div>
		</div>
	)
}

export default AppHeader

// ---------------- CSS Style ----------------

const style = StyleSheet.create({
	header: {
		width: '100%',
		display: 'flex',
		height: `${appStyles.appHeaderHeight}px`,
		zIndex: `${appStyles.appHeaderZIndex}`,
		backgroundColor: colors.white
	},
	homeItem: {
		display: 'flex',
		alignItems: 'center',
		color: colors.dark,
		textDecoration: 'none'
	},
	logo: {
		width: '25px',
		height: '25px',
		marginRight: '10px'
	},
	title: {
		fontSize: `${appStyles.h5FontSize}px`,
		letterSpacing: '0.1em',
		lineHeight: '1em',
		display: 'flex',
		alignItems: 'center'
	},
	menu: {
		listStyleType: 'none',
		marginLeft: 'auto',
		display: 'flex',
		alignItems: 'center'
	},
	menuItem: {
		marginRight: '24px',
		fontSize: `${appStyles.baseFontSize}px`,
		letterSpacing: '0.1em',
		cursor: 'pointer',
		color: colors.dark,
		textDecoration: 'none'
	}
})
