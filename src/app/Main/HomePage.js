import React from 'react'
import capitol from '../../assets/images/capitol.png'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// { Graphql }
import { compose } from 'react-apollo'
// { Components }
// { Styles }
import { StyleSheet, css } from 'aphrodite'
import colors from '../../styles/colors.css'
import app from '../../styles/app.css'

class HomePage extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		error: PropTypes.object,
		goErrorPage: PropTypes.func
	}

	renderPage () {
		return (
			<div className={css(style.heroSec)}>
				<div className={css(style.heroTitle)}>
					<h1 className={css(style.heroText)}>US-Taiwan</h1>
					<h1 className={css(style.heroText)}>Congress</h1>
					<h1 className={css(style.heroText)}>Observatory</h1>
				</div>
				<img className={css(style.capitol)} src={capitol} />
			</div>
		)
	}

	render () {
		if (this.props.error) {
			this.props.goErrorPage()
		} else if (this.props.loading) {
			return <p>Loading</p>
		} else {
			return this.renderPage()
		}
	}
}

// ---------------- Redux Connect ----------------

const mapStateToProps = () => ({
})

const mapDispatchToProps = () => ({
})

// ---------------- Export with Apollo compose wrapper ----------------

export default compose(
	connect(mapStateToProps, mapDispatchToProps)
)(HomePage)

// ---------------- CSS Style ----------------

const style = StyleSheet.create({
	heroSec: {
		background: colors.grayLightest,
		padding: '100px 0 0 0',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	heroTitle: {
		marginRight: '100px'
	},
	heroText: {
		color: colors.blue,
		fontSize: '6vw',
		lineHeight: '1em'
	},
	capitol: {
		display: 'block',
		width: '40%'
	}
})
