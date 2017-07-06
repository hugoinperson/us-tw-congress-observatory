import colors from './colors.css'

const app = {
	appHeaderHeight: 60,
	// unit: px
	appHeaderZIndex: 100,
	// integer
	appBodyZIndex: 10,
	// integer
	modalMinWidth: 1400,
	// unit: px
	appSideMenuWidth: 100,
	// unit: px
	appPushOverlayPct: 10,
	// unit: %, when current page gets pushed away, there will be 10% content left within the viewing window
	appPushTransitionDuration: 0.6,
	// unit: s,
	appPushTransition: 'cubic-bezier(0.46, 0.03, 0.52, 0.96)',
	// transition config for pushable's animation
	appBodyBkgrdColor: colors.white,
	// the background color for pushable's 'pushContent'
	largeScreenSize: 1824,
	// pre-defined size for large device
	medianScreenSize: 1424,
	// pre-defined size for median device
	smallScreenSize: 1024
	// pre-defined size for small device
}

const page = {
	pagePadding: 6,
	// unit: em
	pageHeaderHeight: 120,
	// unit: px, the page header section has the same height as the side menu button
	pageHeaderTitleSize: 32,
	// unit: px
	pageHeaderTitleWeight: 500,
	//
	pageHeaderTitleColor: colors.grayDarkest,
	//
	pageHeaderSubTitleSize: 20,
	// unit: px
	pageHeaderSubTitleWeight: 300,
	//
	pageHeaderSubTitleColor: colors.grayLight,
	//
	pageBodyMinHeight: 300,
	// unit: px
	pageNavBtnSize: 16,
	// unit: px
	pageNavItemInterval: 20,
	// unit: px, the distance between objects in the page navigation section
	pageNavTextColor: colors.grayLight,
	//
	pageActionBtnSize: 14
	// unit: px
}

const font = {
	h1FontSize: 42,
	// unit: px
	h2FontSize: 36,
	// unit: px
	h3FontSize: 30,
	// unit: px
	h4FontSize: 24,
	// unit: px
	h5FontSize: 18,
	// unit: px
	baseFontSize: 12,
	// unit: px
	largeFontSize: 14,
	// unit: px
	largerFontSize: 16,
	// unit: px
	smallFontSize: 10
	// unit: px
}

export default {
	...app,
	...page,
	...font
}
