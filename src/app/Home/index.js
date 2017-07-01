import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// { Graphql }
import { compose } from 'react-apollo'
// { Components }
import Table from '../Elements/Table'
import TableHeaderColumn from '../Elements/TableHeaderColumn'
import TableBodyColumn from '../Elements/TableBodyColumn'

class HomePage extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		error: PropTypes.object,
		goErrorPage: PropTypes.func
	}

	renderPage () {
		let products = []
		for (let i = 1; i <= 300; i++) {
			products.push({id: 'hello', name: 'test', price: i})
		}

		return (
			<div>
				<Table data={products} pagination>
					<TableHeaderColumn dataField="id">Product ID</TableHeaderColumn>
					<TableHeaderColumn dataField="name">Product Name</TableHeaderColumn>
					<TableHeaderColumn dataField="price">Product Price</TableHeaderColumn>
					<TableBodyColumn>
						{(data) => (
							<div>{data}</div>
						)}
					</TableBodyColumn>
					<TableBodyColumn>
						{(data) => (
							<div>{data}</div>
						)}
					</TableBodyColumn>
					<TableBodyColumn>
						{(data) => (
							<div>{data}</div>
						)}
					</TableBodyColumn>
				</Table>
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
