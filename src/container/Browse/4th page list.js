
import React, { Component } from 'react';
import {
    View, StyleSheet, TouchableOpacity, Image, StatusBar, ScrollView,
    ListView, RefreshControl, Picker, SafeAreaView, ActivityIndicator, Modal, TouchableHighlight, Alert, Dimensions, Share
} from 'react-native';
import { Actions } from 'react-native-router-flux';
// import Footer from '../../Constant/Footer';
// import { changeRoute } from '../../Constant/Helper'
import { Container, Content, Card, CardItem, Text, Thumbnail, Button, Icon, Item, Fab, } from 'native-base';
import { connect } from "react-redux";
// import InfiniteScrollView from 'react-native-infinite-scroll-view';
import axios from 'axios';
import InfiniteScroll from 'react-native-infinite-scroll';
import IconFontEntypo from 'react-native-vector-icons/Ionicons';
import IconFontFontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextField } from 'react-native-material-textfield';
import * as Animatable from 'react-native-animatable';
import MultiSelect from 'react-native-multiple-select';
import Footer from '../../Constant/Footer';
import ImageSlider from 'react-native-image-slider';
import Communications from 'react-native-communications';
import IconFontIonicons from 'react-native-vector-icons/Ionicons';
import SendMsgToTasker from '../../Component/sendMsgToTasker';
import Entypo from 'react-native-vector-icons/Entypo';
import Drawer from '../../Component/drawer';
import { setTaskId } from "../../Store/Action/action";


