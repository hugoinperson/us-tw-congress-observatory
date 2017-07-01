import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'

// ---------------- React Component ----------------

class TableHeader extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		columns: PropTypes.array.isRequired
	}

	constructor (props) {
		super(props)
		this.state = {}
	}

	getHeader () {
		const {children, columns} = this.props
		return React.Children.map(children, (child, index) => {
			return React.cloneElement(child, {
				width: columns[index].width
			})
		})
	}

	render () {
		return (
			<thead ref='header'>
				<tr className={css(style.tableHeader)}>{this.getHeader()}</tr>
			</thead>
		)
	}
}

export default TableHeader

// ---------------- CSS Style ----------------

const style = StyleSheet.create({
	tableHeader: {
		width: '100%',
		display: 'flex'
	}
})
