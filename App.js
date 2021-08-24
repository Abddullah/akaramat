import React, { Component } from 'react';
// import Appp from './src/Appp';
import { Provider } from 'react-redux';
import store from './src/Store';
import Route from './src/navigation/Routes';
import { ImagePicker, FileSystem, DocumentPicker } from 'expo';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Image, StatusBar, ScrollView, ListView,
  RefreshControl, Picker, ActivityIndicator,
  TouchableHighlight, Alert, TextInput, UselessTextInput, Switch
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Item, Input, CheckBox, DatePicker } from 'native-base';
import { connect, } from "react-redux";
import axios from 'axios'
export default class App extends React.Component {

  componentWillMount() {
    console.disableYellowBox = true
  }
  render() {
    return (
      <Provider store={store}>
        <Route />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


class AddProperty extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //AD PROPERTY STATES TEST

      // title: "image test with new app",
      // description: "testing",
      // category: "apartment",
      // phone: "03452153709",
      // state: "170",
      // city: "171",
      // address: "786",
      // latitude: "786",
      // longitude: "786",
      // suitable_categories: [786],
      // home_size: "786",
      // home_size_unit: "786",
      // rent_price: "786",
      // rent_price_unit: "786",
      // total_price: "786",
      // price_per_unit: "786",
      // price_unit: "786",
      // baths: "2",
      // beds: "2",

      //AD TASK STATES TEST

      title: "image test with new app",
      description: "testing",
      type: "lawyer",
      budget_price: "123",
      address: "123",
      state: "170",
      city: "171",
    }
  }

  // _pickDocument = () => {
  //   var result = DocumentPicker.getDocumentAsync()
  //   result.then((res) => {
  //     if (res.type === 'success') {
  //       console.log(res)
  //       var lastIndex = res.name.lastIndexOf('.')
  //       var ext = res.name.slice(lastIndex + 1)
  //       if (ext === 'png' || ext === 'jpg' || ext === 'jpeg') {
  //         alert("Only (doc|docx|pdf) files allow")
  //       } else {
  //         this.setState({
  //           brochure_file: res.uri,
  //           uploadAddName: res.name.slice(0, lastIndex) + "." + ext,
  //           uploadType: `application/${ext}`
  //         })
  //       }
  //     }
  //   })
  // }

  featuredimage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });
    console.log(result, "result");
    if (!result.cancelled) {
      this.getFileSize(result.uri).then((size) => {
        let inkb = size / 1024
        let inMb = inkb / 1024
        console.log(inMb, "size")
        if (inMb < 2) {
          this.setState({ featuredimage: result.uri });
        }
        else {
          alert("Image size to large")
        }
      })
    }


  }

  getFileSize = async fileUri => {
    let fileInfo = await FileSystem.getInfoAsync(fileUri);
    return fileInfo.size;
  };


  addPost() {
    let bodyFormData = new FormData();

    // if (this.state.featuredimage) {
    //   // featuredimage
    //   let localUri = this.state.featuredimage;
    //   let filename = localUri.split('/').pop();
    //   // Infer the type of the image
    //   let match = /\.(\w+)$/.exec(filename);
    //   let type = match ? `image/${match[1]}` : `image`;
    //   // Upload the image using the fetch and FormData APIs
    //   // Assume "photo" is the name of the form field the server expects
    //   bodyFormData.append('gallery_photos[0]',
    //     { uri: localUri, name: filename, type });


    //   // let uriPartsProfile = this.state.featuredimage.split('.');
    //   // let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
    //   // bodyFormData.append('property_featured_img', {
    //   //     uri: this.state.featuredimage,
    //   //     name: `photo.${fileTypeProfile}`,
    //   //     type: `image/${fileTypeProfile}`,
    //   // });
    // }

    if (this.state.featuredimage) {
      let uriPartsProfile = this.state.featuredimage.split('.');
      let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
      bodyFormData.append('gallery_photos[0]', {
        uri: this.state.featuredimage,
        name: `photo.${fileTypeProfile}`,
        type: `image/${fileTypeProfile}`,
      });
    }
    for (var key in this.state) {
      if (key !== "featuredimage") {
        if (this.state[key] && this.state[key] !== undefined && this.state[key].length !== 0) {
          if (Array.isArray(this.state[key])) {
            var arr = this.state[key];
            for (var i = 0; i < arr.length; i++) {
              bodyFormData.append(key + "[]", arr[i]);
            }
          }
          else {
            bodyFormData.append(key, this.state[key]);
          }
        }
      }
    }
    delete 'featuredimage' in bodyFormData
    console.log(bodyFormData, "body")

    urlm = 'https://demo.akaratmisr.com:443/en/api/task/user/addTask'
    let options = {
      method: 'POST',
      url: urlm,
      headers:
      {
        token: 'bearer 9b8e82a51361a8b7ec28ed51684e42d6',
        clientsecret: '(*jh2kj36gjhasdi78743982u432j',
        clientkey: '34532hbjdsakjd2&&gjhjh11',
        'content-type': 'form-data',
      },

      data: bodyFormData
    };
    console.log(bodyFormData, '****61');
    axios(options)
      .then((data) => {
        console.log(data, "data")
        alert(JSON.stringify(data.data.message))
      }).catch((err) => {
        console.log(err)
        alert(JSON.stringify(err.response.data.message))
        console.log(JSON.parse(JSON.stringify(err)), 'ERRROR')
      })

  }



  render(
  ) {
    console.log(this.state, "states")
    return (
      <View>
        <Text>TESTING</Text>
        <View style={{ marginTop: 15, height: 70, width: "90%", flexDirection: "row", borderWidth: 1, borderColor: "#1E90FF", borderRadius: 0, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
          <View style={{ width: "40%", marginVertical: 0, }}>
            {
              (this.state.featuredimage) ? (
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", marginHorizontal: "10%", marginVertical: 5, flexWrap: "wrap" }}>
                  <Text style={{ fontWeight: "bold", fontSize: 10 }}>{this.state.featuredimage}</Text>
                </View>
              )
                : <Text style={{ color: "black", fontWeight: "bold" }}>fEATUREIMAGE</Text>
            }
          </View>

          <View style={{ width: "40%", height: 40, marginVertical: 50, justifyContent: "center", alignItems: "center", }}>
            <TouchableOpacity onPress={this.featuredimage} style={{ backgroundColor: "green", height: 40, width: "90%", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 10 }}>fEATUREIMAGE</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={{
            marginTop: 25,
            width: "90%",
            height: 35,
            borderWidth: 1,
            borderRadius: 0,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: "5%"
          }}
          onPress={this.addPost.bind(this)}
        >
          <Text>POST</Text>
        </TouchableOpacity>

      </View>
    )
  }


}