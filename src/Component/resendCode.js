
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Picker, Image, SafeAreaView, ActivityIndicator, images, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Item, Fab, Input } from 'native-base';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Modal from "react-native-modal";
import Textarea from 'react-native-textarea';
import axios from 'axios';
import {
     Ionicons,
     FontAwesome,
     Entypo,
     MaterialIcons
} from "@expo/vector-icons";
class ResendCode extends Component {
     constructor(props) {
          super(props)
          this.state = {
               isModalVisible: true,
               updateLoader: true,
               selectedCountry: "",
               countriesFromApi: {},
               perpose: "email",
               type_input: "misscall"
          }
     }
     componentWillMount() {
          var { height, width } = Dimensions.get('window');
          this.setState({
               screenHeight: height,
          })
          this.getCountries(this)

     }

     componentWillReceiveProps(nextProps) {
          // if (nextProps.modalOpen) {
          //      this.setState({ isModalVisible: true });

          //      // alert("working modal")
          //      // _toggleModal = () =>
          //      // this.setState({ isModalVisible: !this.state.isModalVisible });
          //      this.props.emailSending()

          // }


     }

     getCountries() {
          return axios({
               method: 'get',
               url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/country_code",
               // url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/countries/all",
               headers: {
                    "clientkey": "34532hbjdsakjd2&&gjhjh11",
                    "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
               },
          })
               .then(data => {
                    this.setState({
                         countriesFromApi: data.data.results
                    })
                    // this.props.setCountries(data.data.results)
               })
               .catch(err => {
                    console.log(err)

               })
     }



     dropDownChange = (itemValue, itemIndex) => {
          this.setState({
               selectedCountry: itemValue,
          })
     }





     upDatePassword() {

          if (this.state.perpose === "email") {
               if (this.state.phoneNumber != undefined) {
                    this.setState({
                         updateLoader: !this.state.updateLoader
                    })
                    var bodyFormData = new FormData();
                    bodyFormData.append("email", this.state.phoneNumber);
                    var options = {
                         method: 'POST',
                         url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/auth/resendConfirmCodeEmail",
                         headers:
                         {
                              'postman-token': '553d07fc-3950-1199-efd9-6b5b5f8315a2',
                              'cache-control': 'no-cache',
                              clientsecret: '(*jh2kj36gjhasdi78743982u432j',
                              clientkey: '34532hbjdsakjd2&&gjhjh11',
                              'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                              "Allow-Cross-Origin": '*',
                         },
                         data: bodyFormData
                    };
                    console.log(bodyFormData, "**********61")
                    axios(options)
                         .then((data) => {
                              console.log(data, "dataaaaa")
                              this.setState({
                                   updateLoader: !this.state.updateLoader
                              })
                              this.setState({ isModalVisible: false });
                              alert(JSON.stringify(data.data.message))
                              Actions.signIn()

                         }).catch((err) => {
                              alert(JSON.stringify(err.response.data.message))
                              this.setState({
                                   updateLoader: !this.state.updateLoader
                              })
                         })


               }
               else {
                    alert(this.props.str.allfieldsarerequired)
               }
          }

          if (this.state.perpose === "phone") {
               if (this.state.phoneNumber != undefined && this.state.selectedCountry != "") {
                    this.setState({
                         updateLoader: !this.state.updateLoader
                    })
                    var bodyFormData = new FormData();
                    bodyFormData.append("phone", this.state.phoneNumber);
                    bodyFormData.append("country_code", this.state.selectedCountry);
                    bodyFormData.append("type_input", this.state.type_input);

                    var options = {
                         method: 'POST',
                         url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/auth/recallToVerify",
                         headers:
                         {
                              'postman-token': '553d07fc-3950-1199-efd9-6b5b5f8315a2',
                              'cache-control': 'no-cache',
                              clientsecret: '(*jh2kj36gjhasdi78743982u432j',
                              clientkey: '34532hbjdsakjd2&&gjhjh11',
                              'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                              "Allow-Cross-Origin": '*',
                         },
                         data: bodyFormData
                    };
                    console.log(bodyFormData, "**********61")
                    axios(options)
                         .then((data) => {
                              console.log(data, "dataaaaa")
                              this.setState({
                                   updateLoader: !this.state.updateLoader
                              })
                              this.setState({ isModalVisible: false });
                              alert(JSON.stringify(data.data.message))
                              // Actions.VeryfyAcc()
                              Actions.VeryfyAcc({
                                   phone: this.state.phoneNumber,
                                   countryCode: this.state.selectedCountry
                              })

                         }).catch((err) => {
                              alert(JSON.stringify(err.response.data.message))
                              this.setState({
                                   updateLoader: !this.state.updateLoader,
                              })
                         })
               }
               else {
                    alert(this.props.str.allfieldsarerequired)
               }
          }
     }

