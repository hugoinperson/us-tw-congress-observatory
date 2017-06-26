import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const rootReducer = (apolloClient) => combineReducers({
	apollo: apolloClient.reducer(),
	routing: routerReducer
})

export default rootReducer
