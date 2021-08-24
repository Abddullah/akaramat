
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, RefreshControl, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Item, Fab, Input, } from 'native-base';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Modal from "react-native-modal";
import Textarea from 'react-native-textarea';
import axios from 'axios';
import InfiniteScroll from 'react-native-infinite-scroll';

class Notifications extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false,
            page: 0,
            activity: false,
            moreloader: false,
            isloader: true,
            notificationData: [],
            loader: false

        }
    }
    componentWillMount() {
        this.setState({
            token: this.props.userCredentials.token,
        })
        var { height, width } = Dimensions.get('window');
        this.setState({
            screenHeight: height,
        })
        this._onRefresh(this)
        console.log(this.props.forReloadNotification, "forReloadNotification")
    }

    componentWillReceiveProps(nextprops) {
        console.log(nextprops.forReloadNotification, "reload")
        // this._onRefresh(this)
    }

    _onRefresh() {
        this.setState({
            isloader: true
        })
        return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/user/getNotifications/10/0",
            headers: {
                token: "bearer " + this.props.userCredentials.token,
                'postman-token': '553d07fc-3950-1199-efd9-6b5b5f8315a2',
                'cache-control': 'no-cache',
                clientsecret: '(*jh2kj36gjhasdi78743982u432j',
                clientkey: '34532hbjdsakjd2&&gjhjh11',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                "Allow-Cross-Origin": '*',
            },
        })
            .then(data => {
                let responseAPI = data.data.results
                this.setState({
                    isloader: false,
                    page: this.state.page + 10,
                    notificationData: responseAPI
                })
                console.log(responseAPI, "response")

            })
            .catch(err => {
                // console.log(err)
                alert(JSON.stringify(err.response.data.message))
                this.setState({
                    err: err.message,
                    isloader: false
                })
            })
    }

    _onEndReached() {
        this.setState({
            moreloader: true
        })
        return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/user/getNotifications/10/" + this.state.page,
            headers: {
                token: "bearer " + this.props.userCredentials.token,
                'postman-token': '553d07fc-3950-1199-efd9-6b5b5f8315a2',
                'cache-control': 'no-cache',
                clientsecret: '(*jh2kj36gjhasdi78743982u432j',
                clientkey: '34532hbjdsakjd2&&gjhjh11',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                "Allow-Cross-Origin": '*',
            },
        })
            .then(data => {
                let getNotification = this.state.notificationData
                let responseAPI = data.data.results
                for (var i = 0; i < responseAPI.length; i++) {
                    getNotification.push(responseAPI[i])
                }

                console.log(responseAPI, "responseInMoredata");

                this.setState({
                    moreloader: false,
                    page: this.state.page + 10,
                    notificationData: getNotification
                })

            })
            .catch(err => {
                console.log(err)
                alert(JSON.stringify(err.response.data.message))
                this.setState({
                    err: err.message,
                    moreloader: false
                })
            })

    }

    ApiRequest = async (url, bodyFormData, image) => {

        var header1 = {
            token: "bearer " + this.props.userCredentials.token,
            clientsecret: '(*jh2kj36gjhasdi78743982u432j',
            clientkey: '34532hbjdsakjd2&&gjhjh11',
            "Content-Type": "application/json",
        }

        var options = {
            method: 'POST',
            url: url,
            headers: header1,
            data: bodyFormData
        };
        return await axios(options)
            .then((data) => {
                console.log(data, "datasadasdsad")
                return data
            }).catch((err) => {
                return err
            })

    }

    promoteMyProperty(data) {
        this.setState({
            loader: true
        })
        const notification_id = data.id_notification
        const confirm_code = data.params.confirm_code
        let url = `https://demo.akaratmisr.com:443/${this.props.str.language}/api/property/user/confirmRequestPromoteProperty`

        var bodyFormData = new FormData();

        bodyFormData.append('notification_id', notification_id);
        bodyFormData.append('confirm_code', confirm_code);

        this.ApiRequest(url, bodyFormData).then((data) => {
            this.setState({
                loader: false
            })
            if (data && data.data && data.data.message && data.data.status == 1000) {
                alert(data.data.message)
            } else {
                alert(JSON.stringify(data.response.data.message))
            }
        }).catch((err) => {
            this.setState({
                loader: false
            })
            alert(err.response.data.message)
        })

    }

    copyProperty(params, notiId, data) {
        Alert.alert(
            '',
            `${this.props.str.reqCopy}

${data.message}           

${this.props.str.sureAllow}
            `,
            [
                {
                    text: 'Yes',
                    onPress: () => this.promoteMyProperty(data),
                    style: 'cancel',
                },
                { text: 'No', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
        );
    }

    gettingDetails(type, params, notiId, datas) {
        console.log(datas, "params")
        return axios({
            method: 'GET',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/user/markAsReadNotification/" + notiId,
            headers: {
                token: "bearer " + this.props.userCredentials.token,
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                console.log(data, "markssss")
                var uri
                switch (type) {
                    case "task_detail_page":
                        uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/guest/getTaskDetail/" + params.task_id
                        break;
                    case "property_detail_page":
                        uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/guest/getPropertyDetail/" + params.unique_id
                        break;
                    case "inbox_message":
                        Actions.MyInbox()
                        this.setState({ isModalVisible: false });
                        break;
                    case "copyproperty":
                        this.copyProperty(params, notiId, datas)
                        break;
                    default:
                        break;
                }

                if (type != 'copyproperty') {

                    return axios({
                        method: 'GET',
                        url: uri,
                        headers: {
                            "clientkey": "34532hbjdsakjd2&&gjhjh11",
                            "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                        },
                    })
                        .then(data => {
                            if (type === "task_detail_page") {
                                Actions.ForthPageList({ tasksData: data.data.results, headersHeading: data.data.results.type_format })
                            }
                            if (type === "property_detail_page") {
                                Actions.FithPageList({ propertyData: data.data.results })
                            }
                            this.setState({ isModalVisible: false });
                        })
                        .catch(err => {
                            if (type != "inbox_message") {
                                console.log(err)
                                alert(err.message)
                                this.setState({
                                    err: err.message,
                                    isloader: false
                                })
                            }

                        })
                }


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




    render() {
        const { loader } = this.state
        return (
            <View style={{ position: 'relative' }}>
                <View style={{
                    height: this.state.screenHeight / 1.90, width: "70%", justifyContent: "center", alignItems: "center", zIndex: 1, position: "absolute", right: 0, top: -10, borderWidth: 0.8, borderColor: "grey"
                }}>
                    <View style={{ width: "100%", flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                        <InfiniteScroll style={{ width: "100%" }}
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
                                (
                                    this.state.notificationData.length != 0
                                ) ? (
                                        this.state.notificationData.map((key, index) => {
                                            // console.log(key, index, "inmap")
                                            return (

                                                (key.type != "") ? (
                                                    <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }} key={index} >
                                                        <TouchableOpacity style={{ width: "80%", borderBottomColor: "grey", borderBottomWidth: 0.5, marginTop: 15, }}
                                                            // onPress={() => {
                                                            //     Linking.openURL(key.link);
                                                            // }}
                                                            onPress={() => this.gettingDetails(key.type, key.params, key.id_notification, key)}
                                                        >
                                                            < Text style={{ color: "black", fontWeight: "bold" }}>{key.title}</Text>
                                                            < Text style={{ color: "grey", fontWeight: "bold", marginTop: 5 }}>{key.message}</Text>
                                                            < Text style={{ color: "grey", fontWeight: "bold", marginTop: 5 }}>{key.created}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                ) : (
                                                        <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }} key={index} >
                                                            <View style={{ width: "80%", borderBottomColor: "grey", borderBottomWidth: 0.5, marginTop: 15, marginBottom: 15 }}
                                                            >
                                                                < Text style={{ color: "black", fontWeight: "bold" }}>{key.title}</Text>
                                                                < Text style={{ color: "grey", fontWeight: "bold", marginTop: 5 }}>{key.message}</Text>
                                                                < Text style={{ color: "grey", fontWeight: "bold", marginTop: 5 }}>{key.created}</Text>
                                                            </View>
                                                        </View>
                                                    )

                                            )
                                        })
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
                    </View>
                    {
                        loader ?
                            <View style={{ position: 'absolute' }}>
                                <ActivityIndicator size={'large'} />
                            </View>
                            :
                            null
                    }
                </View>

            </View >
        );
    }
}


let mapStateToProps = state => {
    return {
        str: state.root.str,
        userDetails: state.root.userDetails,
        userCredentials: state.root.userCredentials,

    };
};
function mapDispatchToProps(dispatch) {
    return ({
        // languageSet: (lang) => {
        //     dispatch(languageSet(lang))
        // },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);


const styles = StyleSheet.create({
    holder: {
        flex: 0.25,
        justifyContent: 'center',
    },
    contentContainer: {
        paddingBottom: 40,
        backgroundColor: "yellow",
        width: "100%"

    },
    container: {
        flex: 1,
    },
    containerForModal: {
        // flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // width:"100%"
    },
    textareaContainer: {
        height: "30%",
        width: "95%",
        padding: 5,
        // backgroundColor: '#F8F8F8',
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 100,
        fontSize: 14,
        // color: '#333',
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
        width: "100%", height: 40, marginTop: 15,
        borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    listTextOption: {
        marginLeft: 10, color: "#000", fontWeight: "bold", fontSize: 12
    },
    listTextOptionValue: {
        marginLeft: 10, color: "#6a6a6a", textAlign: "right",
    },
    input: { justifyContent: 'center', alignItems: 'center', width: '95%', },
});  
