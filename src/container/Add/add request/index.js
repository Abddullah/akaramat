
import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Image, StatusBar, ScrollView, ListView,
  RefreshControl, Picker, ActivityIndicator, Modal,
  TouchableHighlight, Alert, TextInput, UselessTextInput, Switch
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Item, Input, CheckBox, DatePicker } from 'native-base';
import { connect, } from "react-redux";
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { setStepsForAddProperties } from '../../../Store/Action/action'
import Textarea from 'react-native-textarea';
import IconIonicons from 'react-native-vector-icons/Ionicons';

class AddRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaderFlag: false,
      //state and cities
      stateFromApi: [],
      allCityFromApi: [],
      selectedState: "",
      type: "",
      districts: [],
      subdistricts: [],
      categoryPropertyMenu: {},

    }
  }

  componentWillMount() {
    this.setState({
      token: this.props.userCredentials.token,
    })
    this.getCategoryPropertyMenu(this)
    this.getState(this)
    if (this.props.requestId) {
      console.log(this.props.requestDataForEdit.type, "EDITDATA")
      // this.dropDownChangeState()
      // if(this.props.){
      // }
    }


  }

  componentDidMount() {
    // for edit working
    if (this.props.requestDataForEdit) {
      this.setState({
        title: this.props.requestDataForEdit.title,
        description: this.props.requestDataForEdit.description,
        price_max: this.props.requestDataForEdit.price_max,
        perpose: this.props.requestDataForEdit.purpose,
        type: this.props.requestDataForEdit.type,
        selectedState: this.props.requestDataForEdit.state,
        selectedCity: this.props.requestDataForEdit.city,
        selectedDistricts: this.props.requestDataForEdit.district,
        selectsubdistricts: this.props.requestDataForEdit.subdistrict,
      })
      this.dropDownChangeState(this.props.requestDataForEdit.state)
      this.dropDownChangeCity(this.props.requestDataForEdit.city)
      this.dropDownChangeDistricts(this.props.requestDataForEdit.district)
    }


  }

  getCategoryPropertyMenu() {
    return axios({
      method: 'get',
      url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/dataselect/getCategoryPropertyMenu",
      headers: {
        "clientkey": "34532hbjdsakjd2&&gjhjh11",
        "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
      },
    })
      .then(data => {
        let categoryPropertyMenu = data.data.results
        this.setState({
          categoryPropertyMenu: categoryPropertyMenu
        })
      })
      .catch(err => {
        console.log(err)
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
        this.setState({
          stateFromApi: state
        })
      })
      .catch(err => {
        console.log(err)
      })
  }



  dropDownChangeState = (itemValue, itemIndex) => {
    console.log("working", itemValue)
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
          console.log(data, "then")
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
    if (itemValue) {
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
    if (itemValue) {
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


  // onSelectedItemsChangeType = selectedType => {
  //   this.setState({ selectedType });
  // };

  onSelectedItemsChangeSubtitlefor = selectedSubtitlefor => {
    this.setState({ selectedSubtitlefor });
  };



  addPost() {

    // alert("working")
    cloneData = {
      title: this.state.title,
      description: this.state.description,
      state: this.state.selectedState,
      location_city: this.state.selectedCity,
      purpose: this.state.perpose,
      type: this.state.type,
      price_max: this.state.price_max
    }
    if (cloneData.title != undefined && cloneData.description != undefined && cloneData.state != undefined &&
      cloneData.location_city != undefined && cloneData.purpose != undefined && cloneData.type != undefined && cloneData.price_max != undefined
    ) {
      this.setState({
        loaderFlag: !this.state.loaderFlag
      })

      if (this.state.selectedDistricts != undefined) {
        cloneData.location_district = this.state.selectedDistricts
      }
      if (this.state.selectedSubDistricts != undefined) {
        cloneData.location_subdistrict = this.state.selectedSubDistricts
      }

      console.log(cloneData, "cloneData")
      var bodyFormData = new FormData();
      if (this.props.requestId) {
        bodyFormData.append("request_id", this.props.requestId);
      }
      for (var key in cloneData) {
        bodyFormData.append(key, cloneData[key]);
      }

      if (this.props.requestId) {
        urlm = 'https://demo.akaratmisr.com:443/en/api/request/user/editRequest'
      }
      else {
        urlm = 'https://demo.akaratmisr.com:443/en/api/request/user/addRequest'
      }
      var options = {
        method: 'POST',
        url: urlm,
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
          console.log(data, "data")
          alert(JSON.stringify(data.data.message))
          Actions.tabbar({ type: "reset" });
          Actions.tabNavigation();

          // Actions.tabNavigation({ type: ActionConst.RESET })
          // Actions.tabNavigation();
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

    else {
      alert(this.props.str.allfieldsarerequired)
    }
  }








  render() {
    console.log(this.state.type, "type")
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

              <View style={{ marginTop: 25 }}>
                <Item style={styles.input}>
                  <Input
                    // keyboardType={"number"}
                    placeholder={this.props.str.title}
                    placeholderStyle={{ fontSize: 10 }}
                    placeholderTextColor="#b3b3b3"
                    label={this.props.str.title}
                    style={{ fontSize: 15 }}
                    onChangeText={(e) => { this.setState({ title: e }) }}
                    value={this.state.title} />
                  <Icon name='format-title' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                </Item>
              </View>

              {/* Description */}

              <View style={styles.container}>
                <View style={{ padding: "5%", backgroundColor: "#F8F8F8" }}>
                  <Text style={{ color: "black", marginBottom: 10 }}>{this.props.str.description}</Text>
                  <Textarea
                    containerStyle={styles.textareaContainer}
                    style={styles.textarea}
                    onChangeText={(e) => { this.setState({ description: e }) }}
                    defaultValue={this.state.description}
                    maxLength={500}
                    placeholder={this.props.str.putalldetails}
                    placeholderTextColor={'#c7c7c7'}
                    underlineColorAndroid={'transparent'}
                  />
                </View>
              </View>

              {/* Price */}

              <View style={{ width: "100%", marginHorizontal: "5%", justifyContent: "center", alignItems: "center", }}>
                <View style={{ marginTop: 0 }}>
                  <Item style={styles.input}>
                    <Input
                      keyboardType={"numeric"}
                      placeholder={this.props.str.price_max}
                      placeholderStyle={{ fontSize: 10 }}
                      placeholderTextColor="#b3b3b3"
                      label={this.props.str.price_max}
                      style={{ marginLeft: 5, fontSize: 25, fontWeight: "bold" }}
                      onChangeText={(e) => { this.setState({ price_max: e }) }}
                      value={this.state.price_max} />
                    <IconIonicons name='md-pricetags' style={{ marginRight: 5, fontSize: 19, color: "#1E90FF" }} />
                  </Item>
                </View>
              </View>

              {/* Input Perpose */}

              <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                <Item>
                  <Picker
                    mode="dropdown"
                    style={{ height: 50, width: "90%", color: "black" }}
                    placeholderStyle={{ color: "#E94E1C" }}
                    placeholderIconColor="#E94E1C"
                    selectedValue={this.state.perpose}
                    onValueChange={
                      (itemValue, itemIndex) => this.setState({ perpose: itemValue })
                    }
                  >
                    <Picker.Item label={this.props.str.purpose} value="" />
                    <Picker.Item label={this.props.str.sale} value="sale" key={"sale"} />
                    <Picker.Item label={this.props.str.rent} value="rent" key={"rent"} />
                    {/* <Picker.Item label={this.props.str.salrorrent} value="sale_or_rent" key={"sale_or_rent"} /> */}
                  </Picker>
                </Item>
              </View>



              {/* Input Types */}

              <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                {

                  <Item>
                    <Picker
                      mode="dropdown"
                      style={{ height: 50, width: "90%", color: "black" }}
                      placeholderStyle={{ color: "#E94E1C" }}
                      placeholderIconColor="#E94E1C"
                      selectedValue={this.state.type}
                      onValueChange={
                        (itemValue, itemIndex) => this.setState({ type: itemValue })
                      }
                    >
                      <Picker.Item label={this.props.str.need} value="" />
                      {
                        Object.keys(this.state.categoryPropertyMenu).map((key, index) => {
                          return (
                            <Picker.Item label={this.state.categoryPropertyMenu[key]} value={Object.keys(this.state.categoryPropertyMenu)[index]} key={this.state.categoryPropertyMenu[key]} />
                          )
                        })
                      }
                    </Picker>
                  </Item>

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
                      (itemValue, itemIndex) => this.dropDownChangeState(itemValue, itemIndex)
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

                {/* ////////////////////////////////districts///////////////////////////// */}
                {
                  (this.state.selectedCity != "" && this.state.districts && this.state.districts.length != 0) ? (
                    <Animatable.View animation="slideInLeft" iterationCount={1}>
                      <Item>
                        <Picker
                          mode="dropdown"
                          style={{ height: 50, width: "90%", color: "black" }}
                          placeholderStyle={{ color: "#E94E1C" }}
                          placeholderIconColor="#E94E1C"
                          selectedValue={this.state.selectedDistricts}
                          // onValueChange={(itemValue, itemIndex) => this.setState({ selectedCity: itemValue })}

                          onValueChange={
                            // (itemValue, itemIndex) => this.setState({ selectedCity: itemValue })
                            (itemValue, itemIndex) => this.dropDownChangeDistricts(itemValue, itemIndex)
                          }

                        >

                          <Picker.Item label={this.props.str.selectdistricts} value="" />
                          {
                            this.state.districts.map((key, index) => {
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



                {/* ////////////////////////////////subdistricts///////////////////////////// */}
                {
                  (this.state.selectedDistricts != "" && this.state.subdistricts && this.state.subdistricts.length != 0) ? (
                    <Animatable.View animation="slideInLeft" iterationCount={1}>
                      <Item>
                        <Picker
                          mode="dropdown"
                          style={{ height: 50, width: "90%", color: "black" }}
                          placeholderStyle={{ color: "#E94E1C" }}
                          placeholderIconColor="#E94E1C"
                          selectedValue={this.state.selectedSubDistricts}
                          // onValueChange={(itemValue, itemIndex) => this.setState({ selectedCity: itemValue })}
                          onValueChange={
                            (itemValue, itemIndex) => this.setState({ selectedSubDistricts: itemValue })
                          }
                        >
                          <Picker.Item label={this.props.str.selectsubdistricts} value="" />
                          {
                            this.state.subdistricts.map((key, index) => {
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
              {
                (this.state.loaderFlag != true) ? (
                  <TouchableOpacity
                    style={{ marginTop: 25, width: "90%", height: 35, borderWidth: 1, borderRadius: 0, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}
                    onPress={this.addPost.bind(this)}
                  >
                    <Text>{this.props.str.submit}</Text>
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
    userCredentials: state.root.userCredentials

  };
};
function mapDispatchToProps(dispatch) {
  return ({
    setStepsForAddProperties: (steps) => {
      dispatch(setStepsForAddProperties(steps))
    },
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(AddRequest);


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
    fontSize: 14,
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

  input: { justifyContent: 'center', alignItems: 'center', width: '90%', },

});  
