import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import styles from '../components/style';
import firebase from '../components/Firebase';

import Icon from 'react-native-vector-icons/Ionicons';
import { FormInput, FormLabel } from 'react-native-elements';

const auth = firebase.auth();
const database = firebase.database();

export default class Index extends Component {
	constructor(){
		super();
		this.state = {
			fName: '',
			lName: '',
			process: true
		}
	}

	onRegister(){
		let userBio = {
			firstName: this.state.fName,
			lastName: this.state.lName,
		}
		AsyncStorage.setItem('userBio', JSON.stringify(userBio)).then((user) => {
			this.props.navigation.navigate('Register2');
		})
	}

	render(){
  		console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
		const active = (
				<TouchableOpacity
				  onPress={this.onRegister.bind(this)}
				>
					<Icon name='ios-arrow-dropright-outline' size={50} color='#000000' style={{marginLeft:30, marginRight: 10,}}/>
				</TouchableOpacity>
			)
		const disabled = (
				<TouchableOpacity
				  disabled={true}
				  onPress={this.onRegister.bind(this)}
				>
					<Icon name='ios-arrow-dropright-outline' size={50} color='#000000' style={{marginLeft:30, marginRight: 10, backgroundColor:'#808080'}}/>
				</TouchableOpacity>
			)
		return(
		<View style={styles.container}>
			<View style={styles.startContainer}>
				<Text style={styles.indexTitle}> What's Your Name? </Text>
				<FormLabel style={styles.label}> FIRST NAME </FormLabel>
				<FormInput
				  style={styles.defaultForm}
				  onChangeText={(fName) => this.setState({fName})}
				/>

				<FormLabel> LAST NAME </FormLabel>
				<FormInput
				  style={styles.defaultForm}
				  onChangeText={(lName) => this.setState({lName})}
				/>

			</View>

			<View style={styles.footer}>
				{this.state.fName && this.state.lName !== "" ? active : disabled}
			</View>
		</View>
		)
	}
}