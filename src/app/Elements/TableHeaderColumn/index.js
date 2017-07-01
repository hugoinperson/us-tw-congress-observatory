import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import appStyles from '../../../styles/app.css'
import colors from '../../../styles/colors.css'

// ---------------- React Component ----------------

class TableHeaderColumn extends React.Component {
	static propTypes = {
		children: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
		width: PropTypes.string,
		dataField: PropTypes.string.isRequired
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
		const {children, width} = this.props
		return (
			<th ref='header-col'
				className={css(style({}).tableHeaderColumn, style({width})[this.getProperWidthRule()])} >
				{children}
			</th>
		)
	}
}

export default TableHeaderColumn

// ---------------- CSS Style ----------------

const style = (props) => StyleSheet.create({
	tableHeaderColumn: {
		padding: '10px 0',
		margin: '0 2px',
		lineHeight: '2em',
		fontSize: `${appStyles.largeFontSize}px`,
		background: colors.grayExtremeLight,
		fontWeight: '400',
		color: colors.dark,
		cursor: 'pointer',
		':hover': {
			background: colors.grayLightest
		}
	},
	flexWidth: {
		flex: props.width
	},
	pixelWidth: {
		width: props.width
	}
})
