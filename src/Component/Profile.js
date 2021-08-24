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
import SellerAvatar1 from '../../assets/selleravatar1.jpg'
import SellerAvatar2 from '../../assets/selleravatar2.jpg'
import SellerAvatar3 from '../../assets/selleravatar3.jpg'
import SellerAvatar4 from '../../assets/selleravatar4.jpg'
import noPhoto from '../../assets/nophoto-.jpg'
import Textarea from 'react-native-textarea';


const width = Dimensions.get('screen').width

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarIcon: [
                {
                    name: SellerAvatar1,
                    value: 'selleravatar1',
                },
                {
                    name: SellerAvatar2,
                    value: 'selleravatar2',
                },
                {
                    name: SellerAvatar3,
                    value: 'selleravatar3',
                },
                {
                    name: SellerAvatar4,
                    value: 'selleravatar4',
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
            ],
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

    componentWillMount() {
        const { userData, loginUserData } = this.props
        // console.log(userData, "USERDATAIN")
        if (userData) {
            this.setState({
                email: loginUserData.user_email,
                fullName: userData.full_name,
                phoneNumber: userData.contact_phone,
                fax: userData.fax ? userData.fax : '',
                address: userData.address,
                siteParam: loginUserData.url_profile,
                description: userData.about_me,
                avatar: userData.avatar_photo,
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
        console.log(nextProp.loginUserData, "loginUserData")
        this.setState({
            siteParam: nextProp.loginUserData.url_profile,
            email: nextProp.loginUserData.user_email,
            skype: nextProp.loginUserData.skype,
            facebook: nextProp.loginUserData.fb_profile,
            twitter: nextProp.loginUserData.twitter_profile,
            linkedIn: nextProp.loginUserData.li_profile,
            google: nextProp.loginUserData.gp_profile,

            fullName: nextProp.userData.full_name,
            phoneNumber: nextProp.userData.contact_phone,
            fax: nextProp.userData.fax ? nextProp.userData.fax : '',
            address: nextProp.userData.address,
            description: nextProp.userData.about_me,
            avatar: nextProp.userData.avatar_photo,
            curr_package: nextProp.userData.current_package

        })
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

    setAvatar(image) {
        const { uri } = this.state
        var obj

        switch (image) {
            case 'selleravatar1':
                obj = SellerAvatar1
                break;
            case 'selleravatar2':
                obj = SellerAvatar2
                break;
            case 'selleravatar3':
                obj = SellerAvatar3
                break;
            case 'selleravatar4':
                obj = SellerAvatar4
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


    textFields(items, index) {
        // let specialChars = '!@#$^&%*()+=-[]\/{}|:""<>?. ';
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

    upgrade() {

        const obj = {
            url: `${this.props.loginUserData.upgrade_package_url}`,
            title: 'upgrade'
        }
        Actions.WebView(obj)

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
                // console.log(data, "data")
                alert(data.data.message)
                Actions.tabbar({ type: "reset" });
                Actions.tabNavigation();
                return data
            }).catch((err) => {
                return err
            })

    }

    uploadAvatar = async (avatar) => {

        var url = `https://demo.akaratmisr.com:443/${this.props.str.language}/api/people/user/updateProfilePhotoPictureSeller`
        var image
        switch (avatar) {
            case 'selleravatar1':
                image = 'selleravatar1.jpg'
                break;
            case 'selleravatar2':
                image = 'selleravatar2.jpg'
                break;
            case 'selleravatar3':
                image = 'selleravatar3.jpg'
                break;
            case 'selleravatar4':
                image = 'selleravatar4.jpg'
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
        console.log("Work img")
        var bodyFormData = new FormData();

        let uriPartsProfile = uri.split('.');
        let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
        bodyFormData.append('profile_photo', {
            uri: uri,
            name: `photo.${fileTypeProfile}`,
            type: `image/${fileTypeProfile}`,
        });
        console.log("/", bodyFormData, fileTypeProfile)

        return this.ApiRequest(`https://demo.akaratmisr.com:443/${this.props.str.language}/api/people/user/updateProfilePhotoPictureSeller`, bodyFormData)
            .then((data) => {
                if (data.data.status === 1000) {
                    return true
                }
            })
    }

    updateProfile() {
        const { avatar, uri, email, fullName, siteParam, phoneNumber, fax, address, curr_package, description, skype,
            facebook, twitter, linkedIn, google } = this.state

        if (fullName && siteParam && phoneNumber) {
            this.setState({ loader: true })
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
                about_me: description,
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
                        console.log(removeSpecialChars, "remove")
                        bodyFormData.append("url_profile", removeSpecialChars);
                    }
                    else {
                        bodyFormData.append(key, cloneData[key]);
                    }

                }
            }

            console.log(bodyFormData, 'bodyform dtata here')

            this.ApiRequest(`https://demo.akaratmisr.com:443/${this.props.str.language}/api/people/user/updateProfileSeller`, bodyFormData, true)
                .then((res) => {

                    var response = JSON.stringify(res);
                    var responseUpdated = JSON.parse(response);

                    // console.log(responseUpdated.data.status, responseUpdated.data.message, responseUpdated.data.status === 1000, "responseUpdated")
                    // console.log(responseUpdated, "responseUpdated")

                    if (responseUpdated.response.data.status == 1001) {
                        alert(responseUpdated.response.data.message)
                    }


                    // if (responseUpdated.data.status === 1000) {
                    //     alert("working")
                    //     // alert(responseUpdated.data.message)
                    // }
                    // else {
                    //     alert("else working")

                    // }

                    // if (res && res.data) {
                    //     alert(res.data.message)
                    //     // Actions.tabNavigation();
                    // }

                    this.setState({ loader: false })
                    // Actions.browse()

                })
                .catch((err) => {
                    this.setState({ loader: false })
                    // alert(err.response.data.message)
                    console.log(err, 'err here')
                    // console.log(JSON.stringify(err), "errerrerr")

                })

        } else {

            alert(this.props.str.fullnameprofile)

        }

    }

    render() {
        const { avatarIcon, siteParam, textInput, socialSites, avatar, curr_package, loader } = this.state
        const { header } = this.props

        console.log(this.state.email, "emailemailemail")
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

                            <View style={[styles.base, { flexDirection: 'row' }]}>
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

                            <View style={[styles.base, { flexDirection: 'row' }]}>
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
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
const styles = StyleSheet.create({
    base: {
        // borderWidth: 1,
        paddingHorizontal: '3%',
        paddingVertical: '2%'
    }
});  
