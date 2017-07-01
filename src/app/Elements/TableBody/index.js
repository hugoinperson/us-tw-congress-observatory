import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
// { Components }
import TableRow from '../TableRow'

// ---------------- React Component ----------------

class TableBody extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		columns: PropTypes.array.isRequired,
		data: PropTypes.array.isRequired
	}

	static defaultProps = {
		data: []
	}

	constructor (props) {
		super(props)
		this.state = {}
	}

	render () {
		const {data, children, columns} = this.props
		return (
			<tbody
				className={css(style.tableBody)} >
				{data.map((rowData, rowIndex) => (
					<TableRow key={rowIndex} rowData={rowData} columns={columns}>{children}</TableRow>
				))}
			</tbody>
		)
	}
}

export default TableBody

// ---------------- CSS Style ----------------

const style = StyleSheet.create({
	tableBody: {
	}
})
