import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import styles from '../../components/style.js';
import { FormInput } from 'react-native-elements';
import Animation from 'lottie-react-native';

export default class Index extends Component {

	componentDidMount() {
    this.animation.play();
	}

	render(){
  		console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
		return(
		<View style={styles.container}>
			<View style={styles.startContainer}>
			<Text style={styles.indexTitle}> Explore </Text>
				<Animation
				    ref={animation => {
				      this.animation = animation;
				    }}
				    style={{
				      width: 80,
				      height: 80
				    }}
				    loop={true}
				    source={require('../../components/animations/loading_animation.json')}
				/>
			</View>
		</View>
		)
	}
}