import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import appStyles from '../../../styles/app.css'
import colors from '../../../styles/colors.css'
// { Components }

// ---------------- React Component ----------------

class TablePagination extends React.Component {
	static propTypes = {
		currPage: PropTypes.number.isRequired,
		pageSizeList: PropTypes.array.isRequired,
		isDropdownOpen: PropTypes.bool.isRequired,
		pageSize: PropTypes.number.isRequired,
		dataSize: PropTypes.number.isRequired,
		changePage: PropTypes.func.isRequired
	}

	constructor (props) {
		super(props)
		this.state = {
			totalPageNum: Math.ceil(this.props.dataSize / this.props.pageSize),
			isDropdownOpen: this.props.isDropdownOpen
		}
		this.onChangePageSize = this.onChangePageSize.bind(this)
		this.onToggleDropdown = this.onToggleDropdown.bind(this)
		this.onPageBtnClick = this.onPageBtnClick.bind(this)
	}

	onChangePageSize (pageSize) {
		let {currPage} = this.props

		if (pageSize !== this.props.pageSize) {
			const totalPageNum = Math.ceil(this.props.dataSize / pageSize)
			const startPage = 1
			const endPage = startPage + totalPageNum - 1
			if (currPage > endPage) currPage = endPage
			this.props.changePage(currPage, pageSize)
			this.setState({...this.state, totalPageNum, isDropdownOpen: false})
		} else {
			this.setState({...this.state, isDropdownOpen: false})
		}
	}

	getOptions () {
		const {pageSizeList} = this.props
		return pageSizeList.map(pageSize => {
			return (
				<li key={pageSize} role='presentation' className={css(style.dropdownItem)}>
					<a role='menuitem'
						className={css(style.dropdownItemLink)}
						tabIndex='-1' href="#"
						data-page={pageSize}
						onClick={e => {
							e.preventDefault()
							this.onChangePageSize(pageSize)
						}}>{pageSize}</a>
				</li>
			)
		})
	}

	onToggleDropdown () {
		this.setState({
			...this.state,
			isDropdownOpen: !this.state.isDropdownOpen})
	}

	getDropdown () {
		let dropdownContentClass = this.state.isDropdownOpen ? 'dropdownContentOpen' : 'dropdownContentHide'
		return (
			<span>
				<button className={css(style.dropdownBtn)} onClick={this.onToggleDropdown}>
					{this.props.pageSize}
				</button>
				<ul role='menu' className={css(style[dropdownContentClass])}>
					{this.getOptions()}
				</ul>
			</span>
		)
	}

	getPages () {
		let pages = []
		if (this.state.totalPageNum <= 0) return []

		let paginationListSize = 5 // TODO: the length of pagination bar, can be open to config in the future
		if (paginationListSize > this.state.totalPageNum) {
			paginationListSize = this.state.totalPageNum
		}

		const startPage = 1
		let firstPageBtnNum = Math.max(this.props.currPage - Math.floor(paginationListSize / 2), startPage)
		let lastPageBtnNum = firstPageBtnNum + paginationListSize - 1

		if (lastPageBtnNum > this.state.totalPageNum) {
			lastPageBtnNum = this.state.totalPageNum
			firstPageBtnNum = lastPageBtnNum - paginationListSize + 1
		}

		// placeholder values for "prev"
		pages.push({number: firstPageBtnNum - 1, title: '<'})

		// here are the actul page numbers shown
		for (let i = firstPageBtnNum; i <= lastPageBtnNum; i++) {
			pages.push({number: i, title: `${i}`})
		}

		// placeholder values for "next"
		pages.push({number: lastPageBtnNum + 1, title: '>'})

		return pages
	}

	onPageBtnClick (e) {
		e.preventDefault()
		let targetPage
		let pageTitle = e.currentTarget.dataset.title
		switch (pageTitle) {
		case 'x':
			return
		case '<':
			targetPage = this.props.currPage - 1
			break
		case '>':
			targetPage = this.props.currPage + 1
			break
		default:
			targetPage = parseInt(pageTitle, 10)
		}
		this.setState({...this.state, isDropdownOpen: false})
		if (targetPage !== this.props.currPage) {
			this.props.changePage(targetPage, this.props.pageSize)
		}
	}

	getBtnList () {
		const pages = this.getPages()
		const pageBtns = pages.map(page => {
			let displayBtnContent = page.number
			let pageLinkClass = 'normalPageLink'
			if (page.number === this.props.currPage) {
				pageLinkClass = 'activePageLink'
			}
			if (page.title === '<') {
				displayBtnContent = <span className={'chevron left'} />
				if (this.props.currPage - 1 <= 0) {
					pageLinkClass = 'disabledPageLink'
					page.title = 'x'
				} else {
					pageLinkClass = 'navPageLink'
				}
			}
			if (page.title === '>') {
				displayBtnContent = <span className={'chevron right'} />
				if (this.props.currPage + 1 > this.state.totalPageNum) {
					pageLinkClass = 'disabledPageLink'
					page.title = 'x'
				} else {
					pageLinkClass = 'navPageLink'
				}
			}

			return (
				<li className={css(style.btn)} key={page.number}>
					<a className={css(style[pageLinkClass])} href='#' data-title={page.title} onClick={this.onPageBtnClick}>{displayBtnContent}</a>
				</li>
			)
		})
		return (
			<ul className={css(style.btnList)}>
				{pageBtns}
			</ul>
		)
	}

	render () {
		return (
			<div className={css(style.tablePagination)}>
				<div className={css(style.paginationDropdown)}>{this.getDropdown()}</div>
				<div className={css(style.paginationBtns)}>{this.getBtnList()}</div>
			</div>
		)
	}
}

export default TablePagination

// ---------------- CSS Style ----------------

const basePageLink = {
	textDecoration: 'none',
	width: '100%',
	height: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '50%'
}

const style = StyleSheet.create({
	tablePagination: {
		marginTop: '15px',
		display: 'flex',
		justifyContent: 'space-between'
	},
	dropdownBtn: {
		width: '50px',
		height: '40px',
		fontSize: `${appStyles.largeFontSize}px`,
		cursor: 'pointer',
		background: colors.white,
		outline: '0',
		border: `1px solid ${colors.grayExtremeLight}`
	},
	dropdownContentHide: {
		display: 'none'
	},
	dropdownContentOpen: {
		display: 'block',
		listStyle: 'none',
		width: '100px',
		marginTop: '5px',
		boxShadow: '0 18px 12px -11px rgba(0, 0, 0, .1)',
		border: `1px solid ${colors.grayExtremeLight}`
	},
	dropdownItem: {
		height: '40px'
	},
	dropdownItemLink: {
		textDecoration: 'none',
		color: colors.dark,
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		transition: 'all .2s cubic-bezier(.694,.0482,.335,1)',
		':hover': {
			background: colors.grayExtremeLightest
		}
	},
	btnList: {
		listStyle: 'none',
		display: 'flex',
		border: `1px solid ${colors.grayExtremeLight}`
	},
	btn: {
		padding: '8px',
		width: '40px',
		height: '40px',
		fontSize: `${appStyles.largeFontSize}px`
	},
	activePageLink: {
		...basePageLink,
		background: colors.blue,
		color: colors.white
	},
	navPageLink: {
		...basePageLink,
		color: colors.blue
	},
	normalPageLink: {
		...basePageLink,
		color: colors.dark
	},
	disabledPageLink: {
		...basePageLink,
		cursor: 'not-allowed',
		color: colors.grayLight
	}
})
