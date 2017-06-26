// eslint-disable-line global-require
import { createStore, compose, applyMiddleware } from 'redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import AppReducer from './AppReducer'

function configureStoreLocal (initialState, apolloClient, browserHistory) {
	const middlewares = [
		apolloClient.middleware(),
		routerMiddleware(browserHistory),
		// middleware to capture routing actions and redirect them to your history instance
		reduxImmutableStateInvariant(),
		// Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
		thunk,
		// thunk middleware can also accept an extra argument to be passed to each thunk action
		// https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
		createLogger()
		// Logger for Redux
		// logger must be the last middleware in chain, otherwise it will log thunk and promise, not actual actions
	]

	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
	// add support for Redux dev tools

	const store = createStore(
		AppReducer(apolloClient),
		initialState,
		composeEnhancers(
			applyMiddleware(...middlewares)
		)
	)

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./AppReducer', () => {
			const nextReducer = require('./AppReducer').default
			store.replaceReducer(nextReducer)
		})
	}

	return store
}

function configureStoreDev (initialState, apolloClient, browserHistory) {
	const middlewares = [
		apolloClient.middleware(),
		routerMiddleware(browserHistory),
		reduxImmutableStateInvariant(),
		thunk,
		createLogger()
	]

	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

	return createStore(
		AppReducer(apolloClient),
		initialState,
		composeEnhancers(
			applyMiddleware(...middlewares)
		)
	)
}

function configureStoreProd (initialState, apolloClient, browserHistory) {
	const middlewares = [
		apolloClient.middleware(),
		routerMiddleware(browserHistory),
		thunk
	]

	return createStore(
		AppReducer(apolloClient),
		initialState,
		compose(
			applyMiddleware(...middlewares)
		)
	)
}

const configureStore = {
	local: configureStoreLocal,
	development: configureStoreDev,
	staging: configureStoreProd,
	production: configureStoreProd
}

export default configureStore[process.env.NODE_ENV]
