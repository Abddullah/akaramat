import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, StatusBar, RefreshControl,
    Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Badge, Picker, Item } from 'native-base';
import { connect } from "react-redux";
import axios from 'axios';
// import Drawer from '../../Component/drawer';
import InfiniteScroll from 'react-native-infinite-scroll';
class InvestBody extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedValue: "Actions",
            activity: false,
            moreloader: false,
            isloader: false,
            page: 10,

        }
    }
    // componentWillMount() {
    //     var { height, width } = Dimensions.get('window');
    //     this.setState({
    //         screenHeight: height,
    //     })

    //     this.setState({
    //         token: this.props.userCredentials.token,
    //     }, () => {
    //         console.log(this.state.token, this.props.userCredentials.token, "token")
    //     })
    //     this._onRefreshTasker()
    // }
    // requestOnServer = (functionName, uri, del) => {
    //     console.log(functionName, uri, "functionName, uri", this.props.userCredentials.token)
    //     return axios({
    //         method: del ? "DELETE" : 'get',
    //         url: uri,
    //         headers: {
    //             "token": `bearer ${this.props.userCredentials.token}`,
    //             'postman-token': '553d07fc-3950-1199-efd9-6b5b5f8315a2',
    //             'cache-control': 'no-cache',
    //             "clientsecret": '(*jh2kj36gjhasdi78743982u432j',
    //             "clientkey": '34532hbjdsakjd2&&gjhjh11',
    //             'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
    //             "Allow-Cross-Origin": '*',
    //         },
    //     }).then(data => {
    //         if (functionName === "_onRefreshTasker") {

    //             console.log(data.data.results, "response");
    //             this.setState({
    //                 iAddedProperties: data.data.results,
    //                 isloader: false,
    //                 page: 10,
    //                 // selectedValue: data.data.results.status === "Active" ? "Deactive" : "Active"
    //             })
    //         }
    //         else if (functionName === "_onEndReached") {
    //             let cloneiAddedProperties = this.state.iAddedProperties
    //             let responseAPI = data.data.results
    //             for (var i = 0; i < responseAPI.length; i++) {
    //                 cloneiAddedProperties.push(responseAPI[i])
    //             }
    //             console.log(responseAPI, "reachend")
    //             this.setState({
    //                 moreloader: false,
    //                 page: this.state.page + 10,
    //                 iAddedProperties: cloneiAddedProperties
    //             })
    //         }
    //         else if (functionName === "onChangeStatus") {
    //             alert(data.data.message)
    //             this._onRefreshTasker()

    //             // console.log(data, "datadatadata")
    //         }
    //         else if (functionName === "getFullPost") {
    //             console.log(data.data.results, "get fulll")
    //             Actions.FithPageList({ propertyData: data.data.results })

    //         }
    //     }).catch(err => {
    //         var errUpdate = JSON.stringify(err);
    //         console.log(JSON.parse(errUpdate));
    //         console.log(err)
    //         alert(err.message)
    //         this.setState({
    //             err: err.message,
    //             isloader: false
    //         })
    //     })

    // }
    // _onRefreshTasker() {
    //     console.log("work", this.state.token)
    //     let uri;
    //     this.setState({
    //         isloader: true
    //     })
    //     if (this.props.rout === "properties") {
    //         console.log("work")
    //         uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteProperties/10/0"
    //     }
    //     else if (this.props.rout === "agentFavorites") {
    //         console.log("agent")
    //         uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteUser/agent/10/0"

    //     }
    //     else if (this.props.rout === "taskerFavorites") {
    //         console.log("taskerFavorites")
    //         uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteUser/tasker/10/0"
    //     }
    //     else if (this.props.rout === "InternationalPartner") {
    //         console.log("InternationalPartner")
    //         uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteUser/international/10/0"
    //     }
    //     else if (this.props.rout === "Representative") {
    //         console.log("InternationalPartner")
    //         uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteUser/representative/10/0"
    //     }
    //     else if (this.props.rout === "TasksFavorites") {
    //         console.log("InternationalPartner")
    //         uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteTasks/10/0"
    //     }
    //     else if (this.props.rout === "requestsFavorites") {
    //         console.log("InternationalPartner")
    //         uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteRequests/10/0"
    //     }
    //     else if (this.props.rout === "SearchesFavorites") {
    //         console.log("SearchesFavorites")
    //         uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteSearches/10/0"
    //     }
    //     this.requestOnServer("_onRefreshTasker", uri)
    // }
    // _onEndReached() {
    //     this.setState({
    //         moreloader: true
    //     })
    //     let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/user/getListPropertyAddedByUsertoken/10" + this.state.page + 10
    //     this.requestOnServer("_onEndReached", uri)
    // }
    // onChangeStatus = (value, id, status) => {
    //     console.log(value, id, status, "value")
    //     this.setState({
    //         selectedValue: value
    //     })
    //     let uri;
    //     if (value === this.props.str.delete && this.props.rout === "agentFavorites") {
    //         console.log("ifffff")
    //         uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/deleteFavorite/agent/" + id
    //     }
    //     else if (value === this.props.str.delete && this.props.rout === "properties") {
    //         console.log("else ifffff")
    //         uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/deleteFavorite/property/" + id

    //     }
    //     else if (value === this.props.str.delete && this.props.rout === "taskerFavorites") {
    //         console.log("else ifffff")
    //         uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/deleteFavorite/tasker/" + id

    //     }
    //     else if (value === this.props.str.delete && this.props.rout === "InternationalPartner") {
    //         console.log("else ifffff")
    //         uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/deleteFavorite/international/" + id
    //     }
    //     else if (value === this.props.str.delete && this.props.rout === "Representative") {
    //         console.log("else ifffff")
    //         uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/deleteFavorite/representative/" + id
    //     }
    //     else if (value === this.props.str.delete && this.props.rout === "TasksFavorites") {
    //         console.log("else ifffff")
    //         uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/deleteFavorite/task/" + id
    //     }
    //     else if (value === this.props.str.delete && this.props.rout === "requestsFavorites") {
    //         console.log("else ifffff")
    //         uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/deleteFavorite/request/" + id
    //     }
    //     this.requestOnServer("onChangeStatus", uri, "delete")
    // }
    // getFullPost = (id) => {
    //     console.log("worsk", id)
    //     let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/guest/getPropertyDetail/" + id
    //     if (this.props.rout === "properties") {
    //         this.requestOnServer("getFullPost", uri)
    //     }

    // }
    render() {
        return (
            <View style={{
                flex: 1, width: "100%",
            }}>
                {/* //////////////////////////////////////Properties i added////////////////////////////////////// */}
                {
                    // (this.state.iAddedProperties) ? (
                    (this.state.isloader === true) ? (
                        <View style={{
                            justifyContent: 'center',
                            alignItems: "center",
                            height: this.state.screenHeight / 1.25
                        }}>
                            <ActivityIndicator size="large" color="#E94E1B" />
                            <Text style={{ marginTop: 10 }} >Loading....</Text>
                        </View>
                    ) : <InfiniteScroll
                        horizontal={false}  //true - if you want in horizontal
                        // onLoadMoreAsync={this._onEndReached.bind(this, "_onEndReached")}
                        distanceFromEnd={12} // distance in density-independent pixels from the right end
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.activity}
                            // onRefresh={this._onRefreshTasker.bind(this, "_onRefreshTasker")} 
                            />
                        }
                    >
                            <View style={{ paddingVertical: 5 }}>
                                <Text style={{ padding: 7 }}>
                                    {this.props.str.Immunetodoubt}
                                </Text>

                                <Text style={{ padding: 7 }}>
                                    {this.props.str.FixedAssets}
                                </Text>
                                <Text style={{ padding: 7 }}>
                                    {this.props.str.Heretheinvestor}
                                </Text>
                            </View>

                            <View style={{ padding: 7, }}>
                                <TouchableOpacity
                                    onPress={() => Actions.addInvestor()}
                                    style={{ padding: 7, backgroundColor: "#908073", borderRadius: 5 }}>
                                    <Text style={{ color: "white" }}>{this.props.str.IneedAkaratmisr}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ paddingVertical: 5 }}>
                                <Text style={{ padding: 7 }}>
                                    {this.props.str.CapitalInvestment}
                                </Text>
                                <Text style={{ padding: 7 }}>
                                    {this.props.str.HereYouhavespecific}
                                </Text>
                                <Text style={{ padding: 7 }}>
                                    {this.props.str.Filltheform}
                                </Text>
                                <Text style={{ padding: 7 }}>
                                    {this.props.str.teamwillgothrough}

                                </Text>
                                <Text style={{ padding: 7 }}>
                                    {this.props.str.bewithyouuntil}

                                </Text>
                                <Text style={{ padding: 7 }}>
                                    {this.props.str.Iftheinvestmentopportunity}
                                </Text>
                            </View>

                            <View style={{ padding: 7, }}>
                                <TouchableOpacity
                                    onPress={() => Actions.addInvestorMoney()}
                                    style={{ padding: 7, backgroundColor: "#908073", borderRadius: 5 }}>
                                    <Text style={{ color: "white" }}>{this.props.str.Ihavemoney}</Text>
                                </TouchableOpacity>
                            </View>

                        </InfiniteScroll>
                    // ) : null
                }
            </View>
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
        // languageSet: (lang) => {
        //     dispatch(languageSet(lang))
        // },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(InvestBody);
const styles = StyleSheet.create({
});  
