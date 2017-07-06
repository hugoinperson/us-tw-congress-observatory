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

	callDisqus () {
		// let disqus_config = function () {
		// 	this.page.url = PAGE_URL; // Replace PAGE_URL with your page's canonical URL variable
		// 	this.page.identifier = '000' // Replace PAGE_IDENTIFIER with your page's unique identifier variable
		// }

		let d = document
		let s = d.createElement('script')
		s.src = 'https://us-taiwan-congress-observatory.disqus.com/embed.js'
		s.setAttribute('data-timestamp', +new Date());
		(d.head || d.body).appendChild(s)
	}

	renderPage () {
		this.callDisqus()

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

const AllBillsQueryOptions = {
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
	graphql(AllBillsQuery, AllBillsQueryOptions)
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
