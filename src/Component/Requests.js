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
class Requests extends Component {
    constructor(props) {
        super(props)
        this.state = {

            selectedValue0: "Actions",
            iAddedProperties: [],
            activity: false,
            moreloader: false,
            isloader: true,
            selectedValue0: "Actions",
            page: 0,

        }
    }
    componentWillMount() {
        var { height, width } = Dimensions.get('window');
        this.setState({
            screenHeight: height,
            token: this.props.userCredentials.token,
        })
        if (this.props.searchRequest) {
            console.log(this.props.searchRequest, "searchRequest")
            this.setState({
                iAddedProperties: this.props.searchRequest,
                isloader: false,
            })
        }
        else {
            this._onRefreshTasker()
        }
    }
    requestOnServer = (functionName, uri, del) => {
        console.log(functionName, uri, "functionName, uri", this.props.userCredentials.token)
        if (this.props.keywords && functionName === "_onRefreshTasker") {
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
                url: uri,
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
                        iAddedProperties: data.data.results,
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
        if (this.props.keywords && functionName === "_onEndReached") {
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
                url: uri,
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
                    let cloneFindData = this.state.iAddedProperties
                    let responseAPI = data.data.results
                    for (var i = 0; i < responseAPI.length; i++) {
                        cloneFindData.push(responseAPI[i])
                    }
                    console.log(responseAPI, "responseAPI")
                    this.setState({
                        moreloader: false,
                        page: this.state.page + 10,
                        iAddedProperties: cloneFindData
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
                console.log(data.data.results, "response");
                this.setState({
                    iAddedProperties: data.data.results,
                    isloader: false,
                    page: 10,
                    // selectedValue: data.data.results.status === "Active" ? "Deactive" : "Active"
                }, () => { console.log(this.state.isloader, "updated states of loader") })
            }
            else if (functionName === "_onEndReached") {
                let cloneiAddedProperties = this.state.iAddedProperties
                let responseAPI = data.data.results
                for (var i = 0; i < responseAPI.length; i++) {
                    cloneiAddedProperties.push(responseAPI[i])
                }
                console.log(responseAPI, "reachend")
                console.log(this.state.iAddedProperties, 'this.state.iAddedProperties')
                this.setState({
                    moreloader: false,
                    page: this.state.page + 10,
                    iAddedProperties: cloneiAddedProperties
                })
            }
            else if (functionName === "onChangeStatus") {
                console.log(data, "datadatadata")
                alert(data.data.message)
                this._onRefreshTasker()

            }
        }).catch(err => {
            console.log("catch")
            var errUpdate = JSON.stringify(err);
            console.log(JSON.parse(errUpdate));
            console.log(err)
            alert(err.response.data.message || err.response.data.results||err)
            // alert(err.result)
            this.setState({
                err: err.message,
                isloader: false
            })
        })

    }
    _onRefreshTasker() {
        // alert("working refresh")
        console.log("work", this.state.token)
        let uri;
        this.setState({
            isloader: true
        })
        if (this.props.rout === "MyBuyRequests") {
            console.log("work")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/request/user/getMyBuyRequests/10/0"
        }
        else if (this.props.rout === "MyBuyRequestsSearch") {
            console.log("work")
            uri = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/request/guest/getBuyRequestSearch'
        }
        // if (this.props.rout === "MyBuyRequests") {
        //     console.log("work")
        //     uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/request/user/getMyBuyRequests/10/0"
        // }
        else if (this.props.rout === "myRequiredTask") {
            console.log("taskk")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/user/getMyPostedTasks/10/0"

        }
        else if (this.props.rout === "listOfapplyTask") {
            console.log("listttttttttts", this.props.taskId)
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/guest/getApplicantsByTaskId/" + this.props.taskId + "/10/0"
        }
        else {
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/user/getListPropertyAddedByUsertoken/10/0"
        }
        this.requestOnServer("_onRefreshTasker", uri)
    }
    _onEndReached() {
        // alert("working reachend")
        this.setState({
            moreloader: true
        })
        if (this.props.rout === "MyBuyRequests") {
            console.log("work")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/request/user/getMyBuyRequests/5/" + this.state.page
        }
        else if (this.props.rout === "MyBuyRequestsSearch") {
            console.log("work")
            uri = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/request/guest/getBuyRequestSearch'
        }
        else if (this.props.rout === "myRequiredTask") {
            console.log("taskk")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/user/getMyPostedTasks/10/" + this.state.page

        }
        else if (this.props.rout === "listOfapplyTask") {
            console.log("listttttttttts", this.props.taskId)
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/guest/getApplicantsByTaskId/" + this.props.taskId + "/10/" + this.state.page
        }
        else {
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/user/getListPropertyAddedByUsertoken/10/" + this.state.page
        }

        if (!this.state.moreloader) {
            this.requestOnServer("_onEndReached", uri)
        }
    }
    onChangeStatus = (value, id, status, index, iAdded) => {
        // console.log(value,  "valueeeer", iAdded)
        console.log(value, id, status, "valueeeer", iAdded)

        if (value != this.props.str.edit) {
            this.setState({
                [`selectedValue ${index}`]: value
            })

        }
        // for edit property
        if (value === this.props.str.edit && this.props.rout === "propertiesIadded") {
            Actions.EditProperties({
                AddId: id,
                propertyDataForEdit: iAdded

            })
        }
        // for edit MyBuyRequests
        if (value === this.props.str.edit && this.props.rout === "MyBuyRequests") {
            Actions.EditRequest({
                requestId: id,
                requestDataForEdit: iAdded
            })
        }
        // for edit task
        if (value === this.props.str.edit && this.props.rout === "myRequiredTask") {
            Actions.EditTask({
                taskId: id,
                taskDataForEdit: iAdded
            })
        }
        // for added property
        if (value === this.props.str.active && status !== "Active") {
            // console.log("ifworking")
            let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/user/activeProperty/" + id
            this.requestOnServer("onChangeStatus", uri)
        }
        else if (value === this.props.str.deactivate && (status === "Active" || status === "نشط")) {
            // console.log("elseifworking")

            let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/user/disactiveProperty/" + id
            this.requestOnServer("onChangeStatus", uri)
        }
        else if (value === this.props.str.deactivate &&this.props.rout === "propertiesIadded"&& this.props.userDetails.user_type==="5") {
            // console.log("elseifworking")

            let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/user/disactiveProperty/" + id
            this.requestOnServer("onChangeStatus", uri)
        }
        // for added requests
        else if (value === this.props.str.delete && this.props.rout === "MyBuyRequests") {
            // console.log("deltworking")
            let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/request/user/deleteBuyRequest/" + id
            this.requestOnServer("onChangeStatus", uri, "delete")
        }
        else if (value === this.props.str.delete && this.props.rout === "myRequiredTask") {
            // console.log("deltworkingssssssss")
            let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/user/deleteTask/" + id
            this.requestOnServer("onChangeStatus", uri, "delete")
        }
        else if (value === this.props.str.listapplicants && this.props.rout === "myRequiredTask") {
            // console.log(iAdded.process, "-----------")
            Actions.listOfapplyTask({ taskIdFrmDra: id, process: iAdded.process, tasksData: iAdded })
        }
        else if (value === this.props.str.details && this.props.rout === "myRequiredTask") {
            Actions.ForthPageList({ tasksData: iAdded })
        }

    }


    routeChange(iAdded) {
        // alert("chalu"+iAdded)
        if (this.props.rout === "MyBuyRequests") {
            Actions.FithPageList({ requestData: iAdded })
        }
        else if (this.props.rout === "myRequiredTask") {
            console.log(iAdded, "data")
            Actions.ForthPageList({ tasksData: iAdded })
        }
        else if (this.props.rout === "listOfapplyTask") {
            console.log(iAdded, "data")
            Actions.ForthPageList({ tasksData: this.props.tasksData })
        }
        else {
            Actions.FithPageList({ propertyData: iAdded })
        }
    }

    contract(iAdded, process) {
        if (process === "Waiting") {
            this.startContract(iAdded)
        }
        else if (process === "Ended") {
            console.log("disable")
        }
        else {
            this.endContract(iAdded)
        }
    }
    startContract(iAdded) {
        console.log(iAdded.id, iAdded.task_id, "iAdded+++++++++")
        // alert("working" + this.props.taskId)
        var bodyFormData = new FormData();
        bodyFormData.append("task_id", iAdded.task_id);
        bodyFormData.append("applicant_id", iAdded.id);
        var options = {
            method: 'POST',
            url: 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/task/user/hireApplicant',
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
                console.log(data.data.message, 'DATAT')
                alert(data.data.message)
                Actions.tabbar({ type: "reset" });
                Actions.tabNavigation();
            }).catch((err) => {
                alert(JSON.stringify(err.response.data.message))
                this.setState({ sendingLoader: !this.state.sendingLoader });
            })
    }
    endContract(taskObj) {
        console.log(taskObj, "taskObj")
        Actions.Rating({ taskObj })

    }

