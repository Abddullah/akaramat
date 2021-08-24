
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

class SendEmail extends Component {
     constructor(props) {
          super(props)
          this.state = {
               isModalVisible: false,
               sendingLoader: false

          }
     }
     componentWillMount() {
          var { height, width } = Dimensions.get('window');
          this.setState({
               screenHeight: height,
               token: this.props.userCredentials.token,
          })
          if (this.props.requestData) {
               this.setState({
                    requestData: this.props.requestData
               })
          }

     }

     componentWillReceiveProps(nextProps) {
          if (nextProps.modalOpen) {
               console.log(nextProps.taskerData, "eee")
               this.setState({ isModalVisible: true });
               if (nextProps.taskerData) {
                    this.setState({
                         requestData: nextProps.taskerData
                    })
               }
               // alert("working modal")
               // _toggleModal = () =>
               // this.setState({ isModalVisible: !this.state.isModalVisible });
               if (this.props.route === "request") {
                    this.props.emailSending1(this.state.requestData)
               }

               else {
                    this.props.emailSending()
               }

          }


     }

     sendMail() {
          if (this.state.emailSubject != undefined || this.state.msg != undefined) {
               this.setState({ sendingLoader: !this.state.sendingLoader });

               var bodyFormData = new FormData();
               let uri;
               let options;
               if (this.props.route === "request" || this.props.requestData) {
                    console.log(this.state.requestData, this.state.emailSubject, this.state.msg)
                    bodyFormData.append("request_id", this.state.requestData.id);
                    bodyFormData.append("subject", this.state.emailSubject);
                    bodyFormData.append("message", this.state.msg);
                    uri = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/request/user/contactOwnerRequest'

                    options = {
                         method: 'POST',
                         url: uri,
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

               }
               else {
                    bodyFormData.append("unique_id", this.props.addId);
                    bodyFormData.append("sender_name", this.props.userDetails.user_name);
                    bodyFormData.append("sender_email", this.props.userDetails.user_email);
                    bodyFormData.append("subject", this.state.emailSubject);
                    bodyFormData.append("msg", this.state.msg);
                    uri = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/property/guest/contactOwnerProperty'

                    options = {
                         method: 'POST',
                         url: uri,
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


               }



               console.log(bodyFormData, '****61');
               axios(options)
                    .then((data) => {
                         // console.log(data.data.message, 'DATAT')
                         alert(data.data.message)
                         this.setState({ sendingLoader: !this.state.sendingLoader });

                    }).catch((err) => {
                         alert(JSON.stringify(err.response.data.message))
                         this.setState({ sendingLoader: !this.state.sendingLoader });
                    })
               this.setState({ isModalVisible: false });
          }
          else {
               alert(this.props.str.pleasetypesubjectandmsg)
          }
     }

     render() {
          console.log(this.props.addId, "123456")
          return (
               <View>
                    <Modal isVisible={this.state.isModalVisible}>
                         <View style={{ height: this.state.screenHeight / 2.25, justifyContent: 'center', alignItems: "center", }}>
                              <View style={{ width: "80%", flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                                   {/* Cancel Button*/}
                                   <View style={{ width: "95%", alignItems: "flex-end" }}>
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
                                                  // keyboardType={"number"}
                                                  placeholder={this.props.str.emailSubject}
                                                  placeholderStyle={{ fontSize: 10 }}
                                                  placeholderTextColor="#b3b3b3"
                                                  label={this.props.str.emailSubject}
                                                  style={{ fontSize: 15 }}
                                                  onChangeText={(e) => { this.setState({ emailSubject: e }) }}
                                                  value={this.state.emailSubject}
                                             />
                                             <IconMaterialCommunityIcons name='text-subject' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                        </Item>
                                   </View>

                                   {/* Message */}
                                   <View style={{ padding: "5%", marginTop: 10, width: "95%", borderBottomColor: "#F4F2F4", borderBottomWidth: 0.5 }}>
                                        <Text style={{ color: "black", marginBottom: 20 }}>{this.props.str.message}</Text>
                                        <Textarea
                                             containerStyle={styles.textareaContainer}
                                             style={styles.textarea}
                                             onChangeText={(e) => { this.setState({ msg: e }) }}
                                             defaultValue={this.state.msg}
                                             // maxLength={500}
                                             placeholder={this.props.str.pleasetypeyourmsg}
                                             placeholderTextColor={'#c7c7c7'}
                                             underlineColorAndroid={'transparent'}
                                        />
                                   </View>
                                   <TouchableOpacity style={{ marginBottom: 10, marginTop: 10, backgroundColor: "#E94E1B", width: "95%", height: "10%", justifyContent: "center", alignItems: "center" }}
                                        onPress={() => this.sendMail()}>
                                        <Text style={{ fontSize: 13, color: "white" }}>{this.props.str.sendmsg}</Text>
                                   </TouchableOpacity>
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
          userCredentials: state.root.userCredentials

     };
};
function mapDispatchToProps(dispatch) {
     return ({
          // languageSet: (lang) => {
          //     dispatch(languageSet(lang))
          // },
     })
}
export default connect(mapStateToProps, mapDispatchToProps)(SendEmail);


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
