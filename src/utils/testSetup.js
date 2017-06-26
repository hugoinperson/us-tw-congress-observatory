import jsdom from 'jsdom'

const exposedProperties = ['window', 'navigator', 'document']
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')

global.document = doc
global.window = doc.defaultView
global.navigator = {
	userAgent: 'node.js'
}

Object.keys(document.defaultView).forEach((property) => {
	if (typeof global[property] === 'undefined') {
		exposedProperties.push(property)
		global[property] = document.defaultView[property]
	}
})
