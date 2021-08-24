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
class Favorites extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedValue: "Actions",
            activity: false,
            moreloader: false,
            iAddedProperties: [],
            isloader: false,
            page: 10,

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
                // this.setState({
                //     selectedValue: value
                // })
                console.log(data.data.results, "response");
                this.setState({
                    iAddedProperties: data.data.results,
                    isloader: false,
                    page: 10,
                    selectedValue: "Actions"

                    // selectedValue: data.data.results.status === "Active" ? "Deactive" : "Active"
                })
            }
            else if (functionName === "_onEndReached") {
                let cloneiAddedProperties = this.state.iAddedProperties
                let responseAPI = data.data.results
                for (var i = 0; i < responseAPI.length; i++) {
                    cloneiAddedProperties.push(responseAPI[i])
                }
                console.log(responseAPI, "reachend")
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
            else if (functionName === "getFullPostagent") {
                console.log(data.data.results, "get fulll")
                Actions.FithPageList({ agentanddevelopers: data.data.results })

            }
            else if (functionName === "getFullPosttasker") {
                console.log(data.data.results, "get fulll")
                Actions.ForthPageList({ taskerData: data.data.results ,})

            }
            else if (functionName === "getFullPostRepresentative") {
                console.log(data.data.results, "get fulll")
                Actions.FithPageList({ representativeData: data.data.results ,})

            }
            else if (functionName === "getFullPosttask") {
                console.log(data.data.results, "get fulll")
                Actions.ForthPageList({ tasksData: data.data.results ,})

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
        if (this.props.rout === "properties") {
            console.log("work")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteProperties/10/0"
        }
        else if (this.props.rout === "agentFavorites") {
            console.log("agent")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteUser/agent/10/0"

        }
        else if (this.props.rout === "taskerFavorites") {
            console.log("taskerFavorites")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteUser/tasker/10/0"
        }
        else if (this.props.rout === "InternationalPartner") {
            console.log("InternationalPartner")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteUser/international/10/0"
        }
        else if (this.props.rout === "Representative") {
            console.log("InternationalPartner")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteUser/representative/10/0"
        }
        else if (this.props.rout === "TasksFavorites") {
            console.log("InternationalPartner")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteTasks/10/0"
        }
        else if (this.props.rout === "requestsFavorites") {
            console.log("InternationalPartner")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteRequests/10/0"
        }
        else if (this.props.rout === "SearchesFavorites") {
            console.log("SearchesFavorites")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteSearches/10/0"
        }
        this.requestOnServer("_onRefreshTasker", uri)
    }
    _onEndReached() {
        this.setState({
            moreloader: true
        })
        if (this.props.rout === "properties") {
            console.log("work")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteProperties/10/0"
        }
        else if (this.props.rout === "agentFavorites") {
            console.log("agent")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteUser/agent/10/0"

        }
        else if (this.props.rout === "taskerFavorites") {
            console.log("taskerFavorites")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteUser/tasker/10/" + this.state.page
        }
        else if (this.props.rout === "InternationalPartner") {
            console.log("InternationalPartner")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteUser/international/10/" + this.state.page
        }
        else if (this.props.rout === "Representative") {
            console.log("InternationalPartner")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteUser/representative/10/" + this.state.page
        }
        else if (this.props.rout === "TasksFavorites") {
            console.log("InternationalPartner")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteTasks/10/" + this.state.page
        }
        else if (this.props.rout === "requestsFavorites") {
            console.log("InternationalPartner")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteRequests/10/" + this.state.page
        }
        else if (this.props.rout === "SearchesFavorites") {
            console.log("SearchesFavorites")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteSearches/10/" + this.state.page
        }
        // let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/user/getListPropertyAddedByUsertoken/10" + this.state.page + 10
        this.requestOnServer("_onEndReached", uri)
    }
    onChangeStatus = (value, id, status) => {
        console.log(value, id, status, "value")
        // this.setState({
        //     selectedValue: value
        // })
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
    getFullPost = (obj) => {
        console.log(obj, "worsk", )
        let uri;
        if (this.props.rout === "properties") {
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/guest/getPropertyDetail/" + obj.unique_id
            this.requestOnServer("getFullPost", uri)
        }
        else if(this.props.rout === "agentFavorites"){
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/guest/getUserDetail/" + obj.id
            this.requestOnServer("getFullPostagent", uri,"")
        }
        else if(this.props.rout === "taskerFavorites"){
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/guest/getUserDetail/" + obj.id
            this.requestOnServer("getFullPosttasker", uri,"")
        }
        else if(this.props.rout === "Representative"){
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/guest/getUserDetail/" + obj.id
            this.requestOnServer("getFullPostRepresentative", uri,"")
        }
        else if(this.props.rout === "TasksFavorites"){
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/guest/getTaskDetail/" + obj.id
            this.requestOnServer("getFullPosttask", uri,"")
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
                                                console.log(iAdded, index, "i adddd")
                                                return (
                                                    <View

                                                        style={{
                                                            flexDirection: this.props.str.language === "en" ? "row" : "row-reverse",
                                                            marginLeft: 5,
                                                            marginRight: 5,
                                                            marginTop: 10,
                                                        }} key={index}>
                                                        {/* headings */}
                                                        <View style={{
                                                            flex: 1,
                                                            backgroundColor: "#908073",
                                                            padding: "2.5%"
                                                        }}>

                                                            {(this.props.rout === "properties" || this.props.rout === "TasksFavorites" || this.props.rout === "requestsFavorites") ? (
                                                                <View style={{ paddingVertical: iAdded.title.length > 22 && iAdded.title.length < 45 ? 7 : (iAdded.title.length > 45 ? 14 : 0.1) }}>
                                                                    <Text style={{ fontWeight: "bold", fontSize: 13, color: "white", textDecorationLine: "underline" }}>{this.props.str.title}</Text>
                                                                </View>
                                                            ) : (null)}

                                                            <Text style={{ fontWeight: "bold", fontSize: 13, color: "white", textDecorationLine: "underline" }}>{this.props.str.id}</Text>
                                                            {(this.props.rout !== "TasksFavorites" && this.props.rout !== "requestsFavorites" && this.props.rout !== "properties") ? (
                                                                <View style={{ paddingVertical: iAdded.full_name && iAdded.full_name.length > 22 && iAdded.full_name.length < 45 ? 7 : (iAdded.full_name && iAdded.full_name.length > 45 ? 14 : 0.1) }}>
                                                                    <Text style={{ fontWeight: "bold", fontSize: 13, color: "white", textDecorationLine: "underline" }}>{this.props.rout === "properties" ? this.props.str.type : this.props.str.fullname}</Text>
                                                                </View>
                                                            ) : (
                                                                    <Text style={{ fontWeight: "bold", fontSize: 13, color: "white", textDecorationLine: "underline" }}>{this.props.str.type}</Text>
                                                                )}
                                                            {/* <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.purpose}</Text> */}
                                                            {/* <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.publishdate}</Text> */}
                                                            <Text style={{ fontWeight: "bold", fontSize: 13, color: "white", textDecorationLine: "underline" }}>{this.props.rout !== "requestsFavorites" ? this.props.str.status : this.props.str.purpose}</Text>
                                                            {(this.props.rout !== "properties" && this.props.rout !== "TasksFavorites" && this.props.rout !== "requestsFavorites") ? (

                                                                <View style={{ paddingVertical: iAdded.user_email.length > 19 && iAdded.user_email.length < 28 ? 5 : (iAdded.user_email.length > 27 ? 14 : 0.1) }}>
                                                                    <Text style={{ fontWeight: "bold", fontSize: 13, color: "white", textDecorationLine: "underline" }}>{this.props.rout === "properties" ? this.props.str.featuredactions : this.props.str.email}</Text>
                                                                </View>
                                                            ) : (null)}

                                                            <Text style={{ fontWeight: "bold", fontSize: 13, color: "white", textDecorationLine: "underline" }}>{this.props.rout === "properties" ? this.props.str.featuredactions : this.props.str.actions}</Text>
                                                        </View>
                                                        {/* values */}
                                                        <View style={{ flex: 2, backgroundColor: "#f8f1f1", padding: "2%" }}>
                                                            <TouchableOpacity

                                                                // style={{ backgroundColor: "red" }}
                                                                onPress={() => this.getFullPost(iAdded)}>

                                                                {(this.props.rout === "properties" || this.props.rout === "TasksFavorites" || this.props.rout === "requestsFavorites") ? (
                                                                    <View
                                                                    // style={{ paddingVertical: iAdded.title.length > 22 && iAdded.title.length < 45 ? 1 : (iAdded.title.length > 40 ? 14 : 0.1) }}
                                                                    >

                                                                        <Text style={{ fontSize: 13, color: "#908073", textDecorationLine: "underline" }}>{iAdded.title}</Text>
                                                                    </View>
                                                                ) : (null)}
                                                                <Text style={{ fontSize: 13, color: "#908073", textDecorationLine: "underline", alignSelf: this.props.str.language === "en" ? "flex-start" : "flex-end" }}>{iAdded.id}</Text>
                                                                {/* {
                                                                <Image
                                                                    style={{
                                                                        position: "absolute", zIndex: 1, left: "55%", top: "1%",
                                                                        width: 100, height: 100, borderColor: "#E94E1B", borderWidth: 1.2, borderRadius: 100 / 2
                                                                    }}
                                                                    source={{ uri: iAdded.featured_image_src }}
                                                                    />
                                                                } */}
                                                                <Text style={{ fontSize: 13, color: "#908073", textDecorationLine: "underline" }}>{this.props.rout === "properties" || this.props.rout === "TasksFavorites" || this.props.rout === "requestsFavorites" ? iAdded.type_format || iAdded.type : iAdded.full_name || "n/a"}</Text>
                                                                {/* <Text style={{ fontSize: 13, color: "#908073" }}>{ iAdded.purpose}</Text> */}
                                                                {/* <Text style={{ fontSize: 13, color: "#908073" }}>{ iAdded.create_time}</Text> */}

                                                                <TouchableOpacity style={{
                                                                    alignSelf: this.props.str.language === "en" ? "flex-start" : "flex-end",
                                                                    backgroundColor: 'green', width: "25%", borderRadius: 5, alignItems: "center",
                                                                    justifyContent: "center"
                                                                }}>
                                                                    <Text style={{ color: 'white', fontSize: 12, textDecorationLine: "underline" }}>{iAdded.status || iAdded.status_name || iAdded.purpose}</Text>
                                                                </TouchableOpacity>
                                                                <Text style={{ fontSize: 13, color: "#908073", textDecorationLine: "underline" }}>{iAdded.user_email}</Text>

                                                            </TouchableOpacity>
                                                            {/* {(this.props.rout === "properties" || this.props.rout === "agentFavorites" || this.props.rout === "taskerFavorites" || this.props.rout === "InternationalPartner" || this.props.rout === "Representative") ? ( */}
                                                            <Picker mode="dropdown" style={{ width: "100%", height: this.state.screenHeight / 35 }}
                                                                selectedValue={this.state.selectedValue}
                                                                onValueChange={(e) => this.onChangeStatus(e, iAdded.id, iAdded.status)
                                                                }
                                                            >
                                                                <Item label={this.props.str.actions} value={this.props.str.actions} key={this.props.str.actions} />
                                                                <Item label={this.props.str.delete} value={this.props.str.delete} key={this.props.str.delete} />
                                                                {/* <Item label='Delete' value='Delete' key="Delete" /> */}
                                                            </Picker>
                                                            {/* ) : (
                                                                    null
                                                                )} */}

                                                        </View>
                                                        {/* image */}
                                                        <View style={{ flex: 1.5, backgroundColor: "#f8f1f1", justifyContent: "center", alignItems: "center" }}>
                                                            {
                                                                (this.props.rout !== "TasksFavorites" && this.props.rout !== "requestsFavorites") ? (
                                                                    <Image
                                                                        style={{
                                                                            position: "absolute", zIndex: 1,
                                                                            width: 100, height: 100, borderColor: "#E94E1B", borderWidth: 1.2,
                                                                        }}
                                                                        source={{ uri: iAdded.featured_image_src || iAdded.avatar_photo }}
                                                                    />
                                                                ) : (null)

                                                            }

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
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
const styles = StyleSheet.create({
});  