     render() {
          return (
               <View>
                    <Modal isVisible={this.state.isModalVisible}>
                         <View style={{ height: this.state.perpose === "email" ? this.state.screenHeight / 2.7 : this.state.screenHeight / 2, justifyContent: 'center', alignItems: "center", }}>
                              <View style={{ width: "80%", flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                                   {/* Cancel Button*/}
                                   <View style={{ width: "95%", alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={{ marginLeft: "2%" }}>{this.props.str.resendconfirmation}</Text>
                                        <TouchableOpacity
                                             style={{ width: 30, marginTop: 10, }}
                                             onPress={() => {
                                                  this.setState({ isModalVisible: false });
                                             }}
                                        >
                                             <IconEntypo name='cross' style={{ textAlign: "right", marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                        </TouchableOpacity>
                                   </View>


                                   {/* Country code */}

                                   <View style={{ marginTop: 0 }}>
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
                                                       selectedValue={this.state.perpose}
                                                       onValueChange={
                                                            (itemValue, itemIndex) => this.setState({ perpose: itemValue })
                                                       }
                                                  >
                                                       {/* <Picker.Item label={this.props.str.purpose} value="" /> */}
                                                       <Picker.Item label={this.props.str.sendactivationcode} value="email" key={"email"} />
                                                       <Picker.Item label={this.props.str.activatemyaccountby} value="phone" key={"phone"} />
                                                  </Picker>
                                             </Item>

                                        </View>
                                   </View>

                                   {
                                        (this.state.perpose === "email") ? (

                                             <View style={{ marginTop: 0 }}>
                                                  <Item style={styles.input}>
                                                       <Input
                                                            // secureTextEntry
                                                            // keyboardType={"numeric"}
                                                            placeholder={this.props.str.email}
                                                            placeholderStyle={{ fontSize: 10 }}
                                                            placeholderTextColor="#b3b3b3"
                                                            label={this.props.str.email}
                                                            style={{ fontSize: 15 }}
                                                            onChangeText={(e) => { this.setState({ phoneNumber: e }) }}
                                                            value={this.state.phoneNumber}
                                                       />
                                                       <MaterialCommunityIcons name='email' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                  </Item>
                                             </View>


                                        ) :
                                             <>
                                                  {/*phoneNumber */}
                                                  <View style={{ marginTop: 0 }}>
                                                       <Item style={styles.input}>
                                                            <Input
                                                                 // secureTextEntry
                                                                 // keyboardType={"number"}
                                                                 keyboardType={"number-pad"}
                                                                 placeholder={this.props.str.phoneNumber}
                                                                 placeholderStyle={{ fontSize: 10 }}
                                                                 placeholderTextColor="#b3b3b3"
                                                                 label={this.props.str.phoneNumber}
                                                                 style={{ fontSize: 15 }}
                                                                 onChangeText={(e) => { this.setState({ phoneNumber: e }) }}
                                                                 value={this.state.phoneNumber}
                                                            />
                                                            <Entypo name='phone' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                       </Item>
                                                  </View>

                                                  {/* Country code */}
                                                  <View style={{ marginTop: 0 }}>
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
                                                                      style={{ height: 50, width: "90%", color: "black", marginTop: 15 }}
                                                                      placeholderStyle={{ color: "#E94E1C" }}
                                                                      placeholderIconColor="#E94E1C"
                                                                      selectedValue={this.state.selectedCountry}
                                                                      onValueChange={
                                                                           (itemValue, itemIndex) => this.dropDownChange(itemValue, itemIndex)
                                                                      }
                                                                 >
                                                                      <Picker.Item label={this.props.str.selectcountry} value="" />
                                                                      {
                                                                           Object.keys(this.state.countriesFromApi).map((key, index) => {
                                                                                return (
                                                                                     <Picker.Item label={this.state.countriesFromApi[key]} value={key} key={index} />
                                                                                )
                                                                           })
                                                                      }
                                                                 </Picker>
                                                            </Item>
                                                       </View>
                                                  </View>

                                                  <View style={{ marginTop: 0 }}>
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
                                                                      selectedValue={this.state.type_input}
                                                                      onValueChange={
                                                                           (itemValue, itemIndex) => this.setState({ type_input: itemValue })
                                                                      }
                                                                 >
                                                                      {/* <Picker.Item label={this.props.str.purpose} value="" /> */}
                                                                      <Picker.Item label={"MISSCALL"} value="misscall" key={"misscall"} />
                                                                      <Picker.Item label={"SMS"} value="sms" key={"sms"} />
                                                                 </Picker>
                                                            </Item>

                                                       </View>
                                                  </View>
                                             </>
                                   }



                                   {
                                        (this.state.updateLoader === true) ? (
                                             <TouchableOpacity style={{ marginBottom: 10, marginTop: 10, backgroundColor: "#E94E1B", width: "95%", height: this.state.perpose === "email" ? "15%" : "10%", justifyContent: "center", alignItems: "center" }}
                                                  onPress={() => this.upDatePassword()}>
                                                  <Text style={{ fontSize: 13, color: "white" }}>{this.props.str.resendconfirmation}</Text>
                                             </TouchableOpacity>
                                        ) : <ActivityIndicator style={{ top: 20, marginBottom: 20 }} />

                                   }

                              </View>
                         </View>
                    </Modal>
               </View>
          );
     }
}


let mapStateToProps = state => {
     return {
          str: state.root.str,
          userDetails: state.root.userDetails,
     };
};
function mapDispatchToProps(dispatch) {
     return ({
          // languageSet: (lang) => {
          //     dispatch(languageSet(lang))
          // },
     })
}
export default connect(mapStateToProps, mapDispatchToProps)(ResendCode);


const styles = StyleSheet.create({
     holder: {
          flex: 0.25,
          justifyContent: 'center',
     },
     contentContainer: {
          paddingBottom: 40,
          backgroundColor: "white",

     },
     container: {
          flex: 1,
     },
     containerForModal: {
          // flex: 1,
          padding: 30,
          justifyContent: 'center',
          alignItems: 'center',
          // width:"100%"
     },
     textareaContainer: {
          height: "30%",
          width: "95%",
          padding: 5,
          // backgroundColor: '#F8F8F8',
     },
     textarea: {
          textAlignVertical: 'top',  // hack android
          height: 100,
          fontSize: 14,
          // color: '#333',
     },
     customSlide: {
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
     },
     customImage: {
          width: "100%",
          height: "100%",
     },
     listView: {
          width: "100%", height: 40, marginTop: 15,
          borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC",
          flexDirection: "row",
          justifyContent: "space-between",
     },
     listTextOption: {
          marginLeft: 10, color: "#000", fontWeight: "bold", fontSize: 12
     },
     listTextOptionValue: {
          marginLeft: 10, color: "#6a6a6a", textAlign: "right",
     },
     input: { justifyContent: 'center', alignItems: 'center', width: '90%', },
});  
