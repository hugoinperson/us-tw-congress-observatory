import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// { Graphql }
import { graphql, compose } from 'react-apollo'
import BillQuery from '../../graphql/queries/BillQuery.graphql'
// { Components }
import Page from '../Elements/Page'
import PageBody from '../Elements/PageBody'
// { Styles }
import { StyleSheet, css } from 'aphrodite'
import colors from '../../styles/colors.css'

class BillListPage extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		error: PropTypes.object,
		params: PropTypes.object,
		bill: PropTypes.object,
		goErrorPage: PropTypes.func
	}

	renderPage () {
		return (
			<Page
				pageTitle="Taiwan related bills"
				pageSubTitle="list of Taiwan related bills from 1979 - 2017">
				<PageBody>
					<div id="disqus_thread" className={css(style.commentSec)}/>
				</PageBody>
			</Page>
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

// ---------------- GraphQL Query ----------------

const BillQueryOptions = {
	props: ({ data: { loading, error, bills } }) => ({
		loading,
		error,
		bills
	}),
	options: {
		// TODO: fig out how to mark dirty after the mutation has been made and then fetch
		fetchPolicy: 'cache-first'
	}
}

// ---------------- Redux Connect ----------------

const mapStateToProps = () => ({
})

const mapDispatchToProps = () => ({
})

// ---------------- Export with Apollo compose wrapper ----------------

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	graphql(BillQuery, BillQueryOptions)
)(BillListPage)

// ---------------- CSS Style ----------------

const style = StyleSheet.create({
	commentSec: {
		marginTop: '40px'
	},
	billLink: {
		color: colors.blue,
		':hover': {
			textDecoration: 'underline'
		}
	}
})
