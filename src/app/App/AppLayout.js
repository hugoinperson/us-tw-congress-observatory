import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBody from './AppBody'
import logo from '../../assets/images/favicon.png'
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
		console.log('the body', this.props.children)
		return (
			<div className={css(style.root)} >
				<div className={css(style.container)}>
					<div className={css(style.header)}>
						<div className={css(style.title)}>
							<img className={css(style.logo)} src={logo} />
							US-Taiwan Congress Observatory
						</div>
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

const style = StyleSheet.create({
	root: {
		position: 'absolute',
		minWidth: `${appStyles.appMinWidth}px`,
		height: '100%',
		width: '100%',
		margin: '0px',
		padding: '0px',
		overflow: 'scroll',
		display: 'flex',
		justifyContent: 'center'
	},
	container: {
		width: '1280px'
	},
	header: {
		display: 'flex',
		padding: '30px 0'
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
	}
})
