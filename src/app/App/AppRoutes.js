// This routes config is using "plain route" style of react-router
// System.import() is deprecated and should use import() for async code splitting in Webpack2
// However, vscode doesn't support dynamic import right now
// 1) https://webpack.js.org/guides/code-splitting-async/#system-import-is-deprecated
// 2) https://github.com/ReactTraining/react-router/tree/v3/docs
// 3) https://brotzky.co/blog/code-splitting-react-router-webpack-2/
//
// TODO: change to 'import' instead of 'System.import' when vscode supports it
//
// TODO: add 'webpackChunkName' and 'webpackMode' when webpack supports it
//
// READ:
// 1) http://moduscreate.com/code-splitting-for-react-router-with-es6-imports/
//
// ISSUE: react-router's async components curretnly doesn't work with RHL 3.0 (react-hot-loader)
// https://github.com/dferber90/react-hot-boilerplate
//
// HACK:
// https://github.com/gaearon/react-hot-loader/issues/249#issuecomment-214819424

import AppLayout from './AppLayout'

// throws an error in the console if the page wasn't able to load
function errorLoading (error) {
	throw new Error(`Dynamic page loading failed: ${error}`)
}

// Loading modules!
function loadRoute (cb) {
	return module => cb(null, module.default)
}

const HomeRoute = {
	path: 'home',
	getComponent (location, cb) {
		System.import('../Main/HomePage').then(loadRoute(cb)).catch(errorLoading)
	}
}

const BillRoute = {
	path: ':billId',
	getComponent (location, cb) {
		System.import('../Bills/BillPage').then(loadRoute(cb)).catch(errorLoading)
	}
}

const BillsRoute = {
	path: 'bills',
	getComponent (location, cb) {
		System.import('../Bills/BillListPage').then(loadRoute(cb)).catch(errorLoading)
	},
	childRoutes: [
		BillRoute
	]
}

const VotesRoute = {
	path: 'votes',
	getComponent (location, cb) {
		System.import('../Votes/VoteListPage').then(loadRoute(cb)).catch(errorLoading)
	}
}

const MembersRoute = {
	path: 'members',
	getComponent (location, cb) {
		System.import('../Members/MemberListPage').then(loadRoute(cb)).catch(errorLoading)
	}
}

const NotFoundRoute = {
	path: '*',
	getComponent (location, cb) {
		System.import('../NotFound').then(loadRoute(cb)).catch(errorLoading)
	}
}

export default {
	path: '/',
	component: AppLayout,
	indexRoute: {
		onEnter: (nextState, replace) => replace('/home')
	},
	childRoutes: [
		// landing page
		HomeRoute,
		// taiwan-related bills
		BillsRoute,
		// congress members
		MembersRoute,
		// taiwan-related votes
		VotesRoute,
		// 404 not found
		NotFoundRoute
	]
}
