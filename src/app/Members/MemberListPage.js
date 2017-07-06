import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// { Graphql }
import { graphql, compose } from 'react-apollo'
import AllMembersQuery from '../../graphql/queries/AllMembersQuery.graphql'
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

class MemberListPage extends React.Component {
	static propTypes = {
		members: PropTypes.array,
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
		let members = this.props.members
		this.callDisqus()

		return (
			<Page
				pageTitle="115the congress members"
				pageSubTitle="list of current congress members from senate and house">
				<PageBody>
					<Table data={members} pagination>
						<TableHeaderColumn width="1" dataField="roleType">Title</TableHeaderColumn>
						<TableHeaderColumn width="1" dataField="state">State</TableHeaderColumn>
						<TableHeaderColumn width="1" dataField="district">District</TableHeaderColumn>
						<TableHeaderColumn width="2" dataField="name">Name</TableHeaderColumn>
						<TableHeaderColumn width="1" dataField="party">Party</TableHeaderColumn>
						<TableHeaderColumn width="1" dataField="startDate">Start Date</TableHeaderColumn>
						<TableBodyColumn>{(data) => (<div className={css(style.cellCenter)}>{data.roleType}</div>)}</TableBodyColumn>
						<TableBodyColumn>{(data) => (<div className={css(style.cellCenter)}>{data.state}</div>)}</TableBodyColumn>
						<TableBodyColumn>{(data) => (<div className={css(style.cellCenter)}>{data.district}</div>)}</TableBodyColumn>
						<TableBodyColumn>{(data) => (<a href={data.link} target="_blank" className={css(style.voteLink)}>{data.firstname + ' ' + data.lastname}</a>)}</TableBodyColumn>
						<TableBodyColumn>{(data) => (<div className={css(style.cellCenter)}>{data.party}</div>)}</TableBodyColumn>
						<TableBodyColumn>{(data) => (<div className={css(style.cellCenter)}>{(new Date(data.startDate)).toLocaleDateString()}</div>)}</TableBodyColumn>
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

const AllMembersQueryOptions = {
	props: ({ data: { loading, error, members } }) => ({
		loading,
		error,
		members
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
	graphql(AllMembersQuery, AllMembersQueryOptions)
)(MemberListPage)

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
