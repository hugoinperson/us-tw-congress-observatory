import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// { Graphql }
import { graphql, compose } from 'react-apollo'
import AllVotesQuery from '../../graphql/queries/AllVotesQuery.graphql'
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

class VoteListPage extends React.Component {
	static propTypes = {
		votes: PropTypes.array,
		loading: PropTypes.bool,
		error: PropTypes.object,
		goErrorPage: PropTypes.func
	}

	renderPage () {
		let votes = this.props.votes

		return (
			<Page
				pageTitle="Taiwan related votes"
				pageSubTitle="list of Taiwan related votes from 1979 - 2016">
				<PageBody>
					<Table data={votes} pagination>
						<TableHeaderColumn width="1" dataField="congress">Congress</TableHeaderColumn>
						<TableHeaderColumn width="1" dataField="chamber">Chamber</TableHeaderColumn>
						<TableHeaderColumn width="1" dataField="session">Session</TableHeaderColumn>
						<TableHeaderColumn width="3" dataField="question">Question</TableHeaderColumn>
						<TableHeaderColumn width="1" dataField="plusRate">Plus Rate</TableHeaderColumn>
						<TableHeaderColumn width="1" dataField="createdDate">Created Date</TableHeaderColumn>
						<TableBodyColumn>{(data) => (<div className={css(style.cellCenter)}>{data.congress}</div>)}</TableBodyColumn>
						<TableBodyColumn>{(data) => (<div className={css(style.cellCenter)}>{data.chamber}</div>)}</TableBodyColumn>
						<TableBodyColumn>{(data) => (<div className={css(style.cellCenter)}>{data.session}</div>)}</TableBodyColumn>
						<TableBodyColumn>{(data) => (<a href={data.link} target="_blank" className={css(style.voteLink)}>{data.question}</a>)}</TableBodyColumn>
						<TableBodyColumn>{(data) => (<div className={css(style.cellCenter)}>{(data.plusRate * 100).toFixed(2)}%</div>)}</TableBodyColumn>
						<TableBodyColumn>{(data) => (<div className={css(style.cellCenter)}>{(new Date(data.createdDate)).toLocaleDateString()}</div>)}</TableBodyColumn>
					</Table>
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

const AllVotesQueryOptions = {
	props: ({ data: { loading, error, votes } }) => ({
		loading,
		error,
		votes
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
	graphql(AllVotesQuery, AllVotesQueryOptions)
)(VoteListPage)

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
	voteLink: {
		...cell,
		color: colors.blue,
		':hover': {
			textDecoration: 'underline'
		}
	}
})
