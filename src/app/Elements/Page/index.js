import React from 'react'
import PropTypes from 'prop-types'
import PageHeader from '../PageHeader'
// { Styles }
import { StyleSheet, css } from 'aphrodite'

// ---------------- React Component ----------------

const Page = ({pageTitle, pageSubTitle, children}) => {
	return (
		<div className={css(style.page)}>
			<PageHeader pageTitle={pageTitle} pageSubTitle={pageSubTitle} />
			{children}
		</div>
	)
}

Page.propTypes = {
	children: PropTypes.node.isRequired,
	pageTitle: PropTypes.string.isRequired,
	pageSubTitle: PropTypes.string
}

export default Page

// ---------------- CSS Style ----------------

const style = StyleSheet.create({
	page: {
		width: '100%',
		height: '100%'
	}
})
