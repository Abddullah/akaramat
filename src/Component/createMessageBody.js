import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, StatusBar, RefreshControl,
    Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Badge, Picker, Item, Input } from 'native-base';
import { connect } from "react-redux";
import axios from 'axios';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Textarea from 'react-native-textarea';

// import Drawer from '../../Component/drawer';
import InfiniteScroll from 'react-native-infinite-scroll';
class CreateMessageBody extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedValue: "Actions",
            moreloader: false,
            isloader: false,
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
            console.log(this.state.token, this.props.userCredentials.token, "token")
        })
        // this._onRefreshTasker()
    }

    sendMail() {
        if (this.state.emailSubject != undefined && (this.state.email != undefined || this.props.sender_email_for_Inbox != undefined) && this.state.msg != undefined) {
            this.setState({ isloader: true });

            var bodyFormData = new FormData();
            //  bodyFormData.append("unique_id", this.props.addId);
            //  bodyFormData.append("sender_name", this.props.userDetails.user_name);
            if (this.props.sender_email_for_Inbox) {
                bodyFormData.append("to", this.props.sender_email_for_Inbox);
            }
            else {
                bodyFormData.append("to", this.state.email);
            }
            bodyFormData.append("subject", this.state.emailSubject);
            bodyFormData.append("message", this.state.msg);
            var options = {
                method: 'POST',
                url: 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/mailbox/user/sendMultiMessage',
                headers:
                {
                    "token": `bearer ${this.props.userCredentials.token}`,
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
                    console.log(data, "data")
                    // console.log(data.data.message, 'DATAT')
                    // alert(data.data.message)
                    alert(this.props.str.emailSend)
                    this.setState({
                        isloader:false
                    })
                    //    this.setState({ sendingLoader: !this.state.sendingLoader });
                }).catch((err, ) => {
                    this.setState({
                        isloader:false
                    })
                    alert(this.props.str.emailSend)
                    console.log(err, "err")
                    // alert(JSON.stringify(err.respon`se.data.message))
                    //    this.setState({ sendingLoader: !this.state.sendingLoader });
                })
            //  this.setState({ isModalVisible: false });
        }
        else {
            alert(this.props.str.pleasetypesubjectandmsg)
        }
    }
    render() {
        return (
            <View style={{
                flex: 1, width: "100%",
                padding:"5%"
            }}>
                {/* //////////////////////////////////////Properties i added////////////////////////////////////// */}
                {
                    // (this.state.iAddedProperties) ? (
                    <InfiniteScroll
                        horizontal={false}  //true - if you want in horizontal
                        // onLoadMoreAsync={this._onEndReached.bind(this, "_onEndReached")}
                        distanceFromEnd={12} // distance in density-independent pixels from the right end
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.activity}
                            // onRefresh={this._onRefreshTasker.bind(this, "_onRefreshTasker")} 
                            />
                        }
                    >
                        <View style={{ padding: 5 }}>

                            {/* Email  */}
                            {(this.props.sender_email_for_Inbox) ? (null) :
                                (
                                    <View style={{ marginTop: 0 }}>
                                        <Item style={styles.input}>
                                            <Input
                                                // keyboardType={"number"}
                                                placeholder={this.props.str.email}
                                                placeholderStyle={{ fontSize: 10 }}
                                                placeholderTextColor="#b3b3b3"
                                                label={this.props.str.email}
                                                style={{ fontSize: 15 }}
                                                onChangeText={(e) => { this.setState({ email: e }) }}
                                                value={this.state.email}
                                            />
                                            <MaterialIcons name='person-outline' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                        </Item>
                                    </View>
                                )}

                            {/* Email Subject */}
                            <View style={{ marginTop: 0 }}>
                                <Item style={styles.input}>
                                    <Input
                                        // keyboardType={"number"}
                                        placeholder={this.props.str.emailSubject}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        label={this.props.str.emailSubject}
                                        style={{ fontSize: 15 }}
                                        onChangeText={(e) => { this.setState({ emailSubject: e }) }}
                                        value={this.state.emailSubject}
                                    />
                                    <IconMaterialCommunityIcons name='text-subject' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                </Item>
                            </View>
                            {/* Message */}
                            <View style={{ padding: "5%", marginTop: 10, width: "95%", borderBottomColor: "#F4F2F4", borderBottomWidth: 0.5 }}>
                                <Text style={{ color: "black", marginBottom: 20 }}>{this.props.str.message}</Text>
                                <Textarea
                                    containerStyle={styles.textareaContainer}
                                    style={styles.textarea}
                                    onChangeText={(e) => { this.setState({ msg: e }) }}
                                    defaultValue={this.state.msg}
                                    // maxLength={500}
                                    placeholder={this.props.str.pleasetypeyourmsg}
                                    placeholderTextColor={'#c7c7c7'}
                                    underlineColorAndroid={'transparent'}
                                />
                            </View>
                            {this.state.isloader === false ?
                                <TouchableOpacity style={{

                                    backgroundColor: "#E94E1B", height: this.state.screenHeight / 20,
                                    justifyContent: "center", alignItems: "center"
                                }}
                                    onPress={() => this.sendMail()}>
                                    <Text style={{ fontSize: 13, color: "white" }}>{this.props.str.sendmsg}</Text>
                                </TouchableOpacity>
                                :
                                <ActivityIndicator style={{ top: 20, marginBottom: 20, }} />

                            }

                        </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateMessageBody);
const styles = StyleSheet.create({
});

