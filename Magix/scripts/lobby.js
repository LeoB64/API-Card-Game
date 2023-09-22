const applyStyles = iframe => {
	let styles = {
		fontColor : "#333",
		backgroundColor : "rgba(87, 41, 5, 0.2)",
		fontGoogleName : "Sofia",
		fontSize : "20px",
	}
	
	iframe.contentWindow.postMessage(JSON.stringify(styles), "*");	
}
