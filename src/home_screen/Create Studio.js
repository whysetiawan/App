import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  AsyncStorage,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from '../../components/style.js';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob'
import { FormInput, FormLabel } from 'react-native-elements';
import Animation from 'lottie-react-native';
import firebase from '../../components/Firebase';

    const database = firebase.database();
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob

export default class TabDemo extends Component {
  constructor(){
    super();
    this.state = {
      userData: {},
      loading:false,
      data: {}
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
    })
  }

	render(){
		let data = this.state.data;
    const avatar = "http://www.nowseethis.org/avatars/default/missing.gif";
  	console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
		return(
		<View style={styles.container}>
				<View style={styles.startContainer}>
					<FormLabel> FIRST NAME </FormLabel>
          <FormInput
            value={data.fname}
            style={styles.defaultForm}
            onChangeText={(fname) => this.setState({data : {fname}})}
          />

          <FormLabel> LAST NAME </FormLabel>
          <FormInput
            value={data.lname}
            style={styles.defaultForm}
            onChangeText={(lname) => this.setState({data : {lname}})}
          />

          <FormLabel> EMAIL </FormLabel>
          <FormInput
            value={data.email}
            style={styles.defaultForm}
            onChangeText={(email) => this.setState({data : {email}})}
          />

          <FormLabel> PASSWORD </FormLabel>
          <FormInput
            value={data.password}
            style={styles.defaultForm}
            onChangeText={(password) => this.setState({data : {password}})}
            secureTextEntry
          />

				</View>
		</View>
		)
	}
}