
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
import IconIonicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { setStepsForAddProperties } from '../../../Store/Action/action'
import Textarea from 'react-native-textarea';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { DocumentPicker, ImagePicker, FileSystem } from 'expo';
import Modal from "react-native-modal";


class AddTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaderFlag: false,

      // gallery: null,
      isModalVisible: false,
      gallery1: null,
      gallery2: null,
      gallery3: null,
      gallery4: null,
      gallery5: null,
      gallery6: null,

      //state and cities
      stateFromApi: [],
      allCityFromApi: [],
      selectedState: "",
      districts: [],
      subdistricts: [],
    }
  }

  // gallery = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     // allowsEditing: false,
  //     // aspect: [4, 3],
  //   });
  //   // console.log(result, "result");
  //   if (!result.cancelled) {
  //     this.setState({ gallery: result.uri });
  //   }
  // }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  galleryImage = async (serial) => {
    let result = await ImagePicker.launchImageLibraryAsync({
    });
    // console.log(result, "resultphoto");
    if (!result.cancelled) {
      this.getFileSize(result.uri).then((size) => {
        let inkb = size / 1024
        let inMb = inkb / 1024
        // console.log(inMb, "size")
        if (inMb < 2) {
          this.setState({ [`gallery${serial}`]: result.uri, });
        }
        else {
          alert(this.props.str.imagesizetolarge)
        }
      })

    }
  };

  getFileSize = async fileUri => {
    let fileInfo = await FileSystem.getInfoAsync(fileUri);
    return fileInfo.size;
  };

  setDate = (newDate, title) => {
    // console.log(new Date(newDate).toLocaleDateString(), title, "datechangefucntion")
    this.setState({
      [`date${title}`]: new Date(newDate).toLocaleDateString(),
    })
  }

  componentWillMount() {
    this.setState({
      token: this.props.userCredentials.token,
    })
    this.getState(this)
    this.getCategoryPropertyMenu(this)
    this.getCategoriesTasker(this)
    if (this.props.taskId) {
      console.log(this.props.taskDataForEdit, "addId")
    }


    if (this.props.taskDataForEdit) {
      this.setState({
        title: this.props.taskDataForEdit.title,
        description: this.props.taskDataForEdit.description,
        budgetinegp: this.props.taskDataForEdit.budget_price_fomat,
        category: this.props.taskDataForEdit.type,
        datefrom_date: this.props.taskDataForEdit.from_date,
        datetodate: this.props.taskDataForEdit.to_date,
        address: this.props.taskDataForEdit.address,
        selectedState: this.props.taskDataForEdit.state,
        selectedCity: this.props.taskDataForEdit.city,
        selectedDistricts: this.props.taskDataForEdit.district,
        selectedSubDistricts: this.props.taskDataForEdit.subdistrict,
        gallery_src: this.props.taskDataForEdit.gallery_src,
      }, () => {
        if (this.state.gallery_src) {
          this.setState({


          })
          for (var i = 1; i <= this.state.gallery_src.length; i++) {
            this.setState({
              [`gallery${i}`]: this.state.gallery_src[i - 1]
            })
          }
        }
      })
      this.dropDownChangeState(this.props.taskDataForEdit.state)
      this.dropDownChangeCity(this.props.taskDataForEdit.city)
      this.dropDownChangeDistricts(this.props.taskDataForEdit.district)
    }
  }

  delete(key, index) {
    let cloneGlr = this.state.gallery_src
    cloneGlr.splice(index, 1)
    this.setState({
      gallery_src: cloneGlr,

    }, () => {
      this.setState({
        gallery1: null,
        gallery2: null,
        gallery3: null,
        gallery4: null,
        gallery5: null,
        gallery6: null,
      })
      for (var i = 1; i <= this.state.gallery_src.length; i++) {
        this.setState({
          [`gallery${i}`]: this.state.gallery_src[i - 1]
        })
      }
    })
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
        // console.log(data, "data")
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
    // console.log(itemValue, itemIndex, "valueCities")
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
          // console.log(districts, "districk")

        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  dropDownChangeDistricts = (itemValue, itemIndex) => {
    // console.log(itemValue, itemIndex, "valueDist")
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
          // console.log(subdistricts, "subdistrick")

        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  dropDownChangeCategory = (itemValue, itemIndex) => {
    if (itemValue && itemIndex) {
      this.setState({
        category: itemValue,
      })
    }
  }

  onSelectedItemsChangeType = selectedType => {
    this.setState({ selectedType });
  };

  onSelectedItemsChangeSubtitlefor = selectedSubtitlefor => {
    this.setState({ selectedSubtitlefor });
  };



  addPost() {
    cloneData = {
      title: this.state.title,
      description: this.state.description,
      budget_price: this.state.budgetinegp,
      type: this.state.category,
      from_date: this.state.datefrom_date,
      to_date: this.state.datetodate,
      address: this.state.address,
      state: this.state.selectedState,
      city: this.state.selectedCity,
    }

    // post(cloneData)
    if (cloneData.title != undefined && cloneData.description != undefined && cloneData.budget_price != undefined &&
      cloneData.type != undefined && cloneData.address != undefined && cloneData.state != undefined && cloneData.city != undefined
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

      // console.log(cloneData, "cloneData")
      var bodyFormData = new FormData();

      if (this.props.taskId) {
        bodyFormData.append("task_id", this.props.taskId);
      }
      for (var key in cloneData) {
        bodyFormData.append(key, cloneData[key]);
      }
      // if (this.state.gallery != null) {
      //   // gallery image 1
      //   let uriPartsProfile = this.state.gallery.split('.');
      //   let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
      //   bodyFormData.append('gallery_photos[]', {
      //     uri: this.state.gallery,
      //     name: `photo.${fileTypeProfile}`,
      //     type: `image/${fileTypeProfile}`,
      //   });
      // }

      // for (var i = 0; i <= this.state.gallery_src.length; i++) {
      //   console.log(`gallery[${i}]`, i, `gallery$[i]`)
      //   let uriPartsProfile = this.state.gallery_src[i - 1].split('.');
      //   let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
      //   bodyFormData.append(`gallery[${i}]`, {
      //     uri: this.state.gallery_src[i - 1],
      //     name: `photo.${fileTypeProfile}`,
      //     type: `image/${fileTypeProfile}`,
      //   });
      // }



      if (this.state.gallery1 != null) {
        // gallery image 1
        let uriPartsProfile = this.state.gallery1.split('.');
        let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
        bodyFormData.append('gallery_photos[0]', {
          uri: this.state.gallery1,
          name: `photo.${fileTypeProfile}`,
          type: `image/${fileTypeProfile}`,
        });
      }
      if (this.state.gallery2 != null) {
        // gallery image 2
        let uriPartsProfile = this.state.gallery2.split('.');
        let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
        bodyFormData.append('gallery_photos[1]', {
          uri: this.state.gallery2,
          name: `photo.${fileTypeProfile}`,
          type: `image/${fileTypeProfile}`,
        });
      }
      if (this.state.gallery3 != null) {
        // gallery image 3
        let uriPartsProfile = this.state.gallery3.split('.');
        let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
        bodyFormData.append('gallery_photos[2]', {
          uri: this.state.gallery3,
          name: `photo.${fileTypeProfile}`,
          type: `image/${fileTypeProfile}`,
        });
      }
      if (this.state.gallery4 != null) {
        // gallery image 4
        let uriPartsProfile = this.state.gallery4.split('.');
        let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
        bodyFormData.append('gallery_photos[3]', {
          uri: this.state.gallery4,
          name: `photo.${fileTypeProfile}`,
          type: `image/${fileTypeProfile}`,
        });
      }
      if (this.state.gallery5 != null) {
        // gallery image 5
        let uriPartsProfile = this.state.gallery5.split('.');
        let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
        bodyFormData.append('gallery_photos[4]', {
          uri: this.state.gallery5,
          name: `photo.${fileTypeProfile}`,
          type: `image/${fileTypeProfile}`,
        });
      }
      if (this.state.gallery6 != null) {
        // gallery image 6
        let uriPartsProfile = this.state.gallery6.split('.');
        let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
        bodyFormData.append('gallery_photos[5]', {
          uri: this.state.gallery6,
          name: `photo.${fileTypeProfile}`,
          type: `image/${fileTypeProfile}`,
        });
      }



      //   if (this.state.profile_photo_upload != null) {
      //     // Profile
      //     let uriPartsProfile = this.state.profile_photo_upload.split('.');
      //     let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
      //     bodyFormData.append('profile_photo_upload', {
      //         uri: this.state.profile_photo_upload,
      //         name: `photo.${fileTypeProfile}`,
      //         type: `image/${fileTypeProfile}`,
      //     });
      // }



      // console.log(bodyFormData, '****61', cloneData);
      let urlm;
      if (this.props.taskId) {
        urlm = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/task/user/editTask'
      }
      else {
        urlm = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/task/user/addTask'
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
    // console.log(cloneData, "cloneData")

  }



  post(cloneData) {
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

    // var options = {
    //     method: 'POST',
    //     url: 'https://demo.akaratmisr.com:443/en/api/auth/registerTasker',
    //     headers:
    //     {
    //         'postman-token': '553d07fc-3950-1199-efd9-6b5b5f8315a2',
    //         'cache-control': 'no-cache',
    //         clientsecret: '(*jh2kj36gjhasdi78743982u432j',
    //         clientkey: '34532hbjdsakjd2&&gjhjh11',
    //         'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
    //         "Allow-Cross-Origin": '*',
    //     },
    //     data: bodyFormData
    // };
    // console.log(bodyFormData, '****61', cloneData);
    // axios(options)
    //     .then((data) => {
    //         alert(JSON.stringify(data.data.message))
    //         // console.log(data.data.message, 'DATAT')
    //         // Actions.tabNavigation()
    //     }).catch((err) => {
    //         alert(JSON.stringify(err.response.data.message))
    //         this.setState({
    //             loaderFlagPhone: !this.state.loaderFlagPhone,
    //         })
    //     })


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

        <View>
          <Modal isVisible={this.state.isModalVisible}>
            <View style={{ flex: 0.4, justifyContent: 'center', alignItems: "center" }}>
              <View style={{ width: "80%", flex: 1, justifyContent: "center", alignItems: "center", }}>
                <View style={{ flex: 0.8, flexWrap: "wrap", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <TouchableOpacity style={{ backgroundColor: "white", width: "30%", height: "46%", margin: "1%", justifyContent: "center", alignItems: "center" }} onPress={() => { this.galleryImage("1") }}>
                    {
                      (this.state.gallery1) ? (
                        <Image source={{ uri: this.state.gallery1 }} style={{ width: 55, height: 55, marginHorizontal: 6, marginTop: 2 }} />
                      ) : (
                          <View style={{ justifyContent: "center", alignItems: "center", }}>
                            <Image style={{ height: 55, width: 55, }} source={require("../../../assets/Images/defaultImage.png")} />
                            {/* <Text >Select Image</Text> */}
                          </View>
                        )
                    }
                  </TouchableOpacity>
                  <TouchableOpacity style={{ backgroundColor: "white", width: "30%", height: "46%", margin: "1%", justifyContent: "center", alignItems: "center" }} onPress={() => { this.galleryImage("2") }}>
                    {
                      (this.state.gallery2) ? (
                        <Image source={{ uri: this.state.gallery2 }} style={{ width: 55, height: 55, marginHorizontal: 6, marginTop: 2 }} />
                      ) : (
                          <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Image style={{ height: 55, width: 55, }} source={require("../../../assets/Images/defaultImage.png")} />
                            {/* <Text >Select Image</Text> */}
                          </View>
                        )
                    }
                  </TouchableOpacity>
                  <TouchableOpacity style={{ backgroundColor: "white", width: "30%", height: "46%", margin: "1%", justifyContent: "center", alignItems: "center" }} onPress={() => { this.galleryImage("3") }}>
                    {
                      (this.state.gallery3) ? (
                        <Image source={{ uri: this.state.gallery3 }} style={{ width: 55, height: 55, marginHorizontal: 6, marginTop: 2 }} />
                      ) : (
                          <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Image style={{ height: 55, width: 55, }} source={require("../../../assets/Images/defaultImage.png")} />
                            {/* <Text >Select Image</Text> */}
                          </View>
                        )
                    }
                  </TouchableOpacity>
                  <TouchableOpacity style={{ backgroundColor: "white", width: "30%", height: "46%", margin: "1%", justifyContent: "center", alignItems: "center" }} onPress={() => { this.galleryImage("4") }}>
                    {
                      (this.state.gallery4) ? (
                        <Image source={{ uri: this.state.gallery4 }} style={{ width: 55, height: 55, marginHorizontal: 6, marginTop: 2 }} />
                      ) : (
                          <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Image style={{ height: 55, width: 55, }} source={require("../../../assets/Images/defaultImage.png")} />
                            {/* <Text >Select Image</Text> */}
                          </View>
                        )
                    }
                  </TouchableOpacity>
                  <TouchableOpacity style={{ backgroundColor: "white", width: "30%", height: "46%", margin: "1%", justifyContent: "center", alignItems: "center" }} onPress={() => { this.galleryImage("5") }}>
                    {
                      (this.state.gallery5) ? (
                        <Image source={{ uri: this.state.gallery5 }} style={{ width: 55, height: 55, marginHorizontal: 6, marginTop: 2 }} />
                      ) : (
                          <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Image style={{ height: 55, width: 55, }} source={require("../../../assets/Images/defaultImage.png")} />
                            {/* <Text >Select Image</Text> */}
                          </View>
                        )
                    }
                  </TouchableOpacity>
                  <TouchableOpacity style={{ backgroundColor: "white", width: "30%", height: "46%", margin: "1%", justifyContent: "center", alignItems: "center" }} onPress={() => { this.galleryImage("6") }}>
                    {
                      (this.state.gallery6) ? (
                        <Image source={{ uri: this.state.gallery6 }} style={{ width: 55, height: 55, marginHorizontal: 6, marginTop: 2 }} />
                      ) : (
                          <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Image style={{ height: 55, width: 55, }} source={require("../../../assets/Images/defaultImage.png")} />
                            {/* <Text >Select Image</Text> */}
                          </View>
                        )
                    }
                  </TouchableOpacity>




                </View>

                <TouchableOpacity style={{ flex: 0.2, backgroundColor: "white", width: "95%", height: "10%", justifyContent: "center", alignItems: "center" }} onPress={this._toggleModal}>
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>{this.props.str.upload}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", }}>
          <ScrollView contentContainerStyle={styles.contentContainer} style={{ width: "100%", }}>
            {/* <View style={{ backgroundColor: "#1E90FF", height: 40, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: "white", fontWeight: "bold" }}>{this.props.str.request}</Text>
            </View> */}

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
                    value={this.state.title}
                  />
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
                      placeholder={this.props.str.budgetinegp}
                      placeholderStyle={{ fontSize: 10 }}
                      placeholderTextColor="#b3b3b3"
                      label={this.props.str.budgetinegp}
                      style={{ marginLeft: 5, fontSize: 25, fontWeight: "bold" }}
                      onChangeText={(e) => { this.setState({ budgetinegp: e }) }}
                      value={this.state.budgetinegp} />
                    <IconIonicons name='md-pricetags' style={{ marginRight: 15, fontSize: 19, color: "#1E90FF" }} />
                  </Item>
                </View>
              </View>

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

              {/* //from_date */}
              <View style={{ marginTop: 15, width: "100%", alignItems: "center", justifyContent: "center", }}>
                <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#b3b3b3", borderBottomWidth: 0.5, }}>
                  <DatePicker
                    defaultDate={new Date()}
                    // minimumDate={new Date(2018, 1, 1)}
                    // maximumDate={new Date(2018, 12, 31)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText={this.state.datefrom_date ? this.state.datefrom_date : this.props.str.fromdate}
                    textStyle={{ color: "#EC4651", fontSize: 17, }}
                    placeHolderTextStyle={{ color: "black", fontSize: 17, }}
                    // onDateChange={this.setDate}
                    onDateChange={(newDate) => { this.setDate(newDate, "from_date") }}
                  />
                  <IconEntypo name='calendar' style={{ marginRight: 15, fontSize: 19, color: "#1E90FF" }} />
                </View>
              </View>

              {/* //to_date */}
              <View style={{ marginTop: 15, width: "100%", alignItems: "center", justifyContent: "center", }}>
                <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#b3b3b3", borderBottomWidth: 0.5, }}>
                  <DatePicker
                    defaultDate={new Date(new Date(this.state.datetodate))}
                    // minimumDate={new Date(2018, 1, 1)}
                    // maximumDate={new Date(2018, 12, 31)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText={this.state.datetodate ? this.state.datetodate : this.props.str.todate}
                    textStyle={{ color: "#EC4651", fontSize: 17, }}
                    placeHolderTextStyle={{ color: "black", fontSize: 17, }}
                    // onDateChange={this.setDate}
                    onDateChange={(newDate) => { this.setDate(newDate, "todate") }}
                  />
                  <IconEntypo name='calendar' style={{ marginRight: 15, fontSize: 19, color: "#1E90FF" }} />
                </View>
              </View>





              {/* Input Perpose */}

              {/* <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
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
                    <Picker.Item label={this.props.str.salrorrent} value="sale_or_rent" key={"sale_or_rent"} />
                  </Picker>
                </Item>

              </View> */}

              {/* Input Types */}


              {/* <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                {
                  (this.state.categoryPropertyMenu) ? (
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
                        <Picker.Item label={this.props.str.type} value="" />
                        {
                          Object.keys(this.state.categoryPropertyMenu).map((key, index) => {
                            return (
                              <Picker.Item label={this.state.categoryPropertyMenu[key]} value={this.state.categoryPropertyMenu[key]} key={this.state.categoryPropertyMenu[key]} />
                            )
                          })
                        }
                      </Picker>
                    </Item>
                  ) : null
                }
              </View> */}


              {/* address */}
              <View style={{ width: "100%", marginHorizontal: "5%", justifyContent: "center", alignItems: "center", }}>
                <View style={{ marginTop: 0 }}>
                  <Item style={styles.input}>
                    <Input
                      // keyboardType={"numeric"}
                      placeholder={this.props.str.address}
                      placeholderStyle={{ fontSize: 10 }}
                      placeholderTextColor="#b3b3b3"
                      label={this.props.str.address}
                      style={{ marginLeft: 5, fontSize: 15, }}
                      onChangeText={(e) => { this.setState({ address: e }) }}
                      value={this.state.address} />
                    <IconEntypo name='address' style={{ marginRight: 15, fontSize: 19, color: "#1E90FF" }} />
                  </Item>
                </View>
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
                (this.state.gallery_src) ? (
                  <Text>{this.props.str.oldImages}</Text>
                ) : null
              }
              <View style={{ flexDirection: "row", flexWrap: "wrap", padding: 5, width: "90%", justifyContent: "center", marginTop: 10 }}>
                {

                  (this.state.gallery_src) ? (
                    this.state.gallery_src.map((key, index) => {
                      return (
                        <>
                          <TouchableOpacity
                            activeOpacity={0.6}
                            style={{ alignItems: "center", justifyContent: "center" }}
                            // onPress={() => { Actions.FullImage({ key }) }} style={{}}
                            onPress={() => { this.delete(key, index) }}
                          >
                            <View style={{}}>
                              <View style={{ position: "relative" }}>
                                <Image
                                  style={{ height: 55, width: 55, marginHorizontal: 6, marginTop: 2 }}
                                  source={{ uri: key }}
                                />
                              </View>
                              <View style={{ position: "absolute", left: 10 }}>
                                <Text style={{ color: "red", fontSize: 10, fontWeight: "bold" }}>X</Text>
                              </View>
                            </View>

                          </TouchableOpacity>
                        </>
                      )
                    })
                  ) : null

                }
              </View>


              {/* ////////////////////////////////image///////////////////////////// */}

              <View style={{ marginTop: 15, height: 70, width: "90%", flexDirection: "row", borderWidth: 1, borderColor: "#1E90FF", borderRadius: 0, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
                <View style={{ width: "40%", marginVertical: 0, }}>
                  {
                    (this.state.gallery != null) ? (
                      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", marginHorizontal: "10%", marginVertical: 5, flexWrap: "wrap" }}>
                        <Image style={{ height: 55, width: 55, marginHorizontal: 6, marginTop: 2 }} source={{ uri: this.state.gallery }} />
                      </View>
                    )
                      : <Text style={{ color: "black", fontWeight: "bold" }}>{this.props.str.gallery}</Text>
                  }
                </View>

                <View style={{ width: "40%", height: 40, marginVertical: 50, justifyContent: "center", alignItems: "center", }}>
                  {/* <TouchableOpacity onPress={this.gallery} style={{ backgroundColor: "green", height: 40, width: "90%", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#ffffff", fontWeight: "bold" }}>{this.props.str.gallery}</Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity onPress={this._toggleModal} style={{ backgroundColor: "green", height: 40, width: "90%", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 10 }}>{this.props.str.gallery}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* <TouchableOpacity
                style={{ marginTop: 25, width: "90%", height: 35, borderWidth: 1, borderRadius: 0, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}
                onPress={this.addPost.bind(this)}
              >
                <Text>Submit</Text>
              </TouchableOpacity> */}

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
export default connect(mapStateToProps, mapDispatchToProps)(AddTask);


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
