import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		alignItems: 'center',
		justifyContent: 'center'
	},
	startContainer: {
		alignSelf: 'flex-start'
	},
	indexTitle: {
		fontSize: 28,
		color: '#222',
		fontWeight: 'bold'
	},
	defaultButton: {
		width: 340,
		height: 60,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1.7,
		borderRadius: 26,
		borderColor: '#222',
		margin: 10
	},
	textDefaultButton: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#222',
	},
	defaultForm: {
		color: '#222',
		width: 380,
		height: 50,
		fontSize: 16,
	},
	footer: {
		alignSelf: 'flex-end',
		justifyContent: 'flex-end',
		top: 140,
		right: 30
	},
	pickerCenter: {
		left: 30,
		marginLeft:30,
		marginTop:20,
	},
	modal : {
		alignItems: 'center',
		justifyContent: 'center',
		height: 200,
		width: 200
	},
	startContainerRow : {
		alignSelf: 'flex-start',
		flexDirection: 'row',
		width: 420,
		justifyContent: 'space-between',
	},
	normalText: {
		color: '#222',
	},
	profileimg: {
		width: 100,
		height: 100,
		borderRadius: 50,
		right: 20,
		bottom:35
	},
	editprofileimg: {
		width: 100,
		height: 100,
		borderRadius: 50,
	}
})

export default styles;