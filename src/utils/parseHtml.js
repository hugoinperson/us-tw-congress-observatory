var escape = document.createElement('textarea')

export const escapeHTML = html => {
	escape.textContent = html
	return escape.innerHTML
}

export const unescapeHTML = html => {
	escape.innerHTML = html
	return escape.textContent
}
