import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// { Graphql }
import { graphql, compose } from 'react-apollo'
import AllBillsQuery from '../../graphql/queries/AllBillsQuery.graphql'
// { Components }
import Page from '../Elements/Page'
import PageBody from '../Elements/PageBody'
import Table from '../Elements/Table'
import TableHeaderColumn from '../Elements/TableHeaderColumn'
import TableBodyColumn from '../Elements/TableBodyColumn'
// { Styles }
import { StyleSheet, css } from 'aphrodite'
import colors from '../../styles/colors.css'
import app from '../../styles/app.css'

class BillListPage extends React.Component {
	static propTypes = {
		bills: PropTypes.array,
		loading: PropTypes.bool,
		error: PropTypes.object,
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
		let bills = this.props.bills
		this.callDisqus()

		return (
			<Page
				pageTitle="Taiwan related bills"
				pageSubTitle="list of Taiwan related bills from 1979 - 2016">
				<PageBody>
					<Table data={bills} pagination>
						<TableHeaderColumn width="1" dataField="congress">Congress</TableHeaderColumn>
						<TableHeaderColumn width="1" dataField="currentChamber">Chamber</TableHeaderColumn>
						<TableHeaderColumn width="1" dataField="billCode">Bill Code</TableHeaderColumn>
						<TableHeaderColumn width="3" dataField="titleWithoutNumber">Title</TableHeaderColumn>
						<TableHeaderColumn width="1" dataField="introducedDate">Introduced Date</TableHeaderColumn>
						<TableBodyColumn>{(data) => (<div className={css(style.cellCenter)}>{data.congress}</div>)}</TableBodyColumn>
						<TableBodyColumn>{(data) => (<div className={css(style.cellCenter)}>{data.currentChamber}</div>)}</TableBodyColumn>
						<TableBodyColumn>{(data) => (<div className={css(style.cellCenter)}>{data.billCode}</div>)}</TableBodyColumn>
						<TableBodyColumn>{(data) => (<a href={data.link} target="_blank" className={css(style.billLink)}>{data.titleWithoutNumber}</a>)}</TableBodyColumn>
						<TableBodyColumn>{(data) => (<div className={css(style.cellCenter)}>{(new Date(data.introducedDate)).toLocaleDateString()}</div>)}</TableBodyColumn>
					</Table>
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

const cell = {
	fontWeight: '400',
	fontSize: `${app.largeFontSize}px`
}

const style = StyleSheet.create({
	commentSec: {
		marginTop: '40px'
	},
	cellCenter: {
		...cell,
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	billLink: {
		...cell,
		color: colors.blue,
		':hover': {
			textDecoration: 'underline'
		}
	}
})
