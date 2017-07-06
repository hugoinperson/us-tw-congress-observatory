import React from 'react'
import PropTypes from 'prop-types'
// { Styles }
import { StyleSheet, css } from 'aphrodite'
import app from '../../../styles/app.css'

// ---------------- React Component ----------------

const PageBody = ({children}) => {
	return (
		<div className={css(style.pageBody)}>
			{children}
		</div>
	)
}

PageBody.propTypes = {
	children: PropTypes.node.isRequired
}

export default PageBody

// ---------------- CSS Style ----------------

const style = StyleSheet.create({
	pageBody: {
		position: 'relative',
		height: `calc(100% - ${app.pageHeaderHeight}px)`,
		minHeight: `${app.pageBodyMinHeight}px`
	}
})
