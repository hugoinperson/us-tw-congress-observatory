// import constants from './Constants'

class TableDataStore {
	constructor (data) {
		this.data = data
		this.pageObj = {}
	}

	setProps (props) {
		this.pagination = props.pagination
	}

	clean () {
		this.pageObj = {}
	}

	setData (data) {
		this.data = data
	}

	page (page, pageSize) {
		this.pageObj.endIndex = page * pageSize - 1
		this.pageObj.startIndex = this.pageObj.endIndex - (pageSize - 1)
		return this
	}

	getCurrentVisibleData () {
		// TODO: get filterred data here, if implemented filtering
		return this.data
	}

	get () {
		const visibleData = this.getCurrentVisibleData()
		if (!this.pagination) return visibleData
		return visibleData.filter((data, index) => {
			return index >= this.pageObj.startIndex && index <= this.pageObj.endIndex
		})
	}

	getVisibleDataSize () {
		return this.getCurrentVisibleData().length
	}

	isEmpty () {
		return this.data.length === 0 ||
			this.data === null ||
			this.data === undefined
	}
}

export default TableDataStore
