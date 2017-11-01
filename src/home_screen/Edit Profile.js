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
  Alert
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob'
import { FormInput, FormLabel } from 'react-native-elements';
import Animation from 'lottie-react-native';
import Modal from 'react-native-modalbox';
import firebase from '../../components/Firebase';
import styles from '../../components/style.js';

    const database = firebase.database();
    const auth = firebase.auth();
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
      data: {},
      image: '',
      fname: '',
      lname: '',
      email: '',
      password: '',
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
      this.setState({
        data: data,
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        password: data.password,
        image: data.profileimg,

     })
      console.log(this.state.data)
    })
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
      this.refs.modal1.open()
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
      this.setState({ 
        image: url,
       })
      firebase.auth().currentUser.updateProfile({
        photoURL: url
      })
      database.ref('users').child(this.state.userData.uid).update({
        profileimg: url
      })
      this.refs.modal1.close()
    })
    .catch((e) => {
      alert(e)
    })
  });
  }

  onSave(){
    this.refs.modal1.open();
    database.ref('users').child(this.state.userData.uid).update({
      name: `${this.state.fname} ${this.state.lname}`,
      password: this.state.password,
      email: this.state.email,
      profileimg:this.state.image,
    }).then(() => {      
    Alert.alert('Success Update Profile')
    this.refs.modal1.close();
    })
    auth.currentUser.updatePassword(this.state.password).then(() => {
    })
    .catch((e) => {
      console.log(e)
    })
  }

	render(){
		let data = this.state;
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
              source={{uri: data.image === '' ? avatar : data.image }}
              />
      </TouchableOpacity>

				<View style={styles.startContainer}>
					<FormLabel> FIRST NAME </FormLabel>
          <FormInput
            value={data.fname}
            style={styles.defaultForm}
            onChangeText={(fname) => this.setState({fname})}
          />

          <FormLabel> LAST NAME </FormLabel>
          <FormInput
            value={data.lname}
            style={styles.defaultForm}
            onChangeText={(lname) => this.setState({lname})}
          />

          <FormLabel> EMAIL </FormLabel>
          <FormInput
            value={data.email}
            style={styles.defaultForm}
            onChangeText={(email) => this.setState({email})}
          />

          <FormLabel> PASSWORD </FormLabel>
          <FormInput
            value={data.password}
            style={styles.defaultForm}
            onChangeText={(password) => this.setState({password})}
            secureTextEntry
          />

				</View>

        <TouchableOpacity
          onPress={() => this.refs.modal1.open()}
          style={styles.defaultButton}>
          <Text style={styles.textDefaultButton}> Save </Text>
        </TouchableOpacity>

        <Modal
            style={styles.modal}
            ref={"modal1"}
            backdropPressToClose={false}
            backdropOpacity={0.5}
            swipeToClose={false}>
                <Animation
                    ref={animation => {
                      this.animation = animation;
                    }}
                    style={{
                      width: 200,
                      height: 100
                    }}
                    loop={true}
                    source={require('../../components/animations/preloader.json')}
                />
          </Modal>

		</View>
		)
	}
}