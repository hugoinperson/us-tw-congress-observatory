import React from 'react'
import PropTypes from 'prop-types'
// { Styles }
import { StyleSheet, css } from 'aphrodite'
import app from '../../../styles/app.css'

// ---------------- React Component ----------------

const PageHeader = ({pageTitle, pageSubTitle}) => {
	return (
		<div className={css(style.pageHeader)}>
			<div className={css(style.pageTitle)}>
				{pageTitle}
			</div>
			<p className={css(style.pageSubTitle)}>
				{pageSubTitle}
			</p>
		</div>
	)
}

PageHeader.propTypes = {
	pageTitle: PropTypes.string.isRequired,
	pageSubTitle: PropTypes.string
}

export default PageHeader

// ---------------- CSS Style ----------------

const style = StyleSheet.create({
	pageHeader: {
		display: 'flex',
		flexDirection: 'column',
		padding: `${app.pagePadding / 2}em 0 ${app.pagePadding / 3}em 0`
	},
	pageTitle: {
		marginTop: 'auto',
		fontSize: `${app.pageHeaderTitleSize}px`,
		lineHeight: `${app.pageHeaderTitleSize}px`,
		fontWeight: app.pageHeaderTitleWeight,
		color: app.pageHeaderTitleColor
	},
	pageSubTitle: {
		fontSize: `${app.pageHeaderSubTitleSize}px`,
		fontWeight: app.pageHeaderSubTitleWeight,
		marginTop: '10px',
		letterSpacing: '0.1em',
		color: app.pageHeaderSubTitleColor
	}
})