class ForthPageList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chatButtonLoading: false,
            emailSendingFlag: false,
            activity: false,
            moreloader: false,
            isloader: true,
            page: 0,
            propertyData: [],
            requestData: [],
            stateFromApi: [],
            allCityFromApi: [],
            selectedState: "",
            selectedType: [],
            ispeak: [
                {
                    id: props.str.apartment,
                    name: props.str.apartment,
                },
                {
                    id: props.str.house,
                    name: props.str.house,

                },
            ],

        }
    }



    componentWillMount() {

        this.setState({
            token: this.props.userCredentials.token,
        })
        this.getState(this)

        // for properties
        if (this.props.renderIdForRent || this.props.renderIdForSale) {
            this._getFeatureProperties(this)
            // this._onRefresh(this)
        }
        if (this.props.renderIdForRequest) {
            this._onRefresh(this)
        }
        if (this.props.searchRequest) {
            this.setState({
                requestData: this.props.searchRequest,
                isloader: false,
                page: 10,
            })
        }
        // for tasker and task
        if (this.props.tasksData || this.props.taskerData) {
            this.userDetailsGet(this)
            this.getOwnerProperties(this)
        }
        if (this.props.tasksData) {
            this.setState({
                forRenderDrawer: "Tasks"
            })

            console.log(this.props.tasksData, "taskData")
            this.props.setTaskId(this.props.tasksData.id)

        } if (this.props.taskerData) {
            this.setState({
                forRenderDrawer: "Tasker"
            })
        }
        // for owner properties list
        if (this.props.OwnerProperties) {
            this.setState({
                propertyData: this.props.OwnerProperties,
                isloader: false,
                created_by: this.props.created_by,
                page: 25,
            })

            console.log(this.props.created_by, "this.props.created_bys")
        }

        var { height, width } = Dimensions.get('window');
        this.setState({
            screenHeight: height,
        })

    }


    // for userdetails get
    userDetailsGet() {
        this.setState({
            chatButtonLoading: !this.state.chatButtonLoading
        })
        let created_by;
        if (this.props.taskerData) {
            created_by = this.props.taskerData.id

        }
        if (this.props.tasksData) {
            created_by = this.props.tasksData.created_by
        }
        // console.log(created_by, "123")
        let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/guest/getUserDetail/" + created_by
        return axios({
            method: 'get',
            url: uri,
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                console.log(data.data.results, "responseUserTask");
                this.setState({
                    userDetails: data.data.results,
                    chatButtonLoading: !this.state.chatButtonLoading

                })
            })
            .catch(err => {
                console.log(err)
                alert(err.message)
                this.setState({
                    err: err.message,
                    chatButtonLoading: !this.state.chatButtonLoading
                })
            })
    }

    // for owner property get
    getOwnerProperties() {
        // alert("workingownerproperty")
        let created_by = this.state.created_by
        // console.log(created_by, "created_byOwnerFunction")
        if (this.props.taskerData) {
            created_by = this.props.taskerData.id,
                this.setState({
                    created_by: this.props.taskerData.id
                })
        }
        if (this.props.tasksData) {
            created_by = this.props.tasksData.created_by,
                this.setState({
                    created_by: this.props.tasksData.created_by
                })
        }
        let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/guest/getPropertiesPostedByUSerId/" + created_by + "/25/0"
        return axios({
            method: 'get',
            url: uri,
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                // console.log(data.data.results, "OwnerAllproperties");
                this.setState({
                    propertyData: data.data.results,
                    page: this.state.page + 25,
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

    // for more property list
    moreOwnerProperties() {

        let created_by = this.state.created_by
        console.log(created_by, this.state.page, "created_byOwnerFunction")

        if (this.props.OwnerProperties) {
            created_by = this.state.created_by
        }
        if (this.props.taskerData) {
            created_by = this.props.taskerData.id
        }
        if (this.props.tasksData) {
            created_by = this.props.tasksData.created_by
        }

        let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/guest/getPropertiesPostedByUSerId/" + created_by + "/25/" + this.state.page
        return axios({
            method: 'get',
            url: uri,
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                let clonepropertyData = this.state.propertyData
                let responseAPI = data.data.results
                for (var i = 0; i < responseAPI.length; i++) {
                    clonepropertyData.push(responseAPI[i])
                }
                this.setState({
                    moreloader: false,
                    page: this.state.page + 25,
                    propertyData: clonepropertyData
                })
            })
            .catch(err => {
                console.log(err)
                alert(err.message)
                this.setState({
                    err: err.message,
                    moreloader: false
                })
            })

    }


    getState() {
        return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/states/1",
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                let state = data.data.results
                this.setState({
                    stateFromApi: state
                })
            })
            .catch(err => {
                console.log(err)
            })
    }


    dropDownChangeState = (itemValue, itemIndex) => {
        this.setState({
            selectedState: itemValue,
        })
        uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/cities/" + itemValue
        // console.log(itemValue, uri, "itemValue")
        return axios({
            method: 'get',
            url: uri,
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                let city = data.data.results
                console.log(city)

                this.setState({
                    allCityFromApi: city
                })
            })
            .catch(err => {
                console.log(err)

            })
    }

    _getFeatureProperties() {
        this.setState({
            isloader: true
        })
        return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/guest/getFeatureProperties",
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                let responseAPI = data.data.results.data

                if (this.props.str.language === "en") {
                    for (var i = 0; i < responseAPI.length; i++) {
                        responseAPI[i].typeFlag = "Featured"
                    }
                }
                else {
                    for (var i = 0; i < responseAPI.length; i++) {
                        responseAPI[i].typeFlag = "متميز"
                    }
                }


                this.setState({
                    propertyData: responseAPI,
                    isloader: false,
                    page: 0,

                })
            })
            .catch(err => {
                console.log(err)
                alert(err.message)
                this.setState({
                    err: err.message,
                    isloader: false
                })
            })

    }

    // for property refresh
    _onRefresh() {
        if (this.props.searchRequest) {
            // alert('working')
            let cloneData = this.props.keywords
            console.log(this.props.keywords, "keywords")
            var bodyFormData = new FormData();
            for (var key in cloneData) {
                if (cloneData[key] && cloneData[key] !== undefined && cloneData[key].length !== 0) {
                    bodyFormData.append(key, cloneData[key]);
                }
            }
            bodyFormData.append("limit", "10");
            bodyFormData.append("offset", "0");
            console.log(bodyFormData, '****61', cloneData);
            return axios({
                method: 'POST',
                url: 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/request/guest/getBuyRequestSearch',
                headers: {
                    'postman-token': '553d07fc-3950-1199-efd9-6b5b5f8315a2',
                    'cache-control': 'no-cache',
                    clientsecret: '(*jh2kj36gjhasdi78743982u432j',
                    clientkey: '34532hbjdsakjd2&&gjhjh11',
                    'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                    "Allow-Cross-Origin": '*',
                },
                data: bodyFormData
            })
                .then(data => {
                    console.log(data.data.results, "response");   ///url return on response holding for client response
                    this.setState({
                        requestData: data.data.results,
                        isloader: false,
                        page: 10,
                    }, () => {
                        console.log(this.state.page, "pageupdated")
                    })
                })
                .catch(err => {
                    console.log(JSON.stringify(err.response))
                    alert(JSON.stringify(err.response.data.message))
                    this.setState({
                        err: err.message,
                        isloader: false
                    })
                })



        }

        if (this.props.renderIdForRequest) {
            console.log(this.props.renderIdForRequest, "hello")
            this.setState({
                isloader: true
            })
            return axios({
                method: 'get',
                url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/request/guest/getRequestsList/" + this.props.renderIdForRequest + "/10/0",
                headers: {
                    "clientkey": "34532hbjdsakjd2&&gjhjh11",
                    "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                },
            })
                .then(data => {
                    console.log(data.data.results, "response");   ///url return on response holding for client response
                    this.setState({
                        requestData: data.data.results,
                        isloader: false,
                        page: 10,
                    })
                })
                .catch(err => {
                    console.log(JSON.stringify(err.response))
                    alert(JSON.stringify(err.response.data.message))
                    this.setState({
                        err: err.message,
                        isloader: false
                    })
                })


        }


        if (this.props.renderIdForSale || this.props.renderIdForRent) {
            this._getFeatureProperties(this)
            this.setState({
                isloader: true
            })

            let uri;
            if (this.props.renderIdForSale) {
                uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/guest/getPropertiesListByCategory/" + this.props.param2 + "/" + this.props.renderIdForSale + "/10"
            }
            else {
                uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/guest/getPropertiesListByCategory/" + this.props.param2 + "/" + this.props.renderIdForRent + "/10"
            }

            return axios({
                method: 'get',
                url: uri,
                headers: {
                    "clientkey": "34532hbjdsakjd2&&gjhjh11",
                    "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                },
            })
                .then(data => {
                    let clonepropertyData = this.state.propertyData
                    let responseAPI = data.data.results
                    console.log(responseAPI, "onRefresh");
                    for (var i = 0; i < responseAPI.length; i++) {
                        clonepropertyData.push(responseAPI[i])
                    }
                    this.setState({
                        isloader: false,
                        page: this.state.page + 10,
                        propertyData: clonepropertyData
                    })
                })
                .catch(err => {
                    console.log(err)
                    alert(err.message)
                    this.setState({
                        err: err.message,
                        isloader: false
                    })
                })
        }
        // for refresh owner property list
        if (this.props.OwnerProperties) {
            this.getOwnerProperties(this)
        }
    }


    // for more property 
    _onEndReached() {
        console.log(this.state.page, "page")
        this.setState({
            moreloader: true
        })

        if (this.state.moreloader === false && (this.props.searchRequest)) {
            let cloneData = this.props.keywords
            console.log(this.props.keywords, "keywords")
            var bodyFormData = new FormData();
            for (var key in cloneData) {
                if (cloneData[key] && cloneData[key] !== undefined && cloneData[key].length !== 0) {
                    bodyFormData.append(key, cloneData[key]);
                }
            }
            bodyFormData.append("limit", "10");
            bodyFormData.append("offset", this.state.page)
            console.log(bodyFormData, '****61', cloneData);
            return axios({
                method: 'POST',
                url: 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/request/guest/getBuyRequestSearch',
                headers: {
                    'postman-token': '553d07fc-3950-1199-efd9-6b5b5f8315a2',
                    'cache-control': 'no-cache',
                    clientsecret: '(*jh2kj36gjhasdi78743982u432j',
                    clientkey: '34532hbjdsakjd2&&gjhjh11',
                    'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                    "Allow-Cross-Origin": '*',
                },
                data: bodyFormData
            })
                .then(data => {
                    console.log(data.data.results, "response");   ///url return on response holding for client response
                    let clonerequestData = this.state.requestData
                    let responseAPI = data.data.results
                    for (var i = 0; i < responseAPI.length; i++) {
                        clonerequestData.push(responseAPI[i])
                    }
                    console.log(responseAPI, "responseAPI")
                    this.setState({
                        moreloader: false,
                        page: this.state.page + 10,
                        requestData: clonerequestData
                    })
                })
                .catch(err => {
                    console.log(JSON.stringify(err.response))
                    alert(JSON.stringify(err.response.data.message))
                    this.setState({
                        err: err.message,
                        isloader: false
                    })
                })

        }



        if (this.state.moreloader === false && (this.props.renderIdForSale || this.props.renderIdForRent)) {
            // alert("working")
            let uri;
            if (this.props.renderIdForSale) {
                uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/guest/getPropertiesListByCategory/" + this.props.param2 + "/" + this.props.renderIdForSale + "/10/" + this.state.page
            }
            else {
                uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/guest/getPropertiesListByCategory/" + this.props.param2 + "/" + this.props.renderIdForRent + "/10/" + this.state.page

            }
            return axios({
                method: 'get',
                url: uri,
                headers: {
                    "clientkey": "34532hbjdsakjd2&&gjhjh11",
                    "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                },
            })
                .then(data => {
                    let clonepropertyData = this.state.propertyData
                    let responseAPI = data.data.results
                    for (var i = 0; i < responseAPI.length; i++) {
                        clonepropertyData.push(responseAPI[i])
                    }

                    console.log(responseAPI, "responseInMoredata");

                    this.setState({
                        moreloader: false,
                        page: this.state.page + 10,
                        propertyData: clonepropertyData
                    })
                })
                .catch(err => {
                    console.log(err)
                    alert(err.message)
                    this.setState({
                        err: err.message,
                        moreloader: false
                    })
                })
        }
        if (this.state.moreloader === false && (this.props.renderIdForRequest)) {
            return axios({
                method: 'get',
                url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/request/guest/getRequestsList/" + this.props.renderIdForRequest + "/10/" + this.state.page,
                headers: {
                    "clientkey": "34532hbjdsakjd2&&gjhjh11",
                    "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                },
            })
                .then(data => {
                    let clonerequestData = this.state.requestData
                    let responseAPI = data.data.results
                    for (var i = 0; i < responseAPI.length; i++) {
                        clonerequestData.push(responseAPI[i])
                    }

                    console.log(responseAPI, "responseInMoredata");

                    this.setState({
                        moreloader: false,
                        page: this.state.page + 10,
                        requestData: clonerequestData
                    })
                })
                .catch(err => {
                    console.log(err)
                    alert(err.message)
                    this.setState({
                        err: err.message,
                        moreloader: false
                    })
                })
        }
        // for more owner property list
        if (this.props.OwnerProperties) {
            this.moreOwnerProperties(this)
        }


    }

    onSelectedItemsChangeiSpeak = selectedispeak => {
        this.setState({ selectedispeak });
    };
    emailSending() {
        this.setState({
            emailSendingFlag: !this.state.emailSendingFlag
        })
    }
    animateParent(fals) {
        setTimeout(() => {
            this.setState({
                drawer: false
            })
        }, 250);
    }

    addToFav(param, id) {
        let urlm = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/addFavorite";
        var bodyFormData = new FormData();
        bodyFormData.append("type_favorite", param);
        bodyFormData.append("favorite_id", id);
        return axios({
            method: "post",
            url: urlm,
            headers: {
                token: "bearer " + this.state.token,
                'postman-token': '553d07fc-3950-1199-efd9-6b5b5f8315a2',
                'cache-control': 'no-cache',
                clientsecret: '(*jh2kj36gjhasdi78743982u432j',
                clientkey: '34532hbjdsakjd2&&gjhjh11',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                "Allow-Cross-Origin": '*',
            },
            data: bodyFormData
        })
            .then(data => {
                console.log(data.data.results);
                alert(JSON.stringify(data.data.message))

            })
            .catch(err => {
                var errUpdate = JSON.stringify(err);
                console.log(JSON.parse(errUpdate));
                alert(JSON.stringify(err.response.data.message))

            });
    }


    onShare = () => {
        try {
            if (this.props.taskerData) {
                console.log(this.props.taskerData.user_url, "onshare")
                const result = Share.share({
                    message: this.props.taskerData.user_url,
                })
            }
            if (this.props.tasksData) {
                console.log(this.props.tasksData.url_task, "onshare")
                const result = Share.share({
                    message: this.props.tasksData.url_task,
                })
            }

            else {
                const result = Share.share({
                    message: 'React Native | A framework for building native apps using React',
                })
            }

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    render() {
        console.log(this.props.renderIdForSale, "page")
        return (
            <View style={{
                flex: 1,
                backgroundColor: "white"
            }}>
                {/* drawer*/}
                {(this.state.drawer === true) ? (
                    <Drawer
                        animationStyle="fadeInLeftBig"
                        routName={this.state.forRenderDrawer}
                        animateParent={this.animateParent.bind(this)}
                        ownerDetails={this.state.userDetails}
                        ownerProperties={this.state.propertyData}
                        created_by={this.state.created_by}
                    />

                ) : (
                        null
                    )}
                {/* drawer*/}


                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: "center",
                    backgroundColor: "white"
                }}>
                    {/* this view for closing drawer  */}
                    {(this.state.drawer === true) ? (
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                this.setState({
                                    drawer: false
                                })
                            }}
                            style={{ position: "absolute", height: this.state.screenHeight, width: "20%", right: 0, zIndex: 1 }}>
                        </TouchableOpacity>
                    ) : (null)}
                    {/* this view for closing drawer  */}

                    <View style={{
                        flex: 1.18,
                        // height: 40,
                        backgroundColor: '#E94E1B',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: "row",
                        width: "100%"
                    }}>
                        {/* <SendMsgToTasker modalOpen={this.state.emailSendingFlag} data={this.props.taskerData} emailSending={() => this.emailSending()} /> */}

                        {/* /////////////////////////////header///////////////////////////// */}
                        <View style={{ flex: 0.5, width: "90%", flexDirection: "row", marginTop: "7%" }}>
                            <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => { Actions.pop() }}>
                                <IconFontIonicons name='md-arrow-back' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                            </TouchableOpacity>

                            {
                                (this.props.taskerData || this.props.tasksData) ? (
                                    <TouchableOpacity style={{ marginLeft: "12%", marginRight: 20 }}
                                        onPress={() => this.setState({ drawer: !this.state.drawer })}>
                                        <Entypo name='menu' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                                    </TouchableOpacity>
                                ) : null
                            }
                            {
                                (this.props.renderIdForSale) ? (
                                    <Text style={{ marginLeft: "10%", color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.heading.toUpperCase()}</Text>
                                ) : null
                            }
                            {
                                (this.props.renderIdForRent) ? (
                                    <Text style={{ marginLeft: "10%", color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.heading.toUpperCase()}</Text>
                                ) : null
                            }
                            {
                                (this.props.renderIdForRequest) ? (
                                    <Text style={{ marginLeft: "10%", color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.heading.toUpperCase()}</Text>
                                ) : null
                            }
                            {
                                (this.props.searchRequest) ? (
                                    <Text style={{ marginLeft: "10%", color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.result}</Text>
                                ) : null
                            }

                        </View>
                        {
                            (this.props.renderIdForSale || this.props.renderIdForRent || this.props.renderIdForRequest || this.props.searchRequest) ? (
                                (this.props.renderIdForRequest || this.props.searchRequest) ? (
                                    <TouchableOpacity style={{ flex: 0.5, justifyContent: "center", alignItems: "center", marginTop: "7%" }}>
                                        <TouchableOpacity
                                            style={{ backgroundColor: "white", height: "50%", width: "80%", alignItems: "center", justifyContent: "center" }}
                                            onPress={() => { Actions.findreq() }}
                                        >
                                            <Text style={{ color: "black", fontSize: 10, textAlign: "center" }}>{this.props.str.searchrequest}</Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                ) :
                                    <TouchableOpacity style={{ flex: 0.5, justifyContent: "center", alignItems: "center", marginTop: "7%" }}>
                                        <TouchableOpacity
                                            style={{ backgroundColor: "white", height: "50%", width: "80%", alignItems: "center", justifyContent: "center" }}
                                            onPress={() => { Actions.SearchForProperties() }}
                                        >
                                            <Text style={{ color: "black", fontSize: 10, textAlign: "center" }}>{this.props.str.searchforproperty}</Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                            ) : null
                        }

                        {/* {
                            (this.props.renderIdForRequest) ? (
                                <View style={{ flex: 0.7, justifyContent: "center", alignItems: "center", marginTop: "7%", width: "85%" }}>
                                    <Text style={{ marginLeft: "10%", color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.renderIdForRequest.toUpperCase()}</Text>
                                </View>
                            ) : null
                        } */}
                        {
                            (this.props.OwnerProperties) ? (
                                <View style={{ flex: 0.7, justifyContent: "center", alignItems: "center", marginTop: "7%", width: "85%" }}>
                                    <Text style={{ marginLeft: "10%", color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.ownerproperties}</Text>
                                </View>
                            ) : null
                        }

                        {
                            (this.props.taskerData) ? (
                                <View style={{ flex: 0.7, justifyContent: "center", alignItems: "center", marginTop: "7%", width: "85%" }}>
                                    {/* <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.fullview} {this.props.headersHeading.toUpperCase()}</Text> */}

                                </View>
                            ) : null
                        }
                        {
                            (this.props.tasksData) ? (
                                <View style={{ flex: 0.7, justifyContent: "center", alignItems: "center", marginTop: "7%", width: "85%", }}>
                                    {/* <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.fullview} {this.props.tasksData.type_format.toUpperCase()}</Text> */}
                                </View>
                            ) : null
                        }
                    </View>


                    {
                        (this.props.renderIdForRent || this.props.renderIdForSale || this.props.OwnerProperties) ? (
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
                                                (this.state.propertyData.length != 0) ? (
                                                    <View>
                                                        {
                                                            this.state.propertyData.map((key, index) => {
                                                                return (
                                                                    <TouchableOpacity key={index} style={{ marginTop: 5, flex: 1, flexDirection: "row", padding: 5, backgroundColor: "#f8f1f1" }}
                                                                        onPress={() => { Actions.FithPageList({ propertyData: key }) }}
                                                                    >
                                                                        <View style={{ flex: 0.5, }} >
                                                                            <Image style={{ resizeMode: 'contain', height: 120, width: "100%" }}
                                                                                source={{ uri: key.featured_image_src }} />
                                                                        </View>
                                                                        <View style={{ flex: 0.6, padding: 5, }} >
                                                                            <View style={{ flex: 0.9 }}>
                                                                                <View style={{ flexDirection: "row", }}>
                                                                                    {
                                                                                        (key.typeFlag) ? (
                                                                                            <View style={{ backgroundColor: "#E94E1B", justifyContent: "center", alignItems: "center", marginTop: 2.5, width: 80 }}>
                                                                                                <Text style={{ fontSize: 12, color: "white", }}> {key.typeFlag.toUpperCase()}</Text>
                                                                                            </View>
                                                                                        ) : null
                                                                                    }
                                                                                </View>
                                                                                <View style={{ marginTop: 10 }}>
                                                                                    <Text style={{ fontSize: 12, color: "black" }}>{key.title}</Text>
                                                                                </View>
                                                                                <View style={{ marginTop: 0 }} >
                                                                                    <View style={{ flexDirection: "row", }}>
                                                                                        {
                                                                                            (key.price_fomat != undefined && key.price_fomat != "") ? (
                                                                                                <Text style={{ fontSize: 14, color: "#E94E1B", textAlign: "right", marginTop: 7, }}>{key.price_fomat}</Text>
                                                                                            ) : null
                                                                                        }
                                                                                    </View>

                                                                                </View>
                                                                            </View>
                                                                            <View style={{ flex: 0.1 }}>
                                                                                <View style={{ flexDirection: "row", }}>
                                                                                    <Text style={{ fontSize: 8, color: "#6a6a6a", textAlign: "right", marginTop: 3 }}>{this.props.str.publishedon}, {key.publish_time + " "} </Text>
                                                                                    <Text style={{ fontSize: 8, color: "#6a6a6a", textAlign: "right", marginTop: 3 }}>{key.city_format}, {key.state_format}</Text>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    </TouchableOpacity>
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
                    {
                        (this.props.renderIdForRequest || this.props.searchRequest) ? (
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
                                                (this.state.requestData.length != 0) ? (
                                                    <View>
                                                        {
                                                            this.state.requestData.map((key, index) => {
                                                                return (
                                                                    <TouchableOpacity key={index} style={{ marginTop: 5, flex: 1, flexDirection: "row", padding: 5, backgroundColor: "#f8f1f1" }}
                                                                        onPress={() => { Actions.FithPageList({ requestData: key }) }}
                                                                    >
                                                                        <View style={{ flex: 0.4, }} >
                                                                            <View style={{ width: "100%", backgroundColor: "#887769", height: 120, justifyContent: "center", alignItems: "center" }}>
                                                                                <Text style={{ fontSize: 18, color: "white" }}> {key.type_format}</Text>
                                                                            </View>
                                                                        </View>
                                                                        <View style={{ flex: 0.6, padding: 5, }} >
                                                                            <View style={{ flex: 0.9, marginLeft: "3%" }}>
                                                                                <Text style={{ fontSize: 15, }}> {key.title}</Text>
                                                                                <Text style={{ fontSize: 12, marginTop: 10 }}> {key.price_max_formar}</Text>
                                                                            </View>
                                                                            <View style={{ flex: 0.1 }}>
                                                                                <View style={{ flexDirection: "row", marginLeft: "5%" }}>
                                                                                    <Text style={{ fontSize: 10, color: "#6a6a6a", textAlign: "right", marginTop: 3 }}>{this.props.str.publishedon}, {key.publish_time + " "} </Text>
                                                                                    <Text style={{ fontSize: 10, color: "#6a6a6a", textAlign: "right", marginTop: 3 }}>{key.city_format}, {key.state_format}</Text>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    </TouchableOpacity>
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


                    {
                        (this.props.taskerData) ? (
                            <View style={{ flex: 8, width: "100%", }}>
                                <SendMsgToTasker modalOpen={this.state.emailSendingFlag} taskerData={this.props.taskerData} emailSending={() => this.emailSending()} />
                                <View style={{ flex: 0.4 }}>
                                    {
                                        (this.props.taskerData.gallery.length != 0) ? (
                                            <SafeAreaView style={styles.container}>
                                                <ImageSlider
                                                    // loopBothSides
                                                    autoPlayWithInterval={8000}
                                                    images={this.props.taskerData.gallery}
                                                    customSlide={({ index, item, style, width }) => (
                                                        // It's important to put style here because it's got offset inside
                                                        <View key={index} style={[style, styles.customSlide]}>
                                                            <Image resizeMode={"cover"} source={{ uri: item }} style={styles.customImage} />
                                                            <View style={{
                                                                flex: 1, flexDirection: 'row', top: -41, marginLeft: "80%",
                                                                alignItems: 'center', justifyContent: 'flex-end', position: 'relative',
                                                            }}>
                                                                <TouchableOpacity style={{
                                                                    height: 40, width: 40, borderColor: '#fce5c8',
                                                                    borderWidth: 1, borderRadius: 5, marginRight: 0,
                                                                    justifyContent: 'center', alignItems: 'center', backgroundColor: '#E94E1B'
                                                                }}
                                                                    onPress={this.addToFav.bind(this, "tasker", this.props.taskerData.id)}
                                                                >
                                                                    <Icon name='heart' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    )} />
                                            </SafeAreaView>
                                        ) :
                                            <SafeAreaView style={styles.container}>
                                                <View style={styles.customSlide}>
                                                    <Image resizeMode="stretch" source={{ uri: this.props.taskerData.avatar_photo }} style={styles.customImage} />
                                                </View>
                                                <View style={{
                                                    flex: 1, flexDirection: 'row', top: -41, marginRight: 20,
                                                    alignItems: 'center', justifyContent: 'flex-end', position: 'relative',
                                                }}>
                                                    <TouchableOpacity style={{
                                                        height: 40, width: 40, borderColor: '#fce5c8',
                                                        borderWidth: 1, borderRadius: 5, marginRight: 0,
                                                        justifyContent: 'center', alignItems: 'center', backgroundColor: '#E94E1B'
                                                    }}
                                                        onPress={this.addToFav.bind(this, "tasker", this.props.taskerData.id)}
                                                    >
                                                        <Icon name='heart' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                                                    </TouchableOpacity>
                                                </View>

                                            </SafeAreaView>
                                    }
                                </View>

                                <View style={{ flex: 0.6, marginTop: 10, width: "100%", alignItems: "center", }} >
                                    <ScrollView contentContainerStyle={styles.contentContainer} style={{ width: "95%", }}>

                                        {/* name and number */}

                                        <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.name}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12, marginBottom: 5 }} >{this.props.taskerData.user_name}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 0.5, }}>
                                                <TouchableOpacity style={{ flex: 0.5, }}
                                                    onPress={() => Communications.phonecall(this.props.taskerData.contact_phone, true)}
                                                >
                                                    <View style={{ marginLeft: 10 }}>
                                                        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.makephonecall}</Text>
                                                        <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.taskerData.contact_phone}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{ marginLeft: 10 }}>
                                                </View>
                                            </View>
                                        </View>

                                        {/* Description */}

                                        <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10, marginBottom: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.icanwork}</Text>
                                                    {
                                                        (this.props.taskerData.state_work_in_format != undefined && this.props.taskerData.type_tasker != false) ? (
                                                            this.props.taskerData.state_work_in_format.map((value, index) => {
                                                                return (
                                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{value}</Text>
                                                                )
                                                            })
                                                        ) :
                                                            null
                                                        // <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.taskerData.state_work_in_format + " , "}</Text>
                                                    }
                                                </View>
                                            </View>

                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10, marginBottom: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.type}</Text>

                                                    {
                                                        (this.props.taskerData.type_tasker_format != undefined) ? (
                                                            this.props.taskerData.type_tasker_format.map((value, index) => {
                                                                console.log(value, index, "if")
                                                                return (
                                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{value}</Text>
                                                                )
                                                            })
                                                        ) :
                                                            null
                                                        // <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.taskerData.type_tasker_format + " &nbsp "}</Text>
                                                    }
                                                </View>
                                            </View>
                                        </View>

                                        {/* address and location*/}

                                        <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, marginBottom: 10 }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.address}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.taskerData.address}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 0.5, marginBottom: 10 }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.location}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 10 }} >{this.props.taskerData.city}, {this.props.taskerData.state}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* View and id */}

                                        <View style={{ flex: 1, flexDirection: "row", height: 40, borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.id}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.taskerData.id}</Text>
                                                </View>
                                            </View>
                                            {/* <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.views}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >3</Text>
                                                </View>
                                            </View> */}
                                        </View>
                                    </ScrollView>

                                    <Fab active={this.state.active} direction="up" containerStyle={{ marginLeft: 10 }} style={{ backgroundColor: '#E94E1B' }}
                                        // position="bottomRight"
                                        position={this.props.str.language == "ar" ? "bottomLeft" : "bottomRight"}
                                        onPress={() => Communications.phonecall(this.props.taskerData.contact_phone, true)}>
                                        <Icon name="md-call" />
                                        {
                                            (this.props.taskerData.user_id != "" && this.props.taskerData.user_id != "n/a" &&
                                                this.props.taskerData.user_name != "" && this.props.taskerData.user_name != "n/a" &&
                                                this.props.taskerData.user_email != "" && this.props.taskerData.user_email != "n/a" &&
                                                this.props.taskerData.contact_phone != "" && this.props.taskerData.contact_phone != "n/a"
                                            ) ? (
                                                    <Button
                                                        style={{ backgroundColor: '#3B5998', }}
                                                        onPress={() => this.emailSending()}
                                                    >
                                                        <Icon name="mail" />
                                                    </Button>
                                                ) :
                                                (this.state.chatButtonLoading === true) ? (
                                                    <Button
                                                        style={{ backgroundColor: '#3B5998', }}
                                                    // onPress={() => this.emailSending()}
                                                    >
                                                        <ActivityIndicator size="small" />
                                                    </Button>
                                                ) : null
                                        }
                                        <Button
                                            style={{ backgroundColor: '#3B5998', }}
                                            onPress={this.onShare}
                                        >
                                            <Entypo name='share' style={{ fontSize: 19, color: "white" }} />
                                        </Button>
                                    </Fab>
                                </View>
                            </View>
                        ) : null
                    }

                    {
                        (this.props.tasksData) ? (
                            (this.state.userDetails) ? (
                                <View style={{ flex: 8, width: "100%", }}>
                                    <SendMsgToTasker modalOpen={this.state.emailSendingFlag} tasksData={this.state.userDetails} taskId={this.props.tasksData.id} emailSending={() => this.emailSending()} />
                                    <View style={{ flex: 0.4 }}>
                                        {
                                            (this.props.tasksData.gallery_src.length != 0) ? (
                                                <SafeAreaView style={styles.container}>
                                                    <ImageSlider
                                                        // loopBothSides
                                                        autoPlayWithInterval={8000}
                                                        images={this.props.tasksData.gallery_src}
                                                        customSlide={({ index, item, style, width }) => (
                                                            // It's important to put style here because it's got offset inside
                                                            <View key={index} style={[style, styles.customSlide]}>
                                                                <Image resizeMode={"cover"} source={{ uri: item }} style={styles.customImage} />
                                                                <View style={{
                                                                    flex: 1, flexDirection: 'row', top: -41, marginLeft: "80%",
                                                                    alignItems: 'center', justifyContent: 'flex-end', position: 'relative',
                                                                }}>
                                                                    <TouchableOpacity style={{
                                                                        height: 40, width: 40, borderColor: '#fce5c8',
                                                                        borderWidth: 1, borderRadius: 5, marginRight: 0,
                                                                        justifyContent: 'center', alignItems: 'center', backgroundColor: '#E94E1B'
                                                                    }}
                                                                        onPress={this.addToFav.bind(this, "task", this.props.tasksData.id)}
                                                                    >
                                                                        <Icon name='heart' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        )} />
                                                </SafeAreaView>
                                            ) :
                                                <SafeAreaView style={styles.container}>
                                                    <View style={styles.customSlide}>
                                                        <Image resizeMode="stretch" source={{ uri: this.props.tasksData.featured_image_src }} style={styles.customImage} />
                                                    </View>
                                                    <View style={{
                                                        flex: 1, flexDirection: 'row', top: -41, marginRight: 20,
                                                        alignItems: 'center', justifyContent: 'flex-end', position: 'relative',
                                                    }}>
                                                        <TouchableOpacity style={{
                                                            height: 40, width: 40, borderColor: '#fce5c8',
                                                            borderWidth: 1, borderRadius: 5, marginRight: 0,
                                                            justifyContent: 'center', alignItems: 'center', backgroundColor: '#E94E1B'
                                                        }}
                                                            onPress={this.addToFav.bind(this, "task", this.props.tasksData.id)}
                                                        >
                                                            <Icon name='heart' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                                                        </TouchableOpacity>
                                                    </View>

                                                </SafeAreaView>
                                        }
                                    </View>

                                    <View style={{ flex: 0.6, marginTop: 10, width: "100%", alignItems: "center", }} >
                                        <ScrollView contentContainerStyle={styles.contentContainer} style={{ width: "95%", }}>

                                            <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                                <View style={{ flex: 0.5, }}>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.name}</Text>
                                                        <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12, marginBottom: 5 }} >{this.state.userDetails.full_name || "n/a"}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.5, }}>
                                                    <TouchableOpacity style={{ flex: 0.5, }}
                                                        onPress={() => Communications.phonecall(this.state.userDetails.phone, true)}
                                                    >
                                                        <View style={{ marginLeft: 10 }}>
                                                            <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.makephonecall}</Text>
                                                            <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.state.userDetails.phone || "n/a"}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <View style={{ marginLeft: 10 }}>
                                                    </View>
                                                </View>
                                            </View>
                                            {/* price and location */}

                                            <View style={{ flex: 1, flexDirection: "row", height: 45, borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                                <View style={{ flex: 0.5, }}>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.budget}</Text>
                                                        <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.tasksData.currency} {this.props.tasksData.budget_price_fomat}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.5, }}>

                                                    <View style={{ marginLeft: 10 }}>
                                                        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.address}</Text>
                                                        <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.tasksData.address}</Text>
                                                    </View>
                                                </View>
                                            </View>


                                            {/* locations */}

                                            <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                                <View style={{ flex: 0.5, }}>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.districtandsubdistrict}</Text>
                                                        <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 10 }} >{this.props.tasksData.subdistrict_format}, {this.props.tasksData.district_format}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.5, }}>
                                                    <View style={{ marginLeft: 10, marginBottom: 10 }}>
                                                        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.stateandcity}</Text>
                                                        <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 10, }} >{this.props.tasksData.city_format}, {this.props.tasksData.state_format}</Text>
                                                    </View>
                                                </View>
                                            </View>

                                            {/* start and end date */}

                                            <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                                <View style={{ flex: 0.5, }}>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.startdate}</Text>
                                                        <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 10 }} >{this.props.tasksData.from_date}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.5, }}>
                                                    <View style={{ marginLeft: 10, marginBottom: 10 }}>
                                                        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.enddata}</Text>
                                                        <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 10, }} >{this.props.tasksData.to_date}</Text>
                                                    </View>
                                                </View>
                                            </View>





                                            {/* Description */}

                                            <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15, }} >
                                                <View style={{ flex: 1, }}>
                                                    <View style={{ marginLeft: 10, marginBottom: 15 }}>
                                                        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.description}</Text>
                                                        <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.tasksData.description}</Text>
                                                    </View>
                                                </View>
                                            </View>

                                            {/* View and id */}

                                            <View style={{ flex: 1, flexDirection: "row", height: 40, borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                                <View style={{ flex: 0.5, }}>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.id}</Text>
                                                        <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.tasksData.id}</Text>
                                                    </View>
                                                </View>
                                                {/* <View style={{ flex: 0.5, }}>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.View}</Text>
                                                        <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >3</Text>
                                                    </View>
                                                </View> */}
                                            </View>
                                        </ScrollView>

                                        <Fab active={this.state.active} direction="up" containerStyle={{ marginLeft: 10 }} style={{ backgroundColor: '#E94E1B' }}
                                            // position="bottomRight"
                                            position={this.props.str.language == "ar" ? "bottomLeft" : "bottomRight"}
                                            onPress={() => Communications.phonecall(this.state.userDetails.phone, true)}>
                                            <Icon name="md-call" />
                                            {
                                                (
                                                    this.state.userDetails && this.state.userDetails.user_name && this.state.userDetails.user_name != "" && this.state.userDetails.user_name != "n/a" &&
                                                    this.state.userDetails.user_email && this.state.userDetails.user_email != "" && this.state.userDetails.user_email != "n/a" &&
                                                    this.state.userDetails.contact_phone && this.state.userDetails.contact_phone != "" && this.state.userDetails.contact_phone != "n/a"
                                                ) ? (
                                                        <Button
                                                            style={{ backgroundColor: '#3B5998', }}
                                                            onPress={() => this.emailSending()}
                                                        >
                                                            <Icon name="mail" />
                                                        </Button>
                                                    ) :
                                                    (this.state.chatButtonLoading === true) ? (
                                                        <Button
                                                            style={{ backgroundColor: '#3B5998', }}
                                                        // onPress={() => this.emailSending()}
                                                        >
                                                            <ActivityIndicator size="small" />
                                                        </Button>
                                                    ) : null
                                            }
                                            <Button
                                                style={{ backgroundColor: '#3B5998', }}
                                                onPress={this.onShare}
                                            >
                                                <Entypo name='share' style={{ fontSize: 19, color: "white" }} />
                                            </Button>



                                        </Fab>
                                    </View>
                                </View>
                            ) : <View style={{
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

                        ) : null
                    }
                </View >
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
        setTaskId: (id) => {
            dispatch(setTaskId(id));
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ForthPageList);


const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 70,
        backgroundColor: "white",

    },
    container: {
        flex: 1,
        // height:200
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
        width: "100%", height: 35, marginTop: 10,
        borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC",
        justifyContent: 'center'
    },
    listText: {
        marginLeft: 10, color: "#000"
    }
});  
