import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, KeyboardAvoidingView, RefreshControl,
    Dimensions, WebView, TextInput, Button
} from 'react-native';
import { ImagePicker } from 'expo'
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, CardItem, Thumbnail, Icon, Badge, Picker, Item } from 'native-base';
import { connect } from "react-redux";
import axios from 'axios';
// import Drawer from '../../Component/drawer';
import InfiniteScroll from 'react-native-infinite-scroll';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontIcons from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import AgentAvatar1 from '../../../assets/agentavatar1.jpg'
import AgentAvatar2 from '../../../assets/agentavatar2.jpg'
import AgentAvatar3 from '../../../assets/agentavatar3.jpg'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { TextField } from 'react-native-material-textfield';
import {
    CheckBox
} from 'native-base';
import noPhoto from '../../../assets/nophoto-.jpg'
import Textarea from 'react-native-textarea';
import { DocumentPicker, FileSystem, Linking } from 'expo';


const width = Dimensions.get('screen').width


class InternationalProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedCountry: "",
            avatar: '',
            avatarIcon: [
                {
                    name: AgentAvatar1,
                    value: 'agentavatar1',
                },
                {
                    name: AgentAvatar2,
                    value: 'agentavatar2',
                },
                {
                    name: AgentAvatar3,
                    value: 'agentavatar3',
                }
            ],
            selectOptions: [
                {
                    name: this.props.str.language === "en" ? "Male" : "الذكر",
                    value: 'male'
                },
                {
                    name: this.props.str.language === "en" ? "Female" : "إناثا",
                    value: 'female'
                }
            ],
            selectOptions2: [
                {
                    name: 'speak',
                    value: ''
                },
                {
                    name: 'eng',
                    value: 'English'
                },
                {
                    name: 'arb',
                    value: 'Arabic'
                }
            ],
            textInput: [
                {
                    name: 'email',
                    value: 'email',
                    type: 'email-address',
                    icon: 'email'
                },
                {
                    name: 'fullname',
                    value: 'fullName',
                    type: 'default',
                    icon: 'account-outline'
                },
                {
                    name: 'phoneNumber',
                    value: 'phoneNumber',
                    type: 'number-pad',
                    icon: 'phone'
                },
                {
                    name: 'age',
                    value: 'age',
                    type: 'number-pad',
                    icon: 'user-circle-o',
                    font: 'fontawesome'
                },
                {
                    name: 'homeTel',
                    value: 'tel',
                    type: 'number-pad',
                    icon: 'phone'
                },
                {
                    name: 'fax',
                    value: 'fax',
                    type: 'default',
                    icon: 'fax',
                    font: 'fontawesome'
                },
                {
                    name: 'address',
                    value: 'address',
                    type: 'default',
                    icon: 'address-book-o',
                    font: 'fontawesome'
                },
                {
                    name: 'companyname',
                    value: 'company',
                    type: 'default',
                    icon: 'building-o',
                    font: 'fontawesome'
                },
                {
                    name: 'city',
                    value: 'city',
                    type: 'default',
                    icon: 'building-o',
                    font: 'fontawesome'
                },
            ],
            checkedValue: [
                {
                    name: 'akaratOff',
                    value: 'haveCome'
                },
                {
                    name: 'car',
                    value: 'haveCar'
                }
            ],
            stateFromApi: [],
            allCityFromApi: [],
            districts: [],
            subdistricts: [],
            speakLanguage: [],
            selectedState: '',
            skills: 'fair',
            socialSites: [
                {
                    name: 'skype',
                    value: 'skype',
                    type: 'default',
                    icon: 'skype',
                    font: 'fontawesome'
                },
                {
                    name: 'fbAccount',
                    label: true,
                    value: 'facebook',
                    type: 'default',
                    icon: 'facebook',
                    font: 'fontawesome'
                },
                {
                    name: 'twitrAcc',
                    label: true,
                    value: 'twitter',
                    type: 'default',
                    icon: 'twitter',
                    font: 'fontawesome'
                },
                {
                    name: 'linkedIn',
                    label: true,
                    value: 'linkedIn',
                    type: 'default',
                    icon: 'linkedin',
                    font: 'fontawesome'
                },
                {
                    name: 'google',
                    label: true,
                    value: 'google',
                    type: 'default',
                    icon: 'google-plus',
                    font: 'fontawesome'
                }
            ],
            documents: null,
            loaderPic: false,
            uploadPicName: '',
            uploadAddName: '',
            documentsAdd: null,
            loaderAdd: false
        }
    }

    ID = function () {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return ('_' + Math.random().toString(36).substr(2, 9)).toUpperCase();
    };

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

    avatar(items, index) {
        return (
            <View key={index} style={{ width: (width / 4) - 8, height: 100, marginHorizontal: 2 }}>
                <TouchableOpacity key={index} onPress={() => this.setState({ avatar: items.value, uri: '' })} activeOpacity={0.7}>
                    <Image
                        style={{ width: '100%', height: '100%' }}
                        source={items.name}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    getImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        console.log(result, "result");
        if (!result.cancelled) {
            this.setState({ avatar: 'userImage', uri: result.uri });
        }
    }

    del(item, index) {
        const { speakLanguage } = this.state

        speakLanguage.splice(index, 1)

        this.setState({
            speakLanguage,
        })
    }

    mySpeakLanguage(item, index, cross) {
        return (
            <View key={index} style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#ccc',
                paddingVertical: 2,
                paddingHorizontal: 2,
                borderRadius: 5,
                marginHorizontal: 2,
                marginVertical: 2,
                backgroundColor: '#f1f1f1'
            }}>
                <View style={{ paddingHorizontal: 5 }}>
                    <Text>{item}</Text>
                </View>
                {
                    !cross &&
                    <TouchableOpacity onPress={() => this.del(item, index)}>
                        <View style={{ backgroundColor: '#E94E1B', paddingHorizontal: 5, borderRadius: 5 }}>
                            <Text style={{ color: 'white' }}>{'X'}</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        )
    }

    setAvatar(image) {
        const { uri } = this.state
        var obj

        switch (image) {
            case 'agentavatar1':
                obj = AgentAvatar1
                break;
            case 'agentavatar2':
                obj = AgentAvatar2
                break;
            case 'agentavatar3':
                obj = AgentAvatar3
                break;
            case 'userImage':
                obj = { uri }
                break;
            case 'nophoto-.jpg':
                obj = noPhoto
                break;
            case '':
                obj = noPhoto
                break;
            default:
                obj = { uri: image }
                break;
        }

        return obj

    }

    setProof(userData) {
        if (userData.address_proof) {
            var lastIndex = userData.address_proof.lastIndexOf('.')
            var ext = userData.address_proof.slice(lastIndex + 1)
            if (ext === 'png' || ext === 'jpg' || ext === 'jpeg') {
                this.setState({
                    uploadAdd: userData.address_proof,
                    documentsAdd: false,
                    uploadAddName: '',
                    loaderAdd: false
                })
            } else {
                this.setState({
                    uploadAdd: userData.address_proof,
                    uploadAddName: 'Document',
                    documentsAdd: true,
                    loaderAdd: false,
                    uploadAddExt: ext
                })
            }
        }
        if (userData.photo_id) {
            var lastIndex1 = userData.photo_id.lastIndexOf('.')
            var ext1 = userData.photo_id.slice(lastIndex1 + 1)
            if (ext1 === 'png' || ext1 === 'jpg' || ext1 === 'jpeg') {
                this.setState({
                    uploadPic: userData.photo_id,
                    documents: false,
                    uploadPicName: '',
                    loaderPic: false
                })
            } else {
                this.setState({
                    uploadPic: userData.photo_id,
                    uploadPicName: 'Document',
                    documents: true,
                    loaderPic: false,
                    uploadPicExt: ext1
                })
            }

        }

    }

    downloadFileAsync = async (url, ext) => {
        return await FileSystem.downloadAsync(
            url,
            `${FileSystem.documentDirectory} ${this.ID()}.${ext}`
        )
            .then(({ uri }) => {
                console.log('Finished downloading to ', uri);
                return uri
            })
            .catch(error => {
                console.error(error);
            });
    }

    componentWillMount() {
        this.getState()

        this.getCountries()


        const { userData, loginUserData } = this.props


        if (userData) {

            var lastIndex = userData.address_proof.lastIndexOf('.')
            var ext = userData.address_proof.slice(lastIndex + 1)
            var lastIndex2 = userData.photo_id.lastIndexOf('.')
            var ext2 = userData.photo_id.slice(lastIndex2 + 1)
            this.downloadFileAsync(userData.address_proof, ext).then((uri) => {
                var obj = {
                    address_proof: uri
                }
                this.setProof(obj)
            })
            this.downloadFileAsync(userData.photo_id, ext2).then((uri) => {
                var obj = {
                    photo_id: uri
                }
                this.setProof(obj)
            })


            if (this.props.str.language === "arr" && userData.gender === "male") {
                this.setState({
                    gender: "الذكر"
                })
            }

            else if (this.props.str.language === "arr" && userData.gender === "Female") {
                this.setState({
                    gender: "إناثا"
                })
            }

            else {
                this.setState({
                    gender: userData.gender
                })
            }

            this.setState({
                email: loginUserData.user_email,
                fullName: userData.full_name,
                phoneNumber: userData.contact_phone,
                fax: userData.fax ? userData.fax : '',
                address: userData.address,
                age: userData.age,
                tel: userData.tel,
                siteParam: loginUserData.url_profile,
                // siteParam: userData.url_profile,
                description: userData.about_me,
                avatar: userData.avatar_photo,
                company: loginUserData.company_name,
                // gender: userData.gender,
                selectedCountry: userData.country,
                city: userData.city_live,
                skype: loginUserData.skype,
                facebook: loginUserData.fb_profile,
                twitter: loginUserData.twitter_profile,
                linkedIn: loginUserData.li_profile,
                google: loginUserData.gp_profile,
                curr_package: userData.current_package
            })
        }

    }

    componentWillReceiveProps(nextProp) {

        if (this.props.str.language === "arr" && nextProp.userData.gender === "male") {
            this.setState({
                gender: "الذكر"
            })
        }
        else if (this.props.str.language === "arr" && userData.gender === "Female") {
            this.setState({
                gender: "إناثا"
            })
        }
        else {
            this.setState({
                gender: nextProp.userData.gender
            })
        }

        console.log(nextProp.loginUserData, "loginUserData")
        this.setState({
            siteParam: nextProp.loginUserData.url_profile,
            email: nextProp.loginUserData.user_email,
            company: nextProp.loginUserData.company_name,
            skype: nextProp.loginUserData.skype,
            facebook: nextProp.loginUserData.fb_profile,
            twitter: nextProp.loginUserData.twitter_profile,
            linkedIn: nextProp.loginUserData.li_profile,
            google: nextProp.loginUserData.gp_profile,

            fullName: nextProp.userData.full_name,
            phoneNumber: nextProp.userData.contact_phone,
            fax: nextProp.userData.fax ? nextProp.userData.fax : '',
            address: nextProp.userData.address,
            age: nextProp.userData.age,
            tel: nextProp.userData.tel,
            description: nextProp.userData.about_me,
            avatar: nextProp.userData.avatar_photo,
            // gender: nextProp.userData.gender,
            selectedCountry: nextProp.userData.country,
            city: nextProp.userData.city_live,
            curr_package: nextProp.userData.current_package

        })
    }

    getCountries() {
        return axios({
            method: 'get',
            // url: "https://demo.akaratmisr.com:443/ " + this.props.str.language + "/api/location/country_code",
            url: "https://demo.akaratmisr.com:443/ " + this.props.str.language + "/api/location/countries/all",
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                // console.log(data.data.results, "countries")
                this.setState({
                    countriesFromApi: data.data.results
                })
                // this.props.setCountries(data.data.results)
            })
            .catch(err => {
                console.log(err)

            })
    }

    dropDownChange(text, index, value) {

        console.log(text, 'text')
        this.setState({
            [value]: text
        })
    }

    dropDownChangeCity = (itemValue, itemIndex) => {
        console.log(itemValue, itemIndex, "valueCities")
        if (itemIndex && itemValue) {
            this.setState({
                selectedCity: itemValue,
                selectdistricts: "",
                selectedSubDistricts: "",
                subdistricts: [],
                districts: [],
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

    dropDownChangeState = (itemValue, itemIndex) => {
        console.log(itemValue, "123456")
        if (itemValue) {
            this.setState({
                selectedState: itemValue,
                selectdistricts: "",
                selectedSubDistricts: "",
                subdistricts: [],
                districts: [],

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
                    width: "85%", marginBottom: 1,
                }}>
                    <Item style={styles.input}>
                        <View style={{ width: '90%' }}>
                            <TextInput
                                editable={items.name === "email" && this.props.userData.user_email ? false : true}
                                keyboardType={items.type}
                                placeholder={this.props.str[items.name]}
                                placeholderTextColor={'#b3b3b3'}
                                style={{
                                    borderBottomWidth: 0.4,
                                    paddingHorizontal: 5,
                                    fontSize: 16,
                                    paddingVertical: 5,
                                }}
                                value={this.state[items.value]}
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
                {
                    items.label &&
                    <View style={{ alignItems: 'flex-start', width: '85%', alignSelf: 'center' }}>
                        <Text style={{ textAlign: 'left', color: 'grey', fontSize: 10 }}>
                            {this.props.str.enterLink}
                        </Text>
                    </View>
                }
            </View>
        )
    }


    selectPicker(selectOpt, defaultVal, mystate) {
        return (
            <View
                style={{
                    height: 50,
                    width: "85%",
                    borderBottomWidth: 0.5,
                    borderColor: "#b3b3b3",
                    borderRadius: 5,
                    alignSelf: 'center',
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Item>
                    <Picker
                        mode="dropdown"
                        style={{ height: 50, width: "80%", color: "#b3b3b3" }}
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state[mystate]}
                        onValueChange={
                            (itemValue, itemIndex) => this.dropDownChange(itemValue, itemIndex, mystate)
                        }
                    >
                        <Picker.Item label={this.props.str[defaultVal]} value="" />
                        {
                            selectOpt.map((items, index) => {
                                return (
                                    <Picker.Item label={items.name} value={items.value} key={index} />
                                )
                            })
                        }
                    </Picker>
                </Item>
            </View>
        )
    }

    upgrade() {

        const obj = {
            url: `${this.props.loginUserData.upgrade_package_url}`,
            title: 'upgrade'
        }
        Actions.WebView(obj)

    }

    setSpeakLanguage(item, index) {
        const { speakLanguage } = this.state

        console.log(item, 'item here')
        if (item && speakLanguage.indexOf(item) === -1) {
            speakLanguage.splice(index, 0, item)
            this.setState({ speakLanguage })
        }

    }

    createCheckBox(checked, text, index) {
        return (
            <View key={index} style={{
                flexDirection: "row", marginLeft: "4.5%", marginVertical: 10
                // backgroundColor: "red"
            }} >
                <CheckBox checked={this.state[checked]} color="#E94E1B"
                    onPress={() => {
                        this.setState({
                            [checked]: !this.state[checked],
                        })
                    }}
                />
                <Text style={{ marginLeft: 25, fontSize: 16, fontWeight: 'bold' }}
                    onPress={() => {
                        this.setState({
                            [checked]: !this.state[checked],
                        })
                    }}
                >{this.props.str[text]}</Text>
            </View>
        )
    }

    changeFile(picker) {

        if (picker === 'addressProof') {
            this.setState({
                loaderAdd: true
            })
        }
        else if (picker === 'photoId') {
            this.setState({
                loaderPic: true
            })
        }

        var result = DocumentPicker.getDocumentAsync()

        result.then((res) => {
            if (res.type === 'success') {
                var lastIndex = res.name.lastIndexOf('.')
                var ext = res.name.slice(lastIndex + 1)
                if (picker === 'addressProof') {

                    if (ext === 'png' || ext === 'jpg' || ext === 'jpeg') {
                        this.setState({
                            uploadAdd: res.uri,
                            documentsAdd: false,
                            uploadAddName: '',
                            loaderAdd: false
                        })
                    } else {
                        this.setState({
                            uploadAdd: res.uri,
                            uploadAddName: res.name.slice(0, lastIndex),
                            documentsAdd: true,
                            loaderAdd: false,
                            uploadAddExt: ext
                        })
                    }

                }
                else if (picker === 'photoId') {

                    if (ext === 'png' || ext === 'jpg' || ext === 'jpeg') {
                        this.setState({
                            uploadPic: res.uri,
                            documents: false,
                            uploadPicName: '',
                            loaderPic: false
                        })
                    } else {
                        this.setState({
                            uploadPic: res.uri,
                            uploadPicName: res.name.slice(0, lastIndex),
                            documents: true,
                            loaderPic: false,
                            uploadPicExt: ext
                        })
                    }

                }
                console.log(ext, 'extensdion')
            } else {
                this.setState({
                    loaderPic: false,
                    loaderAdd: false
                })
            }
            console.log(res, 'result')
        })

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
            headers: image ? header1 : header2,
            data: bodyFormData
        };
        return await axios(options)
            .then((data) => {
                if (image) {
                    alert(data.data.message)
                    Actions.tabbar({ type: "reset" });
                    Actions.tabNavigation();
                }
                return data
            }).catch((err) => {
                return err
            })

    }


    uploadAvatar = async (avatar) => {

        var url = `https://demo.akaratmisr.com:443/${this.props.str.language}/api/people/user/updateProfilePhotoPictureInternational`
        var image
        switch (avatar) {
            case 'agentavatar1':
                image = 'agentavatar1.jpg'
                break;
            case 'agentavatar2':
                image = 'agentavatar2.jpg'
                break;
            case 'agentavatar3':
                image = 'agentavatar3.jpg'
                break;

            default:
                break;
        }

        var bodyFormData = new FormData();

        bodyFormData.append('profile_photo_default', image);

        this.ApiRequest(url, bodyFormData).then((res) => {
            console.log(res, 'response here from avater')
        })

    }

    uploadFile = async (uri, param, property) => {
        console.log(uri, 'my uri for file here')
        var bodyFormData = new FormData();

        let uriPartsProfile = uri.split('/');
        let fileExt = uriPartsProfile[uriPartsProfile.length - 1];
        let fileTypeProfile = fileExt.slice(fileExt.length - 3)
        var obj
        console.log(fileTypeProfile, 'my fileTypeProfile ')

        if (fileTypeProfile === 'png' || fileTypeProfile === 'jpg' || fileTypeProfile === 'jpeg') {
            obj = {
                uri,
                name: `photo.${fileTypeProfile}`,
                type: `image/${fileTypeProfile}`,
            }
        } else {
            obj = {
                uri,
                name: `document.${fileTypeProfile}`,
                type: `application/${fileTypeProfile}`,
            }
        }

        bodyFormData.append(property, obj);

        return this.ApiRequest(`https://demo.akaratmisr.com:443/${this.props.str.language}/api/people/user/${param}`, bodyFormData)
            .then((data) => {
                // if (data.data.status === 1000) {
                //     return true
                // }
                console.log(data, 'console from upload address file')
            })

    }


    uploadProfilePic = async (uri) => {

        var bodyFormData = new FormData();

        let uriPartsProfile = uri.split('.');
        let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
        bodyFormData.append('profile_photo', {
            uri: uri,
            name: `photo.${fileTypeProfile}`,
            type: `image/${fileTypeProfile}`,
        });

        return this.ApiRequest(`https://demo.akaratmisr.com:443/${this.props.str.language}/api/people/user/updateProfilePhotoPictureInternational`, bodyFormData)
            .then((data) => {
                if (data.data.status === 1000) {
                    return true
                }
            })
    }

    goWebView(url, title) {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            }
            else {
                console.log('File not supported…');
            }
        });
    }

    updateProfile() {

        const { fullName, avatar, siteParam, email, phoneNumber, gender, age, fax, tel, address, selectedCountry,
            city, description, company, skype, facebook, twitter, linkedIn, google, uri, uploadPic, uploadAdd } = this.state


        if (fullName && siteParam && phoneNumber && age) {
            this.setState({
                loader: true
            })
            if (uri) {
                this.uploadProfilePic(uri).then((res) => {

                })
            } else if (avatar && avatar.indexOf('https') === -1) {
                this.uploadAvatar(avatar).then((res) => {

                })
            }

            if (uploadPic) {
                this.uploadFile(uploadPic, 'updatePhotoIdFile', 'photo_id_file').then(() => {
                    console.log('file pic uploaded')
                })
            }
            if (uploadAdd) {
                this.uploadFile(uploadAdd, 'updateAddressFile', 'address_file').then(() => {
                    console.log('file address uploaded')

                })
            }


            var cloneData = {
                fullname: fullName,
                url_profile: siteParam,
                user_email: email,
                phone: phoneNumber,
                gender,
                age,
                fax,
                tel,
                address,
                city,
                country: selectedCountry,
                about_me: description,
                company_name: company,
                skype,
                fb_profile: facebook,
                twitter_profile: twitter,
                li_profile: linkedIn,
                gp_profile: google
            }

            let specialChars = 'àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ!@#$^&%*()+=-[]\/{}|:""<>?. ';
            var bodyFormData = new FormData();
            for (var key in cloneData) {
                if (cloneData[key] && cloneData[key] !== undefined && cloneData[key].length !== 0) {
                    console.log(cloneData[key], "inloop")
                    if (key === "url_profile") {
                        // alert("matched")
                        for (var i = 0; i < specialChars.length; i++) {
                            cloneData[key] = cloneData[key].replace(new RegExp("\\" + specialChars[i], "gi"), "");
                        }
                        let removeSpecialChars = cloneData[key].toLowerCase()
                        bodyFormData.append("url_profile", removeSpecialChars);
                    }
                    else {
                        bodyFormData.append(key, cloneData[key]);
                    }

                }
            }
            console.log(bodyFormData, 'bodyform dtata here')

            this.ApiRequest(`https://demo.akaratmisr.com:443/${this.props.str.language}/api/people/user/updateProfileInternational`, bodyFormData, true)
                .then((res) => {
                    // console.log(res, 'response data')
                    // this.setState({ loader: false })
                    // if (res && res.data) {

                    //     alert(res.data.message)
                    //     Actions.tabbar({ type: "reset" });
                    //     Actions.tabNavigation();
                    // }


                    var response = JSON.stringify(res);
                    var responseUpdated = JSON.parse(response);

                    if (responseUpdated.response.data.status == 1001) {
                        alert(responseUpdated.response.data.message)
                    }

                    this.setState({ loader: false })
                })
                .catch((err) => {
                    this.setState({ loader: false })
                    alert(res.response.data.message)
                    console.log(err, 'err here')
                })

        } else {
            alert(this.props.str.fullnameprofile)
        }


    }


    render() {
        console.log(this.state.selectedCountry, "selectedCountry")
        const { avatar, avatarIcon, siteParam, uploadPic, socialSites, uploadPicName,
            loader, countriesFromApi, curr_package, selectOptions, textInput, loaderPic,
            uploadPicExt, documents, speakLanguage, documentsAdd, uploadAdd, uploadAddExt,
            uploadAddName, loaderAdd } = this.state
        const { header, userData } = this.props

        var radio_props;
        if (this.props.str.language == "en") {

            radio_props = [
                { label: 'Fair', value: "fair" },
                { label: 'Good', value: "good" },
                { label: 'Excellent', value: "excellent" }
            ];
        }
        else {
            radio_props = [
                { label: 'معرض', value: "fair" },
                { label: 'حسن', value: "good" },
                { label: 'ممتاز', value: "excellent" }
            ];
        }

        console.log(speakLanguage, 'speak language')
        return (
            <View style={{
                flex: 1,
                backgroundColor: "white",
                width: "100%",
            }}>
                {/* /////////////////////////////header///////////////////////////// */}

                {
                    header &&
                    <View style={{
                        flex: 1.4,
                        // height: 40,
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
                            <View style={{ flexGrow: 1 }}>
                                <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.EditProfile}</Text>
                            </View>
                        </View>
                    </View>
                }

                <View style={{ flex: 8, width: "100%", }}>
                    <KeyboardAvoidingView behavior={'padding'}>
                        <ScrollView showsVerticalScrollIndicator={false}>


                            <View style={styles.base}>
                                <View style={{ borderWidth: 0.5, borderColor: 'grey', width: 120, height: 150, alignSelf: 'center', paddingVertical: 5, paddingHorizontal: 5 }}>
                                    <Image
                                        style={{ width: '100%', height: '100%' }}
                                        source={this.setAvatar(avatar)}
                                    />
                                </View>
                            </View>

                            <View style={[styles.base, { flexDirection: 'row' }]}>
                                <View style={{ width: '40%' }}>
                                    <Text style={{ fontWeight: 'bold' }}>
                                        {this.props.str.profilePic}
                                    </Text>
                                </View>
                                <View style={{ width: '60%', alignItems: 'center' }}>
                                    <View style={{ width: '100%', height: 40 }}>
                                        <Button
                                            onPress={this.getImageAsync}
                                            color={'#E94E1B'}
                                            title={this.props.str.changeAvtr}
                                        />
                                    </View>
                                </View>
                            </View>


                            <View style={styles.base}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    {this.props.str.avtr}
                                </Text>
                            </View>

                            <View style={[styles.base, { flexDirection: 'row', alignSelf: 'center' }]}>
                                {
                                    avatarIcon &&
                                    avatarIcon.map((items, index) => {
                                        return (
                                            this.avatar(items, index)
                                        )
                                    })
                                }
                            </View>

                            <View style={styles.base}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    {this.props.str.proPage}
                                </Text>
                            </View>

                            <View style={[styles.base, { flexDirection: 'row' }]}>
                                <View>
                                    <Text style={{ fontWeight: 'bold' }}>
                                        {this.props.str.link}
                                    </Text>
                                </View>
                                <View style={{ flexGrow: 1 }}>
                                    <View
                                        style={{
                                            height: 30,
                                            // flexDirection: "row",
                                            borderWidth: 0.5,
                                            borderColor: "white",
                                            borderRadius: 5,
                                            alignItems: "center",
                                            // justifyContent: "center",
                                        }}

                                    >
                                        <View style={{
                                            width: "80%"
                                        }}>
                                            <TextInput
                                                keyboardType={'default'}
                                                // placeholder={this.props.str[items.name]}
                                                placeholderTextColor={'#b3b3b3'}
                                                style={{
                                                    borderBottomWidth: 0.4,
                                                    paddingHorizontal: 5,
                                                    fontSize: 16,
                                                    color: 'grey',
                                                    paddingVertical: 5,
                                                }}
                                                value={siteParam}
                                                onChangeText={(e) => this.setState({ siteParam: e })}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>


                            <View style={{ paddingVertical: '3%' }}>
                                {
                                    textInput &&
                                    textInput.map((items, index) => {
                                        return (
                                            this.textFields(items, index)
                                        )
                                    })
                                }
                            </View>


                            {
                                countriesFromApi &&
                                <View
                                    style={{
                                        height: 50,
                                        width: "85%",
                                        borderBottomWidth: 0.5,
                                        borderColor: "#b3b3b3",
                                        borderRadius: 5,
                                        alignSelf: 'center',
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Item>
                                        <Picker
                                            mode="dropdown"
                                            style={{ height: 50, width: "85%", color: "#b3b3b3" }}
                                            placeholderStyle={{ color: "#bfc6ea" }}
                                            placeholderIconColor="#007aff"
                                            selectedValue={this.state.selectedCountry}
                                            onValueChange={
                                                (itemValue, itemIndex) => this.dropDownChange(itemValue, itemIndex, 'selectedCountry')
                                            }
                                        >
                                            <Picker.Item label={this.props.str.selectcountry} value="" />
                                            {
                                                Object.keys(this.state.countriesFromApi).map((key, index) => {
                                                    return (
                                                        // <Picker.Item label={this.state.countriesFromApi[key]} value={this.state.countriesFromApi[key]} key={index} />
                                                        <Picker.Item label={this.state.countriesFromApi[key]} value={key} key={index} />

                                                    )
                                                })
                                            }
                                        </Picker>
                                    </Item>
                                </View>

                            }


                            {
                                selectOptions &&
                                this.selectPicker(selectOptions, 'gender', 'gender')
                            }


                            <View style={[styles.base, { flexDirection: 'row' }]}>
                                {
                                    this.props.str.language == 'en' ?
                                        <>
                                            <View style={{ width: '40%' }}>
                                                <Text style={{ fontWeight: 'bold' }}>
                                                    {this.props.str.currentPackage}
                                                </Text>
                                            </View>
                                            <View style={{ width: '60%' }}>
                                                <Text style={{}}>
                                                    {/* {this.props.str.free} */}
                                                    {
                                                        curr_package &&
                                                            curr_package ? curr_package : this.props.str.free
                                                    }
                                                    {/* {'Bronze Package-Akaratmisr Subscription'} */}
                                                </Text>
                                            </View>
                                        </>
                                        :
                                        <>
                                            <View style={{ width: '60%' }}>
                                                <Text style={{ textAlign: 'right' }}>
                                                    {/* {this.props.str.free} */}
                                                    {
                                                        curr_package &&
                                                            curr_package ? curr_package : this.props.str.free
                                                    }
                                                    {/* {'Bronze Package-Akaratmisr Subscription'} */}
                                                </Text>
                                            </View>
                                            <View style={{ width: '40%' }}>
                                                <Text style={{ fontWeight: 'bold', textAlign: 'left' }}>
                                                    {this.props.str.currentPackage}
                                                </Text>
                                            </View>
                                        </>
                                }
                            </View>

                            <View
                                style={[styles.base, { alignItems: 'center' }]}
                            >
                                <View style={{ width: '80%', height: 40 }}>
                                    <Button
                                        onPress={() => this.upgrade()}
                                        color={'#E94E1B'}
                                        title={this.props.str.upgradePackage}
                                    />
                                </View>
                            </View>


                            <View style={styles.base}>
                                <View style={{ padding: "5%", width: '80%', alignSelf: 'center', backgroundColor: "#F8F8F8" }}>
                                    <Text style={{ color: "black", fontWeight: 'bold' }}>{this.props.str.description}</Text>
                                    <Textarea
                                        containerStyle={styles.textareaContainer}
                                        style={styles.textarea}
                                        onChangeText={(e) => { this.setState({ description: e }) }}
                                        defaultValue={this.state.description}
                                        maxLength={500}
                                        placeholder={this.props.str.description}
                                        placeholderTextColor={'#c7c7c7'}
                                        underlineColorAndroid={'transparent'}
                                    />
                                </View>
                            </View>



                            <View style={[styles.base, { paddingVertical: 20 }]}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    {this.props.str.uploadPic}
                                </Text>
                            </View>

                            <View style={styles.base}>
                                <View style={{ borderWidth: 0.5, justifyContent: 'center', borderColor: 'grey', width: 120, height: 150, alignSelf: 'center', paddingVertical: 5, paddingHorizontal: 5 }}>
                                    <TouchableOpacity onPress={uploadPic ? () => this.goWebView(userData.photo_id, 'Preview') : null}>
                                        {
                                            loaderPic ?
                                                <ActivityIndicator />
                                                :
                                                uploadPic ?
                                                    !documents ?
                                                        <Image
                                                            style={{ width: '100%', height: '100%' }}
                                                            source={this.setAvatar(uploadPic)}
                                                        />
                                                        :
                                                        <View>
                                                            <View>
                                                                <Text style={{ fontSize: 13, color: 'grey', textAlign: 'center' }}>
                                                                    {uploadPicName && uploadPicName.length < 15 ? uploadPicName : uploadPicName.slice(0, 15)}
                                                                </Text>
                                                            </View>
                                                            <View>
                                                                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
                                                                    {uploadPicExt && (uploadPicExt).toUpperCase()}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    :
                                                    <Text style={{ fontSize: 16, textAlign: 'center' }}>
                                                        {'n/a'}
                                                    </Text>
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View
                                style={[styles.base, { alignItems: 'center' }]}
                            >
                                <View style={{ width: '80%', height: 40 }}>
                                    <Button
                                        onPress={() => this.changeFile('photoId')}
                                        color={'#E94E1B'}
                                        title={this.props.str.change}
                                    />
                                </View>
                            </View>


                            <View style={[styles.base, { paddingVertical: 20 }]}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    {this.props.str.uploadAdd}
                                </Text>
                            </View>

                            <View style={styles.base}>
                                <View style={{ borderWidth: 0.5, justifyContent: 'center', borderColor: 'grey', width: 120, height: 150, alignSelf: 'center', paddingVertical: 5, paddingHorizontal: 5 }}>
                                    <TouchableOpacity onPress={uploadAdd ? () => this.goWebView(userData.address_proof, 'Preview') : null}>
                                        {
                                            loaderAdd ?
                                                <ActivityIndicator />
                                                :
                                                uploadAdd ?
                                                    !documentsAdd ?
                                                        <Image
                                                            style={{ width: '100%', height: '100%' }}
                                                            source={this.setAvatar(uploadAdd)}
                                                        />
                                                        :
                                                        <View>
                                                            <View>
                                                                <Text style={{ fontSize: 13, color: 'grey', textAlign: 'center' }}>
                                                                    {uploadAddName && uploadAddName.length < 15 ? uploadAddName : uploadAddName.slice(0, 15)}
                                                                </Text>
                                                            </View>
                                                            <View>
                                                                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
                                                                    {uploadAddExt && (uploadAddExt).toUpperCase()}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    :
                                                    <Text style={{ fontSize: 16, textAlign: 'center' }}>
                                                        {'n/a'}
                                                    </Text>
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View
                                style={[styles.base, { alignItems: 'center' }]}
                            >
                                <View style={{ width: '80%', height: 40 }}>
                                    <Button
                                        onPress={() => this.changeFile('addressProof')}
                                        color={'#E94E1B'}
                                        title={this.props.str.change}
                                    />
                                </View>
                            </View>


                            <View style={styles.base}>
                                {
                                    socialSites &&
                                    socialSites.map((items, index) => {
                                        return (
                                            this.textFields(items, index)
                                        )
                                    })
                                }

                            </View>


                            <View
                                style={[styles.base, { alignItems: 'center', paddingVertical: 30 }]}
                            >
                                <View style={{ width: '80%', height: 40 }}>
                                    {
                                        loader ?
                                            <ActivityIndicator />
                                            :
                                            <Button
                                                onPress={() => this.updateProfile()}
                                                color={'#E94E1B'}
                                                title={this.props.str.update}
                                            />
                                    }
                                </View>
                            </View>


                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>

            </View >
        );
    }
}

let mapStateToProps = state => {
    return {
        str: state.root.str,
        userData: state.root.userDetails,
        userCredentials: state.root.userCredentials,
        loginUserData: state.root.loginUserData

    };
};
function mapDispatchToProps(dispatch) {
    return ({
        // languageSet: (lang) => {
        //     dispatch(languageSet(lang))
        // },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(InternationalProfile);
const styles = StyleSheet.create({
    base: {
        // borderWidth: 1,
        paddingHorizontal: '3%',
        paddingVertical: '2%'
    }
});  
