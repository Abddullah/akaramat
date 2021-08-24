import React, { Component } from 'react';
import { Text, View } from 'native-base';
import { Button, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions, Alert } from 'react-native';
// import { login, notifications, logOut } from '../store/action/action';
import * as Animatable from 'react-native-animatable';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import axios from 'axios'
import {
     StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ApplyTask from '../Component/applyTask';

class PropertiesOwnerDrabody extends Component {
     constructor() {
          super()
          this.state = {
               haveProperties: "Loading...",
               loading: false
          }

     }

     componentWillMount() {
          var { height, width } = Dimensions.get('window');
          this.setState({
               screenHeight: height,
          })

          if (this.props.ownerProperties) {
               console.log(this.props.ownerProperties.length, "length")
               if (this.props.ownerProperties.length >= 25) {
                    this.setState({
                         haveProperties: "50+"
                    })
               }
               else {
                    this.setState({
                         haveProperties: this.props.ownerProperties.length
                    })
               }
          }
     }


     componentWillReceiveProps(nextProps) {
          if (nextProps.ownerProperties) {
               console.log(nextProps.ownerProperties.length, nextProps, "length")
               if (nextProps.ownerProperties.length >= 25) {
                    this.setState({
                         haveProperties: "25+"
                    })
               }
               else {
                    this.setState({
                         haveProperties: nextProps.ownerProperties.length
                    })
               }
          }
     }

     ApiRequest = async (url, bodyFormData) => {

          var header1 = {
               token: "bearer " + this.props.userCredentials.token,
               clientsecret: '(*jh2kj36gjhasdi78743982u432j',
               clientkey: '34532hbjdsakjd2&&gjhjh11',
               "Content-Type": "application/json",
          }

          var options = {
               method: 'POST',
               url: url,
               headers: header1,
               data: bodyFormData
          };
          return await axios(options)
               .then((data) => {
                    console.log(data, "data")
                    return data
               }).catch((err) => {
                    return err
               })

     }

     promoteMyProperty() {

          this.setState({
               loading: true
          })

          const url = `https://demo.akaratmisr.com:443/${this.props.str.language}/api/property/user/promoteProperty`
          const propertyCode = this.props.post_id

          console.log(this.props.userCredentials.token, 'token')
          console.log(this.props.post_id, 'post_id post_id')

          var bodyFormData = new FormData();

          bodyFormData.append('post_id', propertyCode);

          this.ApiRequest(url, bodyFormData).then((data) => {
               this.setState({
                    loading: false
               })
               if (data && data.data && data.data.message && data.data.status == 1000) {
                    alert(data.data.message)
               } else {
                    alert(JSON.stringify(data.response.data.message))
               }
          }).catch((err) => {
               this.setState({
                    loading: false
               })
               console.log(err, 'err')
               alert(err.response.data.message)
          })
     }

     promoteProperty() {

          Alert.alert(
               '',
               `${this.props.str.copyProperty}`,
               [
                    {
                         text: 'Yes',
                         onPress: () => this.promoteMyProperty(),
                         style: 'cancel',
                    },
                    { text: 'No', onPress: () => console.log('OK Pressed') },
               ],
               { cancelable: false }
          );

     }

     emailSending() {
          this.setState({
               emailSendingFlag: !this.state.emailSendingFlag
          })
     }
     render() {
          const { loading } = this.state
          console.log(this.props.ownerDetails, this.props.ownerProperties, this.props.created_by, "Dbody")
          return (
               <View style={{ flex: 3, }}>
                    <ApplyTask
                         modalOpen={this.state.emailSendingFlag}
                         addId={this.state.addId}
                         emailSending={() => this.emailSending()} />

                    <ScrollView style={{ flex: 1, marginBottom: "3.5%", backgroundColor: "white" }}>
                         <View style={{ backgroundColor: "red ", justifyContent: "center", alignItems: "center" }}>
                              <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}>{this.props.str.postedby}</Text>
                         </View>
                         {
                              (this.props.ownerDetails) ? (
                                   <View style={{ marginHorizontal: "5%", borderBottomColor: "grey", borderBottomWidth: 0.4, }}>
                                        <View style={{ borderBottomColor: "grey", borderBottomWidth: 0.4, }}>
                                             <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 13, }}>{this.props.str.name1}</Text>
                                             {
                                                  (this.props.ownerDetails.user_name != "") ? (
                                                       <Text style={{ fontSize: 10, marginTop: 3, marginBottom: 3, color: "grey" }}>{this.props.ownerDetails.user_name}</Text>
                                                  ) : <Text style={{ fontSize: 10, marginTop: 3, marginBottom: 3, color: "grey" }}>N/a</Text>
                                             }
                                        </View>
                                        <View style={{ borderBottomColor: "grey", borderBottomWidth: 0.4, }}>
                                             <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 13 }}>{this.props.str.phone}</Text>
                                             {
                                                  (this.props.ownerDetails.user_name != "") ? (
                                                       <Text style={{ fontSize: 10, marginTop: 3, marginBottom: 3, color: "grey" }}>{this.props.ownerDetails.phone || this.props.ownerDetails.contact_phone}</Text>
                                                  ) : <Text style={{ fontSize: 10, marginTop: 3, marginBottom: 3, color: "grey" }}>N/a</Text>
                                             }
                                        </View>
                                        <TouchableOpacity style={{ borderBottomColor: "grey", borderBottomWidth: 0.4, }}
                                             onPress={() => {
                                                  Actions.ForthPageList({
                                                       OwnerProperties: this.props.ownerProperties,
                                                       created_by: this.props.created_by
                                                  })
                                             }}
                                        >
                                             <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 13 }}>{this.props.str.properties1}</Text>
                                             <Text style={{ fontSize: 10, marginTop: 3, marginBottom: 3, color: "grey" }}>{this.state.haveProperties}</Text>
                                        </TouchableOpacity>
                                        {
                                             this.props.post_id ?

                                                  <TouchableOpacity>
                                                       <View
                                                            style={{ paddingVertical: 30, alignItems: 'center' }}
                                                       >
                                                            <View style={{ width: '80%' }}>
                                                                 {
                                                                      loading ?
                                                                           <ActivityIndicator />
                                                                           :
                                                                           <Button
                                                                                onPress={() => this.promoteProperty()}
                                                                                color={'#E94E1B'}
                                                                                title={this.props.str.promoteProperty}
                                                                           />
                                                                 }
                                                            </View>
                                                       </View>
                                                  </TouchableOpacity>
                                                  :
                                                  null
                                        }
                                        {/* <TouchableOpacity style={{ width: "100%", marginTop: "10%", marginBottom: 3, backgroundColor: "red" }}>
                                             <Text>Apply Task</Text>
                                        </TouchableOpacity> */}


                                        {
                                             (this.props.routName === "Tasks") ? (
                                                  <View>
                                                       <TouchableOpacity style={{ borderBottomColor: "grey", borderBottomWidth: 0.4, }}
                                                            onPress={() => { Actions.Applicants() }}
                                                       >
                                                            <Text style={{ fontWeight: "bold", marginTop: 20, marginBottom: 8, fontSize: 13 }}>{this.props.str.listapplicants}</Text>
                                                       </TouchableOpacity>

                                                       <View style={{ borderBottomColor: "grey", borderBottomWidth: 0.4, }}>
                                                            <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 13 }}>{this.props.str.applytask}</Text>
                                                            <TouchableOpacity style={{ backgroundColor: '#E94E1B', marginTop: "3%", height: 40, justifyContent: "center", alignItems: "center" }}
                                                                 onPress={() => this.emailSending()}
                                                            >
                                                                 <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 3, marginBottom: 3, color: "white" }}>{this.props.str.applytask}</Text>
                                                            </TouchableOpacity>
                                                       </View>
                                                  </View>
                                             ) : null
                                        }
                                   </View>

                              ) :
                                   <View style={{
                                        flex: 8, width: "100%",
                                        justifyContent: 'center',
                                        alignItems: "center",
                                        marginBottom: 20,
                                        marginTop: 20,
                                   }}>
                                        <ActivityIndicator size="large" color="#E94E1B" />
                                        {
                                             (this.state.err) ?
                                                  (
                                                       <Text style={{ marginTop: 10 }}>{this.state.err}</Text>
                                                  ) : <Text style={{ marginTop: 10 }} >Loading....</Text>
                                        }
                                   </View>
                         }

                    </ScrollView>
               </View>
          );
     }
}



function mapStateToProp(state) {
     return ({
          str: state.root.str,
          userData: state.root.userDetails,
          userCredentials: state.root.userCredentials
     })
}
function mapDispatchToProp(dispatch) {
     return ({

     })
}
export default connect(mapStateToProp, mapDispatchToProp)(PropertiesOwnerDrabody);
const styles = StyleSheet.create({
     container: {
          flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF',
     },
     TouchableMain: {
          flexDirection: "row", marginTop: 10, flex: 1, marginLeft: 5,
     },
     icon: {
          flex: 1.5, justifyContent: "center", alignItems: "center",
     },
     text: {
          justifyContent: "center", marginLeft: 3, flex: 9,
     },
     insideText: {
          color: "#908073", fontSize: 17
     },
})