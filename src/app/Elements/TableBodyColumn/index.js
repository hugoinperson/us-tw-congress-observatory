import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import appStyles from '../../../styles/app.css'
import colors from '../../../styles/colors.css'

// ---------------- React Component ----------------

class TableBodyColumn extends React.Component {
	static propTypes = {
		children: PropTypes.func.isRequired,
		width: PropTypes.string,
		colData: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
	}

	constructor (props) {
		super(props)
		this.state = {}
	}

	isNumber (string) {
		return /^\d+$/.test(string)
	}

	getProperWidthRule () {
		const {width} = this.props
		return this.isNumber(width) ? 'flexWidth' : 'pixelWidth'
	}

	render () {
		const {children, width, colData} = this.props
		return (
			<td ref='body-col'
				className={css(style({}).tableBodyColumn, style({width})[this.getProperWidthRule()])} >
				{children(colData)}
			</td>
		)
	}
}

export default TableBodyColumn

// ---------------- CSS Style ----------------

const style = (props) => StyleSheet.create({
	tableBodyColumn: {
		lineHeight: '3em',
		fontSize: `${appStyles.baseFontSize}px`,
		fontWeight: '200',
		color: colors.dark,
		padding: '15px 5px',
		margin: '0 2px'
	},
	flexWidth: {
		flex: props.width
	},
	pixelWidth: {
		width: props.width
	}
})
