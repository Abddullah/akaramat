import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, StatusBar, RefreshControl, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, CardItem, Text, Thumbnail, Button, Icon } from 'native-base';
import { connect } from "react-redux";
import axios from 'axios';
import ImageSlider from 'react-native-image-slider';
import Communications from 'react-native-communications';
import InfiniteScroll from 'react-native-infinite-scroll';
import IconFontFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontIonicons from 'react-native-vector-icons/Ionicons';

class SecondPageList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activity: false,
            moreloader: false,
            isloader: true,
            page: 10,
            blogsData: []
        }
    }

    // componentDidMount() {
    //     StatusBar.setHidden(true)
    // }
    componentWillMount() {
        if (this.props.Tasker || this.props.Tasks) {
            this.getCategoriesTasker(this)
        }
        if (this.props.Projects) {
            this.getFeaturedProjects(this)
        }
        if (this.props.Representative || this.props.Agent || this.props.News) {
            this._onRefresh(this)
        }
        if (this.props.AgentSearch) {
            console.log(this.props.AgentSearch, "AgentSearch")
            this.setState({
                agentanddevelopers: this.props.AgentSearch,
                isloader: false,
                page: 10,
            })
        }
        if (this.props.RepreSearch) {
            this.setState({
                representativeData: this.props.RepreSearch,
                isloader: false,
                page: 10,
            })
        }
    }







    getCategoriesTasker() {
        return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/guest/getCategoriesTasker",
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                // console.log(data.data.results, "countries")
                this.setState({
                    categoriesTasker: data.data.results,
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



    getFeaturedProjects() {
        this.setState({
            isloader: true
        })
        return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/project/guest/getFeaturedProjects",
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                console.log(data.data.results.data, "respo")
                let responseAPI = data.data.results.data
                for (var i = 0; i < responseAPI.length; i++) {
                    responseAPI[i].typeFlag = "Featured"
                }
                this.setState({
                    projectsData: responseAPI,
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

    _onRefresh() {
        if (this.props.Agent) {
            this.setState({
                isloader: true
            })
            return axios({
                method: 'get',
                url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/guest/getListUsersByUserType/agents_and_developers/10",
                headers: {
                    "clientkey": "34532hbjdsakjd2&&gjhjh11",
                    "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                },
            })
                .then(data => {
                    let responseAPI = data.data.results
                    console.log(responseAPI, "responseAPI on refresh")
                    this.setState({
                        isloader: false,
                        page: this.state.page + 10,
                        agentanddevelopers: responseAPI,

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
        if (this.props.AgentSearch || this.props.RepreSearch) {
            this.setState({
                isloader: true
            })
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
                url: 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/people/guest/getUsersSearch',
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
                    if (this.props.AgentSearch) {
                        this.setState({
                            agentanddevelopers: data.data.results,
                            isloader: false,
                            page: 10,
                        })
                    }
                    if (this.props.RepreSearch) {
                        this.setState({
                            representativeData: data.data.results,
                            isloader: false,
                            page: 10,
                        })
                    }

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

        if (this.props.Representative) {
            this.setState({
                isloader: true
            })
            return axios({
                method: 'get',
                url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/guest/getListUsersByUserType/representatives/10",
                headers: {
                    "clientkey": "34532hbjdsakjd2&&gjhjh11",
                    "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                },
            })
                .then(data => {
                    let responseAPI = data.data.results
                    console.log(responseAPI, "responseAPI on refresh")
                    this.setState({
                        isloader: false,
                        page: this.state.page + 10,
                        representativeData: responseAPI,

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
        if (this.props.projects) {
            this.getFeaturedProjects(this)
            this.setState({
                isloader: true
            })
            return axios({
                method: 'get',
                url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/project/guest/getProjectsList/10",
                headers: {
                    "clientkey": "34532hbjdsakjd2&&gjhjh11",
                    "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                },
            })
                .then(data => {
                    let cloneProjectData = this.state.projectsData
                    let responseAPI = data.data.results
                    console.log(responseAPI, "moredata");
                    for (var i = 0; i < responseAPI.length; i++) {
                        cloneProjectData.push(responseAPI[i])
                    }
                    this.setState({
                        isloader: false,
                        page: this.state.page + 10,
                        projectsData: cloneProjectData
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

        if (this.props.News) {
            this.setState({
                isloader: true,
            })
            console.log(this.state.page, "respo")
            return axios({
                method: 'get',
                url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/blog/guest/getBlogList?order_by=id&limit=10&offset=0",
                headers: {
                    "clientkey": "34532hbjdsakjd2&&gjhjh11",
                    "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                },
            })
                .then(data => {
                    console.log(data.data.results, "respo")
                    let responseAPI = data.data.results
                    this.setState({
                        blogsData: responseAPI,
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
        if (this.state.moreloader === false && this.props.Agent) {
            // alert("work")
            return axios({
                method: 'get',
                url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/guest/getListUsersByUserType/agents_and_developers/10/" + this.state.page,
                headers: {
                    "clientkey": "34532hbjdsakjd2&&gjhjh11",
                    "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                },
            })
                .then(data => {
                    // alert("then")
                    // console.log(responseAPI, "responseAPI on end")
                    let responseAPI = data.data.results
                    let clonData = this.state.agentanddevelopers
                    for (var i = 0; i < responseAPI.length; i++) {
                        clonData.push(responseAPI[i])
                    }
                    this.setState({
                        moreloader: false,
                        page: this.state.page + 10,
                        agentanddevelopers: clonData,

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
        if (this.state.moreloader === false && this.props.AgentSearch || this.props.RepreSearch) {
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
                url: 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/people/guest/getUsersSearch',
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
                    if (this.props.AgentSearch) {
                        let cloneAgents = this.state.agentanddevelopers
                        let responseAPI = data.data.results
                        for (var i = 0; i < responseAPI.length; i++) {
                            cloneAgents.push(responseAPI[i])
                        }

                        console.log(responseAPI, "responseAPI")
                        this.setState({
                            moreloader: false,
                            page: this.state.page + 10,
                            agentanddevelopers: cloneAgents
                        })
                    }
                    if (this.props.RepreSearch) {
                        let cloneRepreData = this.state.representativeData
                        let responseAPI = data.data.results
                        for (var i = 0; i < responseAPI.length; i++) {
                            cloneRepreData.push(responseAPI[i])
                        }

                        console.log(responseAPI, "responseAPI")
                        this.setState({
                            moreloader: false,
                            page: this.state.page + 10,
                            representativeData: cloneRepreData
                        })
                    }

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

        if (this.state.moreloader === false && this.props.Representative) {
            // alert("work")
            return axios({
                method: 'get',
                url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/guest/getListUsersByUserType/representatives/10/" + this.state.page,
                headers: {
                    "clientkey": "34532hbjdsakjd2&&gjhjh11",
                    "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                },
            })
                .then(data => {
                    console.log(responseAPI, "responseAPI on end")
                    let responseAPI = data.data.results
                    let clonData = this.state.representativeData
                    for (var i = 0; i < responseAPI.length; i++) {
                        clonData.push(responseAPI[i])
                    }
                    this.setState({
                        moreloader: false,
                        page: this.state.page + 10,
                        representativeData: clonData,

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
        if (this.props.Projects) {
            return axios({
                method: 'get',
                url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/project/guest/getProjectsList/10/" + this.state.page,
                headers: {
                    "clientkey": "34532hbjdsakjd2&&gjhjh11",
                    "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                },
            })
                .then(data => {
                    let cloneProjectData = this.state.projectsData
                    let responseAPI = data.data.results
                    console.log(responseAPI, "moredata");
                    for (var i = 0; i < responseAPI.length; i++) {
                        cloneProjectData.push(responseAPI[i])
                    }
                    this.setState({
                        moreloader: false,
                        page: this.state.page + 10,
                        projectsData: cloneProjectData
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


        if (this.props.News) {
            console.log(this.state.page, "respo")
            return axios({
                method: 'get',
                url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/blog/guest/getBlogList?order_by=id&limit=10&offset=" + this.state.page,
                headers: {
                    "clientkey": "34532hbjdsakjd2&&gjhjh11",
                    "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                },
            })
                .then(data => {
                    let cloneBlogsData = this.state.blogsData
                    let responseAPI = data.data.results
                    console.log(responseAPI, "moredata");
                    for (var i = 0; i < responseAPI.length; i++) {
                        cloneBlogsData.push(responseAPI[i])
                    }
                    this.setState({
                        moreloader: false,
                        page: this.state.page + 10,
                        blogsData: cloneBlogsData
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



    render() {
        let specialChars = '!@#$^&%*()+=-[]\/{}|:""<>?. ';


        // console.log(this.state.blogsData.length, "lenght")
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: "center",
                backgroundColor: "white",
                width: "100%"
            }}>
                {/* /////////////////////////////header///////////////////////////// */}

                <View style={{
                    flex: 1.18,
                    // height: 40,
                    backgroundColor: '#E94E1B',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: "row",
                    width: "100%"
                }}>


                    <View style={{ width: "90%", flexDirection: "row", marginTop: "7%" }}>
                        <TouchableOpacity style={{ marginRight: 20 }} onPress={() => { Actions.pop() }}>
                            <IconFontIonicons name='md-arrow-back' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                        </TouchableOpacity>
                        {
                            (this.props.Properties) ? (
                                <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.propertiescategories.toUpperCase()}</Text>
                            ) : null
                        }
                        {
                            (this.props.Tasker) ? (
                                <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.browsetasker.toUpperCase()}</Text>
                            ) : null
                        }
                        {
                            (this.props.Tasks) ? (
                                <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.taskcategory}</Text>
                            ) : null
                        }
                        {
                            (this.props.Agent) ? (
                                <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.agentanddevelopers}</Text>
                            ) : null
                        }
                        {
                            (this.props.AgentSearch || this.props.RepreSearch) ? (
                                <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.result}</Text>
                            ) : null
                        }
                        {
                            (this.props.Representative) ? (
                                <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.representative}</Text>
                            ) : null
                        }
                        {
                            (this.props.Projects) ? (
                                <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.projects}</Text>
                            ) : null
                        }
                        {
                            (this.props.News) ? (
                                <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.news}</Text>
                            ) : null
                        }
                        {
                            (this.props.jobs) ? (
                                <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.jobs}</Text>
                            ) : null
                        }

                    </View>
                </View>



                {/* //////////////////////////////////////Properties////////////////////////////////////// */}
                {
                    (this.props.Properties) ? (
                        <View style={{ flex: 8, width: "90%", }}>

                            <View style={{
                                flex: 1, width: "100%",
                            }}>
                                <TouchableOpacity style={styles.listView}
                                    onPress={() => { Actions.ThirdPageList({ PropertiesForbuy: "PropertiesForbuy", }) }}
                                // key={"PropertiesForbuy"}
                                >
                                    <Text >{this.props.str.propertyforbuy}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.listView}
                                    onPress={() => { Actions.ThirdPageList({ PropertiesForRent: "PropertiesForRent", }) }}
                                // key={"PropertiesForRent"}
                                >
                                    <Text >{this.props.str.propertyforrent}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.listView}
                                    onPress={() => { Actions.ThirdPageList({ Request: "Request", }) }}
                                // key={"PropertiesForRent"}
                                >
                                    <Text >{this.props.str.request}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    ) : null
                }

                {/* //////////////////////////////////////Tasker and Tasks same data////////////////////////////////////// */}
                {
                    (this.props.Tasker || this.props.Tasks) ? (
                        (this.state.categoriesTasker) ? (
                            <View style={{ flex: 8, width: "90%", }}>
                                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
                                    {
                                        (this.state.categoriesTasker) ? (
                                            this.state.categoriesTasker.map((key, index) => {
                                                console.log(key, "keyid")
                                                return (
                                                    <TouchableOpacity style={styles.listView}
                                                        onPress={() => {
                                                            (this.props.Tasker) ? (
                                                                Actions.ThirdPageList({ Tasker: key.id, param2: key.name, })
                                                            ) : Actions.ThirdPageList({ Tasks: key.id, param2: key.name, })
                                                        }}
                                                        key={key.id}
                                                    >
                                                        <Text >{key.name}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        ) : null

                                        // <View style={{
                                        //     width: "100%",
                                        //     top: "50%",
                                        //     justifyContent: 'center',
                                        //     alignItems: "center",
                                        // }}>
                                        //     <ActivityIndicator size="large" color="#E94E1B" />
                                        //     {
                                        //         (this.state.err) ?
                                        //             (
                                        //                 <Text style={{ marginTop: 10 }}>{this.state.err}</Text>
                                        //             ) : <Text style={{ marginTop: 10 }} >Loading....</Text>
                                        //     }
                                        // </View>
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

                {
                    // (this.props.Agent) ? (
                    //     <View style={{
                    //         flex: 8,
                    //         justifyContent: 'center',
                    //         alignItems: "center",
                    //         marginBottom: 20,
                    //         marginTop: 20,
                    //     }}>
                    //         <Text style={{ color: "black" }}>Under Development</Text>
                    //     </View>


                    // ) : null
                }
                {
                    (this.props.Agent || this.props.AgentSearch) ? (
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
                                            onRefresh={this._onRefresh.bind(this)}
                                        />
                                    }
                                >
                                        {
                                            (this.state.agentanddevelopers.length != 0) ? (
                                                <View>
                                                    {
                                                        this.state.agentanddevelopers.map((key, index) => {
                                                            return (
                                                                <TouchableOpacity style={{ marginTop: 5, flex: 1, flexDirection: "row", padding: 5, backgroundColor: "#f8f1f1" }}
                                                                    onPress={() => { Actions.FithPageList({ agentanddevelopers: key }) }}
                                                                >
                                                                    <View style={{ flex: 0.5, }} >
                                                                        <Image style={{ resizeMode: 'contain', height: 120, width: "100%" }}
                                                                            source={{ uri: key.avatar_photo }} />
                                                                    </View>
                                                                    <View style={{ flex: 0.6, padding: 5, }}>
                                                                        <View style={{}}>
                                                                            <Text style={{ fontSize: 16, color: "black", fontWeight: "450" }}>{key.full_name}</Text>
                                                                        </View>
                                                                        <View style={{ marginTop: 0 }} >
                                                                            <Text style={{ fontSize: 12, color: "#E94E1B" }}>{this.props.str.aboutme}</Text>
                                                                            {
                                                                                (key.about_me) ? (
                                                                                    <Text style={{ fontSize: 10, }}>{key.about_me.substring(0, 65)} </Text>
                                                                                ) : null

                                                                            }

                                                                            {/* {
                                                                                (key.typeFlag) ? (
                                                                                    <View style={{ backgroundColor: "#E94E1B", justifyContent: "center", alignItems: "center", marginTop: 2.5, width: 80 }}>
                                                                                        <Text style={{ fontSize: 12, color: "white", }}> 123</Text>
                                                                                    </View>
                                                                                ) : null
                                                                            } */}
                                                                            <View style={{ flexDirection: "row", }}>
                                                                                <IconFontFontAwesome name='phone' style={{ fontSize: 12, color: "#E94E1B", textAlign: "right", marginTop: 5 }} />
                                                                                <Text style={{ fontSize: 12, color: "#E94E1B", textAlign: "right", marginTop: 1.5, marginLeft: 7 }}>{key.contact_phone}</Text>
                                                                            </View>
                                                                            <Text style={{ fontSize: 8, color: "#6a6a6a", textAlign: "right", marginTop: 3 }}>{key.address}</Text>

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


                {/* //////////////////////////////////////Representative////////////////////////////////////// */}
                {
                    (this.props.Representative || this.props.RepreSearch) ? (
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
                                            onRefresh={this._onRefresh.bind(this)}
                                        />
                                    }
                                >
                                        {
                                            (this.state.representativeData.length != 0) ? (
                                                <View>
                                                    {
                                                        this.state.representativeData.map((key, index) => {
                                                            return (
                                                                <TouchableOpacity style={{ marginTop: 5, flex: 1, flexDirection: "row", padding: 5, backgroundColor: "#f8f1f1" }}
                                                                    onPress={() => { Actions.FithPageList({ representativeData: key }) }}
                                                                >
                                                                    <View style={{ flex: 0.5, }} >
                                                                        <Image style={{ resizeMode: 'contain', height: 120, width: "100%" }}
                                                                            source={{ uri: key.avatar_photo }} />
                                                                    </View>
                                                                    <View style={{ flex: 0.6, padding: 5, }}>
                                                                        <View style={{}}>
                                                                            <Text style={{ fontSize: 16, color: "black", fontWeight: "450" }}>{key.full_name}</Text>
                                                                        </View>
                                                                        <View style={{ marginTop: 0 }} >
                                                                            <Text style={{ fontSize: 12, color: "#E94E1B" }}>{this.props.str.aboutme}</Text>
                                                                            {
                                                                                (key.about_me) ? (
                                                                                    <Text style={{ fontSize: 10, }}>{key.about_me.substring(0, 65)} </Text>
                                                                                ) : null

                                                                            }
                                                                            {/* <Text style={{ fontSize: 10, }}>{key.about_me.substring(0, 65)} </Text> */}
                                                                            {/* {
                                                                                (key.typeFlag) ? (
                                                                                    <View style={{ backgroundColor: "#E94E1B", justifyContent: "center", alignItems: "center", marginTop: 2.5, width: 80 }}>
                                                                                        <Text style={{ fontSize: 12, color: "white", }}> 123</Text>
                                                                                    </View>
                                                                                ) : null
                                                                            } */}
                                                                            <View style={{ flexDirection: "row", }}>
                                                                                <IconFontFontAwesome name='phone' style={{ fontSize: 12, color: "#E94E1B", textAlign: "right", marginTop: 5 }} />
                                                                                <Text style={{ fontSize: 12, color: "#E94E1B", textAlign: "right", marginTop: 1.5, marginLeft: 7 }}>{key.contact_phone}</Text>
                                                                            </View>
                                                                            <Text style={{ fontSize: 8, color: "#6a6a6a", textAlign: "right", marginTop: 3 }}>{key.address}</Text>

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

                {/* //////////////////////////////////////Projects////////////////////////////////////// */}

                {
                    (this.props.Projects) ? (

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
                                            onRefresh={this._onRefresh.bind(this)} />
                                    }
                                >
                                        {
                                            (this.state.projectsData.length != 0) ? (
                                                <View>
                                                    {
                                                        this.state.projectsData.map((key, index) => {
                                                            // for times sepration                                                           
                                                            // for (var i = 0; i < specialChars.length; i++) {
                                                            //     key.times = key.times.replace(new RegExp("\\" + specialChars[i], "gi"), "");
                                                            // }
                                                            // let seprateStrTimes = ""
                                                            // let timesArray = []
                                                            // for (var i = 0; i < key.times.length; i++) {
                                                            //     if (key.times[i] === ",") {
                                                            //         timesArray.push(seprateStrTimes)
                                                            //         seprateStrTimes = ""
                                                            //     }
                                                            //     else {
                                                            //         seprateStrTimes = seprateStrTimes + key.times[i]
                                                            //     }
                                                            // }
                                                            // if (seprateStrTimes != ",") {
                                                            //     timesArray.push(seprateStrTimes)
                                                            //     seprateStrTimes = ""
                                                            // }
                                                            // // for property_types sepration
                                                            // for (var i = 0; i < specialChars.length; i++) {
                                                            //     key.property_types = key.property_types.replace(new RegExp("\\" + specialChars[i], "gi"), "");
                                                            // }
                                                            // let seprateStrProperty_types = ""
                                                            // let propertyArray = []
                                                            // for (var i = 0; i < key.property_types.length; i++) {
                                                            //     if (key.property_types[i] === ",") {
                                                            //         propertyArray.push(seprateStrProperty_types)
                                                            //         seprateStrProperty_types = ""
                                                            //     }
                                                            //     else {
                                                            //         seprateStrProperty_types = seprateStrProperty_types + key.property_types[i]
                                                            //     }
                                                            // }
                                                            // if (seprateStrProperty_types != ",") {
                                                            //     propertyArray.push(seprateStrProperty_types)
                                                            //     seprateStrProperty_types = ""
                                                            // }
                                                            // console.log(propertyArray, timesArray, "array")
                                                            return (
                                                                <TouchableOpacity style={{ marginTop: 5, flex: 1, flexDirection: "row", padding: 5, backgroundColor: "#f8f1f1" }}
                                                                    onPress={() => {
                                                                        Actions.ThirdPageList({
                                                                            projectsData: key,
                                                                            // propertyArray: propertyArray,
                                                                            // timesArray: timesArray
                                                                        })
                                                                    }}
                                                                >
                                                                    <View style={{ flex: 0.5, }} >
                                                                        <Image style={{ resizeMode: 'contain', height: 120, width: "100%" }}
                                                                            source={{ uri: key.featured_img_src }} />
                                                                    </View>
                                                                    <View style={{ flex: 0.6, padding: 5, }}>
                                                                        <View >

                                                                            <Text style={{ fontSize: 10, color: "black" }}>{key.title.toUpperCase()}</Text>
                                                                            <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%", }}>
                                                                                {
                                                                                    (key.times && key.property_types && key.property_types.length) ? (
                                                                                        key.times.map((time, index) => {
                                                                                            return (
                                                                                                // console.log(key.property_types, "timestimestimes")
                                                                                                // console.log(time, index, "time")
                                                                                                <Text style={{ fontSize: 7, color: "black" }}>{time + " " + key.property_types[index]} </Text>
                                                                                            )
                                                                                        })
                                                                                    ) : null

                                                                                }
                                                                            </View>
                                                                        </View>
                                                                        <View style={{ marginTop: 0 }} >
                                                                            <Text style={{ fontSize: 12, color: "#E94E1B" }}>{this.props.str.description}</Text>
                                                                            <Text style={{ fontSize: 10, }}>{key.description.substring(0, 65)} </Text>
                                                                            {
                                                                                (key.typeFlag) ? (
                                                                                    <View style={{ backgroundColor: "#E94E1B", justifyContent: "center", alignItems: "center", marginTop: 2.5, width: 80 }}>
                                                                                        <Text style={{ fontSize: 12, color: "white", }}> {key.typeFlag.toUpperCase()}</Text>
                                                                                    </View>
                                                                                ) : null
                                                                            }
                                                                            <View style={{ flexDirection: "row", }}>
                                                                                <Text style={{ fontSize: 12, color: "#E94E1B", textAlign: "right", marginTop: 1.5, }}>{this.props.str.type}</Text>
                                                                                <Text style={{ fontSize: 12, color: "#E94E1B", textAlign: "right", marginTop: 1.5, marginLeft: 7 }}>{key.type_format}</Text>

                                                                            </View>
                                                                            <Text style={{ fontSize: 7, color: "#6a6a6a", textAlign: "right", marginTop: 3 }}>{key.city_format}, {key.state_format} </Text>
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
                    (this.props.News) ? (
                        <View style={{
                            flex: 8, width: "100%",
                        }}>

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
                                            (this.state.blogsData.length != 0) ? (
                                                <View>
                                                    {
                                                        this.state.blogsData.map((key, index) => {
                                                            return (
                                                                <TouchableOpacity key={index} style={{ marginTop: 5, flex: 1, flexDirection: "row", padding: 5, backgroundColor: "#f8f1f1" }}
                                                                    onPress={() => { Actions.FithPageList({ newsData: key }) }}
                                                                >
                                                                    <View style={{ flex: 0.4, }} >
                                                                        <View style={{ width: "100%", backgroundColor: "#887769", height: 120, justifyContent: "center", alignItems: "center" }}>
                                                                            <Text style={{ fontSize: 40, color: "white" }}> {key.create_day}</Text>
                                                                            <View style={{ backgroundColor: "#8C7F74", width: "100%", alignItems: "center" }}>
                                                                                <Text style={{ fontSize: 20, color: "white" }}> {key.create_month}</Text>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ flex: 0.6, padding: 5, }} >
                                                                        <Text style={{ fontSize: 15, color: "black" }}> {key.title.toUpperCase()}</Text>
                                                                        <View style={{ marginLeft: 5 }}>
                                                                            <Text style={{ fontSize: 15, color: "#E94E1B" }}>{this.props.str.description}</Text>
                                                                            <Text style={{ fontSize: 12, }}>{key.description.substring(0, 20)} </Text>
                                                                        </View>
                                                                        <Text style={{ fontSize: 12, color: "#6a6a6a", textAlign: "right", marginTop: 3 }}>{this.props.str.postedon + " " + key.create_time}</Text>
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
                    this.props.jobs ?
                        <View style={{ flex: 8, width: "100%", }}>
                            <View style={{ flex: 1 }}>
                                <WebView
                                    // renderLoading={true}
                                    bounces={true}
                                    // onNavigationStateChange={(stateChange) => this.changes(stateChange)}
                                    startInLoadingState={true}
                                    source={{ uri: 'https://docs.google.com/forms/d/e/1FAIpQLSdbEtxEsdDkcHrxJkcqsKLpiZCICNFFD_LaxqF3b4rGxQNEdw/viewform?embedded=true' }}
                                    style={{ marginTop: 20 }}
                                />
                            </View>
                        </View>
                        :
                        null
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
export default connect(mapStateToProps, mapDispatchToProps)(SecondPageList);



const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 20,
        backgroundColor: "white",
        // flex: 1

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
