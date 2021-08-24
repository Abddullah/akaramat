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
import ApplyTask from '../Component/applyTask';
import InfiniteScroll from 'react-native-infinite-scroll';
import SendEmail from "../Component/sendEmail";

class RequestsRepresent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedValue0: "Actions",
            activity: false,
            moreloader: false,
            taskerData: [],
            isloader: true,
            emailSendingFlag: false,
            emailSendingFlag1: false,
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
            console.log(this.state.token, this.props.userCredentials.token, "token", "tasker")
        })
        this._onRefreshTasker()
    }
    requestOnServer = (functionName, uri, id, index, del) => {
        console.log(functionName, uri, "functionName, uri", this.props.userCredentials.token)
        return axios({
            method: del === "del" ? 'delete' : 'get',
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
                console.log(data.data.results, "responsemere project");
                this.setState({
                    taskerData: data.data.results,
                    isloader: false,
                    page: 10,
                    // selectedValue: data.data.results.status === "Active" ? "Deactive" : "Active"
                })
            }
            else if (functionName === "_onEndReached") {
                let clonetaskerData = this.state.taskerData
                let responseAPI = data.data.results
                for (var i = 0; i < responseAPI.length; i++) {
                    clonetaskerData.push(responseAPI[i])
                }
                console.log(responseAPI, "reachend")
                this.setState({
                    moreloader: false,
                    page: this.state.page + 10,
                    taskerData: clonetaskerData
                })
            }
            else if (functionName === "onChangeStatus") {
                console.log(data.data.results, "response");
                this.setState({
                    [`selectedValue ${index}`]: "Actions"
                })
                alert(data.data.message)
                this._onRefreshTasker()

            }

        }).catch(err => {
            var errUpdate = JSON.stringify(err.response.data, "err");
            console.log(JSON.parse(errUpdate));
            console.log(err.response.data, "err")
            alert(err.response.data.message || err.response.data.results)
            // alert(err.message)
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
        if (this.props.rout === "RequestsRepresent") {
            console.log("mere projects")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/project/user/getMyProject/10/0"
        }
        else if (this.props.rout === "allTaskInCity") {
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/user/getTasksInCity/10/0"
        }
        else if (this.props.rout === "MyBlogs") {
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/blog/user/getBlogsList/10/0"
        }
        else if (this.props.rout === "pendingProperties") {
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/user/getPendingPropertiesInCity/10/0"
        }
        else if (this.props.rout === "allProperties") {
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/user/getPropertiesInCity/10/0"
        }
        else if (this.props.rout === "allRequests") {
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/request/user/getRequestsInCity/10/0"
        }
        this.requestOnServer("_onRefreshTasker", uri)
    }
    _onEndReached() {
        // alert("word")
        this.setState({
            moreloader: true
        })
        let uri;
        if (this.props.rout === "RequestsRepresent") {
            console.log("work")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/project/guest/getProjectsList/10/" + this.state.page
        }
        else if (this.props.rout === "allTaskInCity") {
            console.log("workssss")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/user/getTasksInCity/10/" + this.state.page
        }
        else if (this.props.rout === "pendingProperties") {
            console.log("workssss")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/user/getPendingPropertiesInCity/10/" + this.state.page
        }
        else if (this.props.rout === "allProperties") {
            console.log("workssss")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/user/getPropertiesInCity/10/" + this.state.page
        }
        else if (this.props.rout === "allRequests") {
            console.log("workssss")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/request/user/getRequestsInCity/10/" + this.state.page
        }

        this.requestOnServer("_onEndReached", uri)
    }
    onChangeStatus = (value, id, status, index, obj) => {
        console.log(value, id, status, "value", obj)
        this.setState({
            [`selectedValue ${index}`]: value
        })
        if (value === this.props.str.deactivate && this.props.rout === "RequestsRepresent") {
            console.log("workk")
            let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/project/user/disactiveProject/" + id
            this.requestOnServer("onChangeStatus", uri, id)
        }
        else if (value === this.props.str.active && this.props.rout === "RequestsRepresent") {
            let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/project/user/reactiveProject/" + id
            this.requestOnServer("onChangeStatus", uri, id)
        }
        else if (value === this.props.str.active && this.props.rout === "pendingProperties") {
            // alert("work")
            let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/user/activeProperty/" + id
            this.requestOnServer("onChangeStatus", uri, id, index)
        }
        else if (value === this.props.str.active && this.props.rout === "allProperties") {
            // alert("work")
            let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/user/activeProperty/" + id
            this.requestOnServer("onChangeStatus", uri, id, index)
        }
        else if (value === this.props.str.deactivate && this.props.rout === "allProperties") {
            // alert("work")
            let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/user/disactiveProperty/" + id
            this.requestOnServer("onChangeStatus", uri, id, index)
        }
        else if (value === this.props.str.active && this.props.rout === "allRequests") {
            // alert("work")
            let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/request/user/activeRequest/" + id
            this.requestOnServer("onChangeStatus", uri, id, index)
        }
        else if (value === this.props.str.deactivate && this.props.rout === "allRequests") {
            // alert("work")
            let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/request/user/disactiveRequest/" + id
            this.requestOnServer("onChangeStatus", uri, id, index)
        }
        else if (value === this.props.str.contact && this.props.rout === "allRequests") {
            console.log(value, id, status, "valuesssssssssss", obj)

            this.emailSending1(obj)
        }
        else if (value === this.props.str.delete && this.props.rout === "MyBlogs") {
            let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/blog/user/deleteBlog/" + id
            this.requestOnServer("onChangeStatus", uri, id, index, "del")
        }

        else if (value === this.props.str.edit && this.props.rout === "RequestsRepresent") {
            Actions.EditProject({
                projectId: id,
                projectDataForEdit: obj,

            })
        }

        else if (value === this.props.str.edit && this.props.rout === "allProperties") {
            Actions.EditProperties({
                AddId: id,
                propertyDataForEdit: obj
            })
        }

        else if (value === this.props.str.edit && this.props.rout === "MyBlogs") {
            Actions.EditBlog({
                blogId: id,
                blogDataForEdit: obj,


            })
        }

    }
    concate() {
        // alert("worki h")
        // console.log(DataOfTasker,"monkey")
        // for(var i = 0; i<DataOfTasker.length;i++){
        //     console.log(DataOfTasker[i],"wah",i)

        // }
    }
    routeChange(DataOfTasker, projectPage) {
        console.log(DataOfTasker, projectPage,"DataOfTasker, projectPage")
        if (this.props.rout !== "allRequests") {



            if (projectPage) {
                // let specialChars = '!@#$^&%*()+=-[]\/{}|:""<>?. ';


                // for (var i = 0; i < specialChars.length; i++) {
                //     DataOfTasker.times = DataOfTasker.times.replace(new RegExp("\\" + specialChars[i], "gi"), "");
                // }
                // let seprateStrTimes = ""
                // let timesArray = []
                // for (var i = 0; i < DataOfTasker.times.length; i++) {
                //     if (DataOfTasker.times[i] === ",") {
                //         timesArray.push(seprateStrTimes)
                //         seprateStrTimes = ""
                //     }
                //     else {
                //         seprateStrTimes = seprateStrTimes + DataOfTasker.times[i]
                //     }
                // }
                // if (seprateStrTimes != ",") {
                //     timesArray.push(seprateStrTimes)
                //     seprateStrTimes = ""
                // }
                // // for property_types sepration
                // for (var i = 0; i < specialChars.length; i++) {
                //     DataOfTasker.property_types = DataOfTasker.property_types.replace(new RegExp("\\" + specialChars[i], "gi"), "");
                // }
                // let seprateStrProperty_types = ""
                // let propertyArray = []
                // for (var i = 0; i < DataOfTasker.property_types.length; i++) {
                //     if (DataOfTasker.property_types[i] === ",") {
                //         propertyArray.push(seprateStrProperty_types)
                //         seprateStrProperty_types = ""
                //     }
                //     else {
                //         seprateStrProperty_types = seprateStrProperty_types + DataOfTasker.property_types[i]
                //     }
                // }
                // if (seprateStrProperty_types != ",") {
                //     propertyArray.push(seprateStrProperty_types)
                //     seprateStrProperty_types = ""
                // }



                // console.log(DataOfTasker, "DataOfTasker")
                Actions.ThirdPageList({ projectsData: DataOfTasker,
                    //  propertyArray, timesArray: timesArray
                     })
            }
            else {

                Actions.FithPageList({ propertyData: DataOfTasker })
            }
        }
        else if (this.props.rout === "allRequests") {
            Actions.FithPageList({ requestData: DataOfTasker })

        }
        // alert("chalu"+iAdded)
    }
    myprojects(DataOfTasker, index) {
        return (
            <>
                <TouchableOpacity style={{}}
                    onPress={() => this.routeChange(DataOfTasker, "projectPage")}
                >
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.id}</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.title}</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.type_format}</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.sort_format}</Text>
                    {/* <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.times.substr(2).slice(0, -2)} {DataOfTasker.property_types.substr(2).slice(0, -2)}</Text> */}
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.times[0]} {DataOfTasker.property_types[0]}</Text>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity style={{
                        backgroundColor: 'green', width: "35%", borderRadius: 5, alignItems: "center",
                        justifyContent: "center", position: "absolute", right: 0
                    }}>
                        <Text style={{ color: 'white', fontSize: 12 }}>{DataOfTasker.status==="Deleted"?this.props.str.misable:DataOfTasker.status}</Text>
                    </TouchableOpacity>

                </View>
                <Picker mode="dropdown" style={{ width: "50%", height: this.state.screenHeight / 35 }}
                    selectedValue={this.state[`selectedValue ${index}`]}
                    onValueChange={(e) => this.onChangeStatus(e, DataOfTasker.id, DataOfTasker.status_applied, index, DataOfTasker)
                    }
                >
                    <Item label={this.props.str.actions} value={this.props.str.actions} key={this.props.str.actions} />
                    <Item label={DataOfTasker.status === "Active" || DataOfTasker.status === "نشط" ? (this.props.str.deactivate) : (this.props.str.active)}
                        value={DataOfTasker.status === "Active" || DataOfTasker.status === "نشط" ? (this.props.str.deactivate) : (this.props.str.active)}
                        key={DataOfTasker.status === "Active" || DataOfTasker.status === "نشط" ? (this.props.str.deactivate) : (this.props.str.active)} />
                    <Item label={this.props.str.edit} value={this.props.str.edit} key={this.props.str.edit} />
                    {/* <Item label='Delete' value='Delete' key="Delete" /> */}
                </Picker>

            </>

        )
    }
    blogs(DataOfTasker, index) {
        return (
            <>
                <TouchableOpacity style={{}}
                // onPress={() => this.routeChange(DataOfTasker, "projectPage")}
                >
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.id}</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.title}</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.type}</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.description}</Text>
                    {/* <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.times.substr(2).slice(0, -2)} {DataOfTasker.property_types.substr(2).slice(0, -2)}</Text> */}
                </TouchableOpacity>


                <Picker mode="dropdown" style={{ width: "60%", height: this.state.screenHeight / 35 }}
                    selectedValue={this.state[`selectedValue ${index}`]}
                    onValueChange={(e) => this.onChangeStatus(e, DataOfTasker.id, DataOfTasker.status_applied, index, DataOfTasker)
                    }
                >
                    <Item label={this.props.str.actions} value={this.props.str.actions} key={this.props.str.actions} />

                    <Item label={this.props.str.delete} value={this.props.str.delete} key={this.props.str.delete} />
                    <Item label={this.props.str.edit} value={this.props.str.edit} key={this.props.str.edit} />
                    {/* <Item label='Delete' value='Delete' key="Delete" /> */}
                </Picker>

            </>

        )
    }
    myprojectsHead(DataOfTasker, index) {
        return (
            <>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.id}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.title}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.type}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.sort}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.ConsistOf}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.status}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.actions}</Text>
            </>
        )
    }
    pendingPropertiesHead(DataOfTasker, index) {
        return (
            <>

                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.id}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.title}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.type}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.purpose}</Text>
                {(this.props.rout === "allRequests") ?
                    (null) :
                    (
                        <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.Featured}</Text>
                    )}
                {/* {(this.props.rout === "allRequests") ?
                    (null) :
                    (
                        )} */}
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.publishdate}</Text>

                {(this.props.rout === "allRequests") ? (
                    <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.postedby.toLowerCase()}</Text>


                ) : (
                        <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.Condition}</Text>
                    )}
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.status}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.actions}</Text>


            </>
        )
    }
    blogsHead(DataOfTasker, index) {
        return (
            <>

                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.id}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.title}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.type}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.description}</Text>
                {/* <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.status}</Text> */}
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.actions}</Text>


            </>
        )
    }
    pendingProperties(DataOfTasker, index) {
        return (
            <>
                <TouchableOpacity style={{}}
                    onPress={() => this.routeChange(DataOfTasker)}
                >
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.id}</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.title.substring(0, 30)}</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.type_format}</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.purpose_format}</Text>

                    {(this.props.rout === "allRequests") ?
                        (null) :
                        (
                            <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.featured_format}</Text>
                        )}
                    {(this.props.rout === "allRequests") ?
                        (

                            <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.create_time}</Text>
                        ) :
                        (
                            <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.publish_time}</Text>
                        )}
                    {(this.props.rout === "allRequests") ? (
                        <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.created_by_name}</Text>
                    ) : (
                            <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.estate_condition_format}</Text>
                        )}
                    {(this.props.rout === "allRequests") ? (
                        <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.status_format}</Text>
                    ) : (
                            <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.status}</Text>
                        )}
                </TouchableOpacity>

                {(this.props.rout !== "allProperties") ? (

                    <Picker mode="dropdown" style={{ width: "60%", height: this.state.screenHeight / 35 }}
                        selectedValue={this.state[`selectedValue ${index}`]}
                        onValueChange={(e) => this.onChangeStatus(e, DataOfTasker.id, DataOfTasker.status_applied, index, DataOfTasker)
                        }
                    >
                        <Item label={this.props.str.actions} value={this.props.str.actions} key={this.props.str.actions} />
                        {(this.props.rout === "allRequests") ? (
                            <Item label={DataOfTasker.status_format === "Active" || DataOfTasker.status_format === "نشط" ? (this.props.str.deactivate) : (this.props.str.active)}
                                value={DataOfTasker.status_format === "Active" || DataOfTasker.status_format === "نشط" ? (this.props.str.deactivate) : (this.props.str.active)}
                                key={DataOfTasker.status_format === "Active" || DataOfTasker.status_format === "نشط" ? (this.props.str.deactivate) : (this.props.str.active)} />
                        ) : (
                                <Item label={this.props.str.active} value={this.props.str.active} key={this.props.str.active} />
                            )}
                        {(this.props.rout === "allRequests") ? (
                            <Item label={this.props.str.contact} value={this.props.str.contact} key={this.props.str.contact} />
                        ) : (
                                <Item label={this.props.str.edit} value={this.props.str.edit} key={this.props.str.edit} />

                            )}


                        {/* <Item label='Delete' value='Delete' key="Delete" /> */}
                    </Picker>
                ) : (
                        <Picker mode="dropdown" style={{ width: "60%", height: this.state.screenHeight / 35 }}
                            selectedValue={this.state[`selectedValue ${index}`]}
                            onValueChange={(e) => this.onChangeStatus(e, DataOfTasker.id, DataOfTasker.status_applied, index, DataOfTasker)
                            }
                        >
                            <Item label={this.props.str.actions} value={this.props.str.actions} key={this.props.str.actions} />
                            <Item label={DataOfTasker.status === "Deleted" || DataOfTasker.status === "حذف" || DataOfTasker.status === "قيد الموافقة" || DataOfTasker.status === "Pending" ? (this.props.str.active) : (this.props.str.deactivate)}
                                value={DataOfTasker.status === "Deleted" || DataOfTasker.status === "حذف" || DataOfTasker.status === "قيد الموافقة" || DataOfTasker.status === "Pending" ? (this.props.str.active) : (this.props.str.deactivate)}
                                key={DataOfTasker.status === "Deleted" || DataOfTasker.status === "حذف" || DataOfTasker.status === "قيد الموافقة" || DataOfTasker.status === "Pending" ? (this.props.str.active) : (this.props.str.deactivate)} />
                            <Item label={this.props.str.edit} value={this.props.str.edit} key={this.props.str.edit} />
                            {/* <Item label='Delete' value='Delete' key="Delete" /> */}
                        </Picker>
                    )}
                {/* <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.times.substr(2).slice(0, -2)} {DataOfTasker.property_types.substr(2).slice(0, -2)}</Text> */}
            </>
        )
    }

    emailSending1(obj) {
        console.log("11ssssss1", obj)

        this.setState({
            emailSendingFlag1: !this.state.emailSendingFlag1,
            obj
        })
    }
    render() {
        // let emptyFlag = true

        console.log(this.state.task_id, "555")
        return (
            <View style={{
                flex: 1, width: "100%",
            }}>
                <SendEmail modalOpen={this.state.emailSendingFlag1} route={"request"} taskerData={this.state.obj} emailSending1={() => this.emailSending1()} />

                {/* //////////////////////////////////////Properties i added////////////////////////////////////// */}
                {
                    // (this.state.taskerData) ? (
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
                                (this.state.taskerData.length != 0) ? (

                                    <View>
                                        {
                                            this.state.taskerData.map((DataOfTasker, index) => {
                                                // let arr = []
                                                // let arrPropertyType = []
                                                // if (this.props.userCredentials.user_id === DataOfTasker.created_by) {
                                                //     arr = DataOfTasker.times.substr(2).slice(0, -2)
                                                //     arrPropertyType = DataOfTasker.property_types.substr(2).slice(0, -2)
                                                //     console.log(arr, arrPropertyType, "chal gya")
                                                // }
                                                // if (this.props.userCredentials.user_id === DataOfTasker.created_by) {
                                                //     emptyFlag = false
                                                // }
                                                return (
                                                    // (this.props.userCredentials.user_id === DataOfTasker.created_by) ?
                                                    //     (
                                                    <View style={{
                                                        flexDirection: this.props.str.language === "en" ? "row" : "row-reverse", 
                                                        marginLeft: 5,
                                                        marginRight: 5,
                                                        marginTop: 10,
                                                    }} key={index} >
                                                        {/* headings */}
                                                        < View style={{
                                                            flex: 1,
                                                            backgroundColor: "#908073",
                                                            padding: "2%"
                                                        }}>
                                                            {(this.props.rout === "RequestsRepresent") ? (
                                                                this.myprojectsHead(DataOfTasker, index)
                                                            ) :
                                                                this.props.rout === "MyBlogs" ?
                                                                    this.blogsHead(DataOfTasker, index)

                                                                    : (
                                                                        this.pendingPropertiesHead(DataOfTasker, index)
                                                                    )
                                                            }

                                                        </View>
                                                        {/* values */}
                                                        <View style={{ flex: 2, backgroundColor: "#f8f1f1", padding: "2%" }}>
                                                            {(this.props.rout === "RequestsRepresent") ? (
                                                                this.myprojects(DataOfTasker, index)
                                                            ) :
                                                                this.props.rout === "MyBlogs" ?
                                                                    this.blogs(DataOfTasker, index)

                                                                    : (
                                                                        this.pendingProperties(DataOfTasker, index)
                                                                    )}

                                                            {/* {(this.props.rout === "RequestsRepresent") ? (
                                                                this.myprojects(DataOfTasker)
                                                            ) : (
                                                                    this.pendingProperties(DataOfTasker)
                                                                )} */}
                                                            {/* <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.id}</Text>
                                                                <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.title}</Text>
                                                                <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.type}</Text>
                                                                <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.sort_format}</Text>
                                                                <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.times.substr(2).slice(0, -2)} {DataOfTasker.property_types.substr(2).slice(0, -2)}</Text> */}
                                                            {/* <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.times.substr(2).slice(0, -2)} {DataOfTasker.property_types.substr(2).slice(0, -2)}</Text> */}
                                                            {/* {() => this.concate()} */}


                                                        </View>
                                                    </View>
                                                    // ) :
                                                    // (
                                                    //     null
                                                    // )

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
                            {/* {(emptyFlag) ? (<View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: "center",
                                marginBottom: 20,
                                marginTop: 20,
                            }}>
                                <Text style={{ color: "black" }}>{this.props.str.thereisnodataavailable}</Text>
                            </View>) :
                                (null)} */}
                        </InfiniteScroll>
                    // ) : null
                }
            </View >
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
export default connect(mapStateToProps, mapDispatchToProps)(RequestsRepresent);
const styles = StyleSheet.create({
});  
