import React, { Component } from "react";
import { connect } from "react-redux";
import { signinAction, recallToVerify } from '../../../Store/Action/action'
import { Actions } from 'react-native-router-flux'
import ImagePicker1 from '../../../Component/ImagePicker';

import firebase from 'firebase'
// import Loading from '../Component/Loader';
import ErrorMessage from "../../../Component/errorMessage";
// import { GoogleSignin } from 'react-native-google-signin';
import MultiSelect from 'react-native-multiple-select';

import * as Animatable from 'react-native-animatable';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import axios from 'axios';
import { signupasRepresentative } from "../../../services/API/signup"

import { ImagePicker, FileSystem } from 'expo';



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

import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import VeryfyAcc from '../veryfy';


// var countries = require('../../services/Countries-States-Cities-database-master/countries.json');
// var states = require('../../services/Countries-States-Cities-database-master/states.json');
// var countries1 = require('../../services/countries.json');
// var cities = require('../../services/Countries-States-Cities-database-master/cities.json');



class SignupasRepresentative extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activateFlag: false,
            loaderFlagEmail: false,
            loaderFlagPhone: false,

            emailFlag: false,
            companyFlag: false,
            typeFlag: false,
            uploadDocuments: false,
            emlakinburadaoffice: false,
            iHaveAcar: false,
            termsandconditionFlag: false,
            ideclareallinformationisright: false,

            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: '',
            fullName: "",
            companyName: "",
            age: "",
            genderValue: "male",
            radio_computerSkills: "fair",
            address: "",
            has_whatsapp: 0,
            has_viber: 0,
            homeTel: "",
            fax: "",
            description: "",
            selectedispeak: [],
            computerSkills: "fair",
            meeting: 0,
            havecar: 0,

            type_register: "phone",
            countriesFromApi: {},
            selectedCountry: "EG",
            stateFromApi: [],
            allCityFromApi: [],
            districts: [],
            subdistricts: [],



            // for i can work
            icanworkCityFlag: false,
            icanworkDistrictsFlag: false,
            iCanWorkCity: [],
            iCanWorkDistricts: [],
            iCanWorksubdistricts: [],


            // stateFromApiCoverarea: [],
            // allCityFromApiCoverarea: [],
            // districtsCoverarea: [],
            // subdistrictsCoverarea: [],
            // selectedStateCoverarea: "",
            // selectedCityCoverarea: "",



            allCityFromApiforIcanwork: [],

            images: ['1'],
            profile_photo_upload: null,
            photoIdFile_upload: null,
            addressFile_upload: null,
            selectedState: "",
            selectedCity: "",

            icanWorkIn: [],
            selectedicanWorkIn: [],

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

    componentWillMount() {
        this.getState(this)
        this.getCountries(this)
    }


    //default

    // for getting uri to imagePicker
    // passingUri = (uri) => {
    //     let profile_photo_upload = [];
    //     profile_photo_upload.push(uri)
    //     this.setState({
    //         profile_photo_upload
    //     })
    // }

    // for getting uri to imagePicker
    // passingUriForId = (uri) => {
    //     let photoIdFile_upload = [];
    //     photoIdFile_upload.push(uri)
    //     this.setState({
    //         photoIdFile_upload
    //     })
    // }

    // for getting uri to imagePicker
    // passingUriForDocument = (uri) => {
    //     let addressFile_upload = [];
    //     addressFile_upload.push(uri)
    //     this.setState({
    //         addressFile_upload
    //     })
    // }




    // base64 format

    // profile_photo_upload = async () => {
    //     // await this.askPermissionsAsync();
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         // allowsEditing: true,
    //         aspect: [4, 3],
    //         base64: true,
    //         exif: true,
    //         mediaTypes: 'Images'
    //     });
    //     if (!result.cancelled) {
    //         if (result.type === 'image') {
    //             console.log(result, 'result here from librarry')
    //             this.setState({ profile_photo_upload: result.uri, profile_photo_uploadblob: result })
    //         }
    //     } else {
    //         return { cancelled: true }
    //     }
    // };

    // photoIdFile_upload = async () => {
    //     // await this.askPermissionsAsync();
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         // allowsEditing: true,
    //         aspect: [4, 3],
    //         base64: true,
    //         exif: true,
    //         mediaTypes: 'Images'
    //     });
    //     if (!result.cancelled) {
    //         if (result.type === 'image') {
    //             console.log(result, 'result here from librarry')
    //             this.setState({ photoIdFile_upload: result.uri, photoIdFile_uploadblob: result })
    //         }
    //     } else {
    //         return { cancelled: true }
    //     }
    // };

    // addressFile_upload = async () => {
    //     // await this.askPermissionsAsync();
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         // allowsEditing: true,
    //         aspect: [4, 3],
    //         base64: true,
    //         exif: true,
    //         mediaTypes: 'Images'
    //     });
    //     if (!result.cancelled) {
    //         if (result.type === 'image') {
    //             console.log(result, 'result here from librarry')
    //             this.setState({ addressFile_upload: result.uri, addressFile_uploadblob: result })
    //         }
    //     } else {
    //         return { cancelled: true }
    //     }
    // };



    // blob format

    // profile_photo_upload = async () => {
    //     console.log("working")
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         // allowsEditing: true,
    //         // aspect: [4, 3],
    //     });
    //     console.log(result, "resultphoto");
    //     if (!result.cancelled) {
    //         this.setState({ profile_photo_upload: result.uri });
    //         // this.uploadImageAsync(result.uri, profile_photo_upload)
    // const blob = await new Promise((resolve, reject) => {
    //     const xhr = new XMLHttpRequest();
    //     xhr.onload = function () {
    //         resolve(xhr.response);
    //     };
    //     xhr.onerror = function (e) {
    //         console.log(e);
    //         reject(new TypeError('Network request failed'));
    //     };
    //     xhr.responseType = 'blob';
    //     xhr.open('GET', result.uri, true);
    //     xhr.send(null);
    // });
    // // console.log(blob, "123")
    // this.setState({ profile_photo_uploadblob: blob }, () => {
    //     console.log("state updated to", this.state.profile_photo_uploadblob)

    // })

    //     }
    // };

    // photoIdFile_upload = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         // allowsEditing: true,
    //         // aspect: [4, 3],
    //     });
    //     console.log(result), "resultphotofile";
    //     if (!result.cancelled) {
    //         this.setState({ photoIdFile_upload: result.uri });
    //         // this.uploadImageAsync(result.uri, photoIdFile_upload)
    //         const blob = await new Promise((resolve, reject) => {
    //             const xhr = new XMLHttpRequest();
    //             xhr.onload = function () {
    //                 resolve(xhr.response);
    //             };
    //             xhr.onerror = function (e) {
    //                 console.log(e);
    //                 reject(new TypeError('Network request failed'));
    //             };
    //             xhr.responseType = 'blob';
    //             xhr.open('GET', result.uri, true);
    //             xhr.send(null);
    //         });
    //         // console.log(blob, "123")
    //         this.setState({ photoIdFile_uploadblob: blob }, () => {
    //             console.log("state updated to", this.state.photoIdFile_uploadblob)

    //         })

    //     }
    // };

    // addressFile_upload = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         // allowsEditing: true,
    //         // aspect: [4, 3],
    //     });
    //     console.log(result, "resultaddress");
    //     if (!result.cancelled) {
    //         this.setState({ addressFile_upload: result.uri });
    //         // this.uploadImageAsync(result.uri, addressFile_upload)
    //         const blob = await new Promise((resolve, reject) => {
    //             const xhr = new XMLHttpRequest();
    //             xhr.onload = function () {
    //                 resolve(xhr.response);
    //             };
    //             xhr.onerror = function (e) {
    //                 console.log(e);
    //                 reject(new TypeError('Network request failed'));
    //             };
    //             xhr.responseType = 'blob';
    //             xhr.open('GET', result.uri, true);
    //             xhr.send(null);
    //         });
    //         // console.log(blob, "123")
    //         this.setState({ addressFile_uploadblob: blob }, () => {
    //             console.log("state updated to", this.state.addressFile_uploadblob)

    //         })
    //     }
    // };


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
            fullname: this.state.fullName,
            company_name: this.state.companyName,
            age: this.state.age,
            gender: this.state.genderValue,
            address: this.state.address,
            state: this.state.selectedState,
            // city: this.state.selectedCity, ////if available///
            has_whatsapp: this.state.has_whatsapp,
            has_viber: this.state.has_viber,
            tel: this.state.homeTel,
            fax: this.state.fax,
            about_me: this.state.description,
            // for base64
            // profile_photo_upload: this.state.profile_photo_upload,
            // photoIdFile_upload: this.state.photoIdFile_upload,
            // addressFile_upload: this.state.addressFile_upload,
            speak_language: this.state.selectedispeak,
            computer_skills: this.state.computerSkills,
            work_in: this.state.selectedicanWorkState[0],
            workin_city: this.state.selectedicanWorkCity,
            workin_district: this.state.selectedicanWorkDistricts,
            workin_subdistrict: this.state.selectedicanWorkSubDistricts,
            meeting: this.state.meeting,
            havecar: this.state.havecar,
            type_register: type_register
        }

        if (this.state.email != "") {
            cloneData.useremail = this.state.email
        }
        if (this.state.selectedCity != undefined) {
            cloneData.city = this.state.selectedCity
        }

        if (this.state.selectedDistricts != undefined) {
            cloneData.location_district = this.state.selectedDistricts
        }
        if (this.state.selectedSubDistricts != undefined) {
            cloneData.location_subdistrict = this.state.selectedSubDistricts
        }


        // if (this.state.uploadDocuments === true) {
        //     cloneData.skipUpload = 1
        // }
        // else {
        //     cloneData.skipUpload = 0
        // }

        // this.conditionCheck(cloneData)
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

        if (this.state.profile_photo_upload != null || this.state.photoIdFile_upload != null || this.state.addressFile_upload != null) {
            // Profile
            let uriPartsProfile = this.state.profile_photo_upload.split('.');
            let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
            bodyFormData.append('profile_photo_upload', {
                uri: this.state.profile_photo_upload,
                name: `photo.${fileTypeProfile}`,
                type: `image/${fileTypeProfile}`,
            });
            // Photo ID
            let uriPartsPhoto = this.state.photoIdFile_upload.split('.');
            let fileTypePhoto = uriPartsPhoto[uriPartsPhoto.length - 1];
            bodyFormData.append('photoIdFile_upload', {
                uri: this.state.photoIdFile_upload,
                name: `photo.${fileTypePhoto}`,
                type: `image/${fileTypePhoto}`,
            });
            // Address File
            let uriPartsAddress = this.state.addressFile_upload.split('.');
            let fileTypeAddress = uriPartsAddress[uriPartsAddress.length - 1];
            bodyFormData.append('addressFile_upload', {
                uri: this.state.addressFile_upload,
                name: `photo.${fileTypeAddress}`,
                type: `image/${fileTypeAddress}`,
            });
        }

        // ----
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

        console.log(bodyFormData, "**********61")
        var options = {
            async: true,
            crossDomain: true,
            method: 'POST',
            url: 'https://demo.akaratmisr.com:443/en/api/auth/registerRepresentative',
            headers:
            {
                'cache-control': 'no-cache',
                "clientsecret": '(*jh2kj36gjhasdi78743982u432j',
                "clientkey": '34532hbjdsakjd2&&gjhjh11',
                "Allow-Cross-Origin": '*',
                Accept: '*/*',
                'Content-Type': 'multipart/form-data',
            },
            data: bodyFormData
        };
        axios(options)
            .then((data) => {
                console.log(data, 'DATAT')
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
                        activateFlag: true,
                    })
                    alert(JSON.stringify(data.data.message))
                    // Actions.VeryfyAcc({
                    //     phone: this.state.phoneNumber,
                    // })
                }

                // this.props.recallToVerify(this.state.phoneNumber,)
            }).catch((err) => {
                alert(JSON.stringify(err.response.data.message))
                console.log(JSON.parse(JSON.stringify(err)), 'ERRROR')
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



    // conditionCheck = async (cloneData) => {
    //     if (cloneData.type_register === "email") {
    //         this.setState({
    //             loaderFlagEmail: !this.state.loaderFlagEmail
    //         })
    //     }
    //     if (cloneData.type_register === "phone") {
    //         this.setState({
    //             loaderFlagPhone: !this.state.loaderFlagPhone
    //         })
    //     }

    //     var bodyFormData = new FormData();

    //     if (this.state.profile_photo_upload != null || this.state.photoIdFile_upload != null || this.state.addressFile_upload != null) {
    //         // Profile
    //         let uriPartsProfile = this.state.profile_photo_upload.split('.');
    //         let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
    //         bodyFormData.append('profile_photo_upload', {
    //             uri: this.state.profile_photo_upload,
    //             name: `photo.${fileTypeProfile}`,
    //             type: `image/${fileTypeProfile}`,
    //         });
    //         // Photo ID
    //         let uriPartsPhoto = this.state.photoIdFile_upload.split('.');
    //         let fileTypePhoto = uriPartsPhoto[uriPartsPhoto.length - 1];
    //         bodyFormData.append('photoIdFile_upload', {
    //             uri: this.state.photoIdFile_upload,
    //             name: `photo.${fileTypePhoto}`,
    //             type: `image/${fileTypePhoto}`,
    //         });
    //         // Address File
    //         let uriPartsAddress = this.state.addressFile_upload.split('.');
    //         let fileTypeAddress = uriPartsAddress[uriPartsAddress.length - 1];
    //         bodyFormData.append('addressFile_upload', {
    //             uri: this.state.addressFile_upload,
    //             name: `photo.${fileTypeAddress}`,
    //             type: `image/${fileTypeAddress}`,
    //         });
    //     }

    //     // ----
    //     for (var key in cloneData) {
    //         if (cloneData[key] && cloneData[key] !== undefined && cloneData[key].length !== 0) {
    //             if (Array.isArray(cloneData[key])) {
    //                 var arr = cloneData[key];
    //                 for (var i = 0; i < arr.length; i++) {
    //                     bodyFormData.append(key + "[]", arr[i]);
    //                 }
    //             }
    //             else {
    //                 bodyFormData.append(key, cloneData[key]);
    //             }

    //         }
    //     }
    //     var options = {
    //         async: true,
    //         crossDomain: true,
    //         method: 'POST',
    //         url: 'https://demo.akaratmisr.com:443/en/api/auth/registerRepresentative',
    //         headers:
    //         {
    //             'cache-control': 'no-cache',
    //             "clientsecret": '(*jh2kj36gjhasdi78743982u432j',
    //             "clientkey": '34532hbjdsakjd2&&gjhjh11',
    //             "Allow-Cross-Origin": '*',
    //             Accept: '*/*',
    //             'Content-Type': 'multipart/form-data',
    //         },
    //         data: bodyFormData
    //     };
    //     axios(options)
    //         .then((data) => {
    //             alert(JSON.stringify(data))
    //             console.log(data, 'DATAT')
    //             if (cloneData.type_register === "email") {
    //                 this.setState({
    //                     loaderFlagEmail: !this.state.loaderFlagEmail
    //                 })
    //             }
    //             if (cloneData.type_register === "phone") {
    //                 this.setState({
    //                     loaderFlagPhone: !this.state.loaderFlagPhone
    //                 })
    //             }
    //             Actions.tabNavigation()
    //         }).catch((err) => {
    //             alert(JSON.stringify(err.response.data.message))
    //             console.log(JSON.parse(JSON.stringify(err)), 'ERRROR')
    //             if (cloneData.type_register === "email") {
    //                 this.setState({
    //                     loaderFlagEmail: !this.state.loaderFlagEmail
    //                 })
    //             }
    //             if (cloneData.type_register === "phone") {
    //                 this.setState({
    //                     loaderFlagPhone: !this.state.loaderFlagPhone
    //                 })
    //             }
    //         })
    // }




    // conditionCheck(cloneData) {
    //     if (this.state.fullname === "") {
    //         alert(this.props.str.pleasetypefullname)
    //     }

    //     // else if (this.state.password === "") {
    //     //     alert(this.props.str.pleasetypepassword)
    //     // }

    //     // else if (this.state.confirmPassword === "") {
    //     //     alert(this.props.str.pleasetypeconfirmpassword)
    //     // }
    //     // else if (this.state.password != this.state.confirmPassword) {
    //     //     alert(this.props.str.passworddoesnotmatched)
    //     // }

    //     // else if (this.state.age === "") {
    //     //     alert(this.props.str.pleasetypeage)
    //     // }


    //     // else if (this.state.selectedState === "") {
    //     //     alert(this.props.str.pleaseselectstate)
    //     // }
    //     // else if (this.state.selectedCity === "") {
    //     //     alert(this.props.str.pleaseselectcity)
    //     // }

    //     // else if (this.state.homeTel === "") {
    //     //     alert(this.props.str.pleasetypetelephone)
    //     // }

    //     // else if (this.state.selectedispeak.length === 0) {
    //     //     alert(this.props.str.pleasesetyourappropriate)
    //     // }

    //     // else if (this.state.selectedicanWorkIn.length === 0) {
    //     //     alert(this.props.str.pleaseselectstateicancover)
    //     // }


    //     // else if (this.state.profile_photo_upload === null) {
    //     //     alert(this.props.str.pleaseuploadyourphoto)
    //     // }

    //     // else if (this.state.photoIdFile_upload === null) {
    //     //     alert(this.props.str.pleaseuploadyourId)
    //     // }

    //     // else if (this.state.addressFile_upload === null) {
    //     //     alert(this.props.str.pleaseuploadyouraddressFile)
    //     // }

    //     else {
    //         if (cloneData.type_register === "email") {
    //             this.setState({
    //                 loaderFlagEmail: !this.state.loaderFlagEmail
    //             })
    //         }
    //         if (cloneData.type_register === "phone") {
    //             this.setState({
    //                 loaderFlagPhone: !this.state.loaderFlagPhone
    //             })
    //         }
    //         var bodyFormData = new FormData();
    //         for (var key in cloneData) {
    //             if (cloneData[key] && cloneData[key] !== undefined && cloneData[key].length !== 0) {
    //                 if (Array.isArray(cloneData[key])) {
    //                     // console.log("array", cloneData[key], key)
    //                     var arr = cloneData[key];
    //                     for (var i = 0; i < arr.length; i++) {
    //                         // console.log(arr[i], "inloop")
    //                         bodyFormData.append(key + "[]", arr[i]);
    //                     }
    //                 }
    //                 else {
    //                     // if (key === "profile_photo_upload" || key === "photoIdFile_upload" || key === "addressFile_upload") {
    //                     //     bodyFormData.append(key + "[]", cloneData[key]);
    //                     // }
    //                     // else {
    //                     //     bodyFormData.append(key, cloneData[key]);
    //                     // }
    //                     bodyFormData.append(key, cloneData[key]);

    //                 }
    //             }
    //         }
    //         console.log(bodyFormData, "bodyFormData")
    //         var options = {
    //             method: 'POST',
    //             url: 'https://demo.akaratmisr.com:443/en/api/auth/registerRepresentative',
    //             headers:
    //             {
    //                 'postman-token': '553d07fc-3950-1199-efd9-6b5b5f8315a2',
    //                 'cache-control': 'no-cache',
    //                 clientsecret: '(*jh2kj36gjhasdi78743982u432j',
    //                 clientkey: '34532hbjdsakjd2&&gjhjh11',
    //                 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
    //                 "Allow-Cross-Origin": '*',
    //                 "contentType": "header",
    //                 // "Binary FormData part needs a content-type header."
    //             },

    //             data: bodyFormData
    //         };
    //         console.log(bodyFormData, '****61', cloneData);
    //         axios(options)
    //             .then((data) => {
    //                 alert(JSON.stringify(data.data.message))
    //                 console.log(data.data.message, 'DATAT')
    //                 if (cloneData.type_register === "email") {
    //                     this.setState({
    //                         loaderFlagEmail: !this.state.loaderFlagEmail
    //                     })
    //                 }
    //                 if (cloneData.type_register === "phone") {
    //                     this.setState({
    //                         loaderFlagPhone: !this.state.loaderFlagPhone
    //                     })
    //                 }
    //                 Actions.tabNavigation()
    //             }).catch((err) => {
    //                 console.log(err, "Err")
    //                 alert(JSON.stringify(err.response.data.message))
    //                 console.log(JSON.parse(JSON.stringify(err)), 'ERRROR')
    //                 if (cloneData.type_register === "email") {
    //                     this.setState({
    //                         loaderFlagEmail: !this.state.loaderFlagEmail
    //                     })
    //                 }
    //                 if (cloneData.type_register === "phone") {
    //                     this.setState({
    //                         loaderFlagPhone: !this.state.loaderFlagPhone
    //                     })
    //                 }
    //             })
    //     }



    // }



    onSelectedItemsChangeicanworkState = selectedicanWorkState => {
        this.setState({
            selectedicanWorkState,
            // icanworkCityFlag: true,
            iCanWorkCity: [],
            iCanWorkDistricts: [],
            iCanWorksubdistricts: [],
            selectedicanWorkCity: [],
        });
        uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/cities/" + selectedicanWorkState
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
                if (city.length != 0) {
                    this.setState({
                        iCanWorkCity: city,
                        // icanworkCityFlag: true,
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })

    };

    onSelectedItemsChangeicanworkCity = selectedicanWorkCity => {
        this.setState({
            selectedicanWorkCity,
            // icanworkCityFlag: true,
            // iCanWorkCity: [],
            iCanWorkDistricts: [],
            iCanWorksubdistricts: [],
            selectedicanWorkDistricts: [],
            selectedicanWorkSubDistricts: []
        });
        if (selectedicanWorkCity.length === 1) {
            // alert("working kr rha hai")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/districts/" + selectedicanWorkCity
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
                    if (districts.length != 0) {
                        // alert("if")
                        this.setState({
                            iCanWorkDistricts: districts,
                            icanworkCityFlag: true
                        })
                    }
                    else {
                        // alert("else")
                        this.setState({
                            icanworkCityFlag: false
                        })
                    }

                })
                .catch(err => {
                    console.log(err)
                })
        }


    };



    onSelectedItemsChangeicanworkDistricts = selectedicanWorkDistricts => {
        this.setState({ selectedicanWorkDistricts });

        if (selectedicanWorkDistricts.length === 1) {
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/subdistricts/" + selectedicanWorkDistricts
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
                    if (subdistricts.length != 0) {
                        this.setState({
                            iCanWorksubdistricts: subdistricts,
                            icanworkDistrictsFlag: true

                        })
                    }

                    else {
                        // alert("else")
                        this.setState({
                            icanworkDistrictsFlag: false
                        })
                    }
                    console.log(subdistricts, "subdistrick")

                })
                .catch(err => {
                    console.log(err)
                })

        }

    };
    // icanworkDistrictsFlag
    onSelectedItemsChangeicanworkSubDistricts = selectedicanWorkSubDistricts => {
        this.setState({ selectedicanWorkSubDistricts });
    };




    onSelectedItemsChangeiSpeak = selectedispeak => {
        this.setState({ selectedispeak });
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






    // dropDownChangeStateCoverarea = (itemValue, itemIndex) => {
    //     if (itemIndex && itemValue) {
    //         this.setState({
    //             selectedStateCoverarea: itemValue,
    //             districtsCoverarea: [],
    //             subdistrictsCoverarea: []
    //         })
    //         uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/cities/" + itemValue
    //         // console.log(itemValue, uri, "itemValue")
    //         return axios({
    //             method: 'get',
    //             url: uri,
    //             headers: {
    //                 "clientkey": "34532hbjdsakjd2&&gjhjh11",
    //                 "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
    //             },
    //         })
    //             .then(data => {
    //                 let cityCoverarea = data.data.results
    //                 // console.log(city)

    //                 this.setState({
    //                     allCityFromApiCoverarea: cityCoverarea
    //                 })
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //     }
    // }

    // dropDownChangeCityCoverarea = (itemValue, itemIndex) => {
    //     console.log(itemValue, itemIndex, "valueCities")
    //     if (itemIndex && itemValue) {
    //         this.setState({
    //             selectedCityCoverarea: itemValue,
    //         })
    //         uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/districts/" + itemValue
    //         return axios({
    //             method: 'get',
    //             url: uri,
    //             headers: {
    //                 "clientkey": "34532hbjdsakjd2&&gjhjh11",
    //                 "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
    //             },
    //         })
    //             .then(data => {
    //                 let districts = data.data.results
    //                 this.setState({
    //                     districtsCoverarea: districts
    //                 })
    //                 console.log(districts, "districk")

    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //     }
    // }

    // dropDownChangeDistrictsCoverarea = (itemValue, itemIndex) => {
    //     console.log(itemValue, itemIndex, "valueDist")
    //     if (itemIndex && itemValue) {
    //         this.setState({
    //             selectedDistrictsCoverarea: itemValue,
    //         })
    //         // uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/subdistricts/" + itemValue
    //         // return axios({
    //         //     method: 'get',
    //         //     url: uri,
    //         //     headers: {
    //         //         "clientkey": "34532hbjdsakjd2&&gjhjh11",
    //         //         "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
    //         //     },
    //         // })
    //         //     .then(data => {
    //         //         let subdistricts = data.data.results
    //         //         this.setState({
    //         //             subdistrictsCoverarea: subdistricts
    //         //         })
    //         //         console.log(subdistricts, "subdistrick")

    //         //     })
    //         //     .catch(err => {
    //         //         console.log(err)
    //         //     })
    //     }
    // }





    // dropDownChangeiCanCover = (itemValue, itemIndex) => {
    //     if (itemIndex && itemValue) {
    //         this.setState({
    //             selectedIcanCover: itemValue,
    //         })
    //         uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/cities/" + itemValue
    //         // console.log(itemValue, uri, "itemValue")
    //         return axios({
    //             method: 'get',
    //             url: uri,
    //             headers: {
    //                 "clientkey": "34532hbjdsakjd2&&gjhjh11",
    //                 "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
    //             },
    //         })
    //             .then(data => {
    //                 let city = data.data.results
    //                 // console.log(city)
    //                 this.setState({
    //                     allCityFromApiforIcanwork: city
    //                 })
    //             })
    //             .catch(err => {
    //                 console.log(err)

    //             })
    //     }
    // }


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



    render() {
        // console.log(this.state.selectedicanWorkState[0], "iCanWorkDistricts")
        // state ican work
        const { stateFromApi } = this.state;
        const { selectedicanWorkState } = this.state;

        // city ican work
        const { iCanWorkCity } = this.state;
        const { selectedicanWorkCity } = this.state;

        // district ican work
        const { iCanWorkDistricts } = this.state;
        const { selectedicanWorkDistricts } = this.state;

        // subdistrict ican work
        const { iCanWorksubdistricts } = this.state;
        const { selectedicanWorkSubDistricts } = this.state;

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

        ////////////////////radio button radio_computerSkills ////////////////////
        var radio_computerSkills;
        if (this.props.str.language == "en") {
            radio_computerSkills = [
                { label: 'Fair', value: 'fair' },
                { label: 'Good', value: 'good' },
                { label: 'Excellent', value: 'excellent' }
            ];
        }
        else {
            radio_computerSkills = [
                { label: "معقولة", value: 'fair' },
                { label: 'جيدة', value: 'good' },
                { label: "ممتازة", value: 'excellent' }
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
                                        {this.props.str.signupasrepresentative}

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

                                                // if (this.state.type_register === "phone") {
                                                //     this.setState({
                                                //         type_register: "email"
                                                //     })
                                                // }
                                                // else {
                                                //     this.setState({
                                                //         type_register: "phone"
                                                //     })
                                                // }
                                            }}
                                        />
                                        <Text style={{ marginLeft: 25, color: "white", marginRight: this.props.str.language === "ar" ? 25 : 0, }}
                                            onPress={() => {
                                                this.setState({
                                                    emailFlag: !this.state.emailFlag,
                                                    email: ""
                                                })

                                                // if (this.state.type_register === "phone") {
                                                //     this.setState({
                                                //         type_register: "email"
                                                //     })
                                                // }
                                                // else {
                                                //     this.setState({
                                                //         type_register: "phone"
                                                //     })
                                                // }
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




                                {/* ////////////////////////////////Input I can cover area///////////////////////////// */}
                                {/* <View
                                style={{
                                    marginTop: 15,
                                    height: this.state.selectedIcanCover === "" ? 70 : 140,
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
                                        selectedValue={this.state.selectedIcanCover}
                                        onValueChange={
                                            (itemValue, itemIndex) => this.dropDownChangeiCanCover(itemValue, itemIndex)
                                        }
                                    >
                                        <Picker.Item label={this.props.str.icancover} value="" />
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
                                {
                                    (this.state.selectedIcanCover != "") ? (
                                        <Animatable.View animation="slideInLeft" iterationCount={1}>
                                            <Item>
                                                <Picker
                                                    mode="dropdown"
                                                    style={{ height: 50, width: "80%", color: "white" }}
                                                    placeholderStyle={{ color: "#bfc6ea" }}
                                                    placeholderIconColor="#007aff"
                                                    selectedValue={this.state.selectedCityIcanCover}
    
                                                    onValueChange={(itemValue, itemIndex) => this.setState({ selectedCityIcanCover: itemValue })}
                                                >
                                                    <Picker.Item label={this.props.str.selectcity} value="" />
                                                    {
                                                        this.state.allCityFromApiforIcanwork.map((key, index) => {
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
    
    
                            </View> */}









                                {/* <View
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
                                <View style={{ width: "90%", marginTop: 20, marginHorizontal: "5%" }}>
                                    <MultiSelect
                                        showDropDowns={true}
                                        hideTags
                                        hideSubmitButton={true}
                                        fixedHeight={true}
                                        items={stateFromApi}
                                        uniqueKey="id"
                                        // ref={(component) => { this.multiSelect = component }}
                                        onSelectedItemsChange={this.onSelectedItemsChangeicanwork}
                                        selectedItems={selectedicanWorkState}
                                        selectText={this.props.str.icancover}
                                        searchInputPlaceholderText={this.props.str.Searchitems}
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
                            </View> */}




                                {/* ////////////////////////////////Input State Selection///////////////////////////// */}
                                {/* <View
                                    style={{
                                        marginTop: 15,
                                        height:
                                            this.state.selectedStateCoverarea === "" ? 70 : this.state.districtsCoverarea.length != 0 ? (this.state.subdistrictsCoverarea.length != 0 ? 280 : 210) : 140,
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
                                            selectedValue={this.state.selectedStateCoverarea}
                                            onValueChange={
                                                (itemValue, itemIndex) => this.dropDownChangeStateCoverarea(itemValue, itemIndex)
                                            }
                                        >
                                            <Picker.Item label={this.props.str.icancover} value="" />
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
                                    </Item> */}

                                {/* ////////////////////////////////city///////////////////////////// */}

                                {/* {
                                        (this.state.selectedStateCoverarea != "") ? (
                                            <Animatable.View animation="slideInLeft" iterationCount={1}>
                                                <Item>
                                                    <Picker
                                                        mode="dropdown"
                                                        style={{ height: 50, width: "80%", color: "white" }}
                                                        placeholderStyle={{ color: "#bfc6ea" }}
                                                        placeholderIconColor="#007aff"
                                                        selectedValue={this.state.selectedCityCoverarea}
                                                        onValueChange={
                                                            // (itemValue, itemIndex) => this.setState({ selectedCity: itemValue })
                                                            (itemValue, itemIndex) => this.dropDownChangeCity(itemValue, itemIndex)
                                                        }
                                                    >
                                                        <Picker.Item label={this.props.str.selectcity} value="" />
                                                        {
                                                            this.state.allCityFromApiCoverarea.map((key, index) => {
                                                                return (
                                                                    <Picker.Item label={key.name_en} value={key.id} key={index} />
                                                                )
                                                            })
                                                        }
                                                    </Picker>
                                                </Item>
                                            </Animatable.View>
                                        ) : null

                                    } */}

                                {/* ////////////////////////////////districts///////////////////////////// */}

                                {/* {
                                        (this.state.selectedCityCoverarea != "" && this.state.districtsCoverarea && this.state.districtsCoverarea.length != 0) ? (
                                            <Animatable.View animation="slideInLeft" iterationCount={1}>
                                                <Item>
                                                    <Picker
                                                        mode="dropdown"
                                                        style={{ height: 50, width: "80%", color: "white" }}
                                                        placeholderStyle={{ color: "#bfc6ea" }}
                                                        placeholderIconColor="#007aff"
                                                        selectedValue={this.state.selectedDistrictsCoverarea}
                                                        onValueChange={
                                                            // (itemValue, itemIndex) => this.setState({ selectedCity: itemValue })
                                                            (itemValue, itemIndex) => this.dropDownChangeDistrictsCoverarea(itemValue, itemIndex)
                                                        }
                                                    >
                                                        <Picker.Item label={this.props.str.selectdistricts} value="" />
                                                        {
                                                            this.state.districtsCoverarea.map((key, index) => {
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



                                </View> */}






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
                                    <View style={{ width: "90%", marginTop: 20, marginHorizontal: "5%", overflow: 'hidden' }}>
                                        <MultiSelect
                                            single={true}
                                            hideTags
                                            hideSubmitButton={true}
                                            fixedHeight={false}
                                            items={stateFromApi}
                                            uniqueKey="id"
                                            // ref={(component) => { this.multiSelect = component }}
                                            onSelectedItemsChange={this.onSelectedItemsChangeicanworkState}
                                            selectedItems={selectedicanWorkState}
                                            selectText={this.props.str.icancoverstate}
                                            searchInputPlaceholderText={this.props.str.Searchitems}
                                            onChangeInput={(text) => console.log(text, "onchangemulti")}
                                            // altFontFamily="ProximaNova-Light"
                                            tagRemoveIconColor="#CCC"
                                            tagBorderColor="#CCC"
                                            tagTextColor="#CCC"
                                            selectedItemTextColor="#CCC"
                                            selectedItemIconColor="#CCC"
                                            itemTextColor="#000"
                                            displayKey="name"
                                            searchInputStyle={{ color: '#6E4524' }}
                                            submitButtonColor="#6E4524"
                                            submitButtonText="Submit"
                                        />
                                    </View>
                                </View>


                                {
                                    (this.state.iCanWorkCity.length != 0) ? (
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
                                            <View style={{ width: "90%", marginTop: 20, marginHorizontal: "5%", overflow: 'hidden' }}>
                                                <MultiSelect
                                                    single={this.state.icanworkCityFlag}
                                                    hideTags
                                                    hideSubmitButton={true}
                                                    fixedHeight={false}
                                                    items={iCanWorkCity}
                                                    uniqueKey="id"
                                                    // ref={(component) => { this.multiSelect = component }}
                                                    onSelectedItemsChange={this.onSelectedItemsChangeicanworkCity}
                                                    selectedItems={selectedicanWorkCity}
                                                    selectText={this.props.str.icancovercity}
                                                    searchInputPlaceholderText={this.props.str.Searchitems}
                                                    onChangeInput={(text) => console.log(text, "onchangemulti")}
                                                    // altFontFamily="ProximaNova-Light"
                                                    tagRemoveIconColor="#CCC"
                                                    tagBorderColor="#CCC"
                                                    tagTextColor="#CCC"
                                                    selectedItemTextColor="#CCC"
                                                    selectedItemIconColor="#CCC"
                                                    itemTextColor="#000"
                                                    displayKey="name"
                                                    searchInputStyle={{ color: '#6E4524' }}
                                                    submitButtonColor="#6E4524"
                                                    submitButtonText="Submit"
                                                />
                                            </View>
                                        </View>

                                    ) : null
                                }

                                {
                                    (this.state.iCanWorkDistricts.length != 0) ? (
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
                                            <View style={{ width: "90%", marginTop: 20, marginHorizontal: "5%", overflow: 'hidden' }}>
                                                <MultiSelect
                                                    single={this.state.icanworkDistrictsFlag}
                                                    hideTags
                                                    hideSubmitButton={true}
                                                    fixedHeight={false}
                                                    items={iCanWorkDistricts}
                                                    uniqueKey="id"
                                                    // ref={(component) => { this.multiSelect = component }}
                                                    onSelectedItemsChange={this.onSelectedItemsChangeicanworkDistricts}
                                                    selectedItems={selectedicanWorkDistricts}
                                                    selectText={this.props.str.icancoverdistricts}
                                                    searchInputPlaceholderText={this.props.str.Searchitems}
                                                    onChangeInput={(text) => console.log(text, "onchangemulti")}
                                                    // altFontFamily="ProximaNova-Light"
                                                    tagRemoveIconColor="#CCC"
                                                    tagBorderColor="#CCC"
                                                    tagTextColor="#CCC"
                                                    selectedItemTextColor="#CCC"
                                                    selectedItemIconColor="#CCC"
                                                    itemTextColor="#000"
                                                    displayKey="name"
                                                    searchInputStyle={{ color: '#6E4524' }}
                                                    submitButtonColor="#6E4524"
                                                    submitButtonText="Submit"
                                                />
                                            </View>
                                        </View>

                                    ) : null
                                }



                                {
                                    (this.state.iCanWorksubdistricts.length != 0) ? (
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
                                            <View style={{ width: "90%", marginTop: 20, marginHorizontal: "5%", overflow: 'hidden' }}>
                                                <MultiSelect
                                                    single={false}
                                                    hideTags
                                                    hideSubmitButton={true}
                                                    fixedHeight={false}
                                                    items={iCanWorksubdistricts}
                                                    uniqueKey="id"
                                                    // ref={(component) => { this.multiSelect = component }}
                                                    onSelectedItemsChange={this.onSelectedItemsChangeicanworkSubDistricts}
                                                    selectedItems={selectedicanWorkSubDistricts}
                                                    selectText={this.props.str.icancoversubdistricts}
                                                    searchInputPlaceholderText={this.props.str.Searchitems}
                                                    onChangeInput={(text) => console.log(text, "onchangemulti")}
                                                    // altFontFamily="ProximaNova-Light"
                                                    tagRemoveIconColor="#CCC"
                                                    tagBorderColor="#CCC"
                                                    tagTextColor="#CCC"
                                                    selectedItemTextColor="#CCC"
                                                    selectedItemIconColor="#CCC"
                                                    itemTextColor="#000"
                                                    displayKey="name"
                                                    searchInputStyle={{ color: '#6E4524' }}
                                                    submitButtonColor="#6E4524"
                                                    submitButtonText="Submit"
                                                />
                                            </View>
                                        </View>

                                    ) : null
                                }





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
                                            items={this.state.ispeak}
                                            uniqueKey="id"
                                            // ref={(component) => { this.multiSelect = component }}
                                            onSelectedItemsChange={this.onSelectedItemsChangeiSpeak}
                                            selectedItems={this.state.selectedispeak}
                                            selectText={this.props.str.ispeak}
                                            searchInputPlaceholderText={this.props.str.Searchitems}
                                            onChangeInput={(text) => console.log(text)}
                                            //altFontFamily="ProximaNova-Light"
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



                                {/* ////////////////////////////////Input Computer Skill///////////////////////////// */}
                                <View
                                    style={{
                                        marginTop: 15,
                                        height: 140,
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

                                        <Text style={{ color: "white", fontWeight: "bold" }}>{this.props.str.computerskills}</Text>


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
                                            radio_props={radio_computerSkills}
                                            initial={0}
                                            buttonSize={10}
                                            buttonOuterSize={20}
                                            onPress={(value) => { this.setState({ computerSkills: value }) }}
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
                                            value={this.state.phoneNumber}
                                            onChangeText={(e) => this.setState({ phoneNumber: e })}
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
                                        <Text style={{ marginLeft: 25, color: "white", marginRight: this.props.str.language === "ar" ? 25 : 0, }}
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



                                {/* ////////////////////////////////I can come to emlakinburada office for personal meeting///////////////////////////// */}

                                <View style={{
                                    marginLeft: 0, width: "100%", marginTop: 15,
                                }}>
                                    <View style={{
                                        flexDirection: this.props.str.language === "ar" ? "row-reverse" : "row",
                                    }} >
                                        <CheckBox checked={this.state.emlakinburadaoffice} color="#6E4524"
                                            onPress={() => {
                                                this.setState({
                                                    emlakinburadaoffice: !this.state.emlakinburadaoffice
                                                })

                                                if (this.state.meeting === 0) {
                                                    this.setState({
                                                        meeting: 1,
                                                    })
                                                }
                                                else {
                                                    this.setState({
                                                        meeting: 0,
                                                    })
                                                }

                                            }}
                                        />
                                        <Text style={{ marginLeft: 25, color: "white", marginRight: this.props.str.language === "ar" ? 25 : 0, }}
                                            onPress={() => {
                                                this.setState({
                                                    emlakinburadaoffice: !this.state.emlakinburadaoffice
                                                })
                                                if (this.state.meeting === 0) {
                                                    this.setState({
                                                        meeting: 1,
                                                    })
                                                }
                                                else {
                                                    this.setState({
                                                        meeting: 0,
                                                    })
                                                }
                                            }}
                                        >
                                            {this.props.str.icancometo}

                                        </Text>
                                    </View>
                                </View>



                                {/* ////////////////////////////////I have car///////////////////////////// */}

                                <View style={{
                                    marginLeft: 0, width: "100%", marginTop: 15,
                                }}>
                                    <View style={{
                                        flexDirection: this.props.str.language === "ar" ? "row-reverse" : "row",
                                    }} >
                                        <CheckBox checked={this.state.iHaveAcar} color="#6E4524"
                                            onPress={() => {
                                                this.setState({
                                                    iHaveAcar: !this.state.iHaveAcar
                                                })
                                                if (this.state.havecar === 0) {
                                                    this.setState({
                                                        havecar: 1,
                                                    })
                                                }
                                                else {
                                                    this.setState({
                                                        havecar: 0,
                                                    })
                                                }
                                            }}
                                        />
                                        <Text style={{ marginLeft: 25, color: "white", marginRight: this.props.str.language === "ar" ? 25 : 0, }}
                                            onPress={() => {
                                                this.setState({
                                                    iHaveAcar: !this.state.iHaveAcar
                                                })
                                                if (this.state.havecar === 0) {
                                                    this.setState({
                                                        havecar: 1,
                                                    })
                                                }
                                                else {
                                                    this.setState({
                                                        havecar: 0,
                                                    })
                                                }
                                            }}
                                        >
                                            {this.props.str.ihaveacar}

                                        </Text>
                                    </View>
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
                                (this.state.emailFlag === true) ? (
    
                                    <TouchableOpacity style={{
                                        backgroundColor: "#6E4524",
                                        width: "100%",
                                        height: 25,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: 15,
                                    }}>
    
                                        <Text style={{ color: "white", fontSize: 12 }}>
                                            {this.props.str.sendactivationcode}
                                        </Text>
    
                                    </TouchableOpacity>
    
                                ) : null
    
    
                            } */}


                                {/* 
                            <TouchableOpacity style={{
                                backgroundColor: "#6E4524",
                                width: "100%",
                                height: 25,
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 15,
                            }}
                                onPress={() => {
                                    this.activeMyAccount(this)
                                }}
                            >
    
                                <Text style={{ color: "white", fontSize: 12 }}>
                                    {this.props.str.activatemyaccountby}
                                </Text>
    
                            </TouchableOpacity> */}


                                {
                                    (this.state.emailFlag === true) ? (
                                        (this.state.termsandconditionFlag === true && this.state.ideclareallinformationisright) ? (
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
                                    (this.state.termsandconditionFlag === true && this.state.ideclareallinformationisright) ? (
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
        recallToVerify: (data) => {
            dispatch(recallToVerify(data))
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(SignupasRepresentative);
const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 40,
    },


});