import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  Button
} from 'react-native';
import styles from '../components/style';

import Animation from 'lottie-react-native';
import firebase from '../components/Firebase';
import Modal from 'react-native-modalbox';
import { FormInput, FormLabel } from 'react-native-elements';

const auth = firebase.auth();
const database = firebase.database();

export default class Index extends Component {
	constructor(){
		super();
		this.state = {
			email: '',
			password: '',
			process: false
		}
	}

	componentDidMount(){
		this.initAnimation();
	}

	initAnimation(){
    if (!this.animation){
      setTimeout(() => {
        this.initAnimation();
      }, 100);
    } else {
        this.animation.play();
    }
  }

	onLogin(){
		this.setState({ process: true})
		auth.signInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
			AsyncStorage.setItem('userData', JSON.stringify(user), (user) => {
				this.setState({ process: false })
			})
			this.props.navigation.navigate('Tab')
		})
		.catch((e) => {
			alert(e)
			this.setState({ process: false })
		})
	}

	render(){
  		console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
		return(
		<View style={styles.container}>
			<View style={styles.startContainer}>
				<Text style={styles.indexTitle}> Login </Text>
				<FormLabel style={styles.label}> EMAIL </FormLabel>
				<FormInput
				  style={styles.defaultForm}
				  onChangeText={(email) => this.setState({email})}
				/>

				<FormLabel> PASSWORD </FormLabel>
				<FormInput
				  style={styles.defaultForm}
				  onChangeText={(password) => this.setState({password})}
				  secureTextEntry
				/>

			</View>

				<TouchableOpacity
				  onPress={() => this.refs.modal1.open()}
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
					<Text style={styles.textDefaultButton}> Sign In </Text> }
				</TouchableOpacity>
			<Modal
	          style={styles.modal}
	          ref={"modal1"}
	          backdropPressToClose={false}
	          backdropOpacity={1.0}
	          swipeToClose={false}
	          onOpened={this.onLogin.bind(this)}>
	        			<Animation
				            ref={animation => {
				              this.animation = animation;
				            }}
				            style={{
				              width: 200,
				              height: 100
				            }}
				            loop={true}
				            source={require('../components/animations/loading_animation.json')}
				        />
	        </Modal>
		</View>
		)
	}
}