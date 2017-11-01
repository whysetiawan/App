import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  AsyncStorage,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../components/style.js';
import { FormInput, Avatar } from 'react-native-elements';
import Animation from 'lottie-react-native';
import firebase from '../../components/Firebase';

const database = firebase.database();

export default class TabDemo extends Component {
  constructor(){
    super();
    this.state = {
      userData: {},
      loading:false,
      email: '',
      password: '',
      fname: '',
      lname: '',
      profileimg: '',
      status: '',
      key: ''
    }
  }

  componentWillMount(){
    this.setState({loading:true})
    AsyncStorage.getItem('userData').then((user) => {
      let userData = JSON.parse(user)
      this.setState({ 
        userData: userData,
        loading: false
       })
      database.ref('users').child(`${userData.uid}`).on('value', (snap) => {
      	var full = `${snap.val().name}`;
      	var name = full.split(" ");
      	console.log(name)
        this.setState({ 
        	key: snap.key,
        	fname: name[0],
        	lname: name[1],
        	email: snap.val().email,
        	password: snap.val().password,
        	profileimg: snap.val().profileimg,
        	status: snap.val().status,
        })
      })
    })
  }

	render(){
		let data = this.state;
		console.log(this.state.userData)
    const avatar = "http://www.nowseethis.org/avatars/default/missing.gif";
  	console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
		return(
		<View style={styles.container}>
			<TouchableWithoutFeedback
				onPress={() => this.props.navigation.navigate('EditProfile', {data})}
			>
				<View style={styles.startContainer}>
					<Text style={styles.indexTitle}> {data.fname} </Text>
						<View style={styles.startContainerRow}>
							<Text style={styles.normalText}> View and edit profile </Text>
							<Image
							style={styles.profileimg}
							source={{uri: data.profileimg === '' ? avatar : data.profileimg }}
							/>
						</View>
				</View>
			</TouchableWithoutFeedback>
		</View>
		)
	}
}