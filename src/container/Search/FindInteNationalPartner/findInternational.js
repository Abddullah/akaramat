
import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Image, StatusBar, ScrollView, ListView,
  RefreshControl, Picker, ActivityIndicator,
  TouchableHighlight, Alert, TextInput, UselessTextInput, Switch
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Item, Input, CheckBox, DatePicker } from 'native-base';
import { connect, } from "react-redux";
import axios from 'axios';
import IconFontFontFoundation from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
// import { TextField } from 'react-native-material-textfield';
import * as Animatable from 'react-native-animatable';
import MultiSelect from 'react-native-multiple-select';
import { setStepsForAddProperties } from '../../../Store/Action/action'
import Textarea from 'react-native-textarea';
import MapDirection from '../../../Component/map'
import ImagePicker1 from '../../../Component/ImagePicker';
import SwitchButton from '../../../Component/switchButton';
import { DocumentPicker, ImagePicker } from 'expo';
import Modal from "react-native-modal";



class FindInternational extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaderFlag: false,
      submitFlag: false,
      //state and cities
      countryFromApi: [],
      selectedCountry: "",

    }
  }


  componentWillMount() {
    this.setState({
      token: this.props.userCredentials.token,
    })
    this.getCountry(this)

  }

  getCountry() {
    return axios({
      method: 'get',
      // url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/country_code",
      url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/countries/all",
      headers: {
        "clientkey": "34532hbjdsakjd2&&gjhjh11",
        "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
      },
    })
      .then(data => {
        let state = data.data.results
        console.log(state, "state")
        this.setState({
          countryFromApi: state
        })
      })
      .catch(err => {
        console.log(err)
      })
  }



  dropDownChangeState = (itemValue, itemIndex) => {
    console.log(itemValue, itemIndex, "itemValue")
    if (itemValue) {
      this.setState({
        selectedCountry: itemValue,
      })
    }
  }

  addPost() {
    this.setState({
      loaderFlag: !this.state.loaderFlag
    })
    cloneData = {
      name: this.state.name,
      country: this.state.selectedCountry,
    }

    var bodyFormData = new FormData();
    for (var key in cloneData) {
      if (cloneData[key] && cloneData[key] !== undefined && cloneData[key].length !== 0) {
        bodyFormData.append(key, cloneData[key]);
      }
    }
    bodyFormData.append("limit", "10");
    bodyFormData.append("offset", "0");
    var options = {
      method: 'POST',
      url: 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/people/guest/getInternationalSearch',
      headers:
      {
        token: "bearer " + this.state.token,
        'postman-token': '553d07fc-3950-1199-efd9-6b5b5f8315a2',
        'cache-control': 'no-cache',
        clientsecret: '(*jh2kj36gjhasdi78743982u432j',
        clientkey: '34532hbjdsakjd2&&gjhjh11',
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        "Allow-Cross-Origin": '*',
      },
      data: bodyFormData
    };
    console.log(bodyFormData, '****61', cloneData);
    axios(options)
      .then((data) => {
        let responseAPI = data.data.results
        console.log(responseAPI, "data")
        // Actions.SecondPageList({ RepreSearch: responseAPI, keywords: cloneData })
        this.setState({
          loaderFlag: !this.state.loaderFlag
        })
      }).catch((err) => {
        alert(JSON.stringify(err.response.data.message))
        console.log(JSON.parse(JSON.stringify(err)), 'ERRROR')
        this.setState({
          loaderFlag: !this.state.loaderFlag
        })
      })
  }

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        // backgroundColor: '#808080',
        backgroundColor: "white",
        width: "100%",

      }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", }}>
          <ScrollView contentContainerStyle={styles.contentContainer} style={{ width: "100%", }}>
            <View style={{ width: "90%", marginHorizontal: "5%", justifyContent: "center", alignItems: "center", }}>
              {/* Title */}
              <View style={{ marginTop: 10 }}>
                <Item style={styles.input}>
                  <Input
                    // keyboardType={"number"}
                    placeholder={this.props.str.name}
                    placeholderStyle={{ fontSize: 10 }}
                    placeholderTextColor="#b3b3b3"
                    label={this.props.str.name}
                    style={{ fontSize: 16 }}
                    onChangeText={(e) => { this.setState({ name: e }) }}
                    value={this.state.name}
                  />
                  <IconFontAwesome name='users' style={{ marginRight: 10, fontSize: 15, color: "#1E90FF" }} />
                </Item>

                {/* Input State or City */}
                {
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Item>
                      <Picker
                        mode="dropdown"
                        style={{ height: 50, width: "90%", color: "black" }}
                        placeholderStyle={{ color: "#E94E1C" }}
                        placeholderIconColor="#E94E1C"
                        selectedValue={this.state.selectedCountry}
                        onValueChange={
                          (itemValue) => this.dropDownChangeState(itemValue)
                        }
                      >
                        <Picker.Item label={this.props.str.selectcountry} value="" />
                        {
                          Object.keys(this.state.countryFromApi).map((key, index) => {
                            return (
                              <Picker.Item label={this.state.countryFromApi[key]} value={key} key={index} />
                            )
                          })
                        }
                      </Picker>
                    </Item>
                  </View>
                }


              </View>
              {
                (this.state.loaderFlag != true) ? (
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
                    <Text>{this.props.str.search}</Text>
                  </TouchableOpacity>
                ) : <ActivityIndicator style={{ top: 20, marginBottom: 20 }} />
              }

            </View>
          </ScrollView>
        </View>
      </View >
    );
  }
}


let mapStateToProps = state => {
  return {
    str: state.root.str,
    userCredentials: state.root.userCredentials,
    userDetails: state.root.userDetails,
  };
};
function mapDispatchToProps(dispatch) {
  return ({
    setStepsForAddProperties: (steps) => {
      dispatch(setStepsForAddProperties(steps))
    },
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(FindInternational);


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    // width:"100%"
  },
  textareaContainer: {
    height: 220,
    width: "110%",
    padding: 5,
    backgroundColor: '#F8F8F8',
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 16,
    color: '#333',
  },

  contentContainer: {
    paddingBottom: 40,

  },
  listView: {
    width: "100%", height: 35, marginTop: 10,
    borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC",
    justifyContent: 'center'
  },
  listText: {
    marginLeft: 10, color: "#000"
  },

  input: { justifyContent: 'center', alignItems: 'center', width: '90%', marginBottom: 12.5 },

});  
