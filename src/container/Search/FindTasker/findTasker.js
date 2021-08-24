
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



class FindTasker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaderFlag: false,
      submitFlag: false,
      //state and cities
      stateFromApi: [],
      allCityFromApi: [],
      selectedState: "",
      districts: [],
      subdistricts: [],
    }
  }


  componentWillMount() {
    this.setState({
      token: this.props.userCredentials.token,
    })
    this.getCategoriesTasker(this)

    if (this.props.userDetails.user_type != 5) {
      this.getState(this)
    }
    else {
      this.getState(this)

      console.log(this.props.userDetails, "usedetail")

      // this.setState({
      //   selectedState: this.props.userDetails.state_work_in_format,
      //   allCityFromApi: this.props.userDetails.workin_city_format
      // })
    }
  }

  getCategoriesTasker() {
    return axios({
      method: 'get',
      url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/guest/getCategoriesTasker",
      headers: {
        "clientkey": "34532hbjdsakjd2&&gjhjh11",
        "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
      },
    })
      .then(data => {
        console.log(data, "data")
        this.setState({
          categoriesTasker: data.data.results,
        })
      })
      .catch(err => {
        console.log(err)
        alert(err.message)
        this.setState({
          err: err.message,
        })
      })
  }
  getState() {
    return axios({
      method: 'get',
      url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/states/1",
      headers: {
        "clientkey": "34532hbjdsakjd2&&gjhjh11",
        "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
      },
    })
      .then(data => {
        let state = data.data.results
        console.log(state, "state")
        this.setState({
          stateFromApi: state
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
        selectedState: itemValue,
        districts: [],
        subdistricts: [],
        selectedicanWorkState: [],
        selectedicanWorkCity: [],
        selectedicanWorkDistricts: []

      })
      uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/cities/" + itemValue
      return axios({
        method: 'get',
        url: uri,
        headers: {
          "clientkey": "34532hbjdsakjd2&&gjhjh11",
          "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
        },
      })
        .then(data => {
          let city = data.data.results
          this.setState({
            allCityFromApi: city
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  dropDownChangeCity = (itemValue, itemIndex) => {
    console.log(itemValue, itemIndex, "valueCities")
    if (itemIndex && itemValue) {
      this.setState({
        selectedCity: itemValue,
        subdistricts: []
      })
      uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/districts/" + itemValue
      return axios({
        method: 'get',
        url: uri,
        headers: {
          "clientkey": "34532hbjdsakjd2&&gjhjh11",
          "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
        },
      })
        .then(data => {
          let districts = data.data.results
          this.setState({
            districts: districts
          })
          console.log(districts, "districk")

        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  dropDownChangeDistricts = (itemValue, itemIndex) => {
    console.log(itemValue, itemIndex, "valueDist")
    if (itemIndex && itemValue) {
      this.setState({
        selectedDistricts: itemValue,
      })
      uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/subdistricts/" + itemValue
      return axios({
        method: 'get',
        url: uri,
        headers: {
          "clientkey": "34532hbjdsakjd2&&gjhjh11",
          "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
        },
      })
        .then(data => {
          let subdistricts = data.data.results
          this.setState({
            subdistricts: subdistricts
          })
          console.log(subdistricts, "subdistrick")

        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  addPost() {
    this.setState({
      loaderFlag: !this.state.loaderFlag
    })
    cloneData = {
      name: this.state.name,
      state: this.state.selectedState,
      type: this.state.category
      // city: this.state.selectedCity,
      // district: this.state.selectedDistricts,
      // subdistrict: this.state.selectedSubDistricts,
      // user_type: "4"

    }

    console.log(cloneData, "data")

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
      url: 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/people/guest/getSearchTasker',
      headers:
      {
        // token: "bearer " + this.state.token,
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
        // console.log(responseAPI, "data")
        Actions.ThirdPageList({ TaskerSearch: responseAPI, param2: "Tasker", keywords: cloneData })
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

                {/* Input category */}

                <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                  {
                    (this.state.categoriesTasker) ? (
                      // <View style={{ borderBottomColor: "#b3b3b3", borderBottomWidth: 0.15, }}>
                      <Item>
                        <Picker
                          mode="dropdown"
                          style={{ height: 50, width: "90%", color: "black" }}
                          placeholderStyle={{ color: "#E94E1C" }}
                          placeholderIconColor="#E94E1C"
                          selectedValue={this.state.category}
                          onValueChange={
                            (itemValue, itemIndex) => this.setState({ category: itemValue })
                          }
                        >
                          <Picker.Item label={this.props.str.categories} value="" />
                          {
                            Object.keys(this.state.categoriesTasker).map((key, index) => {
                              return (
                                <Picker.Item label={this.state.categoriesTasker[key].name} value={this.state.categoriesTasker[key].id} key={this.state.categoriesTasker[key].name} />
                              )
                            })
                          }
                        </Picker>
                      </Item>
                      // </View>
                    ) : null
                  }

                </View>



                {/* Input State or City */}

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
                      selectedValue={this.state.selectedState}
                      onValueChange={
                        (itemValue) => this.dropDownChangeState(itemValue)
                      }
                    >
                      <Picker.Item label={this.props.str.selectstate} value="" />
                      {
                        this.state.stateFromApi.map((key, index) => {
                          return (
                            (this.props.str.language === "en") ? (
                              <Picker.Item label={key.name_en} value={key.id} key={index} />
                            ) :
                              <Picker.Item label={key.name_ar} value={key.id} key={index} />
                          )
                        })
                      }
                    </Picker>
                  </Item>
                </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(FindTasker);


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
