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

class RequestsReport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedValue0: "Actions",
            activity: false,
            moreloader: false,
            isloader: true,
            emailSendingFlag: false,
            taskerData: [],
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
    requestOnServer = (functionName, uri, role) => {
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
                let rout = this.props.rout
                console.log(role, obj, data, "reporttt")
                Actions.MyVerification({ role, obj, data, rout })

                // this._onRefreshTasker()

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
        if (this.props.rout === "TaskersInCity") {
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/verification/user/getTaskersInCity/10/0"
        }
        else if (this.props.rout === "TasksInCity") {
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/user/getTasksInCity/10/0"
        }
        else if (this.props.rout === "AgentInCity") {
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/verification/user/getAgentsInCity/10/0"
        }
        else if (this.props.rout === "PropsInCity") {
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/user/getPropertiesInCity/5/0"
        }
        else if (this.props.rout === "ProjectsInCity") {
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/verification/user/getProjectsInCity/10/0"
        }

        this.requestOnServer("_onRefreshTasker", uri)
    }
    _onEndReached() {
        // alert("word")
        this.setState({
            moreloader: true
        })
        let uri;
        if (this.props.rout === "TaskersInCity") {
            console.log("work")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/verification/user/getTaskersInCity/10/" + this.state.page
        }
        else if (this.props.rout === "TasksInCity") {
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/user/getTasksInCity/10/" + this.state.page
        }
        else if (this.props.rout === "AgentInCity") {
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/verification/user/getAgentsInCity/10/" + this.state.page
        }
        else if (this.props.rout === "PropsInCity") {
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/user/getPropertiesInCity/10/" + this.state.page
        }
        else if (this.props.rout === "ProjectsInCity") {
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/verification/user/getProjectsInCity/10/" + this.state.page
        }

        this.requestOnServer("_onEndReached", uri)
    }

    onChangeStatus = (value, id, status, index, obj, role) => {
        console.log(value, "value", this.props.str.verify)
        console.log(id, "id")
        console.log(status, "status")
        console.log(index, "index")
        console.log(role, "roleee")
        console.log(obj, "obj")

        if (value === this.props.str.verify && role === "tasker" && (obj.account_verify_name === 'Unverified' || obj.account_verify_name === "لا يوجد ملف" || obj.report === 'Unverified' || obj.report === "لا يوجد ملف")) {
            console.log("if")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/guest/getUserDetail/" + obj.id
            this.requestOnServer("onChangeStatus", uri, role)
        }
        else if (value === this.props.str.unverify && role === "tasker") {
            console.log("workelse")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/verification/user/unVerifyUser/"
            this.unverify(uri, obj, "tasker")
        }
        else if (value === this.props.str.verify && role === "tasks") {
            console.log("elseifff")
            Actions.MyVerification({ role, obj })
        }
        else if (value === this.props.str.unverify && role === "tasks") {
            console.log("elseifffaaaa")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/verification/user/unVerifyTask/"
            this.unverify(uri, obj, "tasks")
        }
        else if (value === this.props.str.verify && role === "properties") {
            console.log("elseifffproperties")
            Actions.MyVerification({ role, obj })
        }
        else if (value === this.props.str.unverify && role === "properties") {
            console.log("elseifffpropunnnnnn")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/verification/user/unVerifyProperty/"
            this.unverify(uri, obj, "properties")
        }
        else if (value === this.props.str.verify && role === "projects") {
            console.log("elseifffproperties")
            Actions.MyVerification({ role, obj })
        }
        else if (value === this.props.str.unverify && role === "projects") {
            console.log("unverifyrties")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/verification/user/unVerifyProject/"
            this.unverify(uri, obj, "projects")
        }
        else if (value === this.props.str.unverify && role === "agents") {
            console.log("unverifyrties")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/verification/user/unVerifyUser/"
            this.unverify(uri, obj, "agents")
        }
        else if (value === this.props.str.verify && role === "agents") {
            console.log("ifffffffveri")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/guest/getUserDetail/" + obj.id
            this.requestOnServer("onChangeStatus", uri, role)
        }
        // else{alert("jahal")}
        this.setState({
            [`selectedValue${index}`]: value
        })
        // if (value === this.props.str.active) {
        //     let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/user/activeTask/" + id
        //     this.requestOnServer("onChangeStatus", uri, id)
        // }

    }
    unverify(uri, obj, rout) {
        console.log("workfun", rout, obj.id)
        var bodyFormData = new FormData();
        if (rout === "tasks") {
            console.log("ifffffff", uri)
            bodyFormData.append("task_id", obj.id);
        }
        else if (rout === "properties") {
            console.log("else iff", obj, uri)
            bodyFormData.append("property_id", obj.id);
            bodyFormData.append("note", obj.note);
        }
        else if (rout === "projects") {
            console.log("else projects", obj, uri)
            bodyFormData.append("project_id", obj.id);
        }
        // else if (rout === "agents") {
        //     console.log("else projects", obj, uri)
        //     bodyFormData.append("project_id", obj.id);
        // }
        else {
            bodyFormData.append("user_id", obj.id);
            bodyFormData.append("user_type", rout === "tasker" ? "tasker" : "agent");
        }
        url = uri
        var options = {
            method: 'POST',
            url: url,
            headers:
            {
                token: "bearer " + this.props.userCredentials.token,
                'postman-token': '553d07fc-3950-1199-efd9-6b5b5f8315a2',
                'cache-control': 'no-cache',
                clientsecret: '(*jh2kj36gjhasdi78743982u432j',
                clientkey: '34532hbjdsakjd2&&gjhjh11',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                "Allow-Cross-Origin": '*',
            },
            data: bodyFormData
        };
        console.log(bodyFormData, '****61');
        axios(options)
            .then((data) => {
                console.log(data, 'DATAT')
                this.setState({
                    isloader: false
                })
                alert(data.data.message)
                this._onRefreshTasker()

                // Actions.tabbar({ type: "reset" });
                // Actions.tabNavigation();

            }).catch((err) => {
                this.setState({
                    isloader: false
                })
                console.log(err, 'errrr', JSON.stringify(err.response))
                alert(JSON.stringify(err.response.data.message))
                this.setState({ sendingLoader: !this.state.sendingLoader });
            })
    }

    // routeChange(DataOfTasker) {
    //     console.log(DataOfTasker,"DataOfTaskerDataOfTaskerr")
    //     // alert("chalu"+iAdded)
    //     Actions.FithPageList({ propertyData: DataOfTasker })
    // }
    taskers(DataOfTasker) {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#908073",
                padding: "2%"
            }}>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.name}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.type}</Text>
                {DataOfTasker.user_email ?
                    <View style={{ paddingVertical: DataOfTasker.user_email.length > 22 && DataOfTasker.user_email.length < 45 ? 12 : (DataOfTasker.user_email.length > 45 ? 14 : 0.1) }}>
                        <Text style={{ fontWeight: "bold", fontSize: 13, color: "white", textDecorationLine: "underline" }}>{this.props.str.email}</Text>
                    </View> :
                    null}
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.verification}</Text>
                {/* <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.Report}</Text> */}
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.status}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.featuredactions}</Text>
            </View>
        )
    }
    taskersValues(DataOfTasker, index) {
        return (
            <View style={{ flex: 2, backgroundColor: "#f8f1f1", padding: "2%" }}>
                <TouchableOpacity style={{}}
                // onPress={() => this.routeChange(DataOfTasker)}
                >
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.full_name}</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.user_type == 4 ? this.props.str.Tasker : "n/a"}</Text>
                    {DataOfTasker.user_email ?
                        <Text style={{ fontSize: 13, color: "#908073", textDecorationLine: "underline" }}>{DataOfTasker.user_email}</Text>
                        :
                        null}
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.account_verify_name}</Text>
                    {/* <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.report}</Text> */}
                    <View>
                        <TouchableOpacity style={{

                            backgroundColor: 'green', width: "45%", borderRadius: 5, alignItems: "center",
                            justifyContent: "center", position: "absolute", right: 0
                        }}>
                            <Text style={{ color: 'white', fontSize: 12 }}>{DataOfTasker.status_for_verification}</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

                <Picker mode="dropdown" style={{ width: "90%", height: this.state.screenHeight / 35 }}
                    selectedValue={this.state[`selectedValue${index}`]}
                    onValueChange={(e) => this.onChangeStatus(e, DataOfTasker.id, DataOfTasker.status_applied, index, DataOfTasker, 'tasker')
                    }
                >
                    <Item label={this.props.str.actions} value={this.props.str.actions} key={this.props.str.actions} />
                    <Item
                        label={(DataOfTasker.account_verify_name === 'Unverified' || DataOfTasker.account_verify_name === "غير محقق" || DataOfTasker.report === 'Unverified' || DataOfTasker.report === "لا يوجد ملف") ?
                            (this.props.str.verify)
                            :
                            (this.props.str.unverify)}
                        value={(DataOfTasker.account_verify_name === 'Unverified' || DataOfTasker.account_verify_name === "غير محقق" || DataOfTasker.report === 'Unverified' || DataOfTasker.report === "لا يوجد ملف") ?
                            (this.props.str.verify)
                            :
                            (this.props.str.unverify)}
                        key={(DataOfTasker.account_verify_name === 'Unverified' || DataOfTasker.account_verify_name === "غير محقق" || DataOfTasker.report === 'Unverified' || DataOfTasker.report === "لا يوجد ملف") ?
                            (this.props.str.verify)
                            :
                            (this.props.str.unverify)} />
                    {/* <Item label={this.props.str.edit} value={this.props.str.edit} key={this.props.str.edit} /> */}
                    {/* <Item label='Delete' value='Delete' key="Delete" /> */}
                </Picker>


            </View>
        )
    }
    tasks(DataOfTasker) {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#908073",
                padding: "2%"
            }}>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.name}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.type}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.postedbysmal}</Text>

                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.Report}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.note}</Text>

                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.featuredactions}</Text>
            </View>
        )
    }
    tasksValues(DataOfTasker, index) {
        return (
            <View style={{ flex: 2, backgroundColor: "#f8f1f1", padding: "2%" }}>
                <TouchableOpacity style={{}}
                // onPress={() => this.routeChange(DataOfTasker)}
                >
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.title}</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.type_format}</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.created_by}</Text>

                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.report}</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.note}</Text>


                </TouchableOpacity>

                <Picker mode="dropdown" style={{ width: "50%", height: this.state.screenHeight / 35 }}
                    selectedValue={this.state[`selectedValue${index}`]}
                    onValueChange={(e) => this.onChangeStatus(e, DataOfTasker.id, DataOfTasker.status_applied, index, DataOfTasker, 'tasks')
                    }
                >
                    <Item label={this.props.str.actions} value={this.props.str.actions} key={this.props.str.actions} />
                    <Item label={(DataOfTasker.report === "Unverified" || DataOfTasker.report === "غير محقق") ? (this.props.str.verify) : (this.props.str.unverify)}
                        value={(DataOfTasker.report === "Unverified" || DataOfTasker.report === "غير محقق") ? (this.props.str.verify) : (this.props.str.unverify)}
                        key={(DataOfTasker.report === "Unverified" || DataOfTasker.report === "غير محقق") ? (this.props.str.verify) : (this.props.str.unverify)} />
                    {/* <Item label={this.props.str.edit} value={this.props.str.edit} key={this.props.str.edit} /> */}
                    {/* <Item label='Delete' value='Delete' key="Delete" /> */}
                </Picker>


            </View>
        )
    }
    properties(DataOfTasker) {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#908073",
                padding: "2%"
            }}>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.name}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.type}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.postedbysmal}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.Report}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.note}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.featuredactions}</Text>
            </View>
        )
    }
    propertiesValues(DataOfTasker, index) {
        return (
            <View style={{ flex: 2, backgroundColor: "#f8f1f1", padding: "2%" }}>
                <TouchableOpacity style={{}}
                    onPress={() => this.routeChange(DataOfTasker, "propertyFullview")}
                >
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.title.substring(0, 30)}</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.type_format}</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.phone}</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.report}</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.note}</Text>

                </TouchableOpacity>

                <Picker mode="dropdown" style={{ width: "50%", height: this.state.screenHeight / 35 }}
                    selectedValue={this.state[`selectedValue${index}`]}
                    onValueChange={(e) => this.onChangeStatus(e, DataOfTasker.id, DataOfTasker.status_applied, index, DataOfTasker, 'properties')
                    }
                >
                    <Item label={this.props.str.actions} value={this.props.str.actions} key={this.props.str.actions} />
                    <Item label={(DataOfTasker.report === "Unverified" || DataOfTasker.report === "غير محقق") ? (this.props.str.verify) : (this.props.str.unverify)}
                        value={(DataOfTasker.report === "Unverified" || DataOfTasker.report === "غير محقق") ? (this.props.str.verify) : (this.props.str.unverify)}
                        key={(DataOfTasker.report === "Unverified" || DataOfTasker.report === "غير محقق") ? (this.props.str.verify) : (this.props.str.unverify)} />
                    {/* <Item label={this.props.str.edit} value={this.props.str.edit} key={this.props.str.edit} /> */}
                    {/* <Item label='Delete' value='Delete' key="Delete" /> */}
                </Picker>


            </View>
        )
    }
    agents(DataOfTasker) {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#908073",
                padding: "2%"
            }}>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.name}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.type}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.email}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.verification}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.Report}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.status}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.actions}</Text>
            </View>
        )
    }
    agentsValues(DataOfTasker, index) {
        return (
            <View style={{ flex: 2, backgroundColor: "#f8f1f1", padding: "2%" }}>
                <View style={{}}
                // onPress={() => this.routeChange(DataOfTasker,"projectFullview")}
                //     onPress={() => { Actions.FithPageList({ agentanddevelopers: DataOfTasker }) 
                // }}
                >
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.full_name}</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{
                        DataOfTasker.user_type === "2" && this.props.str.seller
                        || DataOfTasker.user_type === "3" && this.props.str.agent
                        || DataOfTasker.user_type === "4" && this.props.str.tasker
                        || DataOfTasker.user_type === "5" && this.props.str.representative
                        || DataOfTasker.user_type === "6" && this.props.str.internationalpartner


                    }</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.user_email}</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.account_verify_name}</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.report === "No file" && DataOfTasker.report || "Download"}</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.status_for_verification}</Text>
                </View>
                <Picker mode="dropdown" style={{ width: "90%", height: this.state.screenHeight / 35 }}
                    selectedValue={this.state[`selectedValue${index}`]}
                    onValueChange={(e) => this.onChangeStatus(e, DataOfTasker.id, DataOfTasker.status_applied, index, DataOfTasker, 'agents')
                    }
                >
                    <Item label={this.props.str.actions} value={this.props.str.actions} key={this.props.str.actions} />
                    <Item label={(DataOfTasker.account_verify_name === "Unverified" || DataOfTasker.account_verify_name === "غير محقق") ? (this.props.str.verify) : (this.props.str.unverify)}
                        value={(DataOfTasker.account_verify_name === "Unverified" || DataOfTasker.account_verify_name === "غير محقق") ? (this.props.str.verify) : (this.props.str.unverify)}
                        key={(DataOfTasker.account_verify_name === "Unverified" || DataOfTasker.account_verify_name === "غير محقق") ? (this.props.str.verify) : (this.props.str.unverify)} />

                </Picker>
            </View>
        )
    }
    projects(DataOfTasker) {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#908073",
                padding: "2%"
            }}>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.name}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.type}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.Report}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.featuredactions}</Text>
            </View>
        )
    }
    projectsValues(DataOfTasker, index) {
        return (
            <View style={{ flex: 2, backgroundColor: "#f8f1f1", padding: "2%" }}>
                <TouchableOpacity style={{}}
                // onPress={() => this.routeChange(DataOfTasker,"projectFullview")}
                >
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.title}</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.type_format}</Text>
                    <Text style={{ fontSize: 13, color: "#908073" }}>{DataOfTasker.report}</Text>
                </TouchableOpacity>
                <Picker mode="dropdown" style={{ width: "50%", height: this.state.screenHeight / 35 }}
                    selectedValue={this.state[`selectedValue${index}`]}
                    onValueChange={(e) => this.onChangeStatus(e, DataOfTasker.id, DataOfTasker.status_applied, index, DataOfTasker, 'projects')
                    }
                >
                    <Item label={this.props.str.actions} value={this.props.str.actions} key={this.props.str.actions} />
                    <Item label={(DataOfTasker.report === "Unverified" || DataOfTasker.report === "غير محقق") ? (this.props.str.verify) : (this.props.str.unverify)}
                        value={(DataOfTasker.report === "Unverified" || DataOfTasker.report === "غير محقق") ? (this.props.str.verify) : (this.props.str.unverify)}
                        key={(DataOfTasker.report === "Unverified" || DataOfTasker.report === "غير محقق") ? (this.props.str.verify) : (this.props.str.unverify)} />
                    {/* <Item label={this.props.str.edit} value={this.props.str.edit} key={this.props.str.edit} /> */}
                    {/* <Item label='Delete' value='Delete' key="Delete" /> */}
                </Picker>
            </View>
        )
    }
    routeChange(DataOfTasker, fullView) {
        console.log(DataOfTasker, "DataOfTasker")
        if (this.props.rout !== "allRequests") {

            if (fullView === "propertyFullview") {

                Actions.FithPageList({ propertyData: DataOfTasker })
            }
        }
        // alert("chalu"+iAdded)
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
                                                // console.log(DataOfTasker, index, "DataOfTasker")
                                                return (
                                                    <View style={{
                                                        flexDirection: this.props.str.language === "en" ? "row" : "row-reverse", 
                                                        marginLeft: 5,
                                                        marginRight: 5,
                                                        marginTop: 10,
                                                    }} key={index}>
                                                        {/* headings */}

                                                        {(this.props.rout === "TaskersInCity") ?
                                                            (
                                                                this.taskers(DataOfTasker, index)
                                                            ) :
                                                            (
                                                                (this.props.rout === "TasksInCity") ?
                                                                    (

                                                                        this.tasks(DataOfTasker, index)
                                                                    ) :
                                                                    (
                                                                        (this.props.rout === "PropsInCity") ?
                                                                            (
                                                                                this.properties(DataOfTasker, index)
                                                                            ) :
                                                                            (

                                                                                (this.props.rout === "ProjectsInCity") ?
                                                                                    (
                                                                                        this.projects(DataOfTasker, index)
                                                                                    ) :
                                                                                    (this.props.rout === "AgentInCity") ?
                                                                                        (
                                                                                            this.agents(DataOfTasker, index)
                                                                                        ) : null
                                                                            )
                                                                    )
                                                            )}
                                                        {/* values */}
                                                        {(this.props.rout === "TaskersInCity") ?
                                                            (
                                                                this.taskersValues(DataOfTasker, index)
                                                            ) :
                                                            (
                                                                (this.props.rout === "TasksInCity") ?
                                                                    (

                                                                        this.tasksValues(DataOfTasker, index)
                                                                    ) :
                                                                    (
                                                                        (this.props.rout === "PropsInCity") ?
                                                                            (
                                                                                this.propertiesValues(DataOfTasker, index)
                                                                            ) :
                                                                            (

                                                                                (this.props.rout === "ProjectsInCity") ?
                                                                                    (
                                                                                        this.projectsValues(DataOfTasker, index)
                                                                                    ) :
                                                                                    (this.props.rout === "AgentInCity") ?
                                                                                        (
                                                                                            this.agentsValues(DataOfTasker, index)
                                                                                        ) : null



                                                                            )
                                                                    )
                                                            )}

                                                        {/* image */}
                                                        {(this.props.rout === "TaskersInCity" || this.props.rout === "AgentInCity") ?
                                                            (
                                                                <View style={{ flex: 1.5, backgroundColor: "#f8f1f1", justifyContent: "center", alignItems: "center" }}>
                                                                    {
                                                                        (this.props.rout !== "TasksFavorites" && this.props.rout !== "requestsFavorites") ? (
                                                                            <Image
                                                                                style={{
                                                                                    position: "absolute", zIndex: 1,
                                                                                    width: 100, height: 100, borderColor: "#E94E1B", borderWidth: 1.2,
                                                                                }}
                                                                                source={{ uri: DataOfTasker.featured_image_src || DataOfTasker.avatar_photo }}
                                                                            />
                                                                        ) : (null)

                                                                    }

                                                                </View>
                                                            ) :
                                                            (null)}
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
export default connect(mapStateToProps, mapDispatchToProps)(RequestsReport);
const styles = StyleSheet.create({
});  
