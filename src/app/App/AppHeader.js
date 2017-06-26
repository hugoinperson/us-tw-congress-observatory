import React from 'react'
import logo from '../../assets/images/favicon.png'
import { StyleSheet, css } from 'aphrodite'
import appStyles from '../../styles/app.css'
import colors from '../../styles/colors.css'

// ---------------- React Component ----------------

const AppHeader = (props) => {
	return (
		<div className={css(style.header)}>
			<div className={css(style.title)}>
				<img className={css(style.logo)} src={logo} />
				<div>US-Taiwan Congress Observatory</div>
			</div>
			<ul className={css(style.menu)}>
				<li className={css(style.menuItem)}>BILLS</li>
				<li className={css(style.menuItem)}>CONGRESS MEMBERS</li>
				<li className={css(style.menuItem)}>ABOUT</li>
			</ul>
		</div>
	)
}

export default AppHeader

// ---------------- CSS Style ----------------

const style = StyleSheet.create({
	header: {
		width: 'inherit',
		display: 'flex',
		position: 'fixed',
		height: `${appStyles.appHeaderHeight}px`,
		zIndex: `${appStyles.appHeaderZIndex}`,
		backgroundColor: colors.white
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
		cursor: 'pointer'
	}
})
