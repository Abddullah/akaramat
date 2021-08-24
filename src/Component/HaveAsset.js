import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, StatusBar, RefreshControl,
    Dimensions, WebView, Button, KeyboardAvoidingView, ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Content, Card, CardItem, Thumbnail, Icon, Input, Badge, Picker, Item } from 'native-base';
import { connect } from "react-redux";
import axios from 'axios';
// import Drawer from '../../Component/drawer';
import InfiniteScroll from 'react-native-infinite-scroll';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontIcons from 'react-native-vector-icons/FontAwesome';
import {
    CheckBox
} from 'native-base';
import * as Animatable from 'react-native-animatable';
import { TextField } from 'react-native-material-textfield';
import StepIndicator from 'react-native-step-indicator';
import Textarea from 'react-native-textarea';
import { DocumentPicker, ImagePicker } from 'expo';
import MapDirection from '../Component/map'
import Modal from "react-native-modal";



class HaveAsset extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPosition: 0,
            textInput: [
                {
                    name: 'name',
                    value: 'name',
                    type: 'default',
                    icon: 'account-outline'
                },
                {
                    name: 'email',
                    value: 'email',
                    type: 'email-address',
                    icon: 'email'
                },
                {
                    name: 'phoneNumber',
                    value: 'phoneNumber',
                    type: 'number-pad',
                    icon: 'phone'
                },
                {
                    name: 'address',
                    value: 'address',
                    type: 'default',
                    icon: 'address-book-o',
                    font: 'fontawesome'
                },
                {
                    name: 'city',
                    value: 'city',
                    type: 'default',
                    icon: 'city-variant-outline'
                },
                {
                    name: 'state',
                    value: 'state',
                    type: 'default',
                    icon: 'city-variant-outline'
                },
            ],
            step2Input: {
                name: 'pValue',
                value: 'proposed',
                type: 'default',
                icon: 'money',
                font: 'fontawesome'
            },
            step2Input2: {
                name: 'address',
                value: 'address2',
                type: 'default',
                icon: 'address-book-o',
                font: 'fontawesome'
            },
            stateFromApi: [],
            allCityFromApi: [],
            selectedState: "",
            countriesFromApi: null,
            propertyTypes: null
        }
    }

    componentWillMount() {
        this.setState({
            token: this.props.userCredentials.token,
        })

        this.getCountries()

        this.getPropertyType()

        this.getState()
    }

    dropDownChangeCity = (itemValue, itemIndex) => {

        this.setState({
            selectedCity: itemValue,
        })

    }

    dropDownChangeCity = (itemValue, itemIndex) => {

        this.setState({
            selectedCity: itemValue,
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

    getPropertyType() {
        var url = `https://demo.akaratmisr.com:443/${this.props.str.language}/api/dataselect/getCategoryPropertyMenu`;
        return axios({
            method: 'get',
            // url: "https://demo.akaratmisr.com:443/ " + this.props.str.language + "/api/dataselect/getCategoryPropertyMenu",
            url,
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                console.log(data.data.results, "111propertyTypes****")
                this.setState({
                    propertyTypes: data.data.results
                })
                // this.props.setCountries(data.data.results)
            })
            .catch(err => {
                console.log(err)

            })
    }

    getCountries() {
        var url = `https://demo.akaratmisr.com:443/${this.props.str.language}/api/location/country_code`;
        // var url = `https://demo.akaratmisr.com:443/${this.props.str.language}/api/location/countries/all`;
        return axios({
            method: 'get',
            // url: "https://demo.akaratmisr.com:443/ " + this.props.str.language + "/api/location/country_code",
            url,
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                console.log(data.data.results, "countries")
                this.setState({
                    countriesFromApi: data.data.results
                })
                // this.props.setCountries(data.data.results)
            })
            .catch(err => {
                console.log(err)

            })
    }

    step2() {
        const { name, email, phoneNumber, address, city, state,
            selectedCountry, currentPosition } = this.state

        console.log(selectedCountry, 'country')

        if (name && email && phoneNumber && address && city && state && selectedCountry) {
            this.setState({ currentPosition: currentPosition + 1 })
        } else {
            alert('Fill all the fields')
        }
        console.log(obj, 'object here')

    }

    step3() {
        const { address2, property, proposed, description, selectedState, selectedCity, location, currentPosition } = this.state

        var obj = {
            property,
            address2,
            proposed,
            description,
            selectedState,
            selectedCity,
            location
        }


        if (address2 && property && proposed && description && selectedCity && selectedState && location) {
            this.setState({ currentPosition: currentPosition + 1 })
        } else {
            alert('Fill all the fields')
        }

    }

    step4() {
        const { currentPosition } = this.state

        this.setState({ currentPosition: currentPosition + 1 })

    }

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });


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
                    width: "80%", marginBottom: 20,
                }}>
                    <Item style={styles.input}>
                        <View style={{ width: '90%' }}>
                            <TextInput
                                keyboardType={items.type}
                                placeholder={this.props.str[items.name]}
                                placeholderTextColor={'#b3b3b3'}
                                style={{
                                    borderBottomWidth: 0.4,
                                    paddingHorizontal: 5,
                                    fontSize: 16,
                                    paddingVertical: 5,
                                }}
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
            </View>
        )
    }


    featuredimage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        console.log(result, "result");
        if (!result.cancelled) {
            this.setState({ featuredimage: result.uri });
        }
    }


    dropDownChangeState = (itemValue, itemIndex) => {
        console.log(itemValue, "123456", this.props.str.language)
        if (itemValue) {
            this.setState({
                selectedState: itemValue,
            })
            // uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/location/cities/" + itemValue
            uri = `https://demo.akaratmisr.com:443/${this.props.str.language}/api/location/cities/${itemValue}`
            return axios({
                method: 'get',
                url: uri,
                headers: {
                    "clientkey": "34532hbjdsakjd2&&gjhjh11",
                    "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                },
            })
                .then(data => {
                    console.log('data.data.results', data.data.results)
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

    location(location) {
        this.setState({ location })
    }

    dropDownChange = (itemValue, itemIndex, value) => {
        this.setState({
            [value]: itemValue,
        })
    }

    done() {
        const { embeddedvideourl, brochure_file, featuredimage, gallery1, gallery2, gallery3,
            gallery4, gallery5, gallery6, address2, property, proposed, description,
            selectedState, selectedCity, location, name, email, phoneNumber, address, city, state,
            selectedCountry } = this.state

        this.setState({
            loader: !this.state.loader
        })

        var cloneData = {
            name,
            email,
            phone: phoneNumber,
            address_investors: address2,
            city_investors: selectedCity,
            state_investors: selectedState,
            country: selectedCountry,
            type: property,
            proposed,
            country_code: selectedCountry,
            description,
            address,
            state,
            location_city: city,
            latitude: location ? location.latitude : null,
            longitude: location ? location.longitude : null,
            video_url: embeddedvideourl
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

        console.log(bodyFormData, 'bodyform data here')
        var urlm = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/people/user/addInvestors'
        var options = {
            method: 'POST',
            url: urlm,
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
        axios(options)
            .then((data) => {
                console.log(data, "data")
                alert(JSON.stringify(data.data.message))
                Actions.tabbar({ type: "reset" });

                Actions.tabNavigation();
                this.setState({
                    loader: !this.state.loader
                })
            }).catch((err) => {
                alert(JSON.stringify(err.response.data.message))
                console.log(JSON.parse(JSON.stringify(err)), 'ERRROR')
                this.setState({
                    loader: !this.state.loader
                })
            })


    }

    render() {
        const { countriesFromApi, currentPosition, textInput, propertyTypes, step2Input,
            stateFromApi, step2Input2, loader } = this.state
        const labels = [this.props.str.aboutme, this.props.str.fixedAsset, , this.props.str.imagesAndDoc, this.props.str.done];
        return (
            <View style={{
                flex: 1,
                backgroundColor: "white",
                width: "100%",
            }}>


                <View >
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
                </View>


                {/* /////////////////////////////header///////////////////////////// */}

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
                        <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.asset}</Text>
                    </View>
                </View>

                <View style={{ flex: 8, alignItems: 'center' }}>
                    <View style={{ width: '100%', paddingVertical: '5%' }}>
                        <StepIndicator
                            customStyles={customStyles}
                            currentPosition={this.state.currentPosition}
                            labels={labels}
                            stepCount={4}
                        />
                    </View>


                    <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}>
                        {
                            currentPosition === 0 &&
                            <KeyboardAvoidingView behavior={'padding'}>
                                {
                                    textInput &&
                                    textInput.map((items, index) => {
                                        return (
                                            this.textFields(items, index)
                                        )
                                    })
                                }


                                {
                                    countriesFromApi &&
                                    <View
                                        style={{
                                            height: 50,
                                            width: "80%",
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
                                                selectedValue={this.state.selectedCountry}
                                                onValueChange={
                                                    (itemValue, itemIndex) => this.dropDownChange(itemValue, itemIndex, 'selectedCountry')
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

                                }

                                <View
                                    style={{ paddingVertical: 30, alignItems: 'center' }}
                                >
                                    <View style={{ width: '80%' }}>
                                        <Button
                                            onPress={() => this.step2()}
                                            color={'#E94E1B'}
                                            title={this.props.str.step2}
                                        />
                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                        }

                        {
                            currentPosition === 1 &&
                            <KeyboardAvoidingView>
                                {
                                    propertyTypes &&
                                    <View
                                        style={{
                                            height: 50,
                                            width: "80%",
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
                                                selectedValue={this.state.property}
                                                onValueChange={
                                                    (itemValue, itemIndex) => this.dropDownChange(itemValue, itemIndex, 'property')
                                                }
                                            >
                                                <Picker.Item label={this.props.str.propertyType} value="" />
                                                {
                                                    Object.keys(this.state.propertyTypes).map((key, index) => {
                                                        return (
                                                            <Picker.Item label={this.state.propertyTypes[key]} value={key} key={index} />
                                                        )
                                                    })
                                                }
                                            </Picker>
                                        </Item>
                                    </View>
                                }

                                <View style={{ paddingTop: '2%' }}>
                                    {
                                        this.textFields(step2Input, 0)
                                    }
                                </View>

                                <View style={{ padding: "5%", width: '80%', alignSelf: 'center', backgroundColor: "#F8F8F8" }}>
                                    <Text style={{ color: "black", fontWeight: 'bold', marginBottom: 10 }}>{this.props.str.description}</Text>
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

                                <View style={{ paddingVertical: '3%' }}>
                                    {
                                        this.textFields(step2Input2, 0)
                                    }
                                </View>



                                {/* Input State or City */}
                                {
                                    stateFromApi &&
                                    <View
                                        style={{
                                            width: "80%",
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
                                                                    return (
                                                                        this.props.str.language === 'ar' ?
                                                                            <Picker.Item label={key.name} value={key.id} key={index} />
                                                                            :
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
                                }


                                {/* Google map */}

                                <View
                                    style={{
                                        marginTop: 20,
                                        // flex: 0.5,
                                        width: "80%",
                                        alignSelf: 'center',
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

                                <View
                                    style={{ paddingVertical: 30, alignItems: 'center' }}
                                >
                                    <View style={{ width: '80%' }}>
                                        <Button
                                            onPress={() => this.step3()}
                                            color={'#E94E1B'}
                                            title={this.props.str.step3}
                                        />
                                    </View>
                                </View>


                            </KeyboardAvoidingView>
                        }


                        {
                            currentPosition === 2 &&
                            <KeyboardAvoidingView behavior={'padding'}>
                                {/* //images// */}

                                <View style={{ width: "90%", marginHorizontal: "5%", justifyContent: "center", alignItems: "center", }}>

                                    {/* embeddedvideourl */}

                                    <View style={{ marginTop: 15, width: '80%' }}>
                                        <Item style={styles.input}>
                                            <Input
                                                // keyboardType={"number"}
                                                placeholder={this.props.str.embeddedvideourl}
                                                placeholderStyle={{ fontSize: 10 }}
                                                placeholderTextColor="#b3b3b3"
                                                label={this.props.str.embeddedvideourl}
                                                style={{ fontSize: 16 }}
                                                onChangeText={(e) => { this.setState({ embeddedvideourl: e }) }}
                                                value={this.state.embeddedvideourl}
                                            />
                                            <Icons name='youtube' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                        </Item>
                                    </View>

                                    {/* ////////////////////////////////featuredimage///////////////////////////// */}

                                    <View style={{ marginTop: 15, height: 70, width: "90%", flexDirection: "row", borderWidth: 1, borderColor: "#1E90FF", borderRadius: 0, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
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
                                            <TouchableOpacity onPress={this.featuredimage} style={{ backgroundColor: "green", height: 40, width: "90%", justifyContent: "center", alignItems: "center" }}>
                                                <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 10 }}>{this.props.str.featuredimage}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>



                                    {/* ////////////////////////////////Gallery///////////////////////////// */}

                                    <View style={{ marginTop: 15, height: 70, width: "90%", flexDirection: "row", borderWidth: 1, borderColor: "#1E90FF", borderRadius: 0, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
                                        <View style={{ width: "40%", marginVertical: 0, }}>
                                            <Text style={{ color: "black", fontWeight: "bold" }}>{this.props.str.gallery}</Text>
                                        </View>
                                        <View style={{ width: "40%", height: 40, marginVertical: 50, justifyContent: "center", alignItems: "center", }}>

                                            <TouchableOpacity onPress={this._toggleModal} style={{ backgroundColor: "green", height: 40, width: "90%", justifyContent: "center", alignItems: "center" }}>
                                                <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 10 }}>{this.props.str.gallery}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>



                                    {/* PDF UPLOAD */}
                                    <View style={{ marginTop: 15, height: 70, width: "90%", flexDirection: "row", borderWidth: 1, borderColor: "#1E90FF", borderRadius: 0, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
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
                                            <TouchableOpacity onPress={this._pickDocument} style={{ backgroundColor: "green", height: 40, width: "90%", justifyContent: "center", alignItems: "center" }}>
                                                <Text style={{ color: "#ffffff", fontWeight: "bold", textAlign: 'center', fontSize: 10 }}>{this.props.str.UploadPDFDocorDocXfile}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>


                                </View>


                                <View
                                    style={{ paddingVertical: 30, alignItems: 'center' }}
                                >
                                    <View style={{ width: '80%' }}>
                                        <Button
                                            onPress={() => this.step4()}
                                            color={'#E94E1B'}
                                            title={this.props.str.step4}
                                        />
                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                        }


                        {
                            currentPosition === 3 &&
                            <>
                                <View style={{ paddingVertical: '4%', alignSelf: 'center', width: '80%', paddingHorizontal: 10, justifyContent: "center" }}>
                                    <Text
                                        style={{
                                            color: "grey",
                                            fontSize: 15,
                                            textAlign: 'justify',
                                            fontWeight: "400"
                                        }}>
                                        {this.props.str.finalize}
                                    </Text>
                                </View>

                                <View
                                    style={{ paddingTop: 30, alignItems: 'center' }}
                                >
                                    <View style={{ width: '80%' }}>
                                        {
                                            loader ?
                                                <ActivityIndicator />
                                                :
                                                <Button
                                                    onPress={() => this.done()}
                                                    color={'#E94E1B'}
                                                    title={this.props.str.submitInvest}
                                                />
                                        }
                                    </View>
                                </View>

                                <View style={{ paddingVertical: '3%', alignSelf: 'center', width: '80%', paddingHorizontal: 10, justifyContent: "center" }}>
                                    <Text
                                        onPress={() => this.setState({ currentPosition: 0 })}
                                        style={{
                                            color: "grey",
                                            fontSize: 15,
                                            textAlign: 'center',
                                            fontWeight: "400"
                                        }}>
                                        {this.props.str.backStep}
                                    </Text>
                                </View>
                            </>
                        }

                    </ScrollView>


                </View>
            </View>

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
export default connect(mapStateToProps, mapDispatchToProps)(HaveAsset);
const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 40,
    }
});



const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013'
}