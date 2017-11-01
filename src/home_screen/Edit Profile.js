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

  onImage(){
    ImagePicker.openPicker({
    cropping: true
  }).then(image => {
    const imagePath = image.path;
    let uploadBlob = null
    const imageRef = firebase.storage().ref('Profile').child(`${this.state.data.key}/dp`)
    let mime = 'image/jpg';
    fs.readFile(imagePath, 'base64')
    .then((data) => {
      return Blob.build(data, { type: `${mime};BASE64` })
    })
    .then((blob) => {
      uploadBlob = blob;
      return imageRef.put(blob, { contentType: mime })
    })
    .then(() => {
      uploadBlob.close()
      return imageRef.getDownloadURL()
    })
    .then((url) => {
      this.setState({ data: {
        profileimg: url
        }
      })
      firebase.auth().currentUser.updateProfile({
        photoURL: url
      })
      database.ref('users').child(this.state.userData.uid).update({
        profileimg: url
      })
    })
    .catch((e) => {
      alert(e)
    })
  });
  }

  componentWillMount(){
    this.setState({loading:true})
    AsyncStorage.getItem('userData').then((user) => {
      let userData = JSON.parse(user)
      this.setState({ 
        userData: userData,
        loading: false
       })
      let { params } = this.props.navigation.state;
      let data =params.data;
      this.setState({ data: data })
      console.log(this.state.data)
    })
  }

	render(){
		let data = this.state.data;
    const avatar = "http://www.nowseethis.org/avatars/default/missing.gif";
  	console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
		return(
		<View style={styles.container}>
      <TouchableOpacity
        onPress={this.onImage.bind(this)}
      >
      <Image
              style={[styles.profileimg,{right:0,bottom:0}]}
              source={{uri: data.profileimg === '' ? avatar : data.profileimg }}
              />
      </TouchableOpacity>

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