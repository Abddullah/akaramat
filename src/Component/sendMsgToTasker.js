
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

class SendMsgToTasker extends Component {
     constructor(props) {
          super(props)
          this.state = {
               isModalVisible: false,
               sendingLoader: false,
               chatButtonLoading: false,

          }
     }
     componentWillMount() {
          var { height, width } = Dimensions.get('window');
          this.setState({
               screenHeight: height,
          })

     }

     componentWillReceiveProps(nextProps) {
          console.log(nextProps, "nextprop")
          if (nextProps.modalOpen && (nextProps.route === "contactTaskOwner" || nextProps.route === "request")) {
               console.log(nextProps, "if")

               this.setState({ isModalVisible: true });
               this.props.emailSending1()
          }
          else if (nextProps.modalOpen) {
               console.log(nextProps, "else")
               this.setState({ isModalVisible: true });
               this.props.emailSending()
          }
     }
     sendMail() {


          if (this.props.taskerData) {
               if (this.state.msg != undefined) {
                    this.setState({ sendingLoader: !this.state.sendingLoader });
                    var bodyFormData = new FormData();
                    var url;

                    if (this.props.route === "contactTaskOwner") {
                         bodyFormData.append("task_id", this.props.taskerData.taskId);
                         bodyFormData.append("contact_name", this.props.taskerData.user_name);
                         bodyFormData.append("contact_email", this.props.taskerData.user_email);
                         bodyFormData.append("contact_phone", this.props.taskerData.phone);
                         bodyFormData.append("contact_message", this.state.msg);
                         url = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/task/guest/contactOwnerTask'

                    }
                    else {

                         bodyFormData.append("user_id", this.props.userDetails.id);
                         bodyFormData.append("contact_name", this.props.taskerData.user_name);
                         bodyFormData.append("contact_email", this.props.taskerData.user_email);
                         bodyFormData.append("contact_phone", this.props.taskerData.contact_phone);
                         bodyFormData.append("contact_message", this.state.msg);

                         url = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/people/guest/contactUser'


                    }
                    var options = {
                         method: 'POST',
                         url: url,
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
                    console.log(bodyFormData, '****61');
                    axios(options)
                         .then((data) => {
                              // console.log(data.data.message, 'DATAT')
                              alert(data.data.message)
                              this.setState({
                                   sendingLoader: !this.state.sendingLoader,
                                   msg: ""
                              });

                         }).catch((err) => {
                              alert(JSON.stringify(err.response.data.message))
                              this.setState({ sendingLoader: !this.state.sendingLoader });

                         })
                    this.setState({ isModalVisible: false });
               }

               else {
                    alert(this.props.str.pleasetypemessage)
               }
          }

          if (this.props.agentanddevelopers) {
               if (this.state.msg != undefined) {
                    this.setState({ sendingLoader: !this.state.sendingLoader });
                    var bodyFormData = new FormData();
                    bodyFormData.append("user_id", this.props.userDetails.id);
                    bodyFormData.append("contact_name", this.props.agentanddevelopers.full_name);
                    bodyFormData.append("contact_email", this.props.agentanddevelopers.user_email);
                    bodyFormData.append("contact_phone", this.props.agentanddevelopers.contact_phone);
                    bodyFormData.append("contact_message", this.state.msg);
                    var options = {
                         method: 'POST',
                         url: 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/people/guest/contactUser',
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
                    console.log(bodyFormData, '****61');
                    axios(options)
                         .then((data) => {
                              // console.log(data.data.message, 'DATAT')
                              alert(data.data.message)
                              this.setState({
                                   sendingLoader: !this.state.sendingLoader,
                                   msg: ""
                              });

                         }).catch((err) => {
                              alert(JSON.stringify(err.response.data.message))
                              this.setState({ sendingLoader: !this.state.sendingLoader });

                         })
                    this.setState({ isModalVisible: false });
               }

               else {
                    alert(this.props.str.pleasetypemessage)
               }
          }
          if (this.props.representativeData) {
               if (this.state.msg != undefined) {
                    this.setState({ sendingLoader: !this.state.sendingLoader });
                    var bodyFormData = new FormData();
                    bodyFormData.append("user_id", this.props.userDetails.id);
                    bodyFormData.append("contact_name", this.props.representativeData.full_name);
                    bodyFormData.append("contact_email", this.props.representativeData.user_email);
                    bodyFormData.append("contact_phone", this.props.representativeData.contact_phone);
                    bodyFormData.append("contact_message", this.state.msg);
                    var options = {
                         method: 'POST',
                         url: 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/people/guest/contactUser',
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
                    console.log(bodyFormData, '****61');
                    axios(options)
                         .then((data) => {
                              // console.log(data.data.message, 'DATAT')
                              alert(data.data.message)
                              this.setState({
                                   sendingLoader: !this.state.sendingLoader,
                                   msg: ""
                              });

                         }).catch((err) => {
                              alert(JSON.stringify(err.response.data.message))
                              this.setState({ sendingLoader: !this.state.sendingLoader });

                         })
                    this.setState({ isModalVisible: false });
               }

               else {
                    alert(this.props.str.pleasetypemessage)
               }
          }


          if (this.props.tasksData) {

               console.log(this.props.taskId, this.props.tasksData.user_name, this.props.tasksData.user_email, this.props.tasksData.contact_phone, "sendMsg")
               if (this.state.msg != undefined) {
                    this.setState({ sendingLoader: !this.state.sendingLoader });
                    var bodyFormData = new FormData();
                    bodyFormData.append("task_id", this.props.taskId);
                    bodyFormData.append("contact_name", this.props.tasksData.user_name);
                    bodyFormData.append("contact_email", this.props.tasksData.user_email);
                    bodyFormData.append("contact_phone", this.props.tasksData.contact_phone);
                    bodyFormData.append("contact_message", this.state.msg);
                    var options = {
                         method: 'POST',
                         url: 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/task/guest/contactOwnerTask',
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
                    console.log(bodyFormData, '****61');
                    axios(options)
                         .then((data) => {
                              // console.log(data.data.message, 'DATAT')
                              alert(data.data.message)
                              this.setState({
                                   sendingLoader: !this.state.sendingLoader,
                                   msg: ""
                              });

                         }).catch((err) => {
                              alert(JSON.stringify(err.response.data.message))
                              this.setState({
                                   sendingLoader: !this.state.sendingLoader,
                              });

                         })
                    this.setState({ isModalVisible: false });
               }

               else {
                    alert(this.props.str.pleasetypemessage)
               }
          }




          if (this.props.projectsData) {
               console.log(this.props.projectsId, this.props.projectsData.user_name, this.props.projectsData.user_email, this.props.projectsData.contact_phone, "sendMsg")
               if (this.state.emailSubject != undefined || this.state.msg != undefined) {
                    this.setState({ sendingLoader: !this.state.sendingLoader });
                    var bodyFormData = new FormData();
                    bodyFormData.append("project_id", this.props.projectsId);
                    bodyFormData.append("sender_name", this.props.projectsData.user_name);
                    bodyFormData.append("sender_email", this.props.projectsData.user_email);
                    bodyFormData.append("subject", this.state.emailSubject);
                    bodyFormData.append("msgs", this.state.msg);
                    var options = {
                         method: 'POST',
                         url: 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/task/guest/contactOwnerProject',
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
                    console.log(bodyFormData, '****61');
                    axios(options)
                         .then((data) => {
                              // console.log(data.data.message, 'DATAT')
                              alert(data.data.message)
                              this.setState({
                                   sendingLoader: !this.state.sendingLoader,
                                   msg: ""
                              });

                         }).catch((err) => {
                              alert(JSON.stringify(err.response.data.message))
                              this.setState({
                                   sendingLoader: !this.state.sendingLoader,
                              });

                         })
                    this.setState({ isModalVisible: false });
               }

               else {
                    alert(this.props.str.pleasetypemessage)
               }
          }
     }

     render() {
          console.log(this.props.taskerData, "taskerDatataskerData")

          // console.log(this.props.tasksData, "task")
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

                                   {
                                        (this.props.projectsData) ? (
                                             //  {/* Email Subject */}
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

                                        ) : null
                                   }

                                   {/* Message */}
                                   <View style={{
                                        height: this.props.projectsData ? "50%" : "70%",
                                        padding: "5%", marginTop: 10, width: "95%", borderBottomColor: "#F4F2F4", borderBottomWidth: 0.5,


                                   }}>
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

                                   {
                                        (this.state.sendingLoader === false) ? (
                                             <TouchableOpacity style={{ marginBottom: 10, marginTop: 10, backgroundColor: "#E94E1B", width: "95%", height: "10%", justifyContent: "center", alignItems: "center" }}
                                                  onPress={() => this.sendMail()}>
                                                  <Text style={{ fontSize: 13, color: "white" }}>{this.props.str.sendmsg}</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(SendMsgToTasker);


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
