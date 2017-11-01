import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import styles from '../../components/style.js';
import { FormInput } from 'react-native-elements';

export default class Index extends Component {
	render(){
  		console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
		return(
		<View style={styles.container}>
			<View style={styles.startContainer}>
			<Text style={styles.indexTitle}> Welcome </Text>
			</View>
		</View>
		)
	}
}