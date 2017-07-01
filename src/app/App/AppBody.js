import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import appStyles from '../../styles/app.css'

// ---------------- React Component ----------------

const AppBody = (props) => {
	return (
		<div className={css(style.body)}>
			{props.body}
		</div>
	)
}

AppBody.propTypes = {
	body: PropTypes.node.isRequired
}

export default AppBody

// ---------------- CSS Style ----------------

const style = StyleSheet.create({
	body: {
		position: 'relative',
		zIndex: `${appStyles.appBodyZIndex}`
	}
})
