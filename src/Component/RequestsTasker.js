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

class RequestsTasker extends Component {
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

                // alert(data.data.message)
                if (data.data.results.user_name !== '' && data.data.results.user_name !== 'n/a' &&
                    data.data.results.user_email !== '' && data.data.results.user_email !== 'n/a' &&
                    data.data.results.phone !== '' && data.data.results.phone !== 'n/a'
                ) {
                    let taskerDataCntct = {
                        user_name: data.data.results.user_name,
                        user_email: data.data.results.user_email,
                        phone: data.data.results.phone,
                        taskId: id,

                    }
                    this.setState({
                        taskerDataCntct
                    })

                    this.emailSending1()
                }
                else {

                    alert(this.props.str.youCanNotcntct)

                }

            }
        }).catch(err => {
            var errUpdate = JSON.stringify(err);
            console.log(JSON.parse(errUpdate));
            console.log(err)
            alert(err.response.data.results)
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
        if (this.props.rout === "allTaskInMyState") {
            console.log("work")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/user/getAllTasksInMyState/10/0"
        }
        else if (this.props.rout === "myPreviousTask") {
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/user/getMyPreviousTasks/10/0"
        }
        else if (this.props.rout === "TaskIAppliedFor") {
            console.log("workgetTasksIAppliedFor")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/user/getTasksIAppliedFor/10/0"
        }
        else if (this.props.rout === "taskIWorkOnThem") {
            console.log("workgetTasksIAppliedFor")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/user/getTasksIWorkOn/10/0"
        }

        this.requestOnServer("_onRefreshTasker", uri)
    }
    _onEndReached() {
        // alert("word")
        this.setState({
            moreloader: true
        })
        let uri;
        if (this.props.rout === "allTaskInMyState") {
            console.log("work")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/user/getAllTasksInMyState/10/" + this.state.page
        }
        else if (this.props.rout === "myPreviousTask") {
            console.log("work")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/user/getMyPreviousTasks/10/" + this.state.page
        }
        else if (this.props.rout === "TaskIAppliedFor") {
            console.log("work")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/user/getTasksIAppliedFor/10/" + this.state.page
        }
        else if (this.props.rout === "taskIWorkOnThem") {
            console.log("work")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/user/getTasksIWorkOn/10/" + this.state.page
        }

        if (!this.state.moreloader) {
            this.requestOnServer("_onEndReached", uri)
        }
        // this.requestOnServer("_onEndReached", uri)
    }

    onChangeStatus = (value, id, status, index, obj) => {
        console.log(value, id, status, "value", obj)

        this.setState({
            [`selectedValue ${index}`]: value
        })
        if (value === this.props.str.contactTheReq) {


            let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/guest/getUserDetail/" + obj.created_by
            this.requestOnServer("onChangeStatus", uri, id)
        }
        else if (value === this.props.str.ReviewThisTask) {
            Actions.review({ id })
        }
        else if (value === this.props.str.DeliverTheTask) {
            Actions.review({ id, DeliverTheTask: true })
        }

        else if (value === this.props.str.listapplicants) {
            Actions.listOfapplyTask({ taskIdFrmDra: id, process: obj.process, tasksData: obj })
        }

        else if (value === this.props.str.listapplicants) {
            Actions.review({ id })
        }

    }
    emailSending1() {
        console.log("111")

        this.setState({
            emailSendingFlag1: !this.state.emailSendingFlag1
        })
    }
    emailSending(task_id) {

        console.log("taskkkkkkiddddd", task_id)
        this.setState({
            emailSendingFlag: !this.state.emailSendingFlag,
            idOfTask: task_id,
        })
    }
    routeChange(DataOfTasker) {
        // alert("chalu"+iAdded)
        if(this.props.rout==="allTaskInMyState"||this.props.rout==="myPreviousTask"||this.props.rout==="TaskIAppliedFor"||this.props.rout==="taskIWorkOnThem"){
            
            Actions.ForthPageList({ tasksData: DataOfTasker })
        }
        else{
            Actions.FithPageList({ propertyData: DataOfTasker })
        }
    
    }
    render() {
        console.log(this.props.userDetails, "55userDetails5")
        return (
            <View style={{
                flex: 1, width: "100%",
            }}>
                <SendMsgToTasker modalOpen={this.state.emailSendingFlag1} route={"contactTaskOwner"} taskerData={this.state.taskerDataCntct} emailSending1={() => this.emailSending1()} />

                <ApplyTask
                    modalOpen={this.state.emailSendingFlag}
                    addId={this.state.addId}
                    idOfTask={this.state.idOfTask}
                    route={"requestsTasker"}
                    emailSending={() => this.emailSending(this.state.idOfTask)}
                />
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
                                                // console.log(DataOfTasker, index, "DataOfTasker")
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
                                                            {(this.props.userDetails.user_type === "4" && this.props.rout === "myPreviousTask") ? (
                                                                null
                                                            ) : (

                                                                    <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.status}</Text>
                                                                )}
                                                            <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.Process}</Text>
                                                            <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.featuredactions}</Text>
                                                        </View>
                                                        {/* values */}
                                                        <View style={{ flex: 2, backgroundColor: "#f8f1f1", padding: "2%" }}>
                                                            <TouchableOpacity style={{}}
                                                                onPress={() => this.routeChange(DataOfTasker)}
                                                            >
                                                                <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.id}</Text>
                                                                <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.title}</Text>
                                                                <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.type_format}</Text>
                                                                <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.budget_price}</Text>
                                                                <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.published_on}</Text>
                                                                <TouchableOpacity style={{
                                                                    backgroundColor: 'green', width: "25%", borderRadius: 5, alignItems: "center",
                                                                    justifyContent: "center"
                                                                }}>
                                                                    <Text style={{ color: 'white', fontSize: 12 }}>{(this.props.rout === "myPreviousTask") ? (DataOfTasker.process) : DataOfTasker.status_applied}</Text>
                                                                </TouchableOpacity>
                                                            </TouchableOpacity>
                                                            {(this.props.userDetails.user_type === "4" && this.props.rout === "myPreviousTask") ? (
                                                                null
                                                            ) : (

                                                            <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.process}</Text>
                                                                )}

                                                            {(this.props.rout === "allTaskInMyState" || this.props.rout === "TaskIAppliedFor") ? (
                                                                <Picker mode="dropdown" style={{ width: "50%", height: this.state.screenHeight / 35 }}
                                                                    selectedValue={this.state[`selectedValue ${index}`]}
                                                                    onValueChange={(e) => this.onChangeStatus(e, DataOfTasker.id, DataOfTasker.status_applied, index, DataOfTasker)
                                                                    }
                                                                >
                                                                    <Item label={this.props.str.actions} value={this.props.str.actions} key={this.props.str.actions} />
                                                                    {(DataOfTasker.created_by === this.props.userDetails.id && this.props.rout === "allTaskInMyState") ? (
                                                                        <Item label={this.props.str.listapplicants} value={this.props.str.listapplicants} key={this.props.str.listapplicants} />
                                                                    ) : (

                                                                            <Item label={this.props.str.contactTheReq} value={this.props.str.contactTheReq} key={this.props.str.contactTheReq} />
                                                                        )}
                                                                    {/* <Item label='Delete' value='Delete' key="Delete" /> */}
                                                                </Picker>
                                                            ) :
                                                                (this.props.rout === "listOfapplyTask") ?
                                                                    (
                                                                        <TouchableOpacity onPress={() => this.contract(DataOfTasker, this.props.process)}
                                                                            style={{
                                                                                backgroundColor: "#908073", top: 3, width: 120, height: 30, alignItems: "center", justifyContent: "center",

                                                                                shadowColor: "#000",
                                                                                shadowOffset: {
                                                                                    width: 0,
                                                                                    height: 6,
                                                                                },
                                                                                shadowOpacity: 0.39,
                                                                                shadowRadius: 8.30,

                                                                                elevation: 13,
                                                                            }}>
                                                                            <Text style={{ color: "white" }}>
                                                                                {(this.props.process === "Waiting") ? this.props.str.startContract : (this.props.process === "Ended") ? this.props.str.disable : this.props.str.endContract}
                                                                            </Text>
                                                                        </TouchableOpacity>
                                                                    ) :

                                                                    (
                                                                        (this.props.rout === "myPreviousTask") ?
                                                                            (
                                                                                <Picker mode="dropdown" style={{ width: "50%", height: this.state.screenHeight / 35 }}
                                                                                    selectedValue={this.state[`selectedValue ${index}`]}
                                                                                    onValueChange={(e) => this.onChangeStatus(e, DataOfTasker.id, DataOfTasker.status, index, DataOfTasker)
                                                                                    }
                                                                                >
                                                                                    <Item label={this.props.str.actions} value={this.props.str.actions} key={this.props.str.actions} />
                                                                                    <Item label={this.props.str.contactTheReq} value={this.props.str.contactTheReq} key={this.props.str.contactTheReq} />
                                                                                    <Item label={this.props.str.ReviewThisTask} value={this.props.str.ReviewThisTask} key={this.props.str.ReviewThisTask} />
                                                                                </Picker>
                                                                            ) :
                                                                            (
                                                                                (this.props.rout === "taskIWorkOnThem") ? (
                                                                                    <Picker mode="dropdown" style={{ width: "50%", height: this.state.screenHeight / 35 }}
                                                                                        selectedValue={this.state[`selectedValue${index}`]}
                                                                                        onValueChange={(e) => this.onChangeStatus(e, DataOfTasker.id, DataOfTasker.status, index, DataOfTasker)
                                                                                        }
                                                                                    >
                                                                                        <Item label={this.props.str.actions} value={this.props.str.actions} key={this.props.str.actions} />
                                                                                        <Item label={this.props.str.contactTheReq} value={this.props.str.contactTheReq} key={this.props.str.contactTheReq} />
                                                                                        <Item label={this.props.str.DeliverTheTask} value={this.props.str.DeliverTheTask} key={this.props.str.DeliverTheTask} />


                                                                                    </Picker>
                                                                                ) : (



                                                                                        <Picker mode="dropdown" style={{ width: "50%", height: this.state.screenHeight / 35 }}
                                                                                            selectedValue={this.state[`selectedValue${index}`]}
                                                                                            onValueChange={(e) => this.onChangeStatus(e, DataOfTasker.id, DataOfTasker.status, index, DataOfTasker)
                                                                                            }
                                                                                        >
                                                                                            <Item label={this.props.str.actions} value={this.props.str.actions} key={this.props.str.actions} />

                                                                                            {(this.props.rout === "MyBuyRequests" || this.props.rout === "myRequiredTask") ? (

                                                                                                <Item label={this.props.str.delete} value={this.props.str.delete} key={this.props.str.delete} />
                                                                                            ) : (
                                                                                                    <Item label={DataOfTasker.status === "Active" || DataOfTasker.status === "نشط" ? this.props.str.deactivate : this.props.str.active} value={DataOfTasker.status === "Active" || DataOfTasker.status === "نشط" ? this.props.str.deactivate : this.props.str.active}
                                                                                                        key={DataOfTasker.status === "Active" || DataOfTasker.status === "نشط" ? this.props.str.deactivate : this.props.str.active} />

                                                                                                )}
                                                                                            <Item label={this.props.str.edit} value={this.props.str.edit} key={this.props.str.edit} />
                                                                                            {/* <Item label='Delete' value='Delete' key="Delete" /> */}
                                                                                        </Picker>
                                                                                    )
                                                                            )
                                                                    )}
                                                            {(DataOfTasker.process === "Waiting"||DataOfTasker.process === "سارية") ? (
                                                                <TouchableOpacity
                                                                    onPress={() => this.emailSending(DataOfTasker.id)}
                                                                    style={{
                                                                        backgroundColor: "#908073", width: 120, height: 25, alignItems: "center", justifyContent: "center",
                                                                    }}>
                                                                    <Text style={{ color: "white" }}>
                                                                        {this.props.str.applytask}
                                                                    </Text>
                                                                </TouchableOpacity>
                                                            ) : (null)
                                                            }
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
        userCredentials: state.root.userCredentials,
        userDetails: state.root.userDetails,

    };
};
function mapDispatchToProps(dispatch) {
    return ({
        // languageSet: (lang) => {
        //     dispatch(languageSet(lang))
        // },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(RequestsTasker);
const styles = StyleSheet.create({
});  
