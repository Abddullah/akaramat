
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Picker, Image, SafeAreaView, ActivityIndicator, images, Dimensions, RefreshControl } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Item, Fab, Input } from 'native-base';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Modal from "react-native-modal";
import Textarea from 'react-native-textarea';
import axios from 'axios';
import InfiniteScroll from 'react-native-infinite-scroll';

class Applicants extends Component {
     constructor(props) {
          super(props)
          this.state = {
               page: 0,
               activity: false,
               moreloader: false,
               isloader: true,
          }
     }
     componentWillMount() {
          console.log(this.props.taskIdFrmDra,"this.props.taskId")
          this.getApplicants(this)
     }

     componentWillReceiveProps(nextProp) {
          this.getApplicants(this)
     }

     getApplicants() {
          // console.log(this.props.taskId,"this.props.taskId")
          
          if (this.props.taskId ||this.props.taskIdFrmDra) {
               return axios({
                    method: 'get',
                    url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/guest/getApplicantsByTaskId/" + (this.props.taskIdFrmDra?this.props.taskIdFrmDra: this.props.taskId) + "/10/" + this.state.page,
                    headers: {
                         "clientkey": "34532hbjdsakjd2&&gjhjh11",
                         "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                    },
               })
                    .then(data => {

                         console.log(data, "data")
                         this.setState({
                              applicants: data.data.results,
                              page: this.state.page + 10,
                              isloader: !this.state.isloader
                         })
                    })
                    .catch(err => {
                         alert(JSON.stringify(err.response.data.message))
                         console.log(JSON.parse(JSON.stringify(err)), 'ERRROR')
                         console.log(err)
                         alert(err.message)
                         this.setState({
                              err: err.message,
                              isloader: !this.state.isloader
                         })
                    })
          }

     }

     // for refresh list 
     _onRefresh() {
          // alert("working refresh")
          if (this.props.taskId ||this.props.taskIdFrmDra) {
               return axios({
                    method: 'get',
                    url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/guest/getApplicantsByTaskId/" + (this.props.taskIdFrmDra?this.props.taskIdFrmDra: this.props.taskId) + "/10/" + this.state.page,
                    headers: {
                         "clientkey": "34532hbjdsakjd2&&gjhjh11",
                         "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                    },
               })
                    .then(data => {
                         // console.log(data, "data")
                         // this.setState({
                         //      applicants: data.data.results,
                         //      page: this.state.page + 10,
                         //      isloader: !this.state.isloader
                         // })

                         let applicantsData = this.state.applicants
                         let responseAPI = data.data.results
                         console.log(responseAPI, "responseInMoredata");
                         for (var i = 0; i < responseAPI.length; i++) {
                              applicantsData.push(responseAPI[i])
                         }
                         this.setState({
                              moreloader: false,
                              page: this.state.page + 10,
                              applicants: applicantsData
                         })

                    })
                    .catch(err => {
                         alert(JSON.stringify(err.response.data.message))
                         console.log(JSON.parse(JSON.stringify(err)), 'ERRROR')
                         console.log(err)
                         alert(err.message)
                         this.setState({
                              err: err.message,
                              isloader: !this.state.isloader
                         })
                    })
          }


     }


     // for more list 
     _onEndReached() {
          // this.setState({
          //      moreloader: true
          // })
          // alert("working reach end")

     }

     render() {
          return (
               <Container style={{ flex: 1 }}>
                    <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }}>
                         <View style={{
                              flex: 1, width: "100%",
                              // backgroundColor: "green"
                         }}>
                              <View style={{
                                   flex: 0.55,
                                   flexDirection: "row",
                                   width: "100%",
                                   backgroundColor: "#F2F1F0"
                              }}>
                                   <View style={{
                                        flex: 0.5, width: "100%", justifyContent: "center", alignItems: "center",
                                        // backgroundColor: "orange"
                                   }}><Text style={{ fontWeight: "bold", fontSize: 15 }}>{this.props.str.taskername}</Text>
                                   </View>

                                   <View style={{
                                        flex: 0.5, width: "100%", justifyContent: "center", alignItems: "center", borderLeftColor: "#E7E5E2", borderLeftWidth: 2,
                                        // backgroundColor: "yellow"
                                   }}><Text style={{ fontWeight: "bold", fontSize: 15 }}>{this.props.str.dateapplied}</Text>
                                   </View>
                              </View>
                              <View style={{
                                   flex: 6, width: "100%",
                                   // backgroundColor: "green"
                              }}>

                                   {
                                        (this.state.applicants) ? (
                                             <View style={{ flex: 8, width: "100%", }}>
                                                  {
                                                       (this.state.isloader === true) ? (
                                                            <View style={{
                                                                 flex: 1,
                                                                 justifyContent: 'center',
                                                                 alignItems: "center",
                                                            }}>
                                                                 <ActivityIndicator size="large" color="#E94E1B" />
                                                                 <Text style={{ marginTop: 10 }} >Loading....</Text>
                                                            </View>
                                                       ) :
                                                            <InfiniteScroll
                                                                 horizontal={false}  //true - if you want in horizontal
                                                                 onLoadMoreAsync={this._onEndReached.bind(this)}
                                                                 distanceFromEnd={12} // distance in density-independent pixels from the right end
                                                                 refreshControl={
                                                                      <RefreshControl
                                                                           refreshing={this.state.activity}
                                                                           onRefresh={this._onRefresh.bind(this)} />
                                                                 }
                                                            >
                                                                 {
                                                                      (this.state.applicants.length != 0) ? (
                                                                           <View>
                                                                                {
                                                                                     this.state.applicants.map((key, index) => {
                                                                                          console.log(key, index, "index")
                                                                                          return (
                                                                                               <View key={index} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", borderBottomColor: "#B1AFAC", borderBottomWidth: 0.5 }}
                                                                                               // onPress={() => { Actions.FithPageList({ propertyData: key }) }}
                                                                                               >
                                                                                                    <View style={{ flex: 1, marginBottom: 10, justifyContent: "center", alignItems: "center", }}>
                                                                                                         <Text style={{ marginTop: 10 }} >{key.full_name}</Text>
                                                                                                    </View>
                                                                                                    <View style={{ flex: 1, marginBottom: 10, justifyContent: "center", alignItems: "center", }}>
                                                                                                         <Text style={{ marginTop: 10 }} >{key.date}</Text>
                                                                                                    </View>
                                                                                               </View>
                                                                                          )
                                                                                     })
                                                                                }
                                                                                {
                                                                                     (this.state.moreloader === true) ? (
                                                                                          <View style={{
                                                                                               justifyContent: 'center',
                                                                                               alignItems: "center",
                                                                                               marginBottom: 20,
                                                                                               marginTop: 20,
                                                                                          }}>
                                                                                               <ActivityIndicator size="large" color="#E94E1B" />
                                                                                          </View>
                                                                                     ) : null
                                                                                }
                                                                           </View>
                                                                      ) :
                                                                           <View style={{
                                                                                flex: 1,
                                                                                justifyContent: 'center',
                                                                                alignItems: "center",
                                                                                marginBottom: 20,
                                                                                marginTop: 20,
                                                                           }}>
                                                                                <Text style={{ color: "black" }}>{this.props.str.thereisnodataavailable}</Text>
                                                                           </View>
                                                                 }
                                                            </InfiniteScroll>
                                                  }
                                             </View>
                                        ) : null
                                   }

                              </View>
                         </View>
                    </View>
               </Container>
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
export default connect(mapStateToProps, mapDispatchToProps)(Applicants);


const styles = StyleSheet.create({
     // holder: {
     //      flex: 0.25,
     //      justifyContent: 'center',
     // },
});  
