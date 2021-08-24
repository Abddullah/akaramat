import React, { Component } from "react";
import { connect } from "react-redux";
import { signinAction } from '../../Store/Action/action'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
       StyleSheet,
       Text,
       ScrollView,
       ImageBackground,
       Image,
       ActivityIndicator,
       TouchableOpacity,
} from "react-native";
import axios from 'axios';
import UpdatePassword from '../../Component/updatePassword';
import ResendCode from '../../Component/resendCode';

import {
       Container, Header, Content, Tab, Tabs, Button, Input,
       Item, View,
} from 'native-base';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';


class VeryfyAcc extends Component {
       constructor(props) {
              super(props);
              this.state = {
                     last3digits: "",
                     loginLoader: true,
                     updatePassword: false,
                     resendCode: false,
              };


       }

       componentWillMount() {
              let phoneNumber = this.props.phone
              let countryCode = this.props.countryCode
              this.setState({
                     phone: phoneNumber,
                     countryCode: countryCode
              })

       }

       activateAcc() {
              // alert("worked")
              this.setState({
                     loginLoader: !this.state.loginLoader
              })
              cloneData = {
                     phone: this.state.phone,
                     country_code: this.state.countryCode,
                     confirmation_code: this.state.last3digits,
                     type: this.props.route === "forget" ? "reset_password" : "register"
              }
              var bodyFormData = new FormData();
              for (var key in cloneData) {
                     if (cloneData[key] && cloneData[key] !== undefined) {
                            bodyFormData.append(key, cloneData[key]);
                     }
              }

              console.log(bodyFormData, cloneData, "123456")
              var options = {
                     method: 'POST',
                     url: 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/auth/verifyPhone',
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
              console.log(bodyFormData, '****61', cloneData);
              axios(options)
                     .then((data) => {
                            if (this.props.route === "forget") {
                                   this.setState({
                                          loginLoader: !this.state.loginLoader,
                                          updatePassword: !this.state.updatePassword
                                   })
                            }
                            else {
                                   alert(JSON.stringify(data.data.message))
                                   console.log(data.data.message, 'DATAT')
                                   this.setState({
                                          loginLoader: !this.state.loginLoader
                                   })
                                   Actions.signIn()
                            }
                     }).catch((err) => {
                            alert(JSON.stringify(err.response.data.message))
                            this.setState({
                                   loginLoader: !this.state.loginLoader
                            })
                     })

       }

       render() {
              return (
                     <ImageBackground source={require("../../assets/Images/background.png")}
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {
                                   (this.props.route === "forget" && this.state.updatePassword === true) ? (
                                          <UpdatePassword phone={this.props.phone} />
                                   ) : null
                            }
                            {
                                   (this.state.resendCode === true) ? (
                                          <ResendCode />
                                   ) : null
                            }
                            <ScrollView style={{ width: "100%", }} contentContainerStyle={styles.contentContainer}>
                                   <View style={{
                                          alignItems: "center", justifyContent: "center", width: "80%", marginHorizontal: "10%",
                                   }}
                                   >
                                          <Image style={{ width: 220, height: 200 }}
                                                 source={require('../../assets/Images/logo.png')}
                                                 resizeMode="contain"
                                          />


                                          <View style={{ marginTop: 40, justifyContent: "center", alignItems: "center" }}>
                                                 <Text
                                                        style={{
                                                               color: "white",
                                                               fontSize: 15,
                                                               fontWeight: "bold"
                                                        }}>
                                                        {this.props.str.verifyaccount}
                                                 </Text>
                                                 <Text
                                                        style={{
                                                               color: "white",
                                                               fontSize: 12,
                                                               marginTop: 10,
                                                               textAlign: "center"
                                                        }}>

                                                        {this.props.str.thanksforsubmitting}

                                                 </Text>
                                          </View>

                                          <View
                                                 style={{
                                                        height: 50, width: "100%", flexDirection: "row", borderWidth: 0.5, borderColor: "white", borderRadius: 5, marginTop: 15
                                                 }}
                                          >
                                                 <Input
                                                        placeholder={this.props.str.last3digits}
                                                        placeholderStyle={{ fontSize: 10 }}
                                                        placeholderTextColor="white"
                                                        keyboardType={'numeric'}
                                                        style={{ marginLeft: 15, fontSize: 15, color: "white" }}
                                                        onChangeText={(e) => { this.setState({ last3digits: e }) }}
                                                        value={this.state.last3digits}
                                                 />
                                                 <Icon name='cellphone-basic' style={{ marginRight: 10, fontSize: 25, color: "white", top: 10 }} />
                                          </View>

                                          {
                                                 (this.state.loginLoader === false) ?
                                                        (
                                                               <ActivityIndicator style={{ top: 20, marginBottom: 20 }} />
                                                        ) :
                                                        (
                                                               <Button
                                                                      full
                                                                      style={{ height: 55, justifyContent: "center", alignItems: "center", borderRadius: 5, marginTop: 20, borderWidth: 0.5, borderColor: "white", backgroundColor: "#ffff" }}
                                                                      onPress={() => this.activateAcc(this)}
                                                               >
                                                                      <View style={{
                                                                             flexDirection: "row",
                                                                             justifyContent: "center",
                                                                             width: "40%"
                                                                      }}>
                                                                             <MaterialCommunityIcons name='arrow-right-bold-outline' style={{ top: 0, fontSize: 25, color: "#7B6859" }} />
                                                                             <Text style={{ color: "#7B6859", fontWeight: "bold", marginRight: "10%", fontSize: 20, marginLeft: 10 }}>{this.props.str.verify}</Text>
                                                                      </View>

                                                               </Button>
                                                        )
                                          }

                                          <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                                                 <Text style={{ color: "white", fontSize: 12, textAlign: "center" }}>
                                                        {this.props.str.ifyoudidnotreceivethecall}
                                                 </Text>
                                          </View>
                                          <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                                                 <Text
                                                        onPress={() =>
                                                               this.setState({
                                                                      resendCode: !this.state.resendCode
                                                               })
                                                        }
                                                        style={{ color: "white", fontSize: 12, textAlign: "center" }}
                                                 >
                                                       {this.props.str.resendconfirmation}
                                                 </Text>
                                          </View>
                                          <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                                                 <Text
                                                        onPress={() =>
                                                               Actions.signIn()
                                                        }
                                                        style={{ color: "white", fontSize: 12, textAlign: "center" }}>{this.props.str.backtosignin}</Text>
                                          </View>
                                   </View>
                            </ScrollView>
                     </ImageBackground>
              );
       }
}


let mapStateToProps = state => {
       return {
              isLoader: state.root.isLoader,
              isError: state.root.isError,
              errorMessage: state.root.errorMessage,
              str: state.root.str

       };
};
function mapDispatchToProps(dispatch) {
       return ({
              getUserSignIn: (data) => {
                     dispatch(signinAction(data))
              },
       })
}
export default connect(mapStateToProps, mapDispatchToProps)(VeryfyAcc);
const styles = StyleSheet.create({
       contentContainer: {
              paddingBottom: 40,
       },


});