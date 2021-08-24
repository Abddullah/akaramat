
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
import { TextField } from 'react-native-material-textfield';
import * as Animatable from 'react-native-animatable';
import MultiSelect from 'react-native-multiple-select';
import { setStepsForAddProperties } from '../../../Store/Action/action'
import Textarea from 'react-native-textarea';
import MapDirection from '../../../Component/map'
import ImagePicker1 from '../../../Component/ImagePicker';
import SwitchButton from '../../../Component/switchButton';
import { DocumentPicker, ImagePicker } from 'expo';
import Modal from "react-native-modal";



class FindTask extends Component {
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

      selectedType: [],
     
    }
  }


  componentWillMount() {
    this.setState({
      token: this.props.userCredentials.token,
    })
    if (this.props.userDetails.user_type != 5) {
      this.getState(this)
    }
    else {
      this.getState(this)
      // this.setState({
      //   selectedState: this.props.userDetails.state_work_in_format,
      //   allCityFromApi: this.props.userDetails.workin_city_format
      // })
    }
    this.getCategoriesTasker(this)
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
    // alert("working")
    this.setState({
      loaderFlag: !this.state.loaderFlag
    })
    cloneData = {
      min_price: this.state.minimum,
      max_price: this.state.maximum,
      state: this.state.selectedState,
      city: this.state.selectedCity,
      type: this.state.selectedType,
      // district: this.state.selectedDistricts,
      // subdistrict: this.state.selectedSubDistricts,
      // user_type: "4"

    }

    var bodyFormData = new FormData();
    for (var key in cloneData) {
      if (cloneData[key] && cloneData[key] !== undefined && cloneData[key].length !== 0) {
        if (Array.isArray(cloneData[key])) {
          var arr = cloneData[key];
          for (var i = 0; i < arr.length; i++) {
            bodyFormData.append(key + "[]", arr[i]);
          }
        }
        else {
          bodyFormData.append(key, cloneData[key]);
        }
      }
    }
    bodyFormData.append("limit", "10");
    bodyFormData.append("offset", "0");
    var options = {
      method: 'POST',
      url: 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/task/guest/getTasksSearch',
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
        console.log(responseAPI, "data")
        Actions.ThirdPageList({ TasksSearch: responseAPI, param2: "Task", keywords: cloneData })
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

  onSelectedItemsChangeType = selectedType => {
    this.setState({ selectedType });
  };


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
              <View style={{ marginTop: 10, width: "90%", }}>
                {/* ////////////////////////////////Input price range///////////////////////////// */}
                <View
                  style={{
                    marginTop: 15,
                    marginBottom: 0,
                    height: 70,
                    // width: "100%",
                    // borderWidth: 0.5,
                    borderColor: "red",
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",

                  }}
                >
                  <View style={{ marginTop: 10, width: "100%" }}>
                    <Text style={{ marginLeft: "3%", color: "red" }}>{this.props.str.pricerange}</Text>
                  </View>

                  <View style={{ flexDirection: "row", marginTop: -20 }}>
                    <View style={{
                      width: "45%", marginBottom: 20,
                    }}>
                      <TextField
                        keyboardType={"numeric"}
                        textColor={"grey"}
                        tintColor={"red"}
                        baseColor={"grey"}
                        label={this.props.str.minimum}
                        value={this.state.minimum}
                        onChangeText={(e) => this.setState({ minimum: e })}
                      />
                    </View>
                    <View style={{
                      width: "45%", marginBottom: 20, marginLeft: "3%"
                    }}>
                      <TextField
                        keyboardType={"numeric"}
                        textColor={"grey"}
                        tintColor={"red"}
                        baseColor={"grey"}
                        label={this.props.str.maximum}
                        value={this.state.maximum}
                        onChangeText={(e) => this.setState({ maximum: e })}
                      />
                    </View>

                  </View>
                </View>

                {/* Input category */}

                {/* <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
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

                </View> */}


                {/* Input category*/}
                <View
                  style={{
                    marginTop: 20,
                    // flex: 0.5,
                    width: "100%",
                    borderWidth: 1,
                    
                    // borderColor: "#E94E1C",
                    borderColor: "#1E90FF",
                    borderRadius: 0,
                    backgroundColor: "white",
                  }}
                >

                  <View style={{ width: "90%",  marginTop: 20, marginHorizontal: "5%" }}>
                    {/* <Text>Hello World</Text> */}
                    <MultiSelect
                        showDropDowns={true}
                        hideTags
                        hideSubmitButton={true}
                        // fixedHeight={true}
                        items={this.state.categoriesTasker}
                        uniqueKey="id"
                        // ref={(component) => { this.multiSelect = component }}
                        onSelectedItemsChange={this.onSelectedItemsChangeType}
                        selectedItems={this.state.selectedType}
                        selectText={this.props.str.categories}
                        searchInputPlaceholderText={this.props.str.Searchitems}
                        onChangeInput={(text) => console.log(text)}
                        // altFontFamily="ProximaNova-Light"
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor="#CCC"
                        submitButtonText="Submit"
                      />
                  </View>
                </View>

                {/* Input State or City */}
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop:20
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
                  {
                    (this.state.selectedState != "") ? (
                      <Animatable.View animation="slideInLeft" iterationCount={1}>
                        <Item>
                          <Picker
                            mode="dropdown"
                            style={{ height: 50, width: "90%", color: "black" }}
                            placeholderStyle={{ color: "#E94E1C" }}
                            placeholderIconColor="#E94E1C"
                            selectedValue={this.state.selectedCity}
                            // onValueChange={(itemValue, itemIndex) => this.setState({ selectedCity: itemValue })}

                            onValueChange={
                              // (itemValue, itemIndex) => this.setState({ selectedCity: itemValue })
                              (itemValue, itemIndex) => this.dropDownChangeCity(itemValue, itemIndex)
                            }

                          >

                            <Picker.Item label={this.props.str.selectcity} value="" />
                            {
                              this.state.allCityFromApi.map((key, index) => {
                                return (
                                  // <Picker.Item label={key.name_en} value={key.id} key={index} />
                                  (this.props.str.language === "en") ? (
                                    <Picker.Item label={key.name_en} value={key.id} key={index} />
                                  ) :
                                    <Picker.Item label={key.name_ar} value={key.id} key={index} />
                                )
                              })
                            }
                          </Picker>
                        </Item>
                      </Animatable.View>
                    ) : null
                  }

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
export default connect(mapStateToProps, mapDispatchToProps)(FindTask);


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
    flex: 1,
    paddingBottom: 40,
    // backgroundColor: "red"

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
