import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBody from './AppBody'
import AppHeader from './AppHeader'
import { StyleSheet, css } from 'aphrodite'
import appStyles from '../../styles/app.css'

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
		return (
			<div className={css(style.root)} >
				<div className={css(style.container)}>
					<AppHeader />
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
		margin: '0 auto',
		padding: '20px'
	}
})
