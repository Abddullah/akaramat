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


const width = Dimensions.get('screen').width

class AgentProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
                    name: 'Male',
                    value: 'male'
                },
                {
                    name: 'Female',
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
            ]
        }
    }

    getState = async () => {
        return await axios({
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
                return state
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

    componentDidMount() {
        const { userData } = this.props

        if (userData.state) {
            this.getState().then((states) => {
                if (states) {
                    states.map((items, index) => {
                        if (items.name === userData.state) {
                            this.dropDownChangeState(items.id, index).then((cities) => {
                                if (userData.city) {
                                    if (cities) {
                                        console.log(cities, 'cities my ')
                                        cities.map((myCity, myIndex) => {
                                            if (myCity.name === userData.city) {
                                                this.dropDownChangeCity(myCity.id, myIndex).then((district) => {
                                                    // console.log(district, 'my districts gere')
                                                    if (district && district.length) {
                                                        district.map((myDistrict, myDisIndex) => {
                                                            if (myDistrict.name === userData.district) {
                                                                this.dropDownChangeDistricts(myDistrict.id, myDisIndex).then((subDist) => {
                                                                    if (subDist && subDist.length) {
                                                                        subDist.map((subDistrict, subIndex) => {
                                                                            if (subDistrict.name === userData.subdistrict) {
                                                                                this.setState({
                                                                                    selectedSubDistricts: subDistrict.id
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    })
                }
                // console.log(states, 'my states here from props')
            })
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

    componentWillMount() {

        const { userData, loginUserData } = this.props

        this.setState({
            email: loginUserData.user_email,
            fullName: userData.full_name,
            phoneNumber: userData.contact_phone,
            fax: userData.fax ? userData.fax : '',
            address: userData.address,
            siteParam: loginUserData.url_profile,
            description: userData.about_me,
            avatar: userData.avatar_photo,
            company: loginUserData.company_name,
            verify: userData.account_verify_name,
            skype: loginUserData.skype,
            facebook: loginUserData.fb_profile,
            twitter: loginUserData.twitter_profile,
            linkedIn: loginUserData.li_profile,
            google: loginUserData.gp_profile,
            curr_package: userData.current_package
        })

    }


    componentWillReceiveProps(nextProp) {
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

            // nextProp.userData
            fullName: nextProp.userData.full_name,
            phoneNumber: nextProp.userData.contact_phone,
            fax: nextProp.userData.fax ? nextProp.userData.fax : '',
            address: nextProp.userData.address,
            description: nextProp.userData.about_me,
            avatar: nextProp.userData.avatar_photo,
            verify: nextProp.userData.account_verify_name,
            curr_package: nextProp.userData.current_package
        })
    }

    dropDownChange(text, index, value) {
        this.setState({
            [value]: text
        })
    }

    dropDownChangeCity = async (itemValue, itemIndex) => {
        console.log(itemValue, itemIndex, "valueCities")
        if (itemValue) {
            this.setState({
                selectedCity: itemValue,
                selectdistricts: "",
                selectedSubDistricts: "",
                subdistricts: [],
                districts: [],

            })
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/districts/" + itemValue
            return await axios({
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
                    return districts
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    dropDownChangeState = async (itemValue, itemIndex) => {
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
            return await axios({
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
                    return city
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    dropDownChangeDistricts = async (itemValue, itemIndex) => {
        console.log(itemValue, itemIndex, "valueDist")
        if (itemValue) {
            this.setState({
                selectedDistricts: itemValue,
            })
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/subdistricts/" + itemValue
            return await axios({
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
                    return subdistricts
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
                // console.log(data,"data")
                if (image) {
                    alert(data.data.message)
                    Actions.tabbar({ type: "reset" });
                    Actions.tabNavigation();
                }
                return data
            }).catch((err) => {
                // console.log(data,"err")
                return err
            })

    }

    uploadAvatar = async (avatar) => {

        var url = `https://demo.akaratmisr.com:443/${this.props.str.language}/api/people/user/updateProfilePhotoPictureAgent`
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

    uploadProfilePic = async (uri) => {
        var bodyFormData = new FormData();
        let uriPartsProfile = uri.split('.');
        let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
        bodyFormData.append('profile_photo', {
            uri: uri,
            name: `photo.${fileTypeProfile}`,
            type: `image/${fileTypeProfile}`,
        });

        return this.ApiRequest(`https://demo.akaratmisr.com:443/${this.props.str.language}/api/people/user/updateProfilePhotoPictureAgent`, bodyFormData)
            .then((data) => {
                if (data.data.status === 1000) {
                    return true
                }
            })
    }

    updateProfile() {

        const { fullName, avatar, siteParam, email, phoneNumber, fax, address,
            description, company, skype, facebook, twitter, linkedIn, google, uri,
            selectedState, selectedCity, selectedDistricts, selectedSubDistricts,
        } = this.state

        if (fullName && siteParam && phoneNumber) {

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


            var cloneData = {
                fullname: fullName,
                url_profile: siteParam,
                user_email: email,
                phone: phoneNumber,
                fax,
                address,
                state: selectedState,
                city: selectedCity,
                location_district: selectedDistricts,
                location_subdistrict: selectedSubDistricts,
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
                    // console.log(cloneData[key], "inloop")
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

            this.ApiRequest(`https://demo.akaratmisr.com:443/${this.props.str.language}/api/people/user/updateProfileAgent`, bodyFormData, true)
                .then((res) => {

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
                    // alert(err.response.data.message)
                    console.log(err, 'err here')
                })


        } else {
            alert(this.props.str.fullnameprofile)
        }

    }

    verifyAccount() {

        var options = {
            method: 'POST',
            url: `https://demo.akaratmisr.com:443/${this.props.str.language}/api/people/user/verifyUserAccount`,
            headers: {
                token: "bearer " + this.props.userCredentials.token,
                clientsecret: '(*jh2kj36gjhasdi78743982u432j',
                clientkey: '34532hbjdsakjd2&&gjhjh11',
            },
        };
        return axios(options)
            .then((data) => {

                alert(data.data.message)
            }).catch((err) => {
                return err
            })

    }


    render() {
        const { avatar, avatarIcon, siteParam, socialSites, loader, checkedValue, curr_package, selectOptions, textInput, stateFromApi, selectOptions2, speakLanguage } = this.state
        const { header } = this.props

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

                            {/* Input State or City */}
                            {
                                stateFromApi &&
                                <View
                                    style={{
                                        width: "85%",
                                        alignSelf: 'center',
                                        alignItems: "center",
                                    }}
                                >
                                    <Item>
                                        <Picker
                                            mode="dropdown"
                                            style={{ height: 60, alignSelf: 'center', width: "80%", color: "#b3b3b3" }}
                                            placeholderStyle={{ color: "#bfc6ea" }}
                                            placeholderIconColor="#007aff"
                                            selectedValue={this.state.selectedState}
                                            onValueChange={
                                                (itemValue) => this.dropDownChangeState(itemValue)
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
                                    {
                                        (this.state.selectedState != "") ? (
                                            <Animatable.View animation="slideInLeft" iterationCount={1}>
                                                <Item>
                                                    <Picker
                                                        mode="dropdown"
                                                        style={{ height: 60, width: "100%", color: "#b3b3b3" }}
                                                        placeholderStyle={{ color: "#bfc6ea" }}
                                                        placeholderIconColor="#007aff"
                                                        selectedValue={this.state.selectedCity}
                                                        // onValueChange={(itemValue, itemIndex) => this.setState({ selectedCity: itemValue })}

                                                        onValueChange={
                                                            // (itemValue, itemIndex) => this.setState({ selectedCity: itemValue })
                                                            (itemValue, itemIndex) => this.dropDownChangeCity(itemValue, itemIndex)
                                                        }

                                                    >

                                                        <Picker.Item label={this.props.str.selectcity} value="" />
                                                        {
                                                            this.state.allCityFromApi.map((key, index) => {
                                                                // return (
                                                                //     <Picker.Item label={key.name_en} value={key.id} key={index} />
                                                                // )
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
                                                        style={{ height: 50, width: "100%", color: "grey" }}
                                                        placeholderStyle={{ color: "#E94E1C" }}
                                                        placeholderIconColor="#E94E1C"
                                                        selectedValue={this.state.selectedDistricts}
                                                        // onValueChange={(itemValue, itemIndex) => this.setState({ selectedCity: itemValue })}

                                                        onValueChange={
                                                            // (itemValue, itemIndex) => this.setState({ selectedCity: itemValue })
                                                            (itemValue, itemIndex) => this.dropDownChangeDistricts(itemValue, itemIndex)
                                                        }

                                                    >

                                                        <Picker.Item label={this.props.str.selectdistricts} value="" />
                                                        {
                                                            this.state.districts.map((key, index) => {
                                                                // return (
                                                                //     <Picker.Item label={key.name_en} value={key.id} key={index} />
                                                                // )
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
                                                        style={{ height: 50, width: "100%", color: "grey" }}
                                                        placeholderStyle={{ color: "#E94E1C" }}
                                                        placeholderIconColor="#E94E1C"
                                                        selectedValue={this.state.selectedSubDistricts}
                                                        // onValueChange={(itemValue, itemIndex) => this.setState({ selectedCity: itemValue })}

                                                        onValueChange={
                                                            (itemValue, itemIndex) => this.setState({ selectedSubDistricts: itemValue })
                                                        }

                                                    >

                                                        <Picker.Item label={this.props.str.selectsubdistricts} value="" />
                                                        {
                                                            this.state.subdistricts.map((key, index) => {
                                                                // return (
                                                                //     <Picker.Item label={key.name_en} value={key.id} key={index} />
                                                                // )
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
                                            </Animatable.View>
                                        ) : null
                                    }

                                </View>
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


                            <View style={[styles.base, { flexDirection: 'row' }]}>
                                {
                                    this.props.str.language == 'en' ?
                                        <>
                                            <View style={{ width: '40%' }}>
                                                <Text style={{ fontWeight: 'bold' }}>
                                                    {this.state.verify ? this.state.verify : this.props.str.verification}
                                                </Text>
                                            </View>
                                            <View style={{ width: '60%' }}>
                                                <Text style={{}}>
                                                    {/* {this.props.str.free} */}
                                                    {
                                                        this.state.verify &&
                                                            this.state.verify ? this.state.verify : null
                                                    }
                                                </Text>
                                            </View>
                                        </>
                                        :
                                        <>
                                            <View style={{ width: '60%' }}>
                                                <Text style={{ textAlign: 'right' }}>
                                                    {/* {this.props.str.free} */}
                                                    {
                                                        this.state.verify &&
                                                            this.state.verify ? this.state.verify : null
                                                    }
                                                </Text>
                                            </View>
                                            <View style={{ width: '40%' }}>
                                                <Text style={{ fontWeight: 'bold', textAlign: 'left' }}>
                                                    {this.state.verify ? this.state.verify : this.props.str.verification}
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
                                        onPress={() => this.verifyAccount()}
                                        color={'#E94E1B'}
                                        title={this.props.str.verifyAcc}
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
export default connect(mapStateToProps, mapDispatchToProps)(AgentProfile);
const styles = StyleSheet.create({
    base: {
        // borderWidth: 1,
        paddingHorizontal: '3%',
        paddingVertical: '2%'
    }
});  
