import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import colors from '../../../styles/colors.css'

// ---------------- React Component ----------------

class TableRow extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		columns: PropTypes.array.isRequired,
		rowData: PropTypes.object.isRequired
	}

	constructor (props) {
		super(props)
		this.state = {}
	}

	getRow () {
		const {children, columns, rowData} = this.props
		return React.Children.map(children, (child, index) => {
			return React.cloneElement(child, {
				width: columns[index].width,
				rowData: rowData
			})
		})
	}

	render () {
		return (
			<tr className={css(style.tableRow)} >
				{this.getRow()}
			</tr>
		)
	}
}

export default TableRow

// ---------------- CSS Style ----------------

const style = StyleSheet.create({
	tableRow: {
		width: '100%',
		display: 'flex',
		borderBottom: `1px solid ${colors.grayExtremeLight}`,
		cursor: 'pointer',
		transition: 'background .2s cubic-bezier(.694,.0482,.335,1)',
		':hover': {
			background: colors.grayExtremeLightest
		}
	}
})
