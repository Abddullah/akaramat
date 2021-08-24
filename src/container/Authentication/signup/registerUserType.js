import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    ScrollView,
    ImageBackground,
    Image,
    Picker,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import {
    Container, Header, Content, Tab, Tabs, Button, Input,
    Item, View, CheckBox
} from 'native-base';
import {
    authWithFacebook,
    authWIthTwitter,
    authWithGoogle
} from "../../../services/API/SocialAPIs";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux'
import { setCountries, } from '../../../Store/Action/action';
import { DispatchAction } from '../../../Store/Action/auth';
import axios from 'axios';
import { signupassallerorbuyer } from "../../../services/API/signup"
import { Ionicons, Entypo } from '@expo/vector-icons';
import { TextField } from 'react-native-material-textfield';
import * as Animatable from 'react-native-animatable';
import VeryfyAcc from '../veryfy';
import { TWLoginButton } from "react-native-simple-twitter";
import twitter from "react-native-simple-twitter";
twitter.setConsumerKey(
    "FUrjhKzJ6DblTfEVQDOnSWOYr",
    "LGjIELoh7G5sShJE6VdIfmyK8T2VtCYiXNaV5zhektQVBPicDB"
);

class RegisterUserType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            googleBtn: {
                name: 'signupwithyourgoogle',
                onClick: 'googleSignUp',
                icon: 'Entypo',
                iconName: 'google-',
                backgroundColor: '#D73D32'
            },
            facebookBtn: {
                name: 'signupwithyourfacebook',
                onClick: 'facebookSignUp',
                icon: 'ionic',
                iconName: 'logo-facebook',
                backgroundColor: '#4D69A2'
            },
            twitterBtn: {
                name: 'signupwithyourtwitter',
                onClick: 'twitterSignUp',
                icon: 'ionic',
                iconName: 'logo-twitter',
                backgroundColor: '#0099F1'
            },
            type: 2,
            loader: false
        };

    }

    async onGetAccessToken(token) {
        this.setState({ loader: true })
        console.log(token, 'my token')
        // console.log(this, 'this')
        await this.twitterRegister(token).then(() => {

        })
    }

    twitterRegister = async (token) => {
        console.log('run1')
        try {
            const { type } = this.state
            const { oauth_token, oauth_token_secret } = token

            let obj = {
                lang: this.props.str.language,
                user_type: type,
                oauth_token,
                oauth_token_access: oauth_token_secret
            }


            const response = await authWIthTwitter(obj)
                .then((response) => {
                    console.log(response, ' twitter response')
                }).catch((err) => {
                    console.log(err, ' err response')
                })
        } catch (e) {
            console.log(e, ' twitter e')

            return { error: true };
        }
    }

    onSuccess(success) {
        this.setState({ loader: false })
        const { id_str } = success

        console.log(success, 'success here')

        var obj = {
            email: '',
            id_social: `${id_str}`,
            type_social: 'twitter'
        }
        this.props.DispatchAction(obj, 'USER_DATA');
        Actions.registerUser()

    }

    onError(error) {
        this.setState({ loader: false })

        console.log(error)
    }

    twitterButton() {
        const { loader } = this.state
        return (
            <Button
                style={{
                    width: "90%",
                    height: 45,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                    marginTop: 10,
                    borderWidth: 0.5,
                    alignSelf: 'center',
                    // borderColor: "white",
                    backgroundColor: "#0099F1"
                }}
            >
                <TWLoginButton
                    style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}
                    type="TouchableOpacity"
                    onPress={this.onPress}
                    onSuccess={(success) => this.onSuccess(success)}
                    onGetAccessToken={(token) => this.onGetAccessToken(token)}
                    onError={(err) => this.onError(err)}
                >
                    {
                        loader ?
                            <ActivityIndicator color={'white'} />
                            :
                            <>
                                <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
                                    <Ionicons
                                        name="logo-twitter"
                                        style={{ top: 0, fontSize: 20, color: "white" }}
                                    />
                                </View>
                                <View style={{ flex: 7, justifyContent: "center", }}>
                                    <Text style={{ left: 0, color: "white", fontSize: 13 }}>
                                        {this.props.str.signupwithyourtwitter}
                                    </Text>
                                </View>
                            </>
                    }
                </TWLoginButton>
            </Button>
        )
    }

    socialButton(items, index) {
        const { loader } = this.state
        return (
            <Button
                key={index}
                style={{
                    width: "90%",
                    height: 45,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                    marginTop: 10,
                    borderWidth: 0.5,
                    alignSelf: 'center',
                    backgroundColor: items.backgroundColor
                }}
                onPress={this[items.onClick]}
            >
                <View
                    style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}
                >
                    {
                        loader ?
                            <ActivityIndicator />
                            :
                            <>
                                <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
                                    {
                                        items.icon === 'ionic' ?
                                            <Ionicons
                                                name={items.iconName}
                                                style={{ top: 0, fontSize: 20, color: "white" }}
                                            />
                                            :
                                            <Entypo
                                                name={items.iconName}
                                                style={{ top: 0, fontSize: 20, color: "white" }}
                                            />
                                    }
                                </View>
                                <View style={{ flex: 7, justifyContent: "center", }}>

                                    <Text style={{ color: "white", fontSize: 13 }}>
                                        {this.props.str[items.name]}
                                    </Text>
                                </View>
                            </>
                    }

                </View>
            </Button>
        )
    }

    dropDownChange(value) {
        this.setState({
            type: value
        })
    }

    facebookSignUp = async () => {

        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
            "1966680640019758",
            // "333976297442383",
            {
                permissions: ["public_profile"]
            }
        );
        if (type === "success") {
            this.setState({ loader: true })

            console.log(token, 'token')
            // Get the user's name using Facebook's Graph API
            var bodyFormData = new FormData
            const type = this.state.type

            var cloneData = {
                user_type: type,
                token
            }

            for (var key in cloneData) {
                bodyFormData.append(key, cloneData[key])
            }

            const response = authWithFacebook({ lang: this.props.str.language, bodyFormData });
            response
                .then(async resp => {
                    this.setState({ loader: false })

                    if (resp.data && resp.data.status && resp.data.status === 2102) {
                        const response = await fetch(
                            `https://graph.facebook.com/me?access_token=${token}`
                        );
                        const result = await response.json();
                        // this.props.LoginUser(result);
                        if (result && result.id) {
                            var obj = {
                                email: '',
                                id_social: `${result.id}`,
                                type_social: 'facebook'
                            }
                            this.props.DispatchAction(obj, 'USER_DATA');
                            Actions.registerUser()
                        }
                        console.log(result, "result")
                    } else {
                        alert(resp.response.data.message)
                        // console.log(JSON.stringify(resp), 'resp')
                    }
                })
                .catch(err => {
                    this.setState({ loader: false })

                    console.log(err);
                });
        }
    }

    googleSignUp = async () => {
        this.setState({ loader: true })
        try {
            const result = await Expo.Google.logInAsync({
                androidStandaloneAppClientId:
                    "898164944740-6mrfj0l1e5i7b0qsu6h4diqv0mp4mm25.apps.googleusercontent.com",
                iosClientId:
                    "813965692962-6p4djqr35ja6m1r68437u22vnmrufhca.apps.googleusercontent.com",
                scopes: ["profile", "email"]
            });
            console.log(result, 'result')
            if (result.type === "success") {
                const token = result.idToken;
                const type = this.state.type
                console.log(type, 'typeof useer')
                const response = authWithGoogle({
                    lang: this.props.str.language,
                    user_type: type,
                    token: token
                }).then((response) => {
                    console.log(response, "type_format")
                    this.setState({ loader: false })
                    if (response.status === 2102) {
                        this.props.DispatchAction(response.results, 'USER_DATA');
                        Actions.registerUser()
                        // alert(response.message)
                    } else {
                        alert(response.message)
                    }
                })

                    .catch((err) => {
                        this.setState({ loader: false })
                        alert(JSON.stringify(err.response.data.message))
                        console.log(err, 'err')
                    })

            } else {
                this.setState({ loader: false })
                return { cancelled: true };
            }
        } catch (err) {
            console.log(err, 'error in catch')
            this.setState({ loader: false })
            return { error: true };
        }
    }

    render() {
        const { googleBtn, facebookBtn, twitterBtn } = this.state
        const { social } = this.props
        return (


            <ImageBackground source={require('../../../assets/Images/background.png')}
                style={{
                    // backgroundColor: '#fd902a',
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                <View
                    style={{ paddingVertical: '10%' }}
                >
                    <Image
                        style={{ width: 220, height: 200 }}
                        source={require("../../../assets/Images/logo.png")}
                        resizeMode="contain"
                    />
                </View>
                <View style={{ marginTop: 0, justifyContent: "center", alignItems: "center" }}>
                    <Text
                        style={{
                            color: "white",
                            fontSize: 15,
                            fontWeight: "bold"
                        }}>
                        {this.props.str.selectType}
                    </Text>
                </View>

                <View
                    style={{
                        marginTop: 15,
                        height: 70,
                        width: "90%",
                        borderWidth: 0.5,
                        borderColor: "white",
                        borderRadius: 5,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Item>
                        <Picker
                            mode="dropdown"
                            style={{ height: 50, width: "80%", color: "white" }}
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.type}
                            onValueChange={
                                (itemValue, itemIndex) => this.dropDownChange(itemValue, itemIndex)
                            }
                        >
                            <Picker.Item label={this.props.str.seller} value="2" />
                            <Picker.Item label={this.props.str.tasker} value="4" />

                        </Picker>
                    </Item>
                </View>

                {
                    social === 'google' ?
                        this.socialButton(googleBtn, 0)
                        :
                        social === 'facebook' ?
                            this.socialButton(facebookBtn, 0)
                            :
                            this.twitterButton()
                }

            </ImageBackground>



        );
    }
}


let mapStateToProps = state => {
    return {
        isLoader: state.root.isLoader,
        isError: state.root.isError,
        errorMessage: state.root.errorMessage,
        str: state.root.str


    };
};
function mapDispatchToProps(dispatch) {
    return ({
        setCountries: (data) => {
            dispatch(setCountries(data))
        },
        DispatchAction: (payload, type) => dispatch(DispatchAction(payload, type))
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterUserType);
const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 40,
    },


});