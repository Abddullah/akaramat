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
import SendMsgToTasker from "../Component/sendMsgToTasker";

class RequestsRepresentTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedValue0: "Actions",
            activity: false,
            moreloader: false,
            taskerData: [],
            emailSendingFlag: false,
            emailSendingFlag1: false,
            isloader: true,
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
    requestOnServer = (functionName, uri, id) => {
        console.log(functionName, uri, "functionName, uri", this.props.userCredentials.token)
        return axios({
            method: 'get',
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
                console.log(data.data.results, "response");
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
                alert(data.data.message)
                this._onRefreshTasker()

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
        if (this.props.rout === "allTaskInCity") {
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/user/getTasksInCity/10/0"
        }

        this.requestOnServer("_onRefreshTasker", uri)
    }
    _onEndReached() {
        // alert("word")
        this.setState({
            moreloader: true
        })
        let uri;
        if (this.props.rout === "allTaskInCity") {
            console.log("work")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/user/getTasksInCity/10/" + this.state.page
        }
        this.requestOnServer("_onEndReached", uri)
    }

    onChangeStatus = (value, id, status, index, obj) => {
        console.log(value, id, status, "valuedd", obj)

        this.setState({
            [`selectedValue ${index}`]: value
        })
        if (value === this.props.str.active) {
            console.log("ifff")
            let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/user/activeTask/" + id
            this.requestOnServer("onChangeStatus", uri, id)
        }
        else if (value === this.props.str.deactivate) {
            console.log("else")
            let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/user/disactiveTask/" + id
            this.requestOnServer("onChangeStatus", uri, id)
        }

    }

    routeChange(DataOfTasker) {
        // alert("chalu"+iAdded)
        Actions.FithPageList({ propertyData: DataOfTasker })
    }
    render() {
        // console.log(this.state.task_id, "555")
        return (
            <View style={{
                flex: 1, width: "100%",
            }}>

                {/* //////////////////////////////////////Properties i added////////////////////////////////////// */}
                {
                    (this.state.isloader === true || !this.state.taskerData) ? (
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
                                                console.log(DataOfTasker, index, "DataOfsssssTasker")
                                                return (
                                                    <View style={{
                                                        flexDirection: this.props.str.language === "en" ? "row" : "row-reverse", 
                                                        marginLeft: 5,
                                                        marginRight: 5,
                                                        marginTop: 10,
                                                    }} key={index}>
                                                        {/* headings */}
                                                        <View style={{
                                                            flex: 1,
                                                            backgroundColor: "#908073",
                                                            padding: "2%"
                                                        }}>
                                                            <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.id}</Text>
                                                            <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.title}</Text>
                                                            <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.type}</Text>
                                                            <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.price}</Text>
                                                            <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.publishdate}</Text>
                                                            <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.conditionstatus}</Text>
                                                            <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.featuredactions}</Text>
                                                        </View>
                                                        {/* values */}
                                                        <View style={{ flex: 2, backgroundColor: "#f8f1f1", padding: "2%" }}>
                                                            <TouchableOpacity style={{}}
                                                                onPress={() => this.routeChange(DataOfTasker)}
                                                            >
                                                                <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.id}</Text>
                                                                <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.title}</Text>
                                                                <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.type}</Text>
                                                                <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.budget_price}</Text>
                                                                <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.published_on}</Text>
                                                                <TouchableOpacity style={{
                                                                    backgroundColor: 'green', width: "25%", borderRadius: 5, alignItems: "center",
                                                                    justifyContent: "center"
                                                                }}>
                                                                    <Text style={{ color: 'white', fontSize: 12 }}>{DataOfTasker.status_name}</Text>
                                                                </TouchableOpacity>
                                                            </TouchableOpacity>

                                                            <Picker mode="dropdown" style={{ width: "50%", height: this.state.screenHeight / 35 }}
                                                                selectedValue={this.state[`selectedValue ${index}`]}
                                                                onValueChange={(e) => this.onChangeStatus(e, DataOfTasker.id, DataOfTasker.status_applied, index, DataOfTasker)
                                                                }
                                                            >
                                                                <Item label={this.props.str.actions} value={this.props.str.actions} key={this.props.str.actions} />
                                                                <Item label={(DataOfTasker.status_name === "Pending" || DataOfTasker.status_name === "حذف" || DataOfTasker.status_name === "قيد الموافقة" || DataOfTasker.status_name === "Deleted") ? (this.props.str.active) : (this.props.str.deactivate)}
                                                                    value={(DataOfTasker.status_name === "Pending" || DataOfTasker.status_name === "حذف" || DataOfTasker.status_name === "قيد الموافقة" || DataOfTasker.status_name === "Deleted") ? (this.props.str.active) : (this.props.str.deactivate)}
                                                                    key={(DataOfTasker.status_name === "Pending" || DataOfTasker.status_name === "حذف" || DataOfTasker.status_name === "قيد الموافقة" || DataOfTasker.status_name === "Deleted") ? (this.props.str.active) : (this.props.str.deactivate)} />
                                                                <Item label={this.props.str.edit} value={this.props.str.edit}
                                                                    key={this.props.str.edit} />
                                                                {/* <Item label='Delete' value='Delete' key="Delete" /> */}
                                                            </Picker>


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
export default connect(mapStateToProps, mapDispatchToProps)(RequestsRepresentTask);
const styles = StyleSheet.create({
});  
