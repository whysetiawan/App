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

	onSubmit(){
		this.setState({ process: true})
		auth.sendPasswordResetEmail(this.state.email).then(() => {
			alert('Please Check Your Email')
			this.setState({ process: false })
			this.refs.modal1.close()
			this.props.navigation.navigate('Login')
		})
		.catch((e) => {
			alert(e)
			this.setState({ process: false })
			this.refs.modal1.close()
		})
	}

	render(){
  		console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
		return(
		<View style={styles.container}>
			<View style={styles.startContainer}>
				<Text style={styles.indexTitle}> Forgot Password </Text>
				<FormLabel style={styles.label}> EMAIL </FormLabel>
				<FormInput
				  style={styles.defaultForm}
				  onChangeText={(email) => this.setState({email})}
				/>
			</View>

				<TouchableOpacity
				  onPress={() => this.refs.modal1.open()}
				  style={styles.defaultButton}>
					<Text style={styles.textDefaultButton}> Submit </Text>
				</TouchableOpacity>
			<Modal
	          style={styles.modal}
	          ref={"modal1"}
	          backdropPressToClose={false}
	          backdropOpacity={0.5}
	          swipeToClose={false}
	          onOpened={this.onSubmit.bind(this)}>
	        			<Animation
				            ref={animation => {
				              this.animation = animation;
				            }}
				            style={{
				              width: 200,
				              height: 100
				            }}
				            loop={true}
				            source={require('../components/animations/preloader.json')}
				        />
	        </Modal>
		</View>
		)
	}
}