import React, { Component } from "react";
import { connect } from "react-redux";
import { signinAction } from '../../Store/Action/action'
import { Actions } from 'react-native-router-flux'
import { Icon } from 'native-base';
import firebase from 'firebase'
// import Loading from '../Component/Loader';
import ErrorMessage from '../../Component/errorMessage';




import {
    StyleSheet,
    Text,
    ScrollView,
    ImageBackground,
    Image,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import axios from 'axios';


import {
    Container, Header, Content, Tab, Tabs, Button, Input,
    Item, View,
} from 'native-base';
// import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import IconOcticons from 'react-native-vector-icons/Octicons';
// import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
// import IconEntypo from 'react-native-vector-icons/Entypo';
// import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';


class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            loginLoader: true
        };


    }

    forgotPassword() {

        if (this.state.email === "") {
            alert(this.props.str.pleasetypeyouremailaddress);
        }
        else {
            this.setState({
                loginLoader: !this.state.loginLoader
            })
            let urlm = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/auth/recoverPassword";
            var bodyFormData = new FormData();
            bodyFormData.append("email_or_phone", this.state.email);
            console.log(bodyFormData, this.state.email, "email")

            return axios({
                method: "post",
                url: urlm,
                headers: {
                    clientkey: "34532hbjdsakjd2&&gjhjh11",
                    clientsecret: "(*jh2kj36gjhasdi78743982u432j"
                },
                data: bodyFormData
            })
                .then(data => {
                    console.log(data.data.status, "statusstatus");

                    if (JSON.stringify(data.data.status) == 2100) {
                        alert(JSON.stringify(data.data.message))
                    }
                    // Actions.tabbar({ type: "reset" });
                    // Actions.signIn();

                    if (this.state.email.match("^[a-zA-Z0-9]*$")) {
                        Actions.VeryfyAcc({
                            phone: this.state.email,
                            route: "forget"
                        })
                    }
                    else {
                        Actions.signIn()
                    }

                    // if (typeof (this.state.email) === Number) {
                    //     Actions.VeryfyAcc({
                    //         phone: this.state.email,
                    //         route: "forget"
                    //     })
                    // }
                    // else {
                    //     Actions.signIn()
                    // }


                    this.setState({
                        loginLoader: !this.state.loginLoader
                    })
                })
                .catch(err => {
                    // console.log(err)
                    var errUpdate = JSON.stringify(err);
                    console.log(JSON.parse(errUpdate));
                    // alert(JSON.stringify(errUpdate.response.data.message))
                    alert(JSON.stringify(err.response.data.message))

                    // alert(errUpdate.data.message);
                    this.setState({
                        loginLoader: !this.state.loginLoader
                    })
                });
        }
    }


    render() {
        return (
            <ImageBackground source={require("../../assets/Images/background.png")}

                style={{
                    // backgroundColor: '#fd902a',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <ScrollView
                    style={{
                        width: "100%",
                        // backgroundColor: "red",
                    }}
                    contentContainerStyle={styles.contentContainer}
                >


                    <View

                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: "80%",
                            marginHorizontal: "10%",
                            // backgroundColor: "yellow",
                        }}
                    >
                        <Image style={{ width: 220, height: 200 }}
                            source={require('../../assets/Images/logo.png')}
                            resizeMode="contain"
                        />


                        <View style={{ marginTop: 40, justifyContent: "center", alignItems: "center" }}>
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 15,
                                    fontWeight: "bold"
                                }}>
                                {this.props.str.forgetpassword}
                            </Text>
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 12,
                                    marginTop: 10
                                }}>

                                {this.props.str.enteryouremail}

                            </Text>
                        </View>

                        <View
                            style={{
                                height: 50, width: "100%", flexDirection: "row", borderWidth: 0.5, borderColor: "white", borderRadius: 5, marginTop: 15
                            }}
                        >
                            <Input
                                placeholder={this.props.str.addyouremailaddress}
                                placeholderStyle={{ fontSize: 10 }}
                                placeholderTextColor="white"
                                keyboardType={'email-address'}
                                style={{ marginLeft: 15, fontSize: 15, color: "white" }}
                                onChangeText={(e) => { this.setState({ email: e }) }}
                                value={this.state.email}
                            />
                            <MaterialCommunityIcons name='email-check-outline' style={{ marginRight: 20, top: 13, fontSize: 22, color: "white" }} />

                            {/* <Ionicons name='arrow-right-bold-outline' style={{ top: 0, fontSize: 25, color: "#7B6859" }} /> */}
                        </View>


                        {
                            (this.state.loginLoader === false) ?
                                (
                                    <ActivityIndicator style={{ top: 20, marginBottom: 20 }} />
                                ) :
                                (
                                    <Button
                                        full
                                        style={{ height: 55, justifyContent: "center", alignItems: "center", borderRadius: 5, marginTop: 20, borderWidth: 0.5, borderColor: "white", backgroundColor: "#ffff" }}
                                        onPress={() => this.forgotPassword(this)}
                                    >
                                        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", width: "40%" }}>
                                            <MaterialCommunityIcons name='arrow-right-bold-outline' style={{ top: 0, fontSize: 25, color: "#7B6859" }} />
                                            <Text style={{ color: "#7B6859", fontWeight: "bold", marginRight: "10%", fontSize: 20 }}>{this.props.str.submit}</Text>
                                        </View>

                                    </Button>
                                )
                        }

                        <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                            <Text

                                style={{ color: "white", fontSize: 12, textAlign: "center" }}>{this.props.str.aftersubmitpleasecheck}</Text>
                        </View>
                        <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                            <Text
                                onPress={() =>
                                    Actions.signIn()
                                }
                                style={{ color: "white", fontSize: 12, textAlign: "center" }}>{this.props.str.backtosignin}</Text>
                        </View>
                    </View>




                </ScrollView>
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
        getUserSignIn: (data) => {
            dispatch(signinAction(data))
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 40,
    },


});