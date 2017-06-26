import React from 'react'
import { ApolloClient, createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import ConfigureStore from './ConfigureStore'
import routes from './AppRoutes'
import appConfig from '../../../app.config'

const networkInterface = createNetworkInterface({
	uri: appConfig.graphqlServer.url
})

const client = new ApolloClient({
	networkInterface,
	dataIdFromObject: record => {
		if (record.id && record.__typename) {
			return record.__typename + record.id
		}
		// Make sure to return null if this object doesn't have an ID
		return null
	}
})

let initialState = {}
// TODO: load initial state here if server-side rendering is performed

const store = ConfigureStore(initialState, client, browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

// TODO:
// the random key attribute in the Router is a hacky way to enable
// react-hot-loader work with react-router's dynamic route.
// Every time a new update recieved, a different component is mounted.
// Therefore, the redux store value will be reset.
//
// https://github.com/gaearon/react-hot-loader/issues/249#issuecomment-214819424
class App extends React.Component {
	render () {
		console.log(routes)
		return (
			<ApolloProvider store={store} client={client}>
				<Router history={history} routes={routes} key={Math.random()} />
			</ApolloProvider>
		)
	}
}

export default App
