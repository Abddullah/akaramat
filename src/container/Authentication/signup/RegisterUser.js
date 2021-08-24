import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    ScrollView,
    ImageBackground,
    Image,
    Picker,
    KeyboardAvoidingView,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import {
    Container, Header, Content, Tab, Tabs, Button, Input,
    Item, View, CheckBox
} from 'native-base';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux'
import { setCountries, } from '../../../Store/Action/action';
import axios from 'axios';
import { signupassallerorbuyer } from "../../../services/API/signup"
import { Ionicons } from '@expo/vector-icons';
import { TextField } from 'react-native-material-textfield';
import * as Animatable from 'react-native-animatable';
import VeryfyAcc from '../veryfy';




class RegisterUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textData: [
                {
                    name: 'email',
                    value: 'email',
                    disable: false,
                },
                {
                    name: 'socialId',
                    value: 'socialId',
                    disable: true,
                },
                {
                    name: 'password',
                    value: 'password',
                    disable: false,
                    hidden: true
                },
                {
                    name: 'confirmPassword',
                    value: 'confirmPassword',
                    disable: false,
                    hidden: true
                }
            ]
        };


    }

    ApiRequest = async (url, bodyFormData) => {

        var header1 = {
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
                return data
            }).catch((err) => {
                return err
            })

    }

    textFields(item, index) {
        return (
            <View
                key={index}
                style={{
                    marginTop: 15,
                    height: 70,
                    width: "80%",
                    borderWidth: 0.5,
                    borderColor: "white",
                    borderRadius: 5,
                    paddingHorizontal: '5%',
                    justifyContent: "center",
                }}
            >
                <TextField
                    textColor={"white"}
                    tintColor={"rgb(63, 81, 181)"}
                    baseColor={"white"}
                    secureTextEntry={item.hidden}
                    disabled={index === 0 ? this.props.userData[item.value] ? item.disable : false : item.disable}
                    label={this.props.str[item.name]}
                    value={this.state[item.value]}
                    onChangeText={(e) => this.setState({ [item.value]: e })}
                />
            </View>
        )
    }

    componentDidMount() {
        const { userData } = this.props

        if (userData) {
            this.setState({
                email: userData.email,
                socialId: userData.id_social,
                type: userData.type_social
            })
        }
    }

    componentWillReceiveProps(props) {
        const { userData } = props

        if (userData) {
            this.setState({
                email: userData.email,
                socialId: userData.id_social,
                type: userData.type_social
            })
        }
    }

    Register() {
        const { type, email, socialId, password, confirmPassword } = this.state

        if (email && type && socialId && password && confirmPassword) {
            if (password === confirmPassword) {
                this.setState({ loader: true })
                let url = `https://demo.akaratmisr.com:443/${this.props.str.language}/api/auth/confirmEmailRegisterSocial`

                var cloneData = {
                    user_email: email,
                    social_id: socialId,
                    social_type: type,
                    password,
                    repassword: confirmPassword
                }

                console.log(cloneData, 'data here')

                var bodyFormData = new FormData();
                for (var key in cloneData) {
                    if (cloneData[key] && cloneData[key].length !== 0) {
                        bodyFormData.append(key, cloneData[key]);
                    }
                }

                this.ApiRequest(url, bodyFormData).then((response) => {
                    console.log(response, 'reposnsae here')
                    this.setState({ loader: false })
                    if (response.data && response.data.status && response.data.status === 2102) {
                        // Actions.tabbar({ type: 'reset' })
                        alert(response.data.message)
                        Actions.signIn()

                    } else {
                        alert(JSON.stringify(response.response.data.message))
                    }
                }).catch((err) => {
                    this.setState({ loader: false })
                    alert(JSON.stringify(err.response.data.message))
                    console.log(err, 'err')
                })

            } else {
                alert(this.props.str.passworddoesnotmatched)
            }

        } else {
            alert(this.props.str.allfieldsarerequired)
        }

    }

    render() {
        const { textData, loader } = this.state
        return (


            <ImageBackground source={require('../../../assets/Images/background.png')}
                style={{
                    // backgroundColor: '#fd902a',
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                <KeyboardAvoidingView style={{ width: '100%' }} behavior={'padding'}>
                    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: '5%' }} style={{ width: '100%' }}>
                        <View
                            style={{ paddingVertical: '5%' }}
                        >
                            <Image
                                style={{ width: 220, height: 170 }}
                                source={require("../../../assets/Images/logo.png")}
                                resizeMode="contain"
                            />
                        </View>

                        <View style={{ marginTop: 0, paddingBottom: '4%', justifyContent: "center", alignItems: "center" }}>
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 15,
                                    fontWeight: "bold"
                                }}>
                                {this.props.str.reg}
                            </Text>
                        </View>



                        {
                            textData &&
                            textData.map((items, index) => {
                                return (
                                    this.textFields(items, index)
                                )
                            })
                        }


                        <Button
                            style={{
                                height: 55,
                                width: '80%',
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 5,
                                marginTop: 20,
                                alignSelf: 'center',
                                borderWidth: 0.5,
                                borderColor: "white",
                                backgroundColor: "#ffff"
                            }}
                            onPress={() => this.Register()}
                        >
                            {
                                loader ?
                                    <ActivityIndicator />
                                    :
                                    <Text style={{ color: "#7B6859", fontWeight: "bold" }}>
                                        {this.props.str.Register}
                                    </Text>
                            }
                        </Button>



                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>



        );
    }
}


let mapStateToProps = state => {
    return {
        str: state.root.str,
        userData: state.auth.userData
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        setCountries: (data) => {
            dispatch(setCountries(data))
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);
const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 40,
    },


});