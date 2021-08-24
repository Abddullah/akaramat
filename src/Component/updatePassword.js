
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Picker, Image, SafeAreaView, ActivityIndicator, images, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Item, Fab, Input } from 'native-base';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
class UpdatePassword extends Component {
     constructor(props) {
          super(props)
          this.state = {
               isModalVisible: true,
               updateLoader: true,
          }
     }
     componentWillMount() {
          var { height, width } = Dimensions.get('window');
          this.setState({
               screenHeight: height,
          })
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

     upDatePassword() {
          if (this.state.password != undefined || this.state.repassword != undefined) {
               this.setState({
                    updateLoader: !this.state.updateLoader
               })
               var bodyFormData = new FormData();
               bodyFormData.append("phone", this.props.phone);
               bodyFormData.append("new_password", this.state.password);
               bodyFormData.append("re_password", this.state.repassword);

               var options = {
                    method: 'POST',
                    url: 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/auth/updatePassword',
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
               axios(options)
                    .then((data) => {
                         this.setState({
                              updateLoader: !this.state.updateLoader
                         })
                         this.setState({ isModalVisible: false });
                         Actions.signIn()
                         alert(JSON.stringify(data.data.message))


                    }).catch((err) => {
                         alert(JSON.stringify(err.response.data.message))
                         this.setState({
                              updateLoader: !this.state.updateLoader
                         })
                    })
          }
          else {
               alert(this.props.str.pleasetypenewpassword)
          }
     }

     render() {
          return (
               <View>
                    <Modal isVisible={this.state.isModalVisible}>
                         <View style={{ height: this.state.screenHeight / 3, justifyContent: 'center', alignItems: "center", }}>
                              <View style={{ width: "80%", flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                                   {/* Cancel Button*/}
                                   <View style={{ width: "95%", alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={{ marginLeft: "2%" }}>{this.props.str.changepassword}</Text>
                                        <TouchableOpacity
                                             style={{ width: 30, marginTop: 10, }}
                                             onPress={() => {
                                                  this.setState({ isModalVisible: false });
                                             }}
                                        >
                                             <IconEntypo name='cross' style={{ textAlign: "right", marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                        </TouchableOpacity>
                                   </View>
                                   {/* Email Subject */}
                                   <View style={{ marginTop: 0 }}>
                                        <Item style={styles.input}>
                                             <Input
                                                  secureTextEntry
                                                  // keyboardType={"number"}
                                                  placeholder={this.props.str.newpassword}
                                                  placeholderStyle={{ fontSize: 10 }}
                                                  placeholderTextColor="#b3b3b3"
                                                  label={this.props.str.newpassword}
                                                  style={{ fontSize: 15 }}
                                                  onChangeText={(e) => { this.setState({ password: e }) }}
                                                  value={this.state.password}
                                             />
                                             <Entypo name='key' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                        </Item>
                                   </View>
                                   {/* Email Subject */}
                                   <View style={{ marginTop: 0 }}>
                                        <Item style={styles.input}>
                                             <Input
                                                  secureTextEntry
                                                  // keyboardType={"number"}
                                                  placeholder={this.props.str.retypenewpassword}
                                                  placeholderStyle={{ fontSize: 10 }}
                                                  placeholderTextColor="#b3b3b3"
                                                  label={this.props.str.retypenewpassword}
                                                  style={{ fontSize: 15 }}
                                                  onChangeText={(e) => { this.setState({ repassword: e }) }}
                                                  value={this.state.repassword}
                                             />
                                             <Entypo name='key' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />


                                        </Item>
                                   </View>
                                   {
                                        (this.state.updateLoader === true) ? (
                                             <TouchableOpacity style={{ marginBottom: 10, marginTop: 10, backgroundColor: "#E94E1B", width: "95%", height: "15%", justifyContent: "center", alignItems: "center" }}
                                                  onPress={() => this.upDatePassword()}>
                                                  <Text style={{ fontSize: 13, color: "white" }}>{this.props.str.updatepassword   }</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);


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
     input: { justifyContent: 'center', alignItems: 'center', width: '95%', },
});  
