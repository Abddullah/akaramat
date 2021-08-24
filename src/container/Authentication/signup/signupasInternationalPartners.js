import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
// import ImagePicker from '../../../Component/ImagePicker';

import MultiSelect from 'react-native-multiple-select';
// import MultiImage from 'react-native-multi-image-selector'
import * as Animatable from 'react-native-animatable';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
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
import { signupasInternationalPartners } from "../../../services/API/signup"
import { ImagePicker, FileSystem } from 'expo';


class SignupasInternationalPartners extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaderFlag: false,
            emailFlag: false,
            companyFlag: false,
            typeFlag: false,
            uploadDocuments: false,
            termsandconditionFlag: false,
            ideclareallinformationisright: false,

            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: '',
            companyName: "",
            age: "",
            genderValue: "male",
            address: "",
            city: "",
            homeTel: "",
            fax: "",
            description: "",

            selectedCountry: "",
            countriesFromApi: {},
            selectedispeak: [],




            images: ['1'],
            imageArrFrmMulti: [],
            profile_photo_upload: null,
            photoIdFile_upload: null,
            addressFile_upload: null,


            ispeak: [
                {
                    id: 'English',
                    name: 'English',
                },
                {
                    id: 'Arabic',
                    name: 'Arabic',

                },
            ],



        };


    }

    onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
    };
    onSelectedItemsChangeicanwork = selectedicanWorkIn => {
        this.setState({ selectedicanWorkIn });
    };

    onSelectedItemsChangeiSpeak = selectedispeak => {
        this.setState({ selectedispeak });
    };

    componentWillMount() {
        this.getCountries(this)
    }



    dropDownChange = (itemValue, itemIndex) => {
        this.setState({
            selectedCountry: itemValue,
        })
    }


    getCountries() {
        return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/countries/all",
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                this.setState({
                    countriesFromApi: data.data.results
                })
                // this.props.setCountries(data.data.results)
            })
            .catch(err => {
                console.log(err)

            })
    }

    activeMyAccount() {
        // alert("working")
        if (this.props.str.language === "en") {
            var language = 1
        }
        else {
            var language = 2
        }
        cloneData = {
            language: language,
            useremail: this.state.email,
            password: this.state.password,
            repassword: this.state.confirmPassword,
            phone: this.state.phone,
            fullname: this.state.fullName,
            company_name: this.state.companyName,
            age: this.state.age,
            gender: this.state.genderValue,
            address: this.state.address,
            // city: this.state.city, ////if available///
            country: this.state.selectedCountry,
            tel: this.state.homeTel,
            fax: this.state.fax,
            about_me: this.state.description,
            // profile_photo_upload: this.state.profile_photo_upload,
            // photoIdFile_upload: this.state.photoIdFile_upload, ////if available///
            // addressFile_upload: this.state.addressFile_upload,////if available///
            speak_language: this.state.selectedispeak,

        }
        if (this.state.city != undefined) {
            cloneData.city = this.state.city
        }

        // this.conditionCheck(cloneData)

        this.setState({
            loaderFlag: !this.state.loaderFlag
        })
        var bodyFormData = new FormData();
        if (this.state.profile_photo_upload != null) {
            // Profile
            let uriPartsProfile = this.state.profile_photo_upload.split('.');
            let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
            bodyFormData.append('profile_photo_upload', {
                uri: this.state.profile_photo_upload,
                name: `photo.${fileTypeProfile}`,
                type: `image/${fileTypeProfile}`,
            });
        }

        if (this.state.photoIdFile_upload != null) {
            // Photo ID
            let uriPartsPhoto = this.state.photoIdFile_upload.split('.');
            let fileTypePhoto = uriPartsPhoto[uriPartsPhoto.length - 1];
            bodyFormData.append('photoIdFile_upload', {
                uri: this.state.photoIdFile_upload,
                name: `photo.${fileTypePhoto}`,
                type: `image/${fileTypePhoto}`,
            });
        }

        if (this.state.addressFile_upload != null) {
            // Address File
            let uriPartsAddress = this.state.addressFile_upload.split('.');
            let fileTypeAddress = uriPartsAddress[uriPartsAddress.length - 1];
            bodyFormData.append('addressFile_upload', {
                uri: this.state.addressFile_upload,
                name: `photo.${fileTypeAddress}`,
                type: `image/${fileTypeAddress}`,
            });
        }


        for (var key in cloneData) {
            if (cloneData[key] && cloneData[key] !== undefined && cloneData[key].length !== 0) {
                if (Array.isArray(cloneData[key])) {
                    var arr = cloneData[key];
                    for (var i = 0; i < arr.length; i++) {
                        bodyFormData.append(key + "[]", arr[i]);
                    }
                }
                else {
                    bodyFormData.append(key, cloneData[key]);
                }
            }
        }
        var options = {
            method: 'POST',
            url: 'https://demo.akaratmisr.com:443/en/api/auth/registerInternationalPartner',
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
                alert(JSON.stringify(data.data.message))
                this.setState({
                    loaderFlag: !this.state.loaderFlag
                })
                Actions.signIn()
            }).catch((err) => {
                alert(JSON.stringify(err.response.data.message))
                console.log(JSON.parse(JSON.stringify(err)), 'ERRROR')
                this.setState({
                    loaderFlag: !this.state.loaderFlag
                })
            })


    }




    // conditionCheck(cloneData) {
    //     if (this.state.fullname === "") {
    //         alert(this.props.str.pleasetypefullname)
    //     }
    //     if (this.state.email === "") {
    //         alert(this.props.str.pleasetypeyouremailaddress)
    //     }

    //     else if (this.state.password === "") {
    //         alert(this.props.str.pleasetypepassword)
    //     }
    //     else if (this.state.confirmPassword === "") {
    //         alert(this.props.str.pleasetypeconfirmpassword)
    //     }
    //     else if (this.state.password != this.state.confirmPassword) {
    //         alert(this.props.str.passworddoesnotmatched)
    //     }

    //     else if (this.state.age === "") {
    //         alert(this.props.str.pleasetypeage)
    //     }



    //     else if (this.state.city === "") {
    //         alert(this.props.str.pleasetypeyourcity)
    //     }

    //     else if (this.state.homeTel === "") {
    //         alert(this.props.str.pleasetypetelephone)
    //     }

    //     else if (this.state.selectedispeak.length === 0) {
    //         alert(this.props.str.pleasesetyourappropriate)
    //     }

    //     else if (this.state.profile_photo_upload.length === 0) {
    //         alert(this.props.str.pleaseuploadyourphoto)
    //     }

    //     else {
    //         signupasInternationalPartners(cloneData)

    //     }
    // }

    // expo default format
    profile_photo_upload = async () => {
        console.log("working")
        let result = await ImagePicker.launchImageLibraryAsync({
        });
        console.log(result, "resultphoto");
        if (!result.cancelled) {
            this.setState({ profile_photo_upload: result.uri, profile_photo_uploadblob: result });
            console.log("state updated to", this.state.profile_photo_upload)
        }
    };

    photoIdFile_upload = async () => {
        // this.openFile()
        let result = await ImagePicker.launchImageLibraryAsync({
        });
        console.log(result), "resultphotofile";
        if (!result.cancelled) {
            this.setState({ photoIdFile_upload: result.uri, photoIdFile_uploadblob: result });
            console.log("state updated to", this.state.photoIdFile_upload)
        }
    };

    addressFile_upload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        });
        console.log(result, "resultaddress");
        if (!result.cancelled) {
            this.setState({ addressFile_upload: result.uri, addressFile_uploadblob: result });
            console.log("state updated to", this.state.addressFile_upload)
        }
    };


    // // for getting uri to imagePicker
    // passingUri = (uri) => {
    //     let profile_photo_upload = [];
    //     profile_photo_upload.push(uri)
    //     this.setState({
    //         profile_photo_upload
    //     })
    //     console.log(uri, "uriImage")

    //     // this.convertImgToBase64URL(uri, [outputFormat = image / png])
    // }


    // // for getting uri to imagePicker
    // passingUriForId = (uri) => {
    //     let photoIdFile_upload = [];
    //     photoIdFile_upload.push(uri)
    //     this.setState({
    //         photoIdFile_upload
    //     })
    // }

    // // for getting uri to imagePicker
    // passingUriForDocument = (uri) => {
    //     let addressFile_upload = [];
    //     addressFile_upload.push(uri)
    //     this.setState({
    //         addressFile_upload
    //     })



    // }


    // getBase64(file) {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => resolve(reader.result);
    //         reader.onerror = error => reject(error);
    //     });
    // }

    //   var file = document.querySelector('#files > input[type="file"]').files[0];

    render() {

        ////////////////////for checkbox i speak///////////////
        const { ispeak } = this.state;
        const { selectedispeak } = this.state;



        // console.log(this.state.citieasArr, "citieas")

        ////////////////////radio button genged ////////////////////
        var radio_props;
        if (this.props.str.language == "en") {

            radio_props = [
                { label: 'Male', value: "male" },
                { label: 'Female', value: "female" }
            ];
        }
        else {
            radio_props = [
                { label: 'الذكر', value: "male" },
                { label: 'إناثا', value: "female" }
            ];
        }
        let { profile_photo_upload, photoIdFile_upload, addressFile_upload } = this.state;

        return (
            <ImageBackground source={require('../../../assets/Images/background.png')}
                style={{
                    // backgroundColor: '#fd902a',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
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
                                {this.props.str.signupasInternationalPartners}

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
                                    // label={this.props.str.signupassallerorbuyer}
                                    label={this.props.str.fullname}
                                    value={this.state.fullName}
                                    onChangeText={(e) => this.setState({ fullName: e })}
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
                            <View
                                style={{
                                    width: "80%", marginBottom: 10, marginHorizontal: "10%"
                                }}>
                                <TextField
                                    textColor={"white"}
                                    tintColor={"rgb(63, 81, 181)"}
                                    baseColor={"white"}
                                    // label={this.props.str.email}
                                    label={this.props.str.email}
                                    value={this.state.email}
                                    onChangeText={(e) => this.setState({ email: e })}
                                />
                            </View>
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

                        {/* ////////////////////////////////Input Age///////////////////////////// */}
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
                                    label={this.props.str.age}
                                    value={this.state.age}
                                    onChangeText={(e) => this.setState({ age: e })}
                                />
                            </View>
                        </View>


                        {/* ////////////////////////////////Input Gender///////////////////////////// */}
                        <View
                            style={{
                                marginTop: 15,
                                height: 70,
                                width: "100%",
                                flexDirection: "row",
                                borderWidth: 0.5,
                                borderColor: "white",
                                borderRadius: 5,
                                alignItems: "center",
                                justifyContent: "center",
                                // backgroundColor: "red"
                            }}
                        >
                            <View style={{
                                width: "40%", marginVertical: 0,
                                //  backgroundColor: "yellow"

                            }}>

                                <Text style={{ color: "white", fontWeight: "bold" }}>{this.props.str.gender}</Text>


                            </View>
                            <View style={{
                                width: "40%", height: 40, marginVertical: 50,
                                justifyContent: "center", alignItems: "center",
                                // backgroundColor: "yellow",

                            }}>
                                <RadioForm
                                    // formHorizontal={false}
                                    labelHorizontal={true}
                                    animation={true}
                                    radio_props={radio_props}
                                    initial={0}
                                    buttonSize={10}
                                    buttonOuterSize={20}
                                    onPress={(value) => { this.setState({ genderValue: value }) }}
                                />
                            </View>
                        </View>











                        {/* ////////////////////////////////Input Country///////////////////////////// */}

                        <View
                            style={{
                                marginTop: 15,
                                height: this.state.selectedCountry === "" ? 70 : 140,
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
                                            console.log(key, index, this.state.countriesFromApi[key])
                                            return (
                                                <Picker.Item label={this.state.countriesFromApi[key]} value={key} key={index} />
                                            )
                                        })
                                    }
                                </Picker>
                            </Item>
                            {
                                (this.state.selectedCountry != "") ? (
                                    <Animatable.View animation="slideInLeft" iterationCount={1}

                                        style={{
                                            marginTop: 15,
                                            height: 70,
                                            width: "100%",
                                            // flexDirection: "row",
                                            // borderWidth: 0.5,
                                            // borderColor: "white",
                                            // borderRadius: 5,
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
                                                label={this.props.str.city}
                                                value={this.state.city}
                                                onChangeText={(e) => this.setState({ city: e })}
                                            />
                                        </View>


                                    </Animatable.View>
                                ) : null
                            }


                        </View>




                        {/* ////////////////////////////////Input I speak///////////////////////////// */}
                        <View
                            style={{
                                marginTop: 15,
                                flex: 1,
                                // height: 378,
                                // height: this.state.typeFlag === false ? 48 : 378,
                                width: "100%",
                                borderWidth: 0.5,
                                borderColor: "white",
                                borderRadius: 5,
                                backgroundColor: "white",
                            }}


                        >
                            <View style={{ width: "90%", height: "40%", marginTop: 20, marginHorizontal: "5%" }}>
                                <MultiSelect
                                    showDropDowns={true}
                                    hideTags
                                    hideSubmitButton={true}
                                    // fixedHeight={true}
                                    items={ispeak}
                                    uniqueKey="id"
                                    // ref={(component) => { this.multiSelect = component }}
                                    onSelectedItemsChange={this.onSelectedItemsChangeiSpeak}
                                    selectedItems={selectedispeak}
                                    selectText={this.props.str.ispeak}
                                    searchInputPlaceholderText="Search Items..."
                                    onChangeInput={(text) => console.log(text)}
                                    // altFontFamily="ProximaNova-Light"
                                    tagRemoveIconColor="#CCC"
                                    tagBorderColor="#CCC"
                                    tagTextColor="#CCC"
                                    selectedItemTextColor="#CCC"
                                    selectedItemIconColor="#CCC"
                                    itemTextColor="#000"
                                    displayKey="name"
                                    searchInputStyle={{ color: '#CCC' }}
                                    submitButtonColor="#CCC"
                                    submitButtonText="Submit"
                                />
                            </View>
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
                                    value={this.state.phone}
                                    onChangeText={(e) => this.setState({ phone: e })}
                                />
                            </View>
                        </View>







                        {/* ////////////////////////////////Input Home Tel///////////////////////////// */}
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
                                    label={this.props.str.homeTel}
                                    value={this.state.homeTel}
                                    onChangeText={(e) => this.setState({ homeTel: e })}
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
                                    // label={this.props.str.phoneNumber}
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


                        {/* ////////////////////////////////Input Upload Photo///////////////////////////// */}
                        <View
                            style={{
                                marginTop: 15,
                                height: 70,
                                width: "100%",
                                flexDirection: "row",
                                borderWidth: 0.5,
                                borderColor: "white",
                                borderRadius: 5,
                                alignItems: "center",
                                justifyContent: "center",
                                // backgroundColor: "red"
                            }}
                        >
                            <View style={{ width: "40%", marginVertical: 0, }}>
                                {
                                    (profile_photo_upload != null) ?
                                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", marginHorizontal: "10%", marginVertical: 5, flexWrap: "wrap" }}>
                                            <Image source={{ uri: profile_photo_upload }} style={{ width: 55, height: 55, marginHorizontal: 6, marginTop: 2 }} />
                                        </View>
                                        : <Text style={{ color: "white", fontWeight: "bold" }}>{this.props.str.uploadyourphoto}</Text>
                                }
                            </View>

                            <View style={{ width: "40%", height: 40, marginVertical: 50, justifyContent: "center", alignItems: "center", }}>
                                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", height: "100%", width: "80%", backgroundColor: "#33CD5F", borderWidth: 0.75, borderColor: '#33CD5F' }} onPress={this.profile_photo_upload}>
                                    <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>{this.props.str.uploadphoto}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* ////////////////////////////////Input Upload your documents///////////////////////////// */}
                        <View style={{ marginTop: 15, height: this.state.uploadDocuments === false ? 300 : 70, width: "100%", borderWidth: 0.5, borderColor: "white", borderRadius: 5, justifyContent: "center", }}>
                            <Text style={{ textAlign: "center", marginBottom: 5 }}>
                                {this.props.str.uploadyourdocuments}
                            </Text>
                            <View style={{ flexDirection: this.props.str.language === "ar" ? "row-reverse" : "row", marginLeft: "4.5%", marginTop: this.state.emailFlag === true ? 0 : 0, }} >
                                <CheckBox disabled checked={this.state.uploadDocuments} color="#6E4524"
                                // onPress={() => { this.setState({ uploadDocuments: !this.state.uploadDocuments }) }}
                                />
                                <Text style={{ marginLeft: 25, color: "white", marginRight: this.props.str.language === "ar" ? 25 : 0, }}
                                // onPress={() => { this.setState({ uploadDocuments: !this.state.uploadDocuments }) }}
                                >
                                    {this.props.str.iwillprovidelater}
                                </Text>
                            </View>

                            {
                                (this.state.uploadDocuments === false) ? (
                                    < Animatable.View animation="slideInLeft" iterationCount={1} >
                                        {/* /////////////// Upload your Id/////////////// */}

                                        <View style={{ marginTop: 15, height: 70, width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", }} >
                                            <View style={{ width: "40%", marginVertical: 0, }}>
                                                {
                                                    (photoIdFile_upload != null) ?
                                                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", marginHorizontal: "10%", marginVertical: 5, flexWrap: "wrap" }}>
                                                            <Image source={{ uri: photoIdFile_upload }} style={{ width: 55, height: 55, marginHorizontal: 6, marginTop: 2 }} />
                                                        </View>
                                                        : <Text style={{ color: "white", fontWeight: "bold" }}>{this.props.str.uploadyourid}</Text>
                                                }
                                            </View>

                                            <View style={{ width: "40%", height: 40, marginVertical: 50, justifyContent: "center", alignItems: "center", }}>
                                                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", height: "100%", width: "80%", backgroundColor: "#33CD5F", borderWidth: 0.75, borderColor: '#33CD5F' }} onPress={this.photoIdFile_upload}  >
                                                    <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>{this.props.str.uploadid}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        {/* /////////////// Upload your Doc/////////////// */}

                                        <View style={{ marginTop: 15, height: 70, width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", }} >
                                            <View style={{ width: "40%", marginVertical: 0, }}>
                                                {
                                                    (this.state.addressFile_upload != null) ?
                                                        <View style={{
                                                            flex: 1, flexDirection: "row", justifyContent: "center",
                                                            marginHorizontal: "10%", marginVertical: 5, flexWrap: "wrap"
                                                        }}>
                                                            <Image source={{ uri: addressFile_upload }} style={{ width: 55, height: 55, marginHorizontal: 6, marginTop: 2 }} />
                                                        </View>
                                                        : <Text style={{ color: "white", fontWeight: "bold" }}>{this.props.str.uploadyourdocumentsaddress}</Text>
                                                }

                                            </View>
                                            <View style={{ width: "40%", height: 40, marginVertical: 50, justifyContent: "center", alignItems: "center", }}>
                                                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", height: "100%", width: "80%", backgroundColor: "#33CD5F", borderWidth: 0.75, borderColor: '#33CD5F' }} onPress={this.addressFile_upload}>
                                                    <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>{this.props.str.uploaddocuments}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </Animatable.View>
                                )
                                    : (null)
                            }
                        </View>


                        {/* ////////////////////////////////i declare all information is right ///////////////////////////// */}

                        <View style={{
                            marginLeft: 0, width: "100%", marginTop: 15,
                        }}>
                            <View style={{
                                flexDirection: this.props.str.language === "ar" ? "row-reverse" : "row",
                            }} >
                                <CheckBox checked={this.state.ideclareallinformationisright} color="#6E4524"
                                    onPress={() => {
                                        this.setState({
                                            ideclareallinformationisright: !this.state.ideclareallinformationisright
                                        })
                                    }}
                                />
                                <Text style={{ marginLeft: 25, color: "white", marginRight: this.props.str.language === "ar" ? 25 : 0, }}
                                    onPress={() => {
                                        this.setState({
                                            ideclareallinformationisright: !this.state.ideclareallinformationisright
                                        })
                                    }}
                                >
                                    {this.props.str.ideclareallinformation}

                                </Text>
                            </View>

                            {/* {
                                (this.state.ideclareallinformationisright === false) ?
                                    (<Animatable.View animation="slideInLeft" iterationCount={1}
                                        style={{ width: "80%", marginHorizontal: "10%", marginTop: 10 }}>
                                        <Text style={{ color: "#C30000", fontSize: 12, textAlign: "center" }}>{this.props.str.youmustacceptthe}</Text>
                                    </Animatable.View>
                                    ) : null
                            } */}
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

                        {/* {
                            (this.state.loaderFlag === false) ? (
                                <TouchableOpacity style={{ backgroundColor: "#6E4524", width: "100%", height: 25, justifyContent: "center", alignItems: "center", marginTop: 15, }}
                                    onPress={() => { this.activeMyAccount(this) }}>
                                    <Text style={{ color: "white", fontSize: 12 }}>
                                        {this.props.str.Register}
                                    </Text>
                                </TouchableOpacity>
                            ) : null
                        } */}
                        {
                            (this.state.termsandconditionFlag === true && this.state.ideclareallinformationisright) ? (
                                (this.state.loaderFlag === false) ? (
                                    <TouchableOpacity style={{ backgroundColor: "#6E4524", width: "100%", height: 25, justifyContent: "center", alignItems: "center", marginTop: 15, }}
                                        onPress={() => { this.activeMyAccount(this, "phone") }}>
                                        <Text style={{ color: "white", fontSize: 12 }} >
                                            {this.props.str.Register}
                                        </Text>
                                    </TouchableOpacity>) : <ActivityIndicator style={{ marginTop: 15 }} />

                            ) : <TouchableOpacity disabled style={{ backgroundColor: "#755D4A", width: "100%", height: 25, justifyContent: "center", alignItems: "center", marginTop: 15, }}>
                                    <Text style={{ color: "white", fontSize: 12 }} >
                                        {this.props.str.Register}
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
export default connect(mapStateToProps, mapDispatchToProps)(SignupasInternationalPartners);
const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 40,
    },


});