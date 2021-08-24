
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, StatusBar, RefreshControl, SafeAreaView, Share, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, CardItem, Thumbnail, Button, Text, Icon, Fab } from 'native-base';
import { connect } from "react-redux";
import axios from 'axios';
import InfiniteScroll from 'react-native-infinite-scroll';
import * as Animatable from 'react-native-animatable';
import ImageSlider from 'react-native-image-slider';
import Communications from 'react-native-communications';
import IconFontIonicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Drawer from '../../Component/drawer';
import SendMsgToTasker from '../../Component/sendMsgToTasker';

class ThirdPageList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activity: false,
            moreloader: false,
            isloader: true,
            page: 0,
            chatButtonLoading: false,
            emailSendingFlag: false,
            // taskerData: []
        }
    }


    // componentDidMount() {
    //     StatusBar.setHidden(true)
    // }
    componentWillMount() {
        if (this.props.PropertiesForbuy || this.props.PropertiesForRent || this.props.Request) {
            this.getpropertyTypes(this)
        }
        if (this.props.Tasker || this.props.Tasks) {
            console.log(this.props.Tasks, "tasks")
            this._onRefreshTasker(this)

        }
        if (this.props.TaskerSearch) {
            console.log(this.props.TaskerSearch, "inresult")
            this.setState({
                taskerData: this.props.TaskerSearch,
                isloader: false,
                page: 10,
            }, () => {
                console.log(this.state.taskerData, this.state.isloader, this.state.moreloader, "updatedState")
            })

        }
        if (this.props.TasksSearch) {
            console.log(this.props.TasksSearch, "inresult")
            this.setState({
                tasksData: this.props.TasksSearch,
                isloader: false,
                page: 10,
            })

        }

        if (this.props.projectsData) {
            this.userDetailsGet(this)
            this.getOwnerProperties(this)

        }

        var { height, width } = Dimensions.get('window');
        this.setState({
            screenHeight: height,
        })

    }

    animateParent(fals) {
        setTimeout(() => {
            this.setState({
                drawer: false
            })
        }, 250);
    }



    //for userdetails get
    userDetailsGet() {
        this.setState({
            chatButtonLoading: !this.state.chatButtonLoading
        })
        let created_by;
        if (this.props.projectsData) {
            created_by = this.props.projectsData.created_by
        }

        console.log(created_by, "123")
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
                console.log(data.data.results, "responseuserdetails");
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

    // getting all properties add owner
    getOwnerProperties() {
        let created_by;

        if (this.props.projectsData) {
            created_by = this.props.projectsData.created_by
            this.setState({
                created_by: this.props.projectsData.created_by
            })
        }
        // console.log(created_by, "created_byOwnerFunction")
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
                console.log(data.data.results, "OwnerAllproperties");
                this.setState({
                    ownerProperties: data.data.results,
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
    emailSending() {
        this.setState({
            emailSendingFlag: !this.state.emailSendingFlag
        })
    }
    //for tasker api           
    _onRefreshTasker() {
        console.log("work")
        this.setState({
            isloader: true
        })
        if (this.props.TaskerSearch) {
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
                url: 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/people/guest/getSearchTasker',
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
                        taskerData: data.data.results,
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
        if (this.props.TasksSearch) {
            let cloneData = this.props.keywords
            console.log(this.props.keywords, "keywords")
            var bodyFormData = new FormData();
            // for (var key in cloneData) {
            //     if (cloneData[key] && cloneData[key] !== undefined && cloneData[key].length !== 0) {
            //         bodyFormData.append(key, cloneData[key]);
            //     }
            // }
            for (var key in cloneData) {
                if (cloneData[key] && cloneData[key] !== undefined && cloneData[key].length !== 0) {
                    if (Array.isArray(cloneData[key])) {
                        var arr = cloneData[key];
                        for (var i = 0; i < arr.length; i++) {
                            bodyFormData.append(key + "[]", arr[i]);
                        }
                    }
                    else {
                        bodyFormData.append(key, cloneData[key]);
                    }
                }
            }
            bodyFormData.append("limit", "10");
            bodyFormData.append("offset", "0");
            console.log(bodyFormData, '****61', cloneData);
            return axios({
                method: 'POST',
                url: 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/task/guest/getTasksSearch',
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
                        tasksData: data.data.results,
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
        if (this.props.Tasker) {
            console.log("work")
            let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/guest/getTaskersByCategory/" + this.props.Tasker + "/10"
            return axios({
                method: 'get',
                url: uri,
                headers: {
                    "clientkey": "34532hbjdsakjd2&&gjhjh11",
                    "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                },
            })
                .then(data => {
                    console.log(data.data.results, "response");   ///url return on response holding for client response
                    this.setState({
                        taskerData: data.data.results,
                        isloader: false,
                        page: 10,
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

        if (this.props.Tasks) {
            console.log("workingcondition", this.props.param2)
            let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/guest/getTasksByType/" + this.props.Tasks + "/10"
            return axios({
                method: 'get',
                url: uri,
                headers: {
                    "clientkey": "34532hbjdsakjd2&&gjhjh11",
                    "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                },
            })
                .then(data => {
                    console.log(data.data.results, "response");   ///url return on response holding for client response
                    this.setState({
                        tasksData: data.data.results,
                        isloader: false,
                        page: 10,
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


    }


    _onEndReached() {
        this.setState({
            moreloader: true
        })
        if (this.state.moreloader === false && this.props.TaskerSearch) {
            let cloneData = this.props.keywords
            console.log(this.props.keywords, "keywords")
            var bodyFormData = new FormData();
            for (var key in cloneData) {
                if (cloneData[key] && cloneData[key] !== undefined && cloneData[key].length !== 0) {
                    bodyFormData.append(key, cloneData[key]);
                }
            }
            bodyFormData.append("limit", "10");
            bodyFormData.append("offset", this.state.page);
            console.log(bodyFormData, '****61', cloneData);
            return axios({
                method: 'POST',
                url: 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/people/guest/getSearchTasker',
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
                    let cloneTaskerData = this.state.taskerData
                    let responseAPI = data.data.results
                    for (var i = 0; i < responseAPI.length; i++) {
                        cloneTaskerData.push(responseAPI[i])
                    }

                    console.log(responseAPI, "responseAPI")
                    this.setState({
                        moreloader: false,
                        page: this.state.page + 10,
                        taskerData: cloneTaskerData
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
        if (this.state.moreloader === false && this.props.TasksSearch) {
            let cloneData = this.props.keywords
            console.log(this.props.keywords, "keywords")
            var bodyFormData = new FormData();
            // for (var key in cloneData) {
            //     if (cloneData[key] && cloneData[key] !== undefined && cloneData[key].length !== 0) {
            //         bodyFormData.append(key, cloneData[key]);
            //     }
            // }
            for (var key in cloneData) {
                if (cloneData[key] && cloneData[key] !== undefined && cloneData[key].length !== 0) {
                    if (Array.isArray(cloneData[key])) {
                        var arr = cloneData[key];
                        for (var i = 0; i < arr.length; i++) {
                            bodyFormData.append(key + "[]", arr[i]);
                        }
                    }
                    else {
                        bodyFormData.append(key, cloneData[key]);
                    }
                }
            }
            bodyFormData.append("limit", "10");
            bodyFormData.append("offset", this.state.page);
            console.log(bodyFormData, '****61', cloneData);
            return axios({
                method: 'POST',
                url: 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/task/guest/getTasksSearch',
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
                    let clonetasksData = this.state.tasksData
                    let responseAPI = data.data.results
                    for (var i = 0; i < responseAPI.length; i++) {
                        clonetasksData.push(responseAPI[i])
                    }
                    this.setState({
                        moreloader: false,
                        page: this.state.page + 10,
                        tasksData: clonetasksData
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

        if (this.state.moreloader === false && this.props.Tasker) {
            let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/guest/getTaskersByCategory/" + this.props.Tasker + "/10/" + this.state.page
            return axios({
                method: 'get',
                url: uri,
                headers: {
                    "clientkey": "34532hbjdsakjd2&&gjhjh11",
                    "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                },
            })
                .then(data => {
                    let cloneTaskerData = this.state.taskerData
                    let responseAPI = data.data.results
                    for (var i = 0; i < responseAPI.length; i++) {
                        cloneTaskerData.push(responseAPI[i])
                    }

                    console.log(responseAPI, "responseAPI")
                    this.setState({
                        moreloader: false,
                        page: this.state.page + 10,
                        taskerData: cloneTaskerData
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


        if (this.state.moreloader === false && this.props.Tasks) {

            let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/guest/getTasksByType/" + this.props.Tasks + "/10/" + this.state.page
            return axios({
                method: 'get',
                url: uri,
                headers: {
                    "clientkey": "34532hbjdsakjd2&&gjhjh11",
                    "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                },
            })
                .then(data => {
                    let clonetasksData = this.state.tasksData
                    let responseAPI = data.data.results
                    for (var i = 0; i < responseAPI.length; i++) {
                        clonetasksData.push(responseAPI[i])
                    }
                    this.setState({
                        moreloader: false,
                        page: this.state.page + 10,
                        tasksData: clonetasksData
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

    }





    //for getCategoryproperty api
    getpropertyTypes() {
        return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/guest/getCategoryproperty",
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                // console.log(data.data.results, "countries")
                this.setState({
                    propertyTypes: data.data.results,

                })
                // this.props.setCountries(data.data.results)
            })
            .catch(err => {
                console.log(err)
                alert(err.message)
                this.setState({
                    err: err.message,

                })

            })
    }

    onShare = () => {
        try {
            if (this.props.projectsData) {
                console.log(this.props.projectsData.url_project, "onshare")
                const result = Share.share({
                    message: this.props.projectsData.url_project,
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
        // console.log(this.state.userDetails, "user details")
        return (
            <View style={{
                flex: 1,
                // justifyContent: 'center',
                // alignItems: "center",
                backgroundColor: "white"
            }}>

                {/* drawer*/}
                {(this.state.drawer === true) ? (
                    <Drawer
                        animationStyle="fadeInLeftBig"
                        routName="Properties"
                        animateParent={this.animateParent.bind(this)}
                        ownerDetails={this.state.userDetails}
                        ownerProperties={this.state.ownerProperties}
                        created_by={this.state.created_by}
                    />

                ) : (
                        null
                    )}
                {/* drawer*/}

                <View style={{
                    flex: 1.18,
                    // height: 40,
                    backgroundColor: '#E94E1B',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: "row",
                    width: "100%"
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
                            style={{ position: "absolute", height: this.state.screenHeight, width: "20%", right: 0, zIndex: 1, }}>
                        </TouchableOpacity>
                    ) : (null)}
                    {/* this view for closing drawer  */}

                    {/* /////////////////////////////header///////////////////////////// */}
                    <View style={{ width: "90%", flexDirection: "row", marginTop: "7%" }}>
                        {
                            (this.props.TasksSearch) ? (
                                <TouchableOpacity style={{ marginRight: 20 }} onPress={() => {
                                    Actions.tabbar({ type: "reset" });
                                    Actions.findTask()
                                }}>
                                    <IconFontIonicons name='md-arrow-back' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                                </TouchableOpacity>
                            ) : (this.props.TaskerSearch) ? (
                                <TouchableOpacity style={{ marginRight: 20 }} onPress={() => {
                                    Actions.tabbar({ type: "reset" });
                                    Actions.findTasker()
                                }}>
                                    <IconFontIonicons name='md-arrow-back' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                                </TouchableOpacity>
                            ) : <TouchableOpacity style={{ marginRight: 20 }} onPress={() => { Actions.pop() }}>
                                        <IconFontIonicons name='md-arrow-back' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                                    </TouchableOpacity>
                        }

                        {
                            (this.props.PropertiesForbuy) ? (
                                <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.propertyforbuy.toUpperCase()}</Text>
                            ) : null
                        }
                        {
                            (this.props.PropertiesForRent) ? (
                                <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.propertyforrent.toUpperCase()}</Text>
                            ) : null
                        }
                        {
                            (this.props.Request) ? (
                                <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.request.toUpperCase()}</Text>
                            ) : null
                        }
                        {
                            (this.props.Tasks || this.props.Tasker) ? (
                                <>
                                    {/* {
                                        alert("working")
                                    } */}
                                    <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.param2.toUpperCase()}</Text>
                                </>
                            ) : null

                        }
                        {
                            (this.props.TasksSearch || this.props.TaskerSearch) ? (
                                <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.result}</Text>
                            ) : null
                        }
                        {
                            (this.props.projectsData) ? (
                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity style={{ marginRight: 20 }}
                                        onPress={() => this.setState({ drawer: !this.state.drawer })}>
                                        <Entypo name='menu' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                                    </TouchableOpacity>
                                    <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.fullview} {this.props.str.projects.toUpperCase()}</Text>
                                </View>
                            ) : null
                        }

                    </View>
                </View>

                {/* //////////////////////////////////////Properties////////////////////////////////////// */}
                {/* //////////////////////////////////////Properties For Buy////////////////////////////////////// */}
                {
                    (this.props.PropertiesForbuy) ? (
                        (this.state.propertyTypes) ? (
                            <View style={{ flex: 8, width: "100%", }}>
                                <ScrollView contentContainerStyle={styles.contentContainer}
                                >
                                    {
                                        (this.state.propertyTypes) ? (
                                            this.state.propertyTypes.sale.map((key, index) => {
                                                console.log(key, index, "category")
                                                return (
                                                    <TouchableOpacity key={index} style={styles.listView}
                                                        onPress={() => { Actions.ForthPageList({ renderIdForSale: key.id, param2: "sale", heading: key.name, }) }}
                                                    >
                                                        <Text >{key.name}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        ) :
                                            null
                                    }
                                </ScrollView>
                            </View>
                        ) : <View style={{
                            flex: 8,
                            justifyContent: 'center',
                            alignItems: "center",
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

                {/* //////////////////////////////////////Properties for Rent<////////////////////////////////////// */}
                {
                    (this.props.PropertiesForRent) ? (
                        (this.state.propertyTypes) ? (
                            <View style={{ flex: 8, width: "100%", }}>
                                <ScrollView contentContainerStyle={styles.contentContainer}
                                >
                                    {
                                        (this.state.propertyTypes) ? (
                                            this.state.propertyTypes.rent.map((key, index) => {
                                                return (
                                                    <TouchableOpacity style={styles.listView}
                                                        onPress={() => { Actions.ForthPageList({ renderIdForRent: key.id, param2: "rent", heading: key.name, }) }}
                                                        key={index}
                                                    >
                                                        <Text >{key.name}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        ) :
                                            null
                                    }
                                </ScrollView>
                            </View>
                        ) : <View style={{
                            flex: 8,
                            justifyContent: 'center',
                            alignItems: "center",
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
                {/* //////////////////////////////////////Request<////////////////////////////////////// */}
                {
                    (this.props.Request) ? (
                        (this.state.propertyTypes) ? (
                            <View style={{ flex: 8, width: "100%", }}>
                                <ScrollView contentContainerStyle={styles.contentContainer}
                                >
                                    {
                                        (this.state.propertyTypes) ? (
                                            this.state.propertyTypes.rent.map((key, index) => {
                                                return (
                                                    <TouchableOpacity style={styles.listView}
                                                        onPress={() => { Actions.ForthPageList({ renderIdForRequest: key.id, param2: "Request", heading: key.name, }) }}
                                                        key={index}
                                                    >
                                                        <Text >{key.name}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        ) :
                                            null
                                    }
                                </ScrollView>
                            </View>
                        ) : <View style={{
                            flex: 8,
                            justifyContent: 'center',
                            alignItems: "center",
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

                {/* //////////////////////////////////////Tasker////////////////////////////////////// */}
                {
                    (this.props.Tasker || this.props.TaskerSearch) ? (
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
                                ) : <InfiniteScroll
                                    horizontal={false}  //true - if you want in horizontal
                                    onLoadMoreAsync={this._onEndReached.bind(this)}
                                    distanceFromEnd={12} // distance in density-independent pixels from the right end
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.activity}
                                            onRefresh={this._onRefreshTasker.bind(this)} />
                                    }
                                >
                                        {
                                            (this.state.taskerData.length != 0) ? (
                                                <View>
                                                    {
                                                        this.state.taskerData.map((key, index) => {
                                                            return (
                                                                <TouchableOpacity key={index} style={{ marginTop: 5, flex: 1, flexDirection: "row", padding: 5, backgroundColor: "#f8f1f1" }}
                                                                    onPress={() => { Actions.ForthPageList({ taskerData: key, headersHeading: this.props.param2 }) }}
                                                                >
                                                                    <View style={{ flex: 0.5, }} >
                                                                        <Image style={{ resizeMode: 'contain', height: 120, width: "100%" }}
                                                                            source={{ uri: key.avatar_photo }} />
                                                                    </View>
                                                                    <View style={{ flex: 0.6, padding: 5, }}>
                                                                        <View >
                                                                            {
                                                                                (key.full_name != null) ? (
                                                                                    <Text style={{ fontSize: 15, color: "black" }}>{key.full_name.toUpperCase()}</Text>
                                                                                ) : null
                                                                            }
                                                                        </View>
                                                                        <View style={{ marginTop: 0 }} >
                                                                            <View style={{ flexDirection: "row", }}>
                                                                                <Text style={{ fontSize: 12, color: "#E94E1B", marginTop: 1.5, }}>{this.props.str.contact}</Text>
                                                                                <Text style={{ fontSize: 12, color: "#E94E1B", marginTop: 1.5, marginLeft: 7 }}>{key.contact_phone}</Text>
                                                                            </View>
                                                                            <Text style={{ fontSize: 7, color: "#6a6a6a", marginTop: 1.5 }}>{key.city}, {key.state} </Text>
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
                                                    <Text style={{ color: "black" }}>{this.props.thereisnodataavailable}</Text>
                                                </View>
                                        }
                                    </InfiniteScroll>
                            }
                        </View >



                    ) : null
                }

                {/* //////////////////////////////////////Tasks////////////////////////////////////// */}
                {
                    (this.props.Tasks || this.props.TasksSearch) ? (
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
                                ) : <InfiniteScroll
                                    horizontal={false}  //true - if you want in horizontal
                                    onLoadMoreAsync={this._onEndReached.bind(this)}
                                    distanceFromEnd={12} // distance in density-independent pixels from the right end
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.activity}
                                            onRefresh={this._onRefreshTasker.bind(this)} />
                                    }
                                >
                                        {
                                            (this.state.tasksData.length != 0) ? (
                                                <View>
                                                    {
                                                        this.state.tasksData.map((key, index) => {
                                                            console.log(this.state.tasksData, "taskData")
                                                            return (
                                                                <TouchableOpacity key={index} style={{ marginTop: 5, flex: 1, flexDirection: "row", padding: 5, backgroundColor: "#f8f1f1" }}
                                                                    // onPress={() => { Actions.ForthPageList({ tasksData: key,  headersHeading: this.props.param2 }) }}
                                                                    onPress={() => { Actions.ForthPageList({ tasksData: key, headersHeading: this.props.param2 }) }}
                                                                >
                                                                    <View style={{ flex: 0.5, }} >
                                                                        <Image style={{ resizeMode: 'contain', height: 120, width: "100%" }}
                                                                            source={{ uri: key.gallery_src[0] }} />
                                                                    </View>
                                                                    <View style={{ flex: 0.6, padding: 5, }}>
                                                                        <View style={{}}>
                                                                            <Text style={{ fontSize: 10, color: "black" }}>{key.title ? key.title.toUpperCase() : ""}</Text>
                                                                        </View>
                                                                        <View style={{ marginTop: 0 }} >
                                                                            <Text style={{ fontSize: 12, color: "#E94E1B" }}>{this.props.str.description}</Text>
                                                                            <Text style={{ fontSize: 10, }}>{key.description.substring(0, 65)} </Text>
                                                                            <View style={{ flexDirection: "row", }}>
                                                                                <Text style={{ fontSize: 12, color: "#E94E1B", textAlign: "right", marginTop: 1.5, }}>{this.props.str.budget}</Text>
                                                                                <Text style={{ fontSize: 12, color: "#E94E1B", textAlign: "right", marginTop: 1.5, marginLeft: 7 }}>{key.currency} {key.budget_price}</Text>

                                                                                {
                                                                                    (key.typeFlag) ? (
                                                                                        <View style={{ backgroundColor: "#E94E1B", justifyContent: "center", alignItems: "center", marginTop: 2.5, marginLeft: 10, width: 80 }}>
                                                                                            <Text style={{ fontSize: 12, color: "white", }}> {key.typeFlag.toUpperCase()}</Text>
                                                                                        </View>
                                                                                    ) : null
                                                                                }
                                                                            </View>
                                                                            <View style={{ flexDirection: "row", }}>
                                                                                <Text style={{ fontSize: 10, }}>{this.props.str.posted} {key.published_on} </Text>
                                                                            </View>
                                                                            <Text style={{ fontSize: 7, color: "#6a6a6a", textAlign: "right", marginTop: 10 }}>{key.city_format}, {key.state_format} </Text>
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
                        </View >


                    ) : null
                }
















                {
                    (this.props.projectsData) ? (

                        (this.state.userDetails) ? (
                            <View style={{ flex: 8, width: "100%", }}>
                                <SendMsgToTasker modalOpen={this.state.emailSendingFlag} projectsData={this.state.userDetails} projectsId={this.props.projectsData.id} emailSending={() => this.emailSending()} />
                                <View style={{ flex: 0.4 }}>
                                    {
                                        (this.props.projectsData.gallery_src.length != 0) ? (
                                            <SafeAreaView style={styles.container}>
                                                <ImageSlider
                                                    // loopBothSides
                                                    autoPlayWithInterval={8000}
                                                    images={this.props.projectsData.gallery_src}
                                                    customSlide={({ index, item, style, width }) => (
                                                        // It's important to put style here because it's got offset inside
                                                        <View key={index} style={[style, styles.customSlide]}>
                                                            <Image resizeMode={"cover"} source={{ uri: item }} style={styles.customImage} />
                                                        </View>
                                                    )} />
                                            </SafeAreaView>
                                        ) :
                                            <SafeAreaView style={styles.container}>
                                                <View style={styles.customSlide}>
                                                    <Image resizeMode="stretch" source={{ uri: this.props.projectsData.featured_img_src }} style={styles.customImage} />
                                                </View>
                                            </SafeAreaView>
                                    }
                                </View>

                                <View style={{ flex: 0.6, marginTop: 10, width: "100%", alignItems: "center", }} >
                                    <ScrollView contentContainerStyle={styles.contentContainer} style={{ width: "95%", }}>

                                        {/* Name and location */}

                                        <View style={{ flex: 1, flexDirection: "row", height: 45, borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.name}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.state.userDetails.user_name}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10, marginBottom: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.location}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 10 }} >{this.props.projectsData.city_format}, {this.props.projectsData.state_format},</Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* Title and type*/}

                                        <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.title}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.projectsData.title}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10, marginBottom: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.type}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 10 }} >{this.props.projectsData.type_format}</Text>
                                                </View>
                                            </View>

                                        </View>



                                        {/* property time and make call */}

                                        <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15, marginBottom: 15 }} >

                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10, marginBottom: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.propertyandtime}</Text>
                                                    {
                                                        (this.props.projectsData.times && this.props.projectsData.property_types && this.props.projectsData.property_types.length) ? (
                                                            this.props.projectsData.times.map((time, index) => {
                                                                return (
                                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12, }}>{time + " " + this.props.projectsData.property_types[index]} </Text>
                                                                )
                                                            })
                                                        ) : null

                                                    }
                                                </View>
                                            </View>
                                            <TouchableOpacity style={{ flex: 0.5, }}
                                                onPress={() => Communications.phonecall(this.state.userDetails.contact_phone, true)}
                                            >
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.makephonecall}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.state.userDetails.contact_phone}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                        {/* Description */}

                                        <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 1, }}>
                                                <View style={{ marginLeft: 10, marginBottom: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.description}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.projectsData.description}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* View and id */}

                                        <View style={{ flex: 1, flexDirection: "row", height: 40, borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.id}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.projectsData.id}</Text>
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
                                    <Fab
                                        active={this.state.active}
                                        direction="up"
                                        containerStyle={{ marginLeft: 10 }}
                                        style={{ backgroundColor: '#E94E1B' }}
                                        // position="bottomRight"
                                        position={this.props.str.language == "ar" ? "bottomLeft" : "bottomRight"}

                                        onPress={() => Communications.phonecall(this.state.userDetails.contact_phone, true)}
                                    >
                                        <Icon name="md-call" />
                                        {
                                            (
                                                this.state.userDetails
                                                && this.state.userDetails.user_name && this.state.userDetails.user_name != "" && this.state.userDetails.user_name != "n/a" &&
                                                this.state.userDetails.user_email && this.state.userDetails.user_email != "" && this.state.userDetails.user_email != "n/a"
                                                // this.state.userDetails.contact_phone && this.state.userDetails.contact_phone != "" && this.state.userDetails.contact_phone != "n/a"
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
        );
    }
}


let mapStateToProps = state => {
    return {
        str: state.root.str
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        // languageSet: (lang) => {
        //     dispatch(languageSet(lang))
        // },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ThirdPageList);


const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 20,
        // backgroundColor: "red",
        marginHorizontal: "5%"
        // backgroundColor: "red",
        // flex: 1

    },
    container: {
        flex: 1,
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
        width: "100%", height: 40, marginTop: 10,
        borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC",
        justifyContent: 'center'
    },
    listText: {
        justifyContent: "flex-start",
        textAlign: "left",
        alignSelf: "stretch",
        fontSize: 16
    }
});  
