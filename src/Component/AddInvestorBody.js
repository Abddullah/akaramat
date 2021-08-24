import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, StatusBar, RefreshControl,
    Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Badge, Picker, Item, Input } from 'native-base';
import { connect } from "react-redux";
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
// import Drawer from '../../Component/drawer';
import MapDirection from '../Component/map'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DocumentPicker, ImagePicker } from 'expo';
import Modal from "react-native-modal";
import InfiniteScroll from 'react-native-infinite-scroll';
class Favorites extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedValue: "Actions",
            selectedState: "",
            featuredimage: null,
            moreloader: false,
            allCityFromApi: [],
            stateFromApi: [],
            brochure_file: null,
            isloader: false,
            loaderFlag:false,
            countriesFromApi: {},
            selectedCountry: "4",
            page: 10,

        }
    }
    componentWillMount() {
        var { height, width } = Dimensions.get('window');
        this.setState({
            screenHeight: height,
        })
        this.setState({
            token: this.props.userCredentials.token,
        }, () => {
            console.log(this.state.token, this.props.userCredentials.token, "token")
        })
        this.getCountries(this)
        this.getCategoryPropertyMenu(this)
        this.getState(this)


    }
    getCountries() {
        return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/ " + this.props.str.language + "/api/location/country_code",
            // url: "https://demo.akaratmisr.com:443/ " + this.props.str.language + "/api/location/countries/all",
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
    dropDownChange = (itemValue, itemIndex) => {
        // alert(itemValue,)
        this.setState({
            selectedCountry: itemValue,
        })
    }
    getCategoryPropertyMenu() {
        return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/dataselect/getNewCategoryProperty",
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                let categoryPropertyMenu = data.data.results
                // console.log(categoryPropertyMenu, "categoryPropertyMenu")
                this.setState({
                    categoryPropertyMenu: categoryPropertyMenu
                })
            })
            .catch(err => {
                console.log(err)
            })
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
    dropDownChangeState = (itemValue, itemIndex) => {
        if (itemValue && itemIndex) {
            this.setState({
                selectedState: itemValue,
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
    location = (marker) => {
        this.setState({
            latitude: marker.latitude,
            longitude: marker.longitude,
        })

    }
    featuredimage = async () => {
        // alert("work")
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        console.log(result, "result");
        if (!result.cancelled) {
            this.setState({ featuredimage: result.uri });
        }
    }
    _toggleModal = () => {
        // alert("work")
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }

    galleryImage = async (serial) => {
        let result = await ImagePicker.launchImageLibraryAsync({
        });
        console.log(result, "resultphoto");
        if (!result.cancelled) {
            this.setState({ [`gallery${serial}`]: result.uri, });
        }
    };
    _pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: 'application/pdf',

        });
        if (result.type !== "cancel") {
            this.setState({ brochure_file: result });
        }
        // this.setState({ brochure_file: result });

        console.log(result.type === "cancel", result, result.uri, "result");
    }
    submitMyInvestors() {
        this.setState({
            loaderFlag:true
        })
        // console.log("data",this.state[this.props.str.name])
        // console.log("data",this.state[this.props.str.email])
        // console.log("data",this.state[this.props.str.phoneNumber])
        // console.log("data",this.state[this.props.str.addressOfInvestor])
        // console.log("data",this.state[this.props.str.city])
        // console.log("data",this.state[this.props.str.state])
        // console.log("data",this.state.selectedCountry)
        // console.log("data",this.state.type)
        // console.log("data",this.state[this.props.str.description])
        // console.log("data",this.state[this.props.str.proposedVal])
        // console.log("data",this.state[this.props.str.address])
        // console.log("data",this.state.selectedState)
        // console.log("data",this.state.longitude)
        // console.log("data",this.state.latitude)
        // console.log("data",this.state[this.props.str.embeddedvideourl])



        cloneData = {
            // token: "Bearer " + this.state.token,
            name: this.state[this.props.str.name],
            email: this.state[this.props.str.email],
            phoneNumber: this.state[this.props.str.phoneNumber],
            addressOfInvestor: this.state[this.props.str.addressOfInvestor],
            city: this.state[this.props.str.city],
            state: this.state[this.props.str.state],
            selectcountry: this.state.selectedCountry,
            type: this.state.type,
            proposedVal: this.state[this.props.str.proposedVal],
            description: this.state[this.props.str.description],
            address: this.state[this.props.str.address],
            selectedState: this.state.selectedState,
            longitude: this.state.longitude,
            latitude: this.state.latitude,
            embeddedvideourl: this.state[this.props.str.embeddedvideourl],
        }
        if (this.state.brochure_file != null) {
            cloneData.brochure_file = this.state.brochure_file.uri
        }
        var bodyFormData = new FormData();

        if (this.state.featuredimage != null) {
            // featuredimage
            let uriPartsProfile = this.state.featuredimage.split('.');
            let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
            bodyFormData.append('property_featured_img', {
                uri: this.state.featuredimage,
                name: `photo.${fileTypeProfile}`,
                type: `image/${fileTypeProfile}`,
            });
        }
        if (this.state.gallery1 != null) {
            // gallery image 1
            let uriPartsProfile = this.state.gallery1.split('.');
            let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
            bodyFormData.append('gallery_photos[]', {
                uri: this.state.gallery1,
                name: `photo.${fileTypeProfile}`,
                type: `image/${fileTypeProfile}`,
            });
        }
        if (this.state.gallery2 != null) {
            // gallery image 2
            let uriPartsProfile = this.state.gallery2.split('.');
            let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
            bodyFormData.append('gallery_photos[]', {
                uri: this.state.gallery2,
                name: `photo.${fileTypeProfile}`,
                type: `image/${fileTypeProfile}`,
            });
        }
        if (this.state.gallery3 != null) {
            // gallery image 3
            let uriPartsProfile = this.state.gallery3.split('.');
            let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
            bodyFormData.append('gallery_photos[]', {
                uri: this.state.gallery3,
                name: `photo.${fileTypeProfile}`,
                type: `image/${fileTypeProfile}`,
            });
        }
        if (this.state.gallery4 != null) {
            // gallery image 4
            let uriPartsProfile = this.state.gallery4.split('.');
            let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
            bodyFormData.append('gallery_photos[]', {
                uri: this.state.gallery4,
                name: `photo.${fileTypeProfile}`,
                type: `image/${fileTypeProfile}`,
            });
        }
        if (this.state.gallery5 != null) {
            // gallery image 5
            let uriPartsProfile = this.state.gallery5.split('.');
            let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
            bodyFormData.append('gallery_photos[]', {
                uri: this.state.gallery5,
                name: `photo.${fileTypeProfile}`,
                type: `image/${fileTypeProfile}`,
            });
        }
        if (this.state.gallery6 != null) {
            // gallery image 6
            let uriPartsProfile = this.state.gallery6.split('.');
            let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
            bodyFormData.append('gallery_photos[]', {
                uri: this.state.gallery6,
                name: `photo.${fileTypeProfile}`,
                type: `image/${fileTypeProfile}`,
            });
        }
        let flag = true;
        for (var key in cloneData) {
            if ((cloneData[key] && cloneData[key] !== undefined && cloneData[key].length !== 0)||(key==="embeddedvideourl")) {
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
            else {
                alert(key + " is required")
                flag = false
                this.setState({loaderFlag:false})
                break;
            }
        }




        if (flag === true) {
            console.log(cloneData, "cloneData")
            var options = {
                method: 'POST',
                url: 'https://demo.akaratmisr.com:443/en/api/people/user/addInvestors',
                headers:
                {
                    token: "bearer " + this.state.token,
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
                    console.log(data, "data")
                    alert(JSON.stringify(data.data.message))
                    // Actions.tabbar({ type: "reset" });
                    // Actions.tabNavigation();
                    this.setState({
                        loaderFlag: !this.state.loaderFlag
                    })
                    // Actions.tabNavigation()
                }).catch((err) => {
                    alert(JSON.stringify(err.response.data.message))
                    console.log(JSON.parse(JSON.stringify(err)), 'ERRROR')
                    // this.setState({
                    //     loaderFlag: !this.state.loaderFlag
                    // })
                })

        }







    }
    render() {
        // let test="Phone Number"
        // alert(this.state["Phone Number"])

        return (
            <ScrollView style={{
                flex: 1, width: "100%",
            }}>

                <TouchableOpacity style={{ backgroundColor: "red" }} >
                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={{ flex: 0.4, justifyContent: 'center', alignItems: "center" }}>
                            <View style={{ width: "80%", flex: 1, justifyContent: "center", alignItems: "center", }}>
                                <View style={{ flex: 0.8, flexWrap: "wrap", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                    <TouchableOpacity style={{ backgroundColor: "white", width: "30%", height: "46%", margin: "1%", justifyContent: "center", alignItems: "center" }} onPress={() => { this.galleryImage("1") }}>
                                        {
                                            (this.state.gallery1) ? (
                                                <Image source={{ uri: this.state.gallery1 }} style={{ width: 55, height: 55, marginHorizontal: 6, marginTop: 2 }} />
                                            ) : (
                                                    <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "red" }}>
                                                        <Image style={{ height: 55, width: 55, }} source={require("../assets/Images/defaultImage.png")} />
                                                        {/* <Text >Select Image</Text> */}
                                                    </View>
                                                )
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: "white", width: "30%", height: "46%", margin: "1%", justifyContent: "center", alignItems: "center" }} onPress={() => { this.galleryImage("2") }}>
                                        {
                                            (this.state.gallery2) ? (
                                                <Image source={{ uri: this.state.gallery2 }} style={{ width: 55, height: 55, marginHorizontal: 6, marginTop: 2 }} />
                                            ) : (
                                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                        <Image style={{ height: 55, width: 55, }} source={require("../assets/Images/defaultImage.png")} />
                                                        {/* <Text >Select Image</Text> */}
                                                    </View>
                                                )
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: "white", width: "30%", height: "46%", margin: "1%", justifyContent: "center", alignItems: "center" }} onPress={() => { this.galleryImage("3") }}>
                                        {
                                            (this.state.gallery3) ? (
                                                <Image source={{ uri: this.state.gallery3 }} style={{ width: 55, height: 55, marginHorizontal: 6, marginTop: 2 }} />
                                            ) : (
                                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                        <Image style={{ height: 55, width: 55, }} source={require("../assets/Images/defaultImage.png")} />
                                                        {/* <Text >Select Image</Text> */}
                                                    </View>
                                                )
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: "white", width: "30%", height: "46%", margin: "1%", justifyContent: "center", alignItems: "center" }} onPress={() => { this.galleryImage("4") }}>
                                        {
                                            (this.state.gallery4) ? (
                                                <Image source={{ uri: this.state.gallery4 }} style={{ width: 55, height: 55, marginHorizontal: 6, marginTop: 2 }} />
                                            ) : (
                                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                        <Image style={{ height: 55, width: 55, }} source={require("../assets/Images/defaultImage.png")} />
                                                        {/* <Text >Select Image</Text> */}
                                                    </View>
                                                )
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: "white", width: "30%", height: "46%", margin: "1%", justifyContent: "center", alignItems: "center" }} onPress={() => { this.galleryImage("5") }}>
                                        {
                                            (this.state.gallery5) ? (
                                                <Image source={{ uri: this.state.gallery5 }} style={{ width: 55, height: 55, marginHorizontal: 6, marginTop: 2 }} />
                                            ) : (
                                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                        <Image style={{ height: 55, width: 55, }} source={require("../assets/Images/defaultImage.png")} />
                                                        {/* <Text >Select Image</Text> */}
                                                    </View>
                                                )
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: "white", width: "30%", height: "46%", margin: "1%", justifyContent: "center", alignItems: "center" }} onPress={() => { this.galleryImage("6") }}>
                                        {
                                            (this.state.gallery6) ? (
                                                <Image source={{ uri: this.state.gallery6 }} style={{ width: 55, height: 55, marginHorizontal: 6, marginTop: 2 }} />
                                            ) : (
                                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                        <Image style={{ height: 55, width: 55, }} source={require("../assets/Images/defaultImage.png")} />
                                                        {/* <Text >Select Image</Text> */}
                                                    </View>
                                                )
                                        }
                                    </TouchableOpacity>




                                </View>

                                <TouchableOpacity style={{ flex: 0.2, backgroundColor: "white", width: "95%", height: "10%", justifyContent: "center", alignItems: "center" }} onPress={this._toggleModal}>
                                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>UPLOAD</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </TouchableOpacity>
                {/* //////////////////////////////////////Properties i added////////////////////////////////////// */}
                {
                    // (this.state.iAddedProperties) ? (
                    (this.state.isloader === true) ? (
                        <View style={{
                            justifyContent: 'center',
                            alignItems: "center",
                            height: this.state.screenHeight / 1.25
                        }}>
                            <ActivityIndicator size="large" color="#E94E1B" />
                            <Text style={{ marginTop: 10 }} >Loading....</Text>
                        </View>
                    ) : <InfiniteScroll
                        horizontal={false}
                    >
                            {/* <Text>matruu</Text> */}
                            <View style={{ backgroundColor: "#1E90FF", height: 40, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>{this.props.str.aboutme}</Text>
                            </View>
                            {/* about me */}
                            {
                                [[this.props.str.name], [this.props.str.email], [this.props.str.phoneNumber], [this.props.str.addressOfInvestor], [this.props.str.city], [this.props.str.state]].map((value, index) => {
                                    // console.log(value, index, "value,index")
                                    return (
                                        <View style={{ paddingHorizontal: 10, justifyContent: "center", alignItems: "center", }}>

                                            {/* <View style={{ marginTop: 25 }}> */}
                                            <Item style={styles.input}>
                                                <Input
                                                    // keyboardType={"number"}
                                                    placeholder={value[0]}
                                                    keyboardType={(value[0] === "Phone Number") ? ("numeric") : null}
                                                    placeholderStyle={{ fontSize: 10 }}
                                                    placeholderTextColor="#b3b3b3"
                                                    label={this.props.str.title}
                                                    style={{ fontSize: 16 }}
                                                    onChangeText={(e) => { this.setState({ [value[0]]: e }) }}
                                                    value={this.state[value[0]]}
                                                />
                                                {/* <Icon name='format-title' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} /> */}
                                            </Item>
                                            {/* </View> */}
                                        </View >
                                    )
                                })
                            }

                            <View style={{
                                paddingHorizontal: 25, justifyContent: "center",
                                alignItems: "center",
                            }}>

                                <Item>
                                    <Picker
                                        mode="dropdown"
                                        style={{ height: 50, width: "80%", }}
                                        // placeholderStyle={{ color: "red" }}
                                        // placeholderIconColor="#007aff"
                                        // placeholder="babluuu"
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
                            {/* about my assets */}

                            <View style={{ backgroundColor: "#1E90FF", height: 40, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>{this.props.str.aboutMyFix}</Text>
                            </View>

                            <View style={{
                                paddingHorizontal: 25, justifyContent: "center",
                                alignItems: "center",
                            }}>
                                {
                                    (this.state.categoryPropertyMenu) ? (

                                        <Item>
                                            <Picker
                                                mode="dropdown"
                                                style={{ height: 50, width: "90%", color: "black" }}
                                                placeholderStyle={{ color: "#E94E1C" }}
                                                placeholderIconColor="#E94E1C"
                                                selectedValue={this.state.type}
                                                onValueChange={
                                                    (itemValue, itemIndex) => this.setState({ type: itemValue })
                                                }
                                            >
                                                <Picker.Item label={this.props.str.type} value="" />
                                                {
                                                    Object.keys(this.state.categoryPropertyMenu).map((key, index) => {
                                                        return (
                                                            <Picker.Item label={this.state.categoryPropertyMenu[key]} value={Object.keys(this.state.categoryPropertyMenu)[index]} key={this.state.categoryPropertyMenu[key]} />

                                                            // <Picker.Item label={this.state.categoryPropertyMenu[key]} value={this.state.categoryPropertyMenu[key]} key={this.state.categoryPropertyMenu[key]} />
                                                        )
                                                    })
                                                }
                                            </Picker>
                                        </Item>
                                    )
                                        : null
                                }
                            </View>


                            {
                                [[this.props.str.proposedVal, ], [this.props.str.description], [this.props.str.address]].map((value, index) => {
                                    // console.log(value, index, "value,index")
                                    return (
                                        <View style={{ paddingHorizontal: 10, justifyContent: "center", alignItems: "center", }}>

                                            {/* <View style={{ marginTop: 25 }}> */}
                                            <Item style={styles.input}>
                                                <Input
                                                    // keyboardType={"number"}
                                                    placeholder={value[0]||value}
                                                    keyboardType={(value[0] === "Phone Number") ? ("numeric") : null}
                                                    placeholderStyle={{ fontSize: 10 }}
                                                    placeholderTextColor="#b3b3b3"
                                                    label={this.props.str.title}
                                                    style={{ fontSize: 16 }}
                                                    onChangeText={(e) => { this.setState({ [value[0]]: e }) }}
                                                    value={this.state[value[0]]}
                                                />
                                                {/* <Icon name='format-title' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} /> */}
                                            </Item>
                                            {/* </View> */}
                                        </View >
                                    )
                                })
                            }



                            <View style={{ paddingHorizontal: 10, justifyContent: "center", alignItems: "center", }}>

                                <Item style={styles.input}>
                                    <Picker
                                        mode="dropdown"
                                        style={{ height: 50, width: "90%", color: "black" }}
                                        placeholderStyle={{ color: "#E94E1C" }}
                                        placeholderIconColor="#E94E1C"
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
                                {
                                    (this.state.selectedState !== "") ? (
                                        <Animatable.View animation="slideInLeft" iterationCount={1}>
                                            <Item>
                                                <Picker
                                                    mode="dropdown"
                                                    style={{ height: 50, width: "90%", color: "black" }}
                                                    placeholderStyle={{ color: "#E94E1C" }}
                                                    placeholderIconColor="#E94E1C"
                                                    selectedValue={this.state.selectedCity}
                                                    onValueChange={(itemValue, itemIndex) => this.setState({ selectedCity: itemValue })}
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
                            </View>

                            {/* Google map */}

                            <View
                                style={{
                                    marginHorizontal: 28,

                                    marginVertical: 10,
                                    // flex: 0.5,
                                    width: "85%",
                                    borderWidth: 1,
                                    // borderColor: "#E94E1C",
                                    borderColor: "#1E90FF",
                                    borderRadius: 0,
                                    backgroundColor: "#EDEDED",
                                }}
                            >
                                <Text>{this.props.str.googlemap}</Text>
                                <MapDirection mapLocation={(marker) => { this.location(marker) }} />
                            </View>
                            <View style={{ backgroundColor: "#1E90FF", height: 40, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>{this.props.str.imagesAndDoc}</Text>
                            </View>
                            {/* embed url */}
                            {
                                [[this.props.str.embeddedvideourl]].map((value, index) => {
                                    // console.log(value, index, "value,index")
                                    return (
                                        <View style={{ paddingHorizontal: 10, justifyContent: "center", alignItems: "center", }}>

                                            {/* <View style={{ marginTop: 25 }}> */}
                                            <Item style={styles.input}>
                                                <Input
                                                    // keyboardType={"number"}
                                                    placeholder={value[0]||value}
                                                    keyboardType={(value[0] === "Phone Number") ? ("numeric") : null}
                                                    placeholderStyle={{ fontSize: 10 }}
                                                    placeholderTextColor="#b3b3b3"
                                                    label={this.props.str.title}
                                                    style={{ fontSize: 16 }}
                                                    onChangeText={(e) => { this.setState({ [value[0]]: e }) }}
                                                    value={this.state[value[0]]}
                                                />
                                                <MaterialCommunityIcons name='youtube' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                            </Item>
                                            {/* </View> */}
                                        </View >
                                    )
                                })
                            }
                            {/* ////////////////////////////////featuredimage///////////////////////////// */}

                            <View style={{ marginHorizontal: 28, marginTop: 15, height: 70, width: "85%", flexDirection: "row", borderWidth: 1, borderColor: "#1E90FF", borderRadius: 0, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
                                <View style={{ width: "40%", marginVertical: 0, }}>
                                    {
                                        (this.state.featuredimage != null) ? (
                                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", marginHorizontal: "10%", marginVertical: 5, flexWrap: "wrap" }}>
                                                <Image style={{ height: 55, width: 55, marginHorizontal: 6, marginTop: 2 }} source={{ uri: this.state.featuredimage }} />
                                            </View>
                                        )
                                            : <Text style={{ color: "black", fontWeight: "bold" }}>{this.props.str.featuredimage}</Text>
                                    }
                                </View>

                                <View style={{ width: "40%", height: 40, marginVertical: 50, justifyContent: "center", alignItems: "center", }}>
                                    <TouchableOpacity onPress={() => this.featuredimage()} style={{ backgroundColor: "green", height: 40, width: "90%", justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 10 }}>{this.props.str.featuredimage}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* ////////////////////////////////Gallery///////////////////////////// */}

                            <View style={{ marginHorizontal: 28, marginTop: 15, height: 70, width: "85%", flexDirection: "row", borderWidth: 1, borderColor: "#1E90FF", borderRadius: 0, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
                                <View style={{ width: "40%", marginVertical: 0, }}>
                                    <Text style={{ color: "black", fontWeight: "bold" }}>{this.props.str.gallery}</Text>
                                </View>
                                <View style={{ width: "40%", height: 40, marginVertical: 50, justifyContent: "center", alignItems: "center", }}>

                                    <TouchableOpacity onPress={() => this._toggleModal()} style={{ backgroundColor: "green", height: 40, width: "90%", justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 10 }}>{this.props.str.gallery}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* PDF UPLOAD */}
                            <View style={{ marginHorizontal: 28, marginTop: 15, height: 70, width: "85%", flexDirection: "row", borderWidth: 1, borderColor: "#1E90FF", borderRadius: 0, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
                                <View style={{ width: "40%", marginVertical: 0, }}>
                                    {
                                        this.state.brochure_file != null ?
                                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", marginHorizontal: "10%", marginVertical: 5, flexWrap: "wrap" }}>
                                                <Image style={{ height: 55, width: 55, marginHorizontal: 6, marginTop: 2, }} source={require("../assets/Images/download.png")} resizeMode="contain" />
                                            </View>
                                            : <Text style={{ color: "black", fontWeight: "bold" }}>{this.props.str.estatebrochure}</Text>
                                    }
                                </View>
                                <View style={{ width: "40%", height: 40, marginVertical: 50, justifyContent: "center", alignItems: "center", }}>
                                    <TouchableOpacity onPress={() => this._pickDocument()} style={{ backgroundColor: "green", height: 40, width: "90%", justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ color: "#ffffff", fontWeight: "bold", textAlign: 'center', fontSize: 10 }}>{this.props.str.UploadPDFDocorDocXfile}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>



                            {
                                (this.state.loaderFlag !== true) ? (
                                    <TouchableOpacity onPress={() => this.submitMyInvestors()}
                                        style={{
                                            marginTop: 25,
                                            width: "85%",
                                            height: 35,
                                            borderWidth: 1,
                                            borderRadius: 0,
                                            backgroundColor: "white",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginHorizontal: 28,
                                            // marginHorizontal: "5%"
                                        }}
                                    // onPress={
                                    //     // this.addPost.bind(this)
                                    // }
                                    >
                                        <Text>{this.props.str.submitMyInvestors}</Text>
                                    </TouchableOpacity>
                                ) : <ActivityIndicator style={{ top: 20, marginBottom: 20 ,}} />
                            }


                        </InfiniteScroll>
                    // ) : null
                }
            </ScrollView>
        );
    }
}

let mapStateToProps = state => {
    return {
        str: state.root.str,
        userCredentials: state.root.userCredentials
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        // languageSet: (lang) => {
        //     dispatch(languageSet(lang))
        // },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
const styles = StyleSheet.create({
    input: { justifyContent: 'center', alignItems: 'center', width: '90%', },

});  
