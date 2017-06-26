import PropTypes from 'prop-types'

const RootLayout = (props) => props.children

RootLayout.propTypes = {
	children: PropTypes.node.isRequired
}

export default RootLayout
