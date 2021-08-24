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
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux'
import { setCountries, } from '../../../Store/Action/action';
import axios from 'axios';
import { signupassallerorbuyer } from "../../../services/API/signup"
import { Ionicons } from '@expo/vector-icons';
import { TextField } from 'react-native-material-textfield';
import * as Animatable from 'react-native-animatable';
import VeryfyAcc from '../veryfy';



class SignupasSellerorbuyer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activateFlag: false,
            loaderFlagEmail: false,
            loaderFlagPhone: false,

            fullname: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: '',
            has_whatsapp: 0,
            has_viber: 0,
            type_register: "phone",
            countriesFromApi: {},
            selectedCountry: "EG",

            emailFlag: false,
            whatsappFlag: false,
            viberFlag: false,
            termsandconditionFlag: false,

        };


    }


    componentWillMount() {
        this.getCountries(this)
    }

    getCountries() {
        return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/country_code",
            // url: "https://demo.akaratmisr.com:443/ " + this.props.str.language + "/api/location/countries/all",
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                console.log(data.data.results, this.props.str.language, "countries")
                this.setState({
                    countriesFromApi: data.data.results
                })
                // this.props.setCountries(data.data.results)
            })
            .catch(err => {
                console.log(err)

            })
    }

    dropDownChange = (itemValue, itemIndex) => {
        this.setState({
            selectedCountry: itemValue,
        })
    }


    activeMyAccount(param, type_register) {
        if (this.props.str.language === "en") {
            var language = 1
        }
        else {
            var language = 2
        }
        cloneData = {
            language: language,
            password: this.state.password,
            repassword: this.state.confirmPassword,
            phone: this.state.phoneNumber,
            country_code: this.state.selectedCountry,
            fullname: this.state.fullname,
            has_whatsapp: this.state.has_whatsapp,
            has_viber: this.state.has_viber,
            type_register: type_register
        }
        if (this.state.email != "") {
            cloneData.useremail = this.state.email
        }
        // console.log(cloneData, "language")
        this.conditionCheck(cloneData)
    }


    conditionCheck(cloneData) {
        if (this.state.fullname === "") {
            alert(this.props.str.pleasetypefullname)
        }

        else if (this.state.password === "") {
            alert(this.props.str.pleasetypepassword)
        }

        else if (this.state.confirmPassword === "") {
            alert(this.props.str.pleasetypeconfirmpassword)
        }
        else if (this.state.password != this.state.confirmPassword) {
            alert(this.props.str.passworddoesnotmatched)
        }


        else {
            if (cloneData.type_register === "email") {
                this.setState({
                    loaderFlagEmail: !this.state.loaderFlagEmail
                })
            }
            if (cloneData.type_register === "phone") {
                this.setState({
                    loaderFlagPhone: !this.state.loaderFlagPhone
                })
            }

            var bodyFormData = new FormData();
            for (var key in cloneData) {
                if (cloneData[key] && cloneData[key] !== undefined) {
                    bodyFormData.append(key, cloneData[key]);
                }
            }
            var options = {
                method: 'POST',
                url: 'https://demo.akaratmisr.com:443/en/api/auth/registerSellerOrBuyer',
                headers:
                {
                    'postman-token': '553d07fc-3950-1199-efd9-6b5b5f8315a2',
                    'cache-control': 'no-cache',
                    clientsecret: '(*jh2kj36gjhasdi78743982u432j',
                    clientkey: '34532hbjdsakjd2&&gjhjh11',
                    'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                    "Allow-Cross-Origin": '*',
                },
                data: bodyFormData
            };
            console.log(bodyFormData, '****61', cloneData);
            axios(options)
                .then((data) => {
                    // console.log(data.data.message, 'DATAT')
                    if (cloneData.type_register === "email") {
                        this.setState({
                            loaderFlagEmail: !this.state.loaderFlagEmail
                        })
                        alert(JSON.stringify(data.data.message))
                        Actions.signIn()

                    }
                    if (cloneData.type_register === "phone") {
                        this.setState({
                            loaderFlagPhone: !this.state.loaderFlagPhone,
                            activateFlag: true
                        })
                        alert(JSON.stringify(data.data.message))
                        // Actions.VeryfyAcc({
                        //     phone: this.state.phoneNumber,
                        // })
                    }
                    // Actions.tabNavigation()
                }).catch((err) => {
                    alert(JSON.stringify(err.response.data.message))
                    // console.log(JSON.parse(JSON.stringify(err)), 'ERRROR')
                    if (cloneData.type_register === "email") {
                        this.setState({
                            loaderFlagEmail: !this.state.loaderFlagEmail
                        })
                    }
                    if (cloneData.type_register === "phone") {
                        this.setState({
                            loaderFlagPhone: !this.state.loaderFlagPhone
                        })
                    }
                })
        }
    }



    render() {
        console.log(this.state.type_register, "type_register")
        return (


            <ImageBackground source={require('../../../assets/Images/background.png')}
                style={{
                    // backgroundColor: '#fd902a',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                {
                    (this.state.activateFlag === true) ? (<VeryfyAcc phone={this.state.phoneNumber} countryCode={this.state.selectedCountry} />) : (
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
                                <Image style={{
                                    width: 220, height: 200,
                                }}
                                    source={require('../../../assets/Images/logo.png')}
                                    resizeMode="contain"
                                />

                                <View style={{ marginTop: 0, justifyContent: "center", alignItems: "center" }}>
                                    <Text
                                        style={{
                                            color: "white",
                                            fontSize: 15,
                                            fontWeight: "bold"
                                        }}>
                                        {this.props.str.signupassallerorbuyer}
                                    </Text>
                                </View>

                                {/* ////////////////////////////////Input Full Name///////////////////////////// */}
                                <View
                                    style={{
                                        marginTop: 15,
                                        height: 70,
                                        width: "100%",
                                        borderWidth: 0.5,
                                        borderColor: "white",
                                        borderRadius: 5,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <View style={{
                                        width: "80%", marginBottom: 20, flexDirection: "row"
                                    }}>
                                        <TextField
                                            // containerStyle={{ width: 150, textAlign: "right" }}

                                            // titleTextStyle={
                                            //     textAlign = "right"
                                            // }
                                            // labelTextStyle={
                                            //     textAlign = "right"
                                            // }
                                            // containerStyle={
                                            //     textAlign = "right"
                                            // }
                                            // affixTextStyle={
                                            //     textAlign = "right"
                                            // }
                                            textColor={"white"}
                                            tintColor={"rgb(63, 81, 181)"}
                                            baseColor={"white"}
                                            label={this.props.str.fullname}
                                            value={this.state.fullname}
                                            onChangeText={(e) => this.setState({ fullname: e })}
                                        />
                                    </View>
                                </View>
                                {/* ////////////////////////////////Input Email///////////////////////////// */}
                                <View
                                    style={{
                                        marginTop: 15,
                                        height: this.state.emailFlag === true ? 120 : 70,
                                        width: "100%",
                                        borderWidth: 0.5,
                                        borderColor: "white",
                                        borderRadius: 5,
                                        justifyContent: "center",
                                        // transition: width 
                                        // transition-delay: 1s;
                                    }}
                                >
                                    <View style={{
                                        flexDirection: this.props.str.language === "ar" ? "row-reverse" : "row", marginLeft: "4.5%", marginTop: this.state.emailFlag === true ? 18 : 0,
                                        // backgroundColor: "red"
                                    }} >
                                        <CheckBox checked={this.state.emailFlag} color="#6E4524"
                                            onPress={() => {
                                                this.setState({
                                                    emailFlag: !this.state.emailFlag,
                                                    email: ""
                                                })

                                                if (this.state.type_register === "phone") {
                                                    this.setState({
                                                        type_register: "email"
                                                    })
                                                }
                                                if (this.state.type_register === "email") {
                                                    this.setState({
                                                        type_register: "phone"
                                                    })
                                                }
                                            }}
                                        />
                                        <Text style={{ marginLeft: 25, marginRight: this.props.str.language === "ar" ? 25 : 0, color: "white" }}
                                            onPress={() => {
                                                this.setState({
                                                    emailFlag: !this.state.emailFlag,
                                                    email: ""
                                                })
                                            }}
                                        >{this.props.str.ihaveemailaddredd}</Text>
                                    </View>

                                    {
                                        (this.state.emailFlag === true) ? (
                                            <Animatable.View animation="slideInLeft" iterationCount={1}
                                                style={{
                                                    width: "80%", marginBottom: 10, marginHorizontal: "10%"
                                                }}>
                                                <TextField
                                                    textColor={"white"}
                                                    tintColor={"rgb(63, 81, 181)"}
                                                    baseColor={"white"}
                                                    label={this.props.str.email}
                                                    value={this.state.email}
                                                    onChangeText={(e) => this.setState({ email: e })}
                                                />
                                            </Animatable.View>

                                        ) : (null)
                                    }



                                </View>



                                {/* ////////////////////////////////Input Password///////////////////////////// */}
                                <View
                                    style={{
                                        marginTop: 15,
                                        height: 70,
                                        width: "100%",
                                        // flexDirection: "row",
                                        borderWidth: 0.5,
                                        borderColor: "white",
                                        borderRadius: 5,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <View style={{
                                        width: "80%", marginBottom: 20,
                                    }}>
                                        <TextField
                                            secureTextEntry
                                            textColor={"white"}
                                            tintColor={"rgb(63, 81, 181)"}
                                            baseColor={"white"}
                                            label={this.props.str.password}
                                            value={this.state.password}
                                            onChangeText={(e) => this.setState({ password: e })}
                                        />
                                    </View>
                                </View>


                                {/* ////////////////////////////////Input Confirm Password///////////////////////////// */}
                                <View
                                    style={{
                                        marginTop: 15,
                                        height: 70,
                                        width: "100%",
                                        // flexDirection: "row",
                                        borderWidth: 0.5,
                                        borderColor: "white",
                                        borderRadius: 5,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}

                                >
                                    <View style={{
                                        width: "80%", marginBottom: 20,
                                    }}>
                                        <TextField
                                            secureTextEntry
                                            textColor={"white"}
                                            tintColor={"rgb(63, 81, 181)"}
                                            baseColor={"white"}
                                            label={this.props.str.confirmPassword}
                                            value={this.state.confirmPassword}
                                            onChangeText={(e) => this.setState({ confirmPassword: e })}
                                        />
                                    </View>
                                </View>



                                {/* ////////////////////////////////Input Country///////////////////////////// */}
                                <View
                                    style={{
                                        marginTop: 15,
                                        height: 70,
                                        width: "100%",
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
                                            selectedValue={this.state.selectedCountry}
                                            onValueChange={
                                                (itemValue, itemIndex) => this.dropDownChange(itemValue, itemIndex)
                                            }
                                        >
                                            <Picker.Item label={this.props.str.selectcountry} value="" />
                                            {
                                                Object.keys(this.state.countriesFromApi).map((key, index) => {
                                                    return (
                                                        <Picker.Item label={this.state.countriesFromApi[key]} value={key} key={index} />
                                                    )
                                                })
                                            }
                                        </Picker>
                                    </Item>
                                </View>

                                {/* ////////////////////////////////Input Phone Number///////////////////////////// */}
                                <View
                                    style={{
                                        marginTop: 15,
                                        height: 70,
                                        width: "100%",
                                        borderWidth: 0.5,
                                        borderColor: "white",
                                        borderRadius: 5,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <View style={{
                                        width: "80%", marginBottom: 20,
                                    }}>
                                        <TextField
                                            keyboardType={'numeric'}
                                            textColor={"white"}
                                            tintColor={"rgb(63, 81, 181)"}
                                            baseColor={"white"}
                                            label={this.props.str.phoneNumber}
                                            value={this.state.phoneNumber}
                                            onChangeText={(e) => this.setState({ phoneNumber: e })}
                                        />
                                    </View>
                                </View>

                                {/* ////////////////////////////////This number has whatsapp///////////////////////////// */}

                                <View style={{
                                    marginLeft: 0, width: "100%", marginTop: 15,
                                }}>
                                    <View style={{
                                        flexDirection: this.props.str.language === "ar" ? "row-reverse" : "row",
                                    }} >
                                        <CheckBox checked={this.state.whatsappFlag} color="#6E4524"
                                            onPress={() => {
                                                this.setState({
                                                    whatsappFlag: !this.state.whatsappFlag,

                                                })

                                                if (this.state.has_whatsapp === 0) {
                                                    this.setState({
                                                        has_whatsapp: 1,

                                                    })
                                                }

                                                else {
                                                    this.setState({
                                                        has_whatsapp: 0,

                                                    })
                                                }

                                            }}
                                        />
                                        <View style={{ width: "90%", }}>
                                            <Text style={{ marginLeft: 25, marginRight: this.props.str.language === "ar" ? 25 : 0, color: "white", textAlign: this.props.str.language === "ar" ? "right" : "left" }}
                                                onPress={() => {
                                                    this.setState({
                                                        whatsappFlag: !this.state.whatsappFlag,
                                                    })
                                                    if (this.state.has_whatsapp === 0) {
                                                        this.setState({
                                                            has_whatsapp: 1,
                                                        })
                                                    }
                                                    else {
                                                        this.setState({
                                                            has_whatsapp: 0,
                                                        })
                                                    }
                                                }}
                                            >{this.props.str.thisnumberhaswhatsapp}</Text>
                                        </View>

                                    </View>
                                </View>

                                {/* ////////////////////////////////This number has Viber///////////////////////////// */}

                                <View style={{
                                    marginLeft: 0, width: "100%", marginTop: 15,
                                }}>
                                    <View style={{
                                        flexDirection: this.props.str.language === "ar" ? "row-reverse" : "row",
                                    }} >
                                        <CheckBox checked={this.state.viberFlag} color="#6E4524"
                                            onPress={() => {
                                                this.setState({
                                                    viberFlag: !this.state.viberFlag
                                                })
                                                if (this.state.has_viber === 0) {
                                                    this.setState({
                                                        has_viber: 1,
                                                    })
                                                }
                                                else {
                                                    this.setState({
                                                        has_viber: 0,
                                                    })
                                                }

                                            }}
                                        />
                                        <View style={{ width: "90%", }}>
                                            <Text style={{ marginLeft: 25, marginRight: this.props.str.language === "ar" ? 25 : 0, color: "white", textAlign: this.props.str.language === "ar" ? "right" : "left" }}
                                                onPress={() => {
                                                    this.setState({
                                                        viberFlag: !this.state.viberFlag
                                                    })
                                                    if (this.state.has_viber === 0) {
                                                        this.setState({
                                                            has_viber: 1,
                                                        })
                                                    }
                                                    else {
                                                        this.setState({
                                                            has_viber: 0,
                                                        })
                                                    }
                                                }}
                                            >{this.props.str.thisnumberhasviber}</Text>
                                        </View>

                                    </View>
                                </View>

                                {/* ////////////////////////////////I read terms and conditions ///////////////////////////// */}

                                <View style={{
                                    marginLeft: 0, width: "100%", marginTop: 15,
                                }}>
                                    <View style={{
                                        flexDirection: this.props.str.language === "ar" ? "row-reverse" : "row",
                                    }} >
                                        <CheckBox checked={this.state.termsandconditionFlag} color="#6E4524"
                                            onPress={() => {
                                                this.setState({
                                                    termsandconditionFlag: !this.state.termsandconditionFlag
                                                })
                                            }}
                                        />
                                        <View style={{ width: "90%", }}>
                                            <Text style={{ marginLeft: 25, marginRight: this.props.str.language === "ar" ? 25 : 0, color: "white", textAlign: this.props.str.language === "ar" ? "right" : "left" }}
                                                onPress={() => {
                                                    this.setState({
                                                        termsandconditionFlag: !this.state.termsandconditionFlag
                                                    })
                                                }}
                                            >{this.props.str.ireadtermsandconditions}</Text>
                                        </View>

                                    </View>
                                    {
                                        (this.state.termsandconditionFlag === false) ?
                                            (<Animatable.View animation="slideInLeft" iterationCount={1}
                                                style={{ width: "80%", marginHorizontal: "10%", marginTop: 10 }}>
                                                <Text style={{ color: "#C30000", fontSize: 12, textAlign: "center" }}>{this.props.str.youmustacceptthe}</Text>
                                            </Animatable.View>
                                            ) : null
                                    }
                                </View>


                                {
                                    (this.state.emailFlag === true) ? (
                                        (this.state.termsandconditionFlag === true) ? (
                                            (this.state.loaderFlagEmail === false) ? (
                                                <TouchableOpacity style={{ backgroundColor: "#6E4524", width: "100%", height: 25, justifyContent: "center", alignItems: "center", marginTop: 15, }}
                                                    onPress={() => { this.activeMyAccount(this, "email") }}>
                                                    <Text style={{ color: "white", fontSize: 12 }} >
                                                        {this.props.str.sendactivationcode}
                                                    </Text>
                                                </TouchableOpacity>) : <ActivityIndicator style={{ marginTop: 15 }} />

                                        ) : <TouchableOpacity disabled style={{ backgroundColor: "#755D4A", width: "100%", height: 25, justifyContent: "center", alignItems: "center", marginTop: 15, }}>
                                                <Text style={{ color: "white", fontSize: 12 }} >
                                                    {this.props.str.sendactivationcode}
                                                </Text>
                                            </TouchableOpacity>
                                    ) : null

                                }



                                {
                                    (this.state.termsandconditionFlag === true) ? (
                                        (this.state.loaderFlagPhone === false) ? (
                                            <TouchableOpacity style={{ backgroundColor: "#6E4524", width: "100%", height: 25, justifyContent: "center", alignItems: "center", marginTop: 15, }}
                                                onPress={() => { this.activeMyAccount(this, "phone") }}>
                                                <Text style={{ color: "white", fontSize: 12 }} >
                                                    {this.props.str.activatemyaccountby}
                                                </Text>
                                            </TouchableOpacity>) : <ActivityIndicator style={{ marginTop: 15 }} />

                                    ) : <TouchableOpacity disabled style={{ backgroundColor: "#755D4A", width: "100%", height: 25, justifyContent: "center", alignItems: "center", marginTop: 15, }}>
                                            <Text style={{ color: "white", fontSize: 12 }} >
                                                {this.props.str.activatemyaccountby}
                                            </Text>
                                        </TouchableOpacity>
                                }

                                <TouchableOpacity onPress={() => { Actions.TermsAndCondition() }}>
                                    <Text style={{ marginTop: 15, color: "white", fontWeight: "bold" }}>@–read terms of use</Text>
                                </TouchableOpacity>
                                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                                    <Text
                                        onPress={() =>
                                            Actions.signUp()
                                        }
                                        style={{ color: "white", fontSize: 12, textAlign: "center" }}>{this.props.str.back}</Text>
                                </View>

                            </View>
                        </ScrollView>
                    )
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
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(SignupasSellerorbuyer);
const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 40,
    },


});