    render() {
        return (
            <View style={{
                flex: 1, width: "100%",
            }}>
                {/* //////////////////////////////////////Properties i added////////////////////////////////////// */}
                {
                    // (this.state.iAddedProperties) ? (
                    // (this.state.isloader === true || !this.state.iAddedProperties) ? (
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
                                                console.log(iAdded, index, "i addddxd")
                                                return (
                                                    <View style={{
                                                        flexDirection: this.props.str.language === "en" ? "row" : "row-reverse", 
                                                        marginLeft: 5,
                                                        marginRight: 5,
                                                        marginTop: 10,
                                                    }} key={index}>
                                                        {/* headings */}
                                                        <View style={{
                                                            flex: 1.2,
                                                            backgroundColor: "#908073",
                                                            padding: "2%"
                                                        }}>
                                                            <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.id}</Text>
                                                            <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.rout === "listOfapplyTask" ? this.props.str.name : this.props.str.title}</Text>
                                                            <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.rout === "listOfapplyTask" ? this.props.str.price : this.props.str.type}</Text>
                                                            <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.rout === "myRequiredTask" ? this.props.str.price : (this.props.rout === "listOfapplyTask" ? this.props.str.duration : this.props.str.purpose)}</Text>
                                                            <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.publishdate}</Text>
                                                            <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.rout === "MyBuyRequests" && this.props.str.price}</Text>
                                                            <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.rout === "listOfapplyTask" ? this.props.str.question :(this.props.rout === "myRequiredTask" ?this.props.str.Process: this.props.str.conditionstatus)}</Text>
                                                            <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.rout === "myRequiredTask" ? this.props.str.status : null}</Text>
                                                            <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.rout === "myRequiredTask" ? this.props.str.ActivationStatus : null}</Text>
                                                            <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.rout === "propertiesIadded" ? this.props.str.Featured : null}</Text>
                                                            <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.actions}</Text>
                                                        </View>
                                                        {/* values */}
                                                        <View style={{ flex: 2, backgroundColor: "#f8f1f1", padding: "2%" }}>
                                                            <TouchableOpacity style={{}} onPress={() => this.routeChange(iAdded)}>

                                                                <Text style={{ fontSize: 13, color: "#908073" }}>{iAdded.id}</Text>

                                                                <Text style={{ fontSize: 13, color: "#908073" }}>{this.props.rout === "listOfapplyTask" ? iAdded.full_name : iAdded.title}</Text>
                                                                <Text style={{ fontSize: 13, color: "#908073" }}>{this.props.rout === "listOfapplyTask" ? iAdded.price : this.props.rout === "myRequiredTask" ? iAdded.type_format : iAdded.type_format}</Text>
                                                                <Text style={{ fontSize: 13, color: "#908073" }}>{this.props.rout === "myRequiredTask" ? iAdded.budget_price : (this.props.rout === "listOfapplyTask" ? iAdded.duration : iAdded.purpose_format)}</Text>
                                                                <Text style={{ fontSize: 13, color: "#908073" }}>{this.props.rout === "myRequiredTask" ? iAdded.published_on : iAdded.publish_time||iAdded.deliverydate || iAdded.create_time || iAdded.date}</Text>
                                                                <Text style={{ fontSize: 13, color: "#908073" }}>{this.props.rout === "MyBuyRequests" && iAdded.price_max}</Text>
                                                                <View>

                                                                    <TouchableOpacity style={{
                                                                        backgroundColor: 'green', width: "45%", borderRadius: 5, alignItems: "center",
                                                                        justifyContent: "center",  marginHorizontal:'50%'

                                                                    }}>
                                                                        <Text style={{ color: 'white', fontSize: 12 }}>
                                                                            {this.props.rout === "MyBuyRequests" ? iAdded.status_format : (this.props.rout === "myRequiredTask" ? iAdded.process : (this.props.rout === "listOfapplyTask" ? iAdded.question : iAdded.status))}
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                                <Text style={{ fontSize: 13, color: "#908073" }}>{this.props.rout === "myRequiredTask" ? iAdded.status_applied : null}</Text>
                                                                <Text style={{ fontSize: 13, color: "#908073" }}>{this.props.rout === "myRequiredTask" ? iAdded.status_name : null}</Text>
                                                                <Text style={{ fontSize: 13, color: "#908073" }}>{this.props.rout === "propertiesIadded" ? iAdded.featured_format : null}</Text>


                                                            </TouchableOpacity>

                                                            {(this.props.rout === "myRequiredTask") ? (

                                                                (iAdded.status_applied === "UnApply" || iAdded.status_applied === "لم يتقدم أحد")
                                                                    ? (
                                                                        <Picker mode="dropdown" style={{ width: "50%", height: this.state.screenHeight / 35 }}
                                                                            selectedValue={this.state[`selectedValue $ {index}`]}
                                                                            onValueChange={(e) => this.onChangeStatus(e, iAdded.id, iAdded.status, index, iAdded)
                                                                            }
                                                                        >
                                                                            <Item label={this.props.str.actions} value={this.props.str.actions} key={this.props.str.actions} />
                                                                            <Item label={this.props.str.listapplicants} value={this.props.str.listapplicants} key={this.props.str.listapplicants} />
                                                                            <Item label={this.props.str.delete} value={this.props.str.delete} key={this.props.str.delete} />
                                                                            {/* <Item label={this.props.str.details} value={this.props.str.details} key={this.props.str.details} /> */}
                                                                            <Item label={this.props.str.edit} value={this.props.str.edit} key={this.props.str.edit} />
                                                                            {/* <Item label='Delete' value='Delete' key="Delete" /> */}
                                                                        </Picker>
                                                                    ) : (
                                                                        <Picker mode="dropdown" style={{ width: "50%", height: this.state.screenHeight / 35 }}
                                                                            selectedValue={this.state[`selectedValue $ {index}`]}
                                                                            onValueChange={(e) => this.onChangeStatus(e, iAdded.id, iAdded.status, index, iAdded)
                                                                            }
                                                                        >
                                                                            <Item label={this.props.str.actions} value={this.props.str.actions} key={this.props.str.actions} />
                                                                            <Item label={this.props.str.listapplicants} value={this.props.str.listapplicants} key={this.props.str.listapplicants} />

                                                                        </Picker>

                                                                    )

                                                            ) :
                                                                (this.props.rout === "listOfapplyTask") ?
                                                                    (
                                                                        <TouchableOpacity onPress={() => this.contract(iAdded, this.props.process)}
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
                                                                        <Picker mode="dropdown" style={{ width: "70%", height: this.state.screenHeight / 35 }}
                                                                            selectedValue={this.state[`selectedValue${index}`]}
                                                                            onValueChange={(e) => this.onChangeStatus(e, iAdded.id, iAdded.status, index, iAdded)
                                                                            }
                                                                        >
                                                                            <Item label={this.props.str.actions} value={this.props.str.actions} key={this.props.str.actions} />

                                                                            {(this.props.rout === "MyBuyRequests" || this.props.rout === "myRequiredTask") ? (

                                                                                <Item label={this.props.str.delete} value={this.props.str.delete} key={this.props.str.delete} />
                                                                            ) : (
                                                                                    this.props.userDetails.user_type === "5" ? (

                                                                                        <Item label={this.props.str.deactivate} value={this.props.str.deactivate}
                                                                                            key={this.props.str.deactivate} />
                                                                                    ) : (
                                                                                            <Item label={iAdded.status === "Active" || iAdded.status === "نشط" ? this.props.str.deactivate : this.props.str.active} value={iAdded.status === "Active" || iAdded.status === "نشط" ? this.props.str.deactivate : this.props.str.active}
                                                                                                key={iAdded.status === "Active" || iAdded.status === "نشط" ? this.props.str.deactivate : this.props.str.active} />

                                                                                        )


                                                                                )}

                                                                            <Item label={this.props.str.edit} value={this.props.str.edit} key={this.props.str.edit} />


                                                                            {/* <Item label='Delete' value='Delete' key="Delete" /> */}
                                                                        </Picker>
                                                                    )}

                                                        </View>
                                                        {(this.props.rout === "MyBuyRequests" || this.props.rout === "myRequiredTask" || this.props.rout === "MyBuyRequestsSearch") ? (null) : (
                                                            <View style={{ flex: 1.5, backgroundColor: "#f8f1f1", justifyContent: "center", alignItems: "center" }}>
                                                                <Image
                                                                    style={{
                                                                        position: "absolute", zIndex: 1,
                                                                        width: 100, height: 100, borderColor: "#E94E1B", borderWidth: 1.2,
                                                                    }}
                                                                    source={{ uri: iAdded.featured_image_src || iAdded.image }}
                                                                />
                                                            </View>
                                                        )}



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
        userDetails: state.root.userDetails,
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
export default connect(mapStateToProps, mapDispatchToProps)(Requests);
const styles = StyleSheet.create({
});  
