import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBody from './AppBody'
import logo from '../../assets/images/favicon.png'
import { StyleSheet, css } from 'aphrodite'
import appStyles from '../../styles/app.css'
import colors from '../../styles/colors.css'

// ---------------- React Component ----------------

class Layout extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired
	}

	constructor (props) {
		super(props)
		this.state = {}
	}

	render () {
		console.log('the body', this.props.children)
		return (
			<div className={css(style.root)} >
				<div className={css(style.container)}>
					<div className={css(style.header)}>
						<div className={css(style.title)}>
							<img className={css(style.logo)} src={logo} />
							<div>US-Taiwan Congress Observatory</div>
						</div>
						<ul className={css(style.menu)}>
							<li className={css(style.menuItem)}>Bills</li>
							<li className={css(style.menuItem)}>Congress members</li>
							<li className={css(style.menuItem)}>About us</li>
						</ul>
					</div>
					<AppBody body={this.props.children}/>
				</div>
			</div>
		)
	}
}

// ---------------- Redux Connect ----------------

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({})

// ---------------- Export with Apollo compose wrapper ----------------

export default connect(mapStateToProps, mapDispatchToProps)(Layout)

// ---------------- CSS Style ----------------

const containerWidth = {}
containerWidth['width'] = `1440px`
containerWidth[`@media (max-width: ${appStyles.largeScreenSize}px)`] = { width: `80%` }
containerWidth[`@media (max-width: ${appStyles.medianScreenSize}px)`] = { width: `90%` }
containerWidth[`@media (max-width: ${appStyles.smallScreenSize}px)`] = { width: `calc(100%)` }

const style = StyleSheet.create({
	root: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		margin: '0px',
		padding: '0px',
		overflow: 'scroll'
	},
	container: {
		...containerWidth,
		margin: '0 auto'
	},
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
		// fontWeight: '200',
		fontSize: `${appStyles.largeFontSize}px`,
		letterSpacing: '0.1em',
		cursor: 'pointer'
	}
})
