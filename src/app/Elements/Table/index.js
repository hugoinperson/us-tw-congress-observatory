import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import constants from './Constants'
// { Components }
import TableDataStore from './TableDataStore'
import TableHeader from '../TableHeader'
import TableBody from '../TableBody'
import TablePagination from '../TablePagination'
import TableHeaderColumn from '../TableHeaderColumn'
import TableBodyColumn from '../TableBodyColumn'

// ---------------- React Component ----------------

class Table extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		data: PropTypes.array.isRequired,
		pagination: PropTypes.bool
	}

	static defaultProps = {
		pagination: false,
		data: []
	}

	constructor (props) {
		super(props)

		this.store = new TableDataStore(this.props.data ? this.props.data.slice() : [])
		this.initTable(this.props)

		this.state = {
			data: this.getTableData(),
			pageSize: constants.PAGE_SIZE_LIST[0],
			currPage: constants.PAGE_START_INDEX
		}

		this.handlePaginationChangePage = this.handlePaginationChangePage.bind(this)
	}

	componentWillReceiveProps (nextProps) {
		this.initTable(nextProps)
		this.store.setData(nextProps.data.slice())
		this.reset()
	}

	reset () {
		this.store.clean()
		this.setState({
			data: this.getTableData(),
			pageSize: constants.PAGE_SIZE_LIST[0],
			currPage: constants.PAGE_START_INDEX
		})
	}

	initTable (props) {
		// TODO: loop through each column and check filters
		this.store.setProps({
			pagination: props.pagination
		})
	}

	getTableData () {
		// TODO: support filtering and soritng
		const { pagination } = this.props
		const page = this.state ? this.state.currPage : constants.PAGE_START_INDEX
		const pageSize = this.state ? this.state.pageSize : constants.PAGE_SIZE_LIST[0]
		if (pagination) {
			return this.store.page(page, pageSize).get()
		}

		return this.store.get()
	}

	renderPagination () {
		return (
			<div className={css(style.pagination)}>
				<TablePagination
					currPage={this.state.currPage}
					pageSize={this.state.pageSize}
					pageSizeList={constants.PAGE_SIZE_LIST}
					isDropdownOpen={false}
					dataSize={this.store.getVisibleDataSize()}
					changePage={this.handlePaginationChangePage} />
			</div>
		)
	}

	handlePaginationChangePage (page, pageSize) {
		this.setState({
			data: this.store.page(page, pageSize).get(),
			pageSize,
			currPage: page,
			reset: false
		})
	}

	getColumns () {
		return this.getChildrenByType('TableHeaderColumn').map((col, index) => ({
			name: col.props.dataField,
			width: col.props.width || '1',
			index: index
		}))
	}

	getChildrenByType (type) {
		const typeMap = {
			TableHeaderColumn: TableHeaderColumn,
			TableBodyColumn: TableBodyColumn
		}

		return this.props.children.filter(child => {
			return child.type.displayName === type || child.type.name === type || child.type === typeMap[type]
		})
	}

	render () {
		let columns = this.getColumns()
		return (
			<div className={css(style.tableWrapper)}>
				<table ref='table'
					className={css(style.table)} >
					<TableHeader ref='header'
						className={css(style.header)}
						columns={columns}>
						{ this.getChildrenByType('TableHeaderColumn') }
					</TableHeader>
					<TableBody ref='body'
						className={css(style.body)}
						data={this.state.data}
						columns={columns}>
						{ this.getChildrenByType('TableBodyColumn') }
					</TableBody>
				</table>
				{this.props.pagination ? this.renderPagination() : null}
			</div>
		)
	}
}

export default Table

// ---------------- CSS Style ----------------

const style = StyleSheet.create({
	tableWrapper: {
	},
	table: {
		width: '100%',
		height: '100%',
		transition: 'all 0.5s ease-out',
		display: 'flex',
		flexDirection: 'column'
	}
})
