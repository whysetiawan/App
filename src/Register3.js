import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  Picker
} from 'react-native';
import styles from '../components/style';
import firebase from '../components/Firebase';

import Animation from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FormInput, FormLabel } from 'react-native-elements';

const auth = firebase.auth();
const database = firebase.database();

export default class Index extends Component {
	constructor(){
		super();
		this.state = {
			status: 'Guest',
			process: false,
			userBio: {}
		}
	}

	componentWillMount(){
		AsyncStorage.getItem('userBio').then((userBio) => {
			let userData = JSON.parse(userBio)
			this.setState({ userBio: userData })
		})
	}

	onRegister(){
		this.setState({ process: true })
		const userData = this.state.userBio;
		auth.createUserWithEmailAndPassword(userData.email,userData.password).then((user) => {
			database.ref(`users/${user.uid}`).set({
				name: `${userData.firstName} ${userData.lastName}`,
				email: userData.email,
				password: userData.password,
        		profileimg: '',
        		status: this.state.status
			})
				user.updateProfile({
					displayName: `${userData.firstName} ${userData.lastName}`,
				})
				user.sendEmailVerification();
				alert("Succes Register, Check Your Email For Verification")
				this.props.navigation.navigate('Login')
				this.setState({ process: false })
		})
		.catch((e) => {
			alert(e);
		})
	}

	render(){
		console.log(this.state.userBio)
  		console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
		const owner = (
				<Text> If you are an owner. You can register your studio, and your studio will be advertised </Text>
			);
		const guest = (
				<Text> You can only rent studio. </Text>
			);
		return(
		<View style={styles.container}>
			<View style={styles.startContainer}>

				<Text style={styles.indexTitle}> Who are you? </Text>

				<View style={styles.pickerCenter}>
					<Picker
					 style={styles.pickerStyle}
					 mode='dropdown'
					 selectedValue={this.state.status}
					 onValueChange={(itemValue, itemIndex) => this.setState({status: itemValue})}
					 enabled={true}
					>
						<Picker.Item label="Owner" value="Owner"/>
						<Picker.Item label="Guest" value="Guest"/>
					</Picker>
				</View>
			</View>

				{this.state.status === "Owner" ? owner: this.state.status === "Guest" ? guest : console.log('error')}

				<TouchableOpacity
				  onPress={this.onRegister.bind(this)}
				  style={styles.defaultButton}>
					{this.state.process === true ? 
						<Animation
				            ref={animation => {
				              this.animation = animation;
				            }}
				            style={{
				              width: 80,
				              height: 80
				            }}
				            loop={true}
				            source={require('../components/animations/loading_animation.json')}
				        />
				        :
				        <Text style={styles.textDefaultButton} > Register </Text>}
				</TouchableOpacity>

		</View>
		)
	}
}