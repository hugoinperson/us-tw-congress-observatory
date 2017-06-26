import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// { Graphql }
import { compose } from 'react-apollo'
// { Components }

class HomePage extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		error: PropTypes.object,
		goErrorPage: PropTypes.func
	}

	renderPage () {
		return (
			<div>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
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
