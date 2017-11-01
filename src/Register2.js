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
import { FormInput, FormLabel, FormValidationMessage, } from 'react-native-elements';

const auth = firebase.auth();
const database = firebase.database();

export default class Index extends Component {
	constructor(){
		super();
		this.state = {
			email: '',
			password: '',
			process: true,
			error: '',
			epassword: '',
		}
	}

	componentWillMount(){
		AsyncStorage.getItem('userBio').then((userBio) => {
			let userData = JSON.parse(userBio)
			console.log(userData)
		})
	}

	onRegister(){
		let userBio = {
			email: this.state.email,
			password: this.state.password,
		}
		if (!this.validateEmail(this.state.email)) {
		  this.setState({ error: 'Please input email correctly' })
		}
		else {
		AsyncStorage.mergeItem('userBio', JSON.stringify(userBio)).then(() => {
			this.props.navigation.navigate('Register3');
		})
	}
	}

	validateEmail(email){
  	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
	};	

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
				<Text style={styles.indexTitle}> Your Email and Password? </Text>
				<FormLabel style={styles.label}> EMAIL </FormLabel>
				<FormInput
				  style={styles.defaultForm}
				  onChangeText={(email) => this.setState({email})}
				/>
				<FormValidationMessage>{this.state.error}</FormValidationMessage>

				<FormLabel> PASSWORD </FormLabel>
				<FormInput
				  style={styles.defaultForm}
				  onChangeText={(password) => this.setState({password})}
				  secureTextEntry
				/>
				<FormValidationMessage>{this.state.epassword}</FormValidationMessage>

			</View>

			<View style={styles.footer}>
				{this.state.email && this.state.password !== "" ? active : disabled}
			</View>
		</View>
		)
	}
}