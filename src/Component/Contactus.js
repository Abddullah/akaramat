import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Button, TextInput, ScrollView, ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Content, Card, CardItem, Thumbnail, Icon, Badge } from 'native-base';
import { connect } from "react-redux";
import axios from 'axios';
import InfiniteScroll from 'react-native-infinite-scroll';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    CheckBox, Input, Item
} from 'native-base';
import * as Animatable from 'react-native-animatable';
import { TextField } from 'react-native-material-textfield';
import Textarea from 'react-native-textarea';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontIcons from 'react-native-vector-icons/FontAwesome';

class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textInput: [
                {
                    name: 'name',
                    value: 'name',
                    type: 'default',
                    icon: 'account-outline'
                },
                {
                    name: 'email',
                    value: 'email',
                    type: 'email-address',
                    icon: 'email'
                },
                {
                    name: 'phoneNumber',
                    value: 'phoneNumber',
                    type: 'number-pad',
                    icon: 'phone'
                },
            ],
        }
    }

    ApiRequest = async (url, bodyFormData, image) => {

        var header1 = {
            token: "bearer " + this.props.userCredentials.token,
            clientsecret: '(*jh2kj36gjhasdi78743982u432j',
            clientkey: '34532hbjdsakjd2&&gjhjh11',
            "Content-Type": "application/json",
        }
        var header2 = {
            token: "bearer " + this.props.userCredentials.token,
            clientsecret: '(*jh2kj36gjhasdi78743982u432j',
            clientkey: '34532hbjdsakjd2&&gjhjh11',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        }

        var options = {
            method: 'POST',
            url: url,
            headers: image ? header2 : header1,
            data: bodyFormData
        };
        return await axios(options)
            .then((data) => {
                return data
            }).catch((err) => {
                return err
            })

    }

    textFields(items, index) {
        return (
            <View
                key={index}
                style={{
                    height: 60,
                    width: "100%",
                    borderWidth: 0.5,
                    borderColor: "white",
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",
                }}

            >
                <View style={{
                    width: "90%", marginBottom: 20,
                }}>
                    <Item style={styles.input}>
                        <View style={{ width: '90%' }}>
                            <TextInput
                                keyboardType={items.type}
                                placeholder={this.props.str[items.name]}
                                placeholderTextColor={'#b3b3b3'}
                                style={{
                                    borderBottomWidth: 0.4,
                                    paddingHorizontal: 5,
                                    fontSize: 16,
                                    paddingVertical: 5,
                                }}
                                onChangeText={(e) => this.setState({ [items.value]: e })}
                            />
                        </View>
                        <View style={{ paddingHorizontal: '2%' }}>
                            {
                                items.font === 'fontawesome' ?
                                    <FontIcons name={items.icon} size={15} />
                                    :
                                    <Icons name={items.icon} size={15} />
                            }
                        </View>
                    </Item>
                </View>
            </View>
        )
    }

    sendMsg() {
        const { name, email, phoneNumber, message } = this.state

        if (name && email && phoneNumber && message) {
            this.setState({ loader: true })
            var urlm = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/people/guest/contactUs'

            let cloneData = {
                sender_name: name,
                sender_email: email,
                phone: phoneNumber,
                msg: message
            }

            var bodyFormData = new FormData();

            for (var key in cloneData) {
                bodyFormData.append(key, cloneData[key]);
            }

            this.ApiRequest(urlm, bodyFormData).then((data) => {
                if (data && data.data && data.data.message && data.data.status == 1000) {
                    alert(data.data.message)
                    this.setState({
                        name: '',
                        email: '',
                        phoneNumber: '',
                        message: ''
                    })
                } else {
                    alert(JSON.stringify(data.response.data.message))
                }

                this.setState({ loader: false })
            }).catch((err) => {
                console.log(err, 'err')
                this.setState({ loader: false })
                alert(err.response.data.message)
            })

        } else {
            if (this.props.str.language == 'en') {
                alert('All fields are required')
            } else {
                alert(this.props.str.allfieldsarerequired)
            }
        }
    }

    render() {
        const { textInput, loader } = this.state
        return (
            <View style={{
                flex: 1,
                backgroundColor: "white",
                width: "100%",
                position: 'relative'
            }}>
                <View style={{
                    flex: 1.4,
                    backgroundColor: '#E94E1B',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: "row",
                    width: "100%"
                }}>
                    <View style={{ width: "90%", flexDirection: "row", marginTop: "7%" }}>
                        <TouchableOpacity style={{ marginRight: 20 }} onPress={() => { Actions.pop() }}>
                            <Ionicons name='md-arrow-back' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                        </TouchableOpacity>
                        <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.contact}</Text>
                    </View>
                </View>
                <View style={{ flex: 8, paddingHorizontal: '5%' }}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                        paddingVertical: '5%'
                    }}>
                        {
                            textInput &&
                            textInput.map((items, index) => {
                                return (
                                    this.textFields(items, index)
                                )
                            })
                        }
                        <View style={{ padding: "5%", width: '90%', alignSelf: 'center', backgroundColor: "#F8F8F8" }}>
                            <Text style={{ color: "black", fontWeight: 'bold', marginBottom: 10 }}>{this.props.str.message}</Text>
                            <Textarea
                                containerStyle={styles.textareaContainer}
                                style={styles.textarea}
                                onChangeText={(e) => { this.setState({ message: e }) }}
                                defaultValue={this.state.message}
                                maxLength={500}
                                placeholder={this.props.str.helpYou}
                                placeholderTextColor={'#c7c7c7'}
                                underlineColorAndroid={'transparent'}
                            />
                        </View>
                        <View
                            style={{ paddingVertical: 30, alignItems: 'center' }}
                        >
                            <View style={{ width: '90%' }}>
                                {
                                    loader ?
                                        <ActivityIndicator />
                                        :
                                        <Button
                                            onPress={() => this.sendMsg()}
                                            color={'#E94E1B'}
                                            title={this.props.str.sendmsg}
                                        />
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
const styles = StyleSheet.create({
    input: { justifyContent: 'center', alignItems: 'center', width: '94%', },
    switchView: {
        flexDirection: 'row', justifyContent: 'space-between',
        height: 50, alignItems: 'center'
    }

});  
