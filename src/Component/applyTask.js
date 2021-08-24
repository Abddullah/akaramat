
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

class ApplyTask extends Component {
     constructor(props) {
          super(props)
          this.state = {
               isModalVisible: false,
               sendingLoader: false

          }
     }
     componentWillMount() {
          console.log(this.props.task_id, "all task in my state")
          var { height, width } = Dimensions.get('window');
          this.setState({
               screenHeight: height,
          })

          this.getDurationTime(this)

     }

     componentWillReceiveProps(nextProps) {
          if (nextProps.modalOpen) {
               this.setState({ isModalVisible: true });
               // alert("working modal")
               // _toggleModal = () =>
               // this.setState({ isModalVisible: !this.state.isModalVisible });
               this.props.emailSending()
          }
     }


     getDurationTime() {
          return axios({
               method: 'get',
               url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/dataselect/getDurationTime",
               headers: {
                    "clientkey": "34532hbjdsakjd2&&gjhjh11",
                    "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
               },
          })
               .then(data => {
                    console.log(data, "data")
                    this.setState({
                         durationTime: data.data.results,
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


     sendMail() {
          if (
               this.state.quoteinegp &&
               this.state.durationTimeSelected
               // this.state.ordays != undefined ||
               // this.state.msg != undefined
          ) {
               this.setState({ sendingLoader: !this.state.sendingLoader });

               var bodyFormData = new FormData();
               if (this.props.route === "requestsTasker") {
                    bodyFormData.append("task_id", this.props.idOfTask);
                    bodyFormData.append("quote", this.state.quoteinegp);
                    bodyFormData.append("duration", this.state.durationTimeSelected);
                    bodyFormData.append("days", this.state.ordays);
                    bodyFormData.append("question", this.state.msg);


               }
               else {
                    bodyFormData.append("task_id", this.props.taskId);
                    bodyFormData.append("quote", this.state.quoteinegp);
                    bodyFormData.append("duration", this.state.durationTimeSelected);
                    bodyFormData.append("days", this.state.ordays);
                    bodyFormData.append("question", this.state.msg);


               }
               var options = {
                    method: 'POST',
                    url: 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/task/user/applyTask',
                    headers:
                    {
                         token: "bearer " + this.props.userCredentials.token,
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
                         this.setState({ sendingLoader: !this.state.sendingLoader });
                         if (this.props.route === "requestsTasker") {
                              Actions.tabbar({ type: "reset" });
                              Actions.tabNavigation();
                         }

                    }).catch((err) => {
                         alert(JSON.stringify(err.response.data.message))
                         this.setState({ sendingLoader: !this.state.sendingLoader });
                    })
               this.setState({ isModalVisible: false });

          }
          else {
               alert(this.props.str.pleasefillfullform)
          }
     }

     render() {
          // console.log(this.props.task_id, "this.state.durationTimeSelected")
          return (
               <View>
                    <Modal isVisible={this.state.isModalVisible}>
                         <View style={{ height: this.state.screenHeight / 1.4, justifyContent: 'center', alignItems: "center", }}>
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
                                   {/* quoteinegp */}
                                   <View style={{ marginTop: 0 }}>
                                        <Item style={styles.input}>
                                             <Input
                                                  // keyboardType={"number"}
                                                  placeholder={this.props.str.quoteinegp}
                                                  placeholderStyle={{ fontSize: 10 }}
                                                  placeholderTextColor="#b3b3b3"
                                                  label={this.props.str.quoteinegp}
                                                  style={{ fontSize: 15 }}
                                                  onChangeText={(e) => { this.setState({ quoteinegp: e }) }}
                                                  value={this.state.quoteinegp}
                                             />
                                             <IconEntypo name='price-tag' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                        </Item>
                                   </View>

                                   {/* duration */}

                                   <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                                        {
                                             (this.state.durationTime) ? (
                                                  <Item>
                                                       <Picker
                                                            mode="dropdown"
                                                            style={{ height: 50, width: "90%", color: "black" }}
                                                            placeholderStyle={{ color: "#E94E1C" }}
                                                            placeholderIconColor="#E94E1C"
                                                            selectedValue={this.state.durationTimeSelected}
                                                            onValueChange={
                                                                 (itemValue, itemIndex) => this.setState({ durationTimeSelected: itemValue })
                                                            }
                                                       >
                                                            <Picker.Item label={this.props.str.duration} value="" />
                                                            {
                                                                 Object.keys(this.state.durationTime).map((key, index) => {
                                                                      return (
                                                                           <Picker.Item label={this.state.durationTime[key]} value={this.state.durationTime[key]} key={this.state.durationTime[key]} />
                                                                      )
                                                                 })
                                                            }
                                                       </Picker>
                                                  </Item>
                                             ) : null
                                        }
                                   </View>


                                   {/* quoteinegp */}
                                   <View style={{ marginTop: 0 }}>
                                        <Item style={styles.input}>
                                             <Input
                                                  // keyboardType={"number"}
                                                  placeholder={this.props.str.ordays}
                                                  placeholderStyle={{ fontSize: 10 }}
                                                  placeholderTextColor="#b3b3b3"
                                                  label={this.props.str.ordays}
                                                  style={{ fontSize: 15 }}
                                                  onChangeText={(e) => { this.setState({ ordays: e }) }}
                                                  value={this.state.ordays}
                                             />
                                             <IconMaterialCommunityIcons name='text-subject' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                        </Item>
                                   </View>

                                   {/* doyouhavequestionforthistask */}
                                   <View style={{ padding: "5%", marginTop: 10, width: "95%", borderBottomColor: "#F4F2F4", borderBottomWidth: 0.5 }}>
                                        <Text style={{ color: "black", marginBottom: 20 }}>{this.props.str.message}</Text>
                                        <Textarea
                                             containerStyle={styles.textareaContainer}
                                             style={styles.textarea}
                                             onChangeText={(e) => { this.setState({ msg: e }) }}
                                             defaultValue={this.state.msg}
                                             // maxLength={500}
                                             placeholder={this.props.str.doyouhavequestionforthistask}
                                             placeholderTextColor={'#c7c7c7'}
                                             underlineColorAndroid={'transparent'}
                                        />
                                   </View>
                                   <TouchableOpacity style={{ marginBottom: 10, marginTop: 10, backgroundColor: "#E94E1B", width: "95%", height: "10%", justifyContent: "center", alignItems: "center" }}
                                        onPress={() => this.sendMail()}>
                                        <Text style={{ fontSize: 13, color: "white" }}>{this.props.str.applytask}</Text>
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
          taskId: state.root.taskId,
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
export default connect(mapStateToProps, mapDispatchToProps)(ApplyTask);


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
