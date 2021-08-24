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
class Outboxbody extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedValue: "Actions",
            activity: false,
            moreloader: false,
            isloader: false,
            page: 0,

        }
    }
    componentWillMount() {
        var { height, width } = Dimensions.get('window');
        this.setState({
            screenHeight: height,
        })

        this.setState({
            token: this.props.userCredentials.token,
        }, () => {
            console.log(this.state.token, this.props.userCredentials.token, "token")
        })
        this._onRefreshTasker()
    }
    requestOnServer = (functionName, uri, del) => {
        console.log(functionName, uri, "functionName, uri", this.props.userCredentials.token)
        return axios({
            method: del ? "DELETE" : 'get',
            url: uri,
            headers: {
                "token": `bearer ${this.props.userCredentials.token}`,
                'postman-token': '553d07fc-3950-1199-efd9-6b5b5f8315a2',
                'cache-control': 'no-cache',
                "clientsecret": '(*jh2kj36gjhasdi78743982u432j',
                "clientkey": '34532hbjdsakjd2&&gjhjh11',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                "Allow-Cross-Origin": '*',
            },
        }).then(data => {
            if (functionName === "_onRefreshTasker") {

                console.log(data.data.results, "response",this.state.page);
                this.setState({
                    iAddedProperties: data.data.results,
                    isloader: false,
                    page: 10,
                    // selectedValue: data.data.results.status === "Active" ? "Deactive" : "Active"
                })
            }
            else if (functionName === "_onEndReached") {

                let cloneiAddedProperties = this.state.iAddedProperties
                let responseAPI = data.data.results
                for (var i = 0; i < responseAPI.length; i++) {
                    cloneiAddedProperties.push(responseAPI[i])
                }
                console.log(responseAPI, "reachend",this.state.page)
                this.setState({
                    moreloader: false,
                    page: this.state.page + 10,
                    iAddedProperties: cloneiAddedProperties
                })
            }
            else if (functionName === "onChangeStatus") {
                alert(data.data.message)
                this._onRefreshTasker()

                // console.log(data, "datadatadata")
            }
            else if (functionName === "getFullPost") {
                console.log(data.data.results, "get fulll")
                Actions.FithPageList({ propertyData: data.data.results })

            }
        }).catch(err => {
            var errUpdate = JSON.stringify(err);
            console.log(JSON.parse(errUpdate));
            console.log(err)
            alert(err.message)
            this.setState({
                err: err.message,
                isloader: false
            })
        })

    }
    _onRefreshTasker() {

        console.log("work", this.state.token)
        let uri;
        this.setState({
            isloader: true
        })
        if (this.props.rout === "outBoxBody") {
            console.log("outBoxBody")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/mailbox/user/getOutEmail/10/0"
        }
       
        this.requestOnServer("_onRefreshTasker", uri)
    }
    _onEndReached() {
        // alert("work alert")
        this.setState({
            moreloader: true
        })
        if(this.state.moreloader===false){
            console.log(this.state.page,"pagee")
            let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/mailbox/user/getOutEmail/10/" + this.state.page 
            this.requestOnServer("_onEndReached", uri)
        }
    }
    onChangeStatus = (value, id, status) => {
        console.log(value, id, status, "value")
        this.setState({
            selectedValue: value
        })
        let uri;
        if (value === this.props.str.delete && this.props.rout === "agentFavorites") {
            console.log("ifffff")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/deleteFavorite/agent/" + id
        }
        else if (value === this.props.str.delete && this.props.rout === "properties") {
            console.log("else ifffff")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/deleteFavorite/property/" + id

        }
        else if (value === this.props.str.delete && this.props.rout === "taskerFavorites") {
            console.log("else ifffff")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/deleteFavorite/tasker/" + id

        }
        else if (value === this.props.str.delete && this.props.rout === "InternationalPartner") {
            console.log("else ifffff")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/deleteFavorite/international/" + id
        }
        else if (value === this.props.str.delete && this.props.rout === "Representative") {
            console.log("else ifffff")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/deleteFavorite/representative/" + id
        }
        else if (value === this.props.str.delete && this.props.rout === "TasksFavorites") {
            console.log("else ifffff")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/deleteFavorite/task/" + id
        }
        else if (value === this.props.str.delete && this.props.rout === "requestsFavorites") {
            console.log("else ifffff")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/deleteFavorite/request/" + id
        }
        this.requestOnServer("onChangeStatus", uri, "delete")
    }
    getFullPost = (id) => {
        console.log("worsk", id)
        let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/guest/getPropertyDetail/" + id
        if (this.props.rout === "properties") {
            this.requestOnServer("getFullPost", uri)
        }

    }
    render() {
        return (
            <View style={{
                flex: 1, width: "100%",
            }}>
                {/* //////////////////////////////////////Properties i added////////////////////////////////////// */}
                {
                    // (this.state.iAddedProperties) ? (
                    (this.state.isloader === true || !this.state.iAddedProperties) ? (
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
                        onLoadMoreAsync={this._onEndReached.bind(this, "_onEndReached")}
                        distanceFromEnd={12} // distance in density-independent pixels from the right end
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.activity}
                                onRefresh={this._onRefreshTasker.bind(this, "_onRefreshTasker")} />
                        }
                    >

                            {
                                (this.state.iAddedProperties.length != 0) ? (

                                    <View>
                                        {
                                            this.state.iAddedProperties.map((iAdded, index) => {
                                                // console.log(iAdded, index, "i adddd")
                                                return (
                                                    <View
                                                        style={{
                                                            // flexDirection: "row",
                                                            marginLeft: 5,
                                                            marginRight: 5,
                                                            marginTop: 10,
                                                        }} key={index}>
                                                        {/* headings */}
                                                        <View style={{
                                                          flexDirection: this.props.str.language === "en" ? "row" : "row-reverse", 
                                                        }}>
                                                            <View style={{
                                                                flex: 1,
                                                                backgroundColor: "#908073",
                                                                padding: "2%",
                                                                // flexDirection: "row",
                                                            }}>
                                                                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white", textDecorationLine: "underline" }}>{this.props.str.date}</Text>
                                                                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white", textDecorationLine: "underline",paddingVertical: iAdded.recipients.length > 19 && iAdded.recipients.length < 28 ? 5 : (iAdded.recipients.length > 27 ? 14 : 0.1)  }}>{this.props.str.to}</Text>
                                                                {/* <Text style={{ fontWeight: "bold", fontSize: 13, color: "white", textDecorationLine: "underline" }}>Subject</Text> */}
                                                                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white", textDecorationLine: "underline", paddingBottom: iAdded.subject.length > 19 && iAdded.subject.length < 28 ? 10 : (iAdded.subject.length > 27 ? 28 : 0.2) }}>{this.props.str.Subject}</Text>
                                                                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white", textDecorationLine: "underline", paddingBottom: iAdded.message.length > 19 && iAdded.message.length < 28 ? 10 : (iAdded.message.length > 27 ? 28 : 0.2) }}>{this.props.str.message}</Text>
                                                            </View>
                                                            {/* values */}
                                                            <View style={{ flex: 2, backgroundColor: "#f8f1f1", padding: "2%" }}>
                                                                <Text style={{ fontWeight: "bold", fontSize: 13, color: "#908073", textDecorationLine: "underline" }}>{iAdded.date}</Text>
                                                                <Text style={{ fontWeight: "bold", fontSize: 13, color: "#908073",  }}>{iAdded.recipients}</Text>
                                                                <Text style={{ fontWeight: "bold", fontSize: 13, color: "#908073", textDecorationLine: "underline" }}>{iAdded.subject}</Text>
                                                                <Text style={{ fontWeight: "bold", fontSize: 13, color: "#908073", textDecorationLine: "underline" }}>{iAdded.message}</Text>
                                                            </View>
                                                        </View>


                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                ) : <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: "center",
                                    marginBottom: 20,
                                    marginTop: 20,
                                }}>
                                        <Text style={{ color: "black" }}>{this.props.str.thereisnodataavailable}</Text>
                                    </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Outboxbody);
const styles = StyleSheet.create({
});

