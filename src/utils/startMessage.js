/* eslint-disable no-console */

import {chalkSuccess} from './chalkConfig'

const successMessage = {
	local: 'Starting app in local mode...',
	development: 'Starting app in dev mode...',
	staging: 'Starting app in staging mode...',
	production: 'Starting app in prod mode...'
}

console.log(chalkSuccess(successMessage[process.env.NODE_ENV]))
