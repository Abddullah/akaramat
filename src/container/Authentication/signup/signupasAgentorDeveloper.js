import React, { Component } from "react";
import { connect } from "react-redux";
// import { signinAction } from '../../Store/Action/action'
import { Actions } from 'react-native-router-flux'
import { signupasAgentorDeveloper } from "../../../services/API/signup"
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
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
import { TextField } from 'react-native-material-textfield';
import VeryfyAcc from '../veryfy';


class SignupasAgentorDeveloper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activateFlag: false,
            loaderFlagEmail: false,
            loaderFlagPhone: false,

            emailFlag: false,
            companyFlag: false,
            typeFlag: false,
            uploadDocuments: true,
            termsandconditionFlag: false,
            ideclareallinformationisright: false,


            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: '',
            fullname: "",
            companyName: "",
            address: "",
            has_whatsapp: 0,
            has_viber: 0,
            fax: "",
            description: "",
            selectedState: "",


            type_register: "phone",
            countriesFromApi: {},
            selectedCountry: "EG",
            stateFromApi: [],
            allCityFromApi: [],
            selectedCity: "",
            districts: [],
            subdistricts: [],
            // images: ['1'],



        };


    }

    onSelectedItemsChange = selectedTypes => {
        this.setState({ selectedTypes });
    };
    onSelectedItemsChangeicanwork = selectedicanWorkIn => {
        this.setState({ selectedicanWorkIn });
    };

    dropDownChange = (itemValue, itemIndex) => {
        this.setState({
            selectedCountry: itemValue,
        })
    }




    dropDownChangeState = (itemValue, itemIndex) => {
        if (itemIndex && itemValue) {
            this.setState({
                selectedState: itemValue,
                districts: [],
                subdistricts: [],
                selectedicanWorkState: [],
                selectedicanWorkCity: [],
                selectedicanWorkDistricts: []

            })
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/cities/" + itemValue
            return axios({
                method: 'get',
                url: uri,
                headers: {
                    "clientkey": "34532hbjdsakjd2&&gjhjh11",
                    "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                },
            })
                .then(data => {
                    let city = data.data.results
                    this.setState({
                        allCityFromApi: city
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    dropDownChangeCity = (itemValue, itemIndex) => {
        console.log(itemValue, itemIndex, "valueCities")
        if (itemIndex && itemValue) {
            this.setState({
                selectedCity: itemValue,
                subdistricts: []
            })
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/districts/" + itemValue
            return axios({
                method: 'get',
                url: uri,
                headers: {
                    "clientkey": "34532hbjdsakjd2&&gjhjh11",
                    "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                },
            })
                .then(data => {
                    let districts = data.data.results
                    this.setState({
                        districts: districts
                    })
                    console.log(districts, "districk")

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    dropDownChangeDistricts = (itemValue, itemIndex) => {
        console.log(itemValue, itemIndex, "valueDist")
        if (itemIndex && itemValue) {
            this.setState({
                selectedDistricts: itemValue,
            })
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/subdistricts/" + itemValue
            return axios({
                method: 'get',
                url: uri,
                headers: {
                    "clientkey": "34532hbjdsakjd2&&gjhjh11",
                    "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                },
            })
                .then(data => {
                    let subdistricts = data.data.results
                    this.setState({
                        subdistricts: subdistricts
                    })
                    console.log(subdistricts, "subdistrick")

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }






    componentWillMount() {
        this.getState(this)
        this.getCountries(this)
    }




    getState() {
        return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/states/1",
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                let state = data.data.results
                this.setState({
                    stateFromApi: state
                })
            })
            .catch(err => {
                console.log(err)
            })
    }



    getCountries() {
        return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/country_code",
            // url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/countries/all",
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                // console.log(data.data.results)
                this.setState({
                    countriesFromApi: data.data.results
                })
                // this.props.setCountries(data.data.results)
            })
            .catch(err => {
                console.log(err)

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
            // useremail: this.state.email,  ////if available///
            password: this.state.password,
            repassword: this.state.confirmPassword,
            phone: this.state.phoneNumber,
            country_code: this.state.selectedCountry,
            fullname: this.state.fullname,
            company_name: this.state.companyName,
            address: this.state.address,
            state: this.state.selectedState,
            // city: this.state.selectedCity, ////if available///
            has_whatsapp: this.state.has_whatsapp,
            has_viber: this.state.has_viber,
            fax: this.state.fax,
            about_me: this.state.description,
            type_register: type_register
        }

        if (this.state.email != "") {
            cloneData.useremail = this.state.email
        }
        if (this.state.selectedCity != "") {
            cloneData.city = this.state.selectedCity
        }
        if (this.state.selectedDistricts != undefined) {
            cloneData.location_district = this.state.selectedDistricts
        }
        if (this.state.selectedSubDistricts != undefined) {
            cloneData.location_subdistrict = this.state.selectedSubDistricts
        }

        // console.log(cloneData)
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



        else if (this.state.selectedState === "") {
            alert(this.props.str.pleaseselectstate)
        }
        else if (this.state.selectedCity === "") {
            alert(this.props.str.pleaseselectcity)
        }


        else {
            // signupasAgentorDeveloper(cloneData)
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
                if (cloneData[key] && cloneData[key] !== undefined && cloneData[key].length !== 0) {
                    if (Array.isArray(cloneData[key])) {
                        // console.log("array", cloneData[key], key)
                        var arr = cloneData[key];
                        for (var i = 0; i < arr.length; i++) {
                            // console.log(arr[i], "inloop")
                            bodyFormData.append(key + "[]", arr[i]);
                        }
                    }
                    else {
                        bodyFormData.append(key, cloneData[key]);
                    }
                }
            }
            console.log(bodyFormData, "**********61")

            var options = {
                method: 'POST',
                url: 'https://demo.akaratmisr.com:443/en/api/auth/registerAgent',
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
                                        {this.props.str.signupasagentordeveloper}

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
                                        width: "80%", marginBottom: 20,
                                    }}>
                                        <TextField
                                            textColor={"white"}
                                            tintColor={"rgb(63, 81, 181)"}
                                            baseColor={"white"}
                                            label={this.props.str.fullname}
                                            value={this.state.fullname}
                                            onChangeText={(e) => this.setState({ fullname: e })}
                                        />
                                    </View>
                                </View>

                                {/* ////////////////////////////////Input Company///////////////////////////// */}
                                <View
                                    style={{
                                        marginTop: 15,
                                        height: this.state.companyFlag === true ? 120 : 70,
                                        width: "100%",
                                        borderWidth: 0.5,
                                        borderColor: "white",
                                        borderRadius: 5,
                                        justifyContent: "center",
                                    }}
                                >
                                    <View style={{
                                        flexDirection: this.props.str.language === "ar" ? "row-reverse" : "row", marginLeft: "4.5%", marginTop: this.state.companyFlag === true ? 18 : 0,
                                        // backgroundColor: "red"
                                    }} >
                                        <CheckBox checked={this.state.companyFlag} color="#6E4524"
                                            onPress={() => {
                                                this.setState({
                                                    companyFlag: !this.state.companyFlag,
                                                    companyName: "",
                                                })


                                            }}
                                        />
                                        <Text style={{ marginLeft: 25, color: "white", marginRight: this.props.str.language === "ar" ? 25 : 0, }}
                                            onPress={() => {
                                                this.setState({
                                                    companyFlag: !this.state.companyFlag,
                                                    companyName: "",
                                                })
                                            }}
                                        >
                                            {this.props.str.thisisacompanyaccount}


                                        </Text>
                                    </View>
                                    {
                                        (this.state.companyFlag === true) ? (
                                            <Animatable.View animation="slideInLeft" iterationCount={1}
                                                style={{
                                                    width: "80%", marginBottom: 10, marginHorizontal: "10%"
                                                }}>
                                                <TextField
                                                    textColor={"white"}
                                                    tintColor={"rgb(63, 81, 181)"}
                                                    baseColor={"white"}
                                                    label={this.props.str.companyname}
                                                    value={this.state.companyName}
                                                    onChangeText={(e) => this.setState({ companyName: e })}
                                                />
                                            </Animatable.View>
                                        ) : (null)
                                    }
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
                                                else {
                                                    this.setState({
                                                        type_register: "phone"
                                                    })
                                                }
                                            }}
                                        />
                                        <Text style={{ marginLeft: 25, color: "white", marginRight: this.props.str.language === "ar" ? 25 : 0, }}
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
                                                else {
                                                    this.setState({
                                                        type_register: "phone"
                                                    })
                                                }
                                            }}

                                        >
                                            {this.props.str.ihaveemailaddredd}

                                        </Text>
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
                                            // label={this.props.str.password}
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



                                {/* ////////////////////////////////Input State Selection///////////////////////////// */}
                                <View
                                    style={{
                                        marginTop: 15,
                                        height:
                                            this.state.selectedState === "" ? 70 : this.state.districts.length != 0 ? (this.state.subdistricts.length != 0 ? 280 : 210) : 140,
                                        // this.state.selectedState === "" ? 70 : this.state.districts.length != 0 ? 210 :
                                        //     this.state.subdistricts.length != 0 ? 280 : 140,
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
                                            selectedValue={this.state.selectedState}
                                            onValueChange={
                                                (itemValue, itemIndex) => this.dropDownChangeState(itemValue, itemIndex)
                                            }
                                        >
                                            <Picker.Item label={this.props.str.selectstate} value="" />
                                            {
                                                this.state.stateFromApi.map((key, index) => {
                                                    return (

                                                        (this.props.str.language === "en") ? (
                                                            <Picker.Item label={key.name_en} value={key.id} key={index} />

                                                        ) :
                                                            <Picker.Item label={key.name_ar} value={key.id} key={index} />
                                                    )
                                                })
                                            }
                                        </Picker>
                                    </Item>

                                    {/* ////////////////////////////////city///////////////////////////// */}

                                    {
                                        (this.state.selectedState != "") ? (
                                            <Animatable.View animation="slideInLeft" iterationCount={1}>
                                                <Item>
                                                    <Picker
                                                        mode="dropdown"
                                                        style={{ height: 50, width: "80%", color: "white" }}
                                                        placeholderStyle={{ color: "#bfc6ea" }}
                                                        placeholderIconColor="#007aff"
                                                        selectedValue={this.state.selectedCity}
                                                        onValueChange={
                                                            // (itemValue, itemIndex) => this.setState({ selectedCity: itemValue })
                                                            (itemValue, itemIndex) => this.dropDownChangeCity(itemValue, itemIndex)
                                                        }
                                                    >
                                                        <Picker.Item label={this.props.str.selectcity} value="" />
                                                        {
                                                            this.state.allCityFromApi.map((key, index) => {
                                                                return (
                                                                    <Picker.Item label={key.name_en} value={key.id} key={index} />
                                                                )
                                                            })
                                                        }
                                                    </Picker>
                                                </Item>
                                            </Animatable.View>
                                        ) : null

                                    }

                                    {/* ////////////////////////////////districts///////////////////////////// */}

                                    {
                                        (this.state.selectedCity != "" && this.state.districts && this.state.districts.length != 0) ? (
                                            <Animatable.View animation="slideInLeft" iterationCount={1}>
                                                <Item>
                                                    <Picker
                                                        mode="dropdown"
                                                        style={{ height: 50, width: "80%", color: "white" }}
                                                        placeholderStyle={{ color: "#bfc6ea" }}
                                                        placeholderIconColor="#007aff"
                                                        selectedValue={this.state.selectedDistricts}
                                                        onValueChange={
                                                            // (itemValue, itemIndex) => this.setState({ selectedCity: itemValue })
                                                            (itemValue, itemIndex) => this.dropDownChangeDistricts(itemValue, itemIndex)
                                                        }
                                                    >
                                                        <Picker.Item label={this.props.str.selectdistricts} value="" />
                                                        {
                                                            this.state.districts.map((key, index) => {
                                                                return (
                                                                    <Picker.Item label={key.name_en} value={key.id} key={index} />
                                                                )
                                                            })
                                                        }
                                                    </Picker>
                                                </Item>
                                            </Animatable.View>
                                        ) : null
                                    }

                                    {/* ////////////////////////////////subdistricts///////////////////////////// */}

                                    {
                                        (this.state.selectedDistricts != "" && this.state.subdistricts && this.state.subdistricts.length != 0) ? (
                                            <Animatable.View animation="slideInLeft" iterationCount={1}>
                                                <Item>
                                                    <Picker
                                                        mode="dropdown"
                                                        style={{ height: 50, width: "80%", color: "white" }}
                                                        placeholderStyle={{ color: "#bfc6ea" }}
                                                        placeholderIconColor="#007aff"
                                                        selectedValue={this.state.selectedSubDistricts}
                                                        onValueChange={
                                                            (itemValue, itemIndex) => this.setState({ selectedSubDistricts: itemValue })
                                                            // (itemValue, itemIndex) => this.dropDownChangeDistricts(itemValue, itemIndex)
                                                        }
                                                    >
                                                        <Picker.Item label={this.props.str.selectsubdistricts} value="" />
                                                        {
                                                            this.state.subdistricts.map((key, index) => {
                                                                return (
                                                                    <Picker.Item label={key.name_en} value={key.id} key={index} />
                                                                )
                                                            })
                                                        }
                                                    </Picker>
                                                </Item>
                                            </Animatable.View>
                                        ) : null
                                    }

                                </View>



                                {/* ////////////////////////////////Input Phone Number///////////////////////////// */}
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
                                            keyboardType={"numeric"}
                                            textColor={"white"}
                                            tintColor={"rgb(63, 81, 181)"}
                                            baseColor={"white"}
                                            label={this.props.str.phoneNumber}
                                            value={this.state.phoneNumber}
                                            onChangeText={(e) => this.setState({ phoneNumber: e })}
                                        />
                                    </View>
                                </View>










                                {/* ////////////////////////////////Input fax///////////////////////////// */}
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
                                            keyboardType={"numeric"}
                                            textColor={"white"}
                                            tintColor={"rgb(63, 81, 181)"}
                                            baseColor={"white"}
                                            label={this.props.str.fax}
                                            value={this.state.fax}
                                            onChangeText={(e) => this.setState({ fax: e })}
                                        />
                                    </View>
                                </View>



                                {/* ////////////////////////////////Input Address///////////////////////////// */}
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
                                            textColor={"white"}
                                            tintColor={"rgb(63, 81, 181)"}
                                            baseColor={"white"}
                                            label={this.props.str.address}
                                            value={this.state.address}
                                            onChangeText={(e) => this.setState({ address: e })}
                                        />
                                    </View>
                                </View>



                                {/* ////////////////////////////////Input Description///////////////////////////// */}
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
                                            textColor={"white"}
                                            tintColor={"rgb(63, 81, 181)"}
                                            baseColor={"white"}
                                            label={this.props.str.description}
                                            value={this.state.description}
                                            onChangeText={(e) => this.setState({ description: e })}
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
                                                    whatsappFlag: !this.state.whatsappFlag
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
                                        <Text style={{ marginLeft: 25, color: "white", marginRight: this.props.str.language === "ar" ? 25 : 0, color: "white" }}
                                            onPress={() => {
                                                this.setState({
                                                    whatsappFlag: !this.state.whatsappFlag
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
                                        <Text style={{ marginLeft: 25, color: "white", marginRight: this.props.str.language === "ar" ? 25 : 0, }}
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



                                {/* ////////////////////////////////i declare all information is right ///////////////////////////// */}

                                {/* <View style={{
                            marginLeft: 0, width: "100%", marginTop: 15,
                        }}>
                            <View style={{
                                flexDirection: "row",
                            }} >
                                <CheckBox checked={this.state.ideclareallinformationisright} color="#6E4524"
                                    onPress={() => {
                                        this.setState({
                                            ideclareallinformationisright: !this.state.ideclareallinformationisright
                                        })
                                    }}
                                />
                                <Text style={{ marginLeft: 25, color: "white" }}
                                    onPress={() => {
                                        this.setState({
                                            ideclareallinformationisright: !this.state.ideclareallinformationisright
                                        })
                                    }}
                                >
                                    {this.props.str.ideclareallinformation}

                                </Text>
                            </View>

                        </View> */}



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
                                        <Text style={{ marginLeft: 25, color: "white", marginRight: this.props.str.language === "ar" ? 25 : 0, }}
                                            onPress={() => {
                                                this.setState({
                                                    termsandconditionFlag: !this.state.termsandconditionFlag
                                                })
                                            }}
                                        >{this.props.str.ireadtermsandconditions}</Text>
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
        getUserSignIn: (data) => {
            dispatch(signinAction(data))
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(SignupasAgentorDeveloper);
const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 40,
    },


});