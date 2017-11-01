import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import styles from '../components/style.js';
import { FormInput } from 'react-native-elements';

export default class Index extends Component {
	componentWillMount(){
		this.props.navigation.navigate('Tabs')
	}

	render(){
  		console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
		const {navigate} = this.props.navigation;
		return(
		<View style={styles.container}>
			<View style={styles.startContainer}>
			<Text style={styles.indexTitle}> Welcome </Text>
			</View>
				<TouchableOpacity
				  onPress={() => navigate('Login')}
				  style={styles.defaultButton}>
					<Text style={styles.textDefaultButton}> Login </Text>
				</TouchableOpacity>

				<TouchableOpacity
				  onPress={() => navigate('Register')}
				  style={styles.defaultButton}>
					<Text style={styles.textDefaultButton}> Create an Account </Text>
				</TouchableOpacity>
		</View>
		)
	}
}