
import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    Image, StatusBar, ScrollView, ListView,
    RefreshControl, Picker, ActivityIndicator,
    TouchableHighlight, Alert, TextInput, UselessTextInput, Switch
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Item, Input, CheckBox, DatePicker } from 'native-base';
import { connect, } from "react-redux";
import axios from 'axios';
import IconFontFontFoundation from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
// import { TextField } from 'react-native-material-textfield';
import * as Animatable from 'react-native-animatable';
import MultiSelect from 'react-native-multiple-select';
import { setStepsForAddProperties } from '../../../Store/Action/action'
import Textarea from 'react-native-textarea';
import MapDirection from '../../../Component/map'
import ImagePicker1 from '../../../Component/ImagePicker';
import SwitchButton from '../../../Component/switchButton';
import { DocumentPicker, ImagePicker, FileSystem } from 'expo';
import Modal from "react-native-modal";



class AddProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaderFlag: false,
            submitFlag: false,
            isModalVisible: false,
            //state and cities
            statusProperty: [],
            stateFromApi: [],
            allCityFromApi: [],
            selectedState: "",
            districts: [],
            subdistricts: [],

            featuredimage: null,
            gallery1: null,
            gallery2: null,
            gallery3: null,
            gallery4: null,
            gallery5: null,
            gallery6: null,
            sort: [],
            categoryPropertyMenu: [],
            consistCounting: [1],
            addPropertyList: [],

            // consistof: []
        }
    }

    // sortDropDown = (value, index) => {
    //     console.log(value, index, "index")

    // }


    componentWillMount() {
        this.setState({
            token: this.props.userCredentials.token,
        })
        this.getProjectTypes(this)
        this.getCategoryPropertyMenu(this)
        this.getSortItems(this)
        this.getOwnerProperties(this)

        if (this.props.projectId) {
            // console.log(this.props.projectId, "addId")
        }

        if (this.props.userDetails.user_type != 5) {
            this.getState(this)
        }
        else {
            // states set representative according to i can cover area
            this.getState(this)
            this.setState({
                selectedState: this.props.userDetails.state_work_in,
                selectedState_Format: this.props.userDetails.state_work_in_format,
            })

            //City set representative according to i can cover area 
            let idArr = this.props.userDetails.workin_city.split(",")
            var cityArry = this.props.userDetails.workin_city_format
            newArr = []
            for (var i = 0; i < cityArry.length; i++) {
                // console.log(strCityId[i], "iddd")
                var obj = {
                    name_en: cityArry[i],
                    name_ar: cityArry[i],
                    id: idArr[i]
                }
                newArr.push(obj)
            }
            this.setState({
                allCityFromApi: newArr,
            })
        }

        if (this.props.projectDataForEdit) {
            console.log(this.props.projectDataForEdit, "projectDataForEdit")
            let counting = []
            let timesConsist = this.props.projectDataForEdit.times
            for (var i = 0; i < timesConsist.length; i++) {
                counting.push(i)
                console.log(timesConsist[i], "timesss")
                this.setState({
                    [`consistof${i}`]: timesConsist[i]
                })
            }

            // consistof.push(this.state[`consistof${i}`])
            // consistofType.push(this.state[`consistofType${i}`])
            this.setState({
                consistCounting: counting,
                sendLocation: {
                    latitude: this.props.projectDataForEdit.latitude,
                    longitude: this.props.projectDataForEdit.longitude,
                },
                latitude: this.props.projectDataForEdit.latitude,
                longitude: this.props.projectDataForEdit.longitude,

            })
            this.setState({
                title: this.props.projectDataForEdit.title,
                description: this.props.projectDataForEdit.description,
                projectType: this.props.projectDataForEdit.type,
                // consistCounting: this.props.projectDataForEdit.times.length,
                consistof: this.props.projectDataForEdit.quality,
                consistofType: this.props.projectDataForEdit.property_types,
                selectedsort: this.props.projectDataForEdit.sort,
                address: this.props.projectDataForEdit.address,
                // problem with format 
                // addPropertyList: this.props.projectDataForEdit.properties,
                gallery_src: this.props.projectDataForEdit.gallery_src,
                featuredimage: this.props.projectDataForEdit.featured_img_src,

            }, () => {
                if (this.state.gallery_src) {
                    this.setState({
                    })
                    for (var i = 1; i <= this.state.gallery_src.length; i++) {
                        this.setState({
                            [`gallery${i}`]: this.state.gallery_src[i - 1]
                        })
                    }
                }
            })
            this.dropDownChangeState(this.props.projectDataForEdit.state)
            this.dropDownChangeCity(this.props.projectDataForEdit.city)
            this.dropDownChangeDistricts(this.props.projectDataForEdit.district)
            // this.dropDownChangeDistricts(this.props.projectDataForEdit.district)


            if (this.props.userDetails.user_type != 5) {
                this.setState({
                    selectedState: this.props.projectDataForEdit.state,
                    selectedCity: this.props.projectDataForEdit.city,
                    selectedDistricts: this.props.projectDataForEdit.district,
                    selectedSubDistricts: this.props.projectDataForEdit.subdistrict,
                })
            }
            else {
                this.setState({
                    // selectedState: this.props.projectDataForEdit.state,
                    // selectedCity: this.props.projectDataForEdit.city,
                    selectedDistricts: this.props.projectDataForEdit.district,
                    selectedSubDistricts: this.props.projectDataForEdit.subdistrict,
                })
            }
        }


    }

    componentWillReceiveProps(nextProp) {
        console.log(nextProp.propertyData, "propertyDataReceivedProp")
        this.setState({
            propertyData: nextProp.propertyData
        })
    }


    componentDidMount() {
        if (this.props.projectDataForEdit) {
            this.setState({
                sendLocation: {
                    latitude: this.props.projectDataForEdit.latitude,
                    longitude: this.props.projectDataForEdit.longitude,
                }
            })

        }
    }

    delete(key, index) {
        let cloneGlr = this.state.gallery_src
        cloneGlr.splice(index, 1)
        this.setState({
            gallery_src: cloneGlr,

        }, () => {
            this.setState({
                gallery1: null,
                gallery2: null,
                gallery3: null,
                gallery4: null,
                gallery5: null,
                gallery6: null,
            })
            for (var i = 1; i <= this.state.gallery_src.length; i++) {
                this.setState({
                    [`gallery${i}`]: this.state.gallery_src[i - 1]
                })
            }
        })
    }

    featuredimage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        console.log(result, "result");
        if (!result.cancelled) {
            this.getFileSize(result.uri).then((size) => {
                let inkb = size / 1024
                let inMb = inkb / 1024
                console.log(inMb, "size")
                if (inMb < 2) {
                    this.setState({ featuredimage: result.uri });
                }
                else {
                    alert(this.props.str.imagesizetolarge)
                }
            })

        }
    }

    // for owner property get
    getOwnerProperties() {
        // let created_by = this.props.userCredentials.token
        // let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/guest/getPropertiesPostedByUSerId/" + created_by + "/50/0"
        let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/user/getListPropertyAddedByUsertoken/50/0"
        return axios({
            method: 'get',
            url: uri,
            headers: {
                token: "bearer " + this.props.userCredentials.token,
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                // console.log(data.data.results, "OwnerAllproperties");
                this.setState({
                    propertyData: data.data.results,
                })
            })
            .catch(err => {
                console.log(err)
                alert(err.message)
                this.setState({
                    err: err.message,
                })
            })

    }

    getSortItems() {
        return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/dataselect/getProjectSorts",
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                let getSortItems = data.data.results
                // console.log(getSortItems,"getSortItems")
                this.setState({
                    sort: getSortItems
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getProjectTypes() {
        return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/dataselect/getProjectTypes",
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                let getProjectTypes = data.data.results
                this.setState({
                    getProjectTypes: getProjectTypes
                })
            })
            .catch(err => {
                console.log(err)
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
        // console.log(itemValue, itemIndex, "itemValue")
        if (itemValue) {
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
        // console.log(itemValue, itemIndex, "valueCities")
        if (itemValue) {
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
                    // console.log(districts, "districk")

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    dropDownChangeDistricts = (itemValue, itemIndex) => {
        // console.log(itemValue, itemIndex, "valueDist")
        if (itemValue) {
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
                    // console.log(subdistricts, "subdistrick")

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }


    consistAdd = () => {
        let counting = this.state.consistCounting.length + 1
        this.state.consistCounting.push(counting)
        this.setState({
            consistCounting: this.state.consistCounting
        })
    }

    consistDelete = () => {
        this.state.consistCounting.splice(0, 1)
        this.setState({
            consistCounting: this.state.consistCounting
        })
    }

    location = (marker) => {
        this.setState({
            latitude: marker.latitude,
            longitude: marker.longitude,
        })
    }

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    galleryImage = async (serial) => {
        // alert("working")
        let result = await ImagePicker.launchImageLibraryAsync({
        });
        // console.log(result, "resultphoto");
        if (!result.cancelled) {
            this.getFileSize(result.uri).then((size) => {
                let inkb = size / 1024
                let inMb = inkb / 1024
                // console.log(inMb, "size")
                if (inMb < 2) {
                    this.setState({ [`gallery${serial}`]: result.uri, });
                }
                else {
                    alert(this.props.str.imagesizetolarge)
                }
            })
        }
    };

    getFileSize = async fileUri => {
        let fileInfo = await FileSystem.getInfoAsync(fileUri);
        return fileInfo.size;
    };

    addPropertyList(key, index) {
        let cloneAddPropertyList = this.state.addPropertyList
        if (cloneAddPropertyList.indexOf(key.id) !== -1) {
            cloneAddPropertyList.splice(index, 1)
        }
        else {
            cloneAddPropertyList.push(key.id)
        }

        this.setState({
            addPropertyList: cloneAddPropertyList
        })




    }

    addPost() {
        this.setState({
            loaderFlag: !this.state.loaderFlag
        })
        var i;
        let consistof = []
        let consistofType = []
        for (i = 0; i < this.state.consistCounting.length; i++) {
            if (this.state[`consistof${i}`] != "" && this.state[`consistof${i}`] != undefined) {
                if (this.state[`consistofType${i}`] != undefined) {
                    consistof.push(this.state[`consistof${i}`])
                    consistofType.push(this.state[`consistofType${i}`])
                }
                else {
                    consistof.push(this.state[`consistof${i}`])
                    consistofType.push("apartment")
                }
            }
        }
        cloneData = {
            title: this.state.title,
            description: this.state.description,
            type: this.state.projectType,
            // quality: consistof,
            // property_types: consistofType,
            sort: this.state.selectedsort,
            state: this.state.selectedState,
            city: this.state.selectedCity,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            address: this.state.address,
            properties: this.state.addPropertyList,

        }
        var bodyFormData = new FormData();

        if (this.props.projectId) {
            bodyFormData.append("project_id", this.props.projectId);
        }

        if (consistof.length != 0) {
            cloneData.quality = consistof
        }
        if (consistofType.length != 0) {
            cloneData.property_types = consistofType
        }

        if (this.state.selectedDistricts != undefined) {
            cloneData.location_district = this.state.selectedDistricts
        }
        if (this.state.selectedSubDistricts != undefined) {
            cloneData.location_subdistrict = this.state.selectedSubDistricts
        }
        if (this.state.featuredimage != null) {
            // console.log(this.state.featuredimage, "uriFromApi")
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

        let urlm;
        if (this.props.projectId) {
            urlm = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/project/user/editProject'
        }
        else {
            urlm = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/project/user/addProject'
        }

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
        console.log(bodyFormData, '****61', cloneData);
        axios(options)
            .then((data) => {
                console.log(data, "data")
                alert(JSON.stringify(data.data.message))
                Actions.tabbar({ type: "reset" });
                Actions.tabNavigation();
                this.setState({
                    loaderFlag: !this.state.loaderFlag
                })
                Actions.tabNavigation()
            }).catch((err) => {
                alert(JSON.stringify(err.response.data.message))
                console.log(JSON.parse(JSON.stringify(err)), 'ERRROR')
                this.setState({
                    loaderFlag: false,

                })
            })




    }

    render() {
        // console.log(this.state.consistof0, "consistof1")
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: "center",
                // backgroundColor: '#808080',
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
                                                    <View style={{ justifyContent: "center", alignItems: "center", }}>
                                                        <Image style={{ height: 55, width: 55, }} source={require("../../../assets/Images/defaultImage.png")} />
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
                                                        <Image style={{ height: 55, width: 55, }} source={require("../../../assets/Images/defaultImage.png")} />
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
                                                        <Image style={{ height: 55, width: 55, }} source={require("../../../assets/Images/defaultImage.png")} />
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
                                                        <Image style={{ height: 55, width: 55, }} source={require("../../../assets/Images/defaultImage.png")} />
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
                                                        <Image style={{ height: 55, width: 55, }} source={require("../../../assets/Images/defaultImage.png")} />
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
                                                        <Image style={{ height: 55, width: 55, }} source={require("../../../assets/Images/defaultImage.png")} />
                                                        {/* <Text >Select Image</Text> */}
                                                    </View>
                                                )
                                        }
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity style={{ flex: 0.2, backgroundColor: "white", width: "95%", height: "10%", justifyContent: "center", alignItems: "center" }} onPress={this._toggleModal}>
                                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>{this.props.str.upload}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", }}>
                    <ScrollView contentContainerStyle={styles.contentContainer} style={{ width: "100%", }}>
                        <View style={{ backgroundColor: "#1E90FF", height: 40, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "white", fontWeight: "bold" }}>{this.props.str.descriptionandaddress}</Text>
                        </View>
                        <View style={{ width: "90%", marginHorizontal: "5%", justifyContent: "center", alignItems: "center", }}>

                            {/* Title */}
                            <View style={{ marginTop: 25 }}>
                                <Item style={styles.input}>
                                    <Input
                                        // keyboardType={"number"}
                                        placeholder={this.props.str.addproject}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        label={this.props.str.addproject}
                                        style={{ fontSize: 16 }}
                                        onChangeText={(e) => { this.setState({ title: e }) }}
                                        value={this.state.title}
                                    />
                                    <Icon name='format-title' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                </Item>
                            </View>


                            {/* Description */}
                            <View style={styles.container}>
                                <View style={{ padding: "5%", backgroundColor: "#F8F8F8" }}>
                                    <Text style={{ color: "black", marginBottom: 10 }}>{this.props.str.description}</Text>
                                    <Textarea
                                        containerStyle={styles.textareaContainer}
                                        style={styles.textarea}
                                        onChangeText={(e) => { this.setState({ description: e }) }}
                                        defaultValue={this.state.description}
                                        maxLength={500}
                                        placeholder={this.props.str.putalldetails}
                                        placeholderTextColor={'#c7c7c7'}
                                        underlineColorAndroid={'transparent'}
                                    />
                                </View>
                            </View>

                            {/* Input projecttype */}
                            <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                                {
                                    (this.state.getProjectTypes) ? (
                                        <Item>
                                            <Picker
                                                mode="dropdown"
                                                style={{ height: 50, width: "90%", color: "black" }}
                                                placeholderStyle={{ color: "#E94E1C" }}
                                                placeholderIconColor="#E94E1C"
                                                selectedValue={this.state.projectType}
                                                onValueChange={
                                                    (itemValue, itemIndex) => this.setState({ projectType: itemValue })
                                                }
                                            >
                                                <Picker.Item label={this.props.str.projecttype} value="" />
                                                {
                                                    Object.keys(this.state.getProjectTypes).map((key, index) => {
                                                        // console.log(key, "key")
                                                        return (
                                                            <Picker.Item label={this.state.getProjectTypes[key]} value={key} key={key} />
                                                        )
                                                    })
                                                }
                                            </Picker>
                                        </Item>
                                    ) : null
                                }
                            </View>

                            {/* Input sort */}
                            <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                                {
                                    (this.state.sort) ? (
                                        <Item>
                                            <Picker
                                                mode="dropdown"
                                                style={{ height: 50, width: "90%", color: "black" }}
                                                placeholderStyle={{ color: "#E94E1C" }}
                                                placeholderIconColor="#E94E1C"
                                                selectedValue={this.state.selectedsort}
                                                onValueChange={
                                                    (itemValue, itemIndex) => this.setState({ selectedsort: itemValue })
                                                }
                                            >
                                                <Picker.Item label={this.props.str.sort} value="" key="" />
                                                {
                                                    Object.keys(this.state.sort).map((key, index) => {
                                                        // console.log(key, "keyyy")
                                                        return (
                                                            <Picker.Item label={this.state.sort[key]} value={key} key={key} />
                                                        )
                                                    })
                                                }
                                            </Picker>
                                        </Item>
                                    ) : null
                                }
                            </View>
                            <View style={{ flexDirection: "row", flex: 1, marginTop: 20, marginBottom: 20, paddingHorizontal: "2%", backgroundColor: "#1E90FF", width: "85%", height: 40, justifyContent: "center", alignItems: "center" }}>
                                <View style={{ flex: 7, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ marginLeft: "5%", color: "white", fontWeight: "bold" }}>{this.props.str.consistof}</Text>
                                </View>
                                <TouchableOpacity style={{ flex: 0.5 }}
                                    onPress={this.consistAdd}>
                                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 22 }}>+</Text>
                                </TouchableOpacity>
                            </View>


                            {/* //consistof */}
                            {
                                this.state.consistCounting.map((key, index) => {
                                    // console.log(key, index, "inmap")
                                    return (
                                        <View style={{ width: "100%", justifyContent: "center", alignItems: "center", }} key={index}>
                                            {/* consist of */}
                                            <View style={{ marginTop: 20, width: "80%", height: 70, }}>
                                                {/* <Text style={{ color: "black", fontWeight: "bold", marginLeft: "2%" }}>{this.state.listDistance[key].title}</Text> */}
                                                <View style={{ flex: 1, flexDirection: "row" }}>
                                                    <View style={{ flex: 0.5, }}>
                                                        <Item style={styles.input}>
                                                            <Input
                                                                keyboardType={"numeric"}
                                                                placeholder={this.props.str.consistof}
                                                                placeholderStyle={{ fontSize: 10 }}
                                                                placeholderTextColor="#b3b3b3"
                                                                label={this.props.str.consistof}
                                                                style={{ fontSize: 16 }}
                                                                onChangeText={(e) => {
                                                                    this.setState({
                                                                        [`consistof${index}`]: e
                                                                    })
                                                                }}
                                                                value={this.state[`consistof${index}`]}
                                                            />
                                                            <Icon name='folder-image' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                        </Item>
                                                    </View>

                                                    <View style={{ flex: 0.5, width: "100%" }}>
                                                        <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                                                            <Item>
                                                                <Picker
                                                                    mode="dropdown"
                                                                    style={{ height: 50, width: "90%", color: "black" }}
                                                                    placeholderStyle={{ color: "#E94E1C" }}
                                                                    placeholderIconColor="#E94E1C"

                                                                    selectedValue={this.state[`consistofType${index}`]}
                                                                    onValueChange={
                                                                        (itemValue, itemIndex, ) => {
                                                                            this.setState({
                                                                                [`consistofType${index}`]: itemValue
                                                                            })
                                                                        }
                                                                    }
                                                                >
                                                                    {/* <Picker.Item label={this.props.str.category} value="" key="" /> */}

                                                                    {/* {
                                                                        Object.keys(this.state.sort).map((key, index) => {
                                                                            return (
                                                                                <Picker.Item label={this.state.sort[key]} value={this.state.sort[key]} key={this.state.sort[key]} />
                                                                            )
                                                                        })
                                                                    } */}

                                                                    {
                                                                        Object.keys(this.state.categoryPropertyMenu).map((key, index) => {
                                                                            // console.log(key,"inmapp")
                                                                            return (
                                                                                <Picker.Item label={this.state.categoryPropertyMenu[key]} value={key} key={key} />
                                                                            )
                                                                        })
                                                                    }


                                                                </Picker>
                                                            </Item>
                                                        </View>
                                                    </View>


                                                    <View>
                                                        <TouchableOpacity style={{}}
                                                            onPress={this.consistDelete}>
                                                            <Text style={{ color: "red", marginTop: 10, fontWeight: "bold", fontSize: 22 }}>x</Text>
                                                        </TouchableOpacity>
                                                    </View>


                                                </View>
                                            </View>
                                        </View>



                                    )
                                })
                            }



                            {/* Input Types of prperty */}
                            {/* <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
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
                                                            <Picker.Item label={this.state.categoryPropertyMenu[key]} value={this.state.categoryPropertyMenu[key]} key={this.state.categoryPropertyMenu[key]} />
                                                        )
                                                    })
                                                }
                                            </Picker>
                                        </Item>
                                    ) : null
                                }
                            </View> */}



                            {/* Input State or City */}
                            {/* Input State or City */}
                            {
                                (this.props.userDetails.user_type != 5) ? (
                                    <View
                                        style={{
                                            width: "100%",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Item>
                                            <Picker
                                                mode="dropdown"
                                                style={{ height: 50, width: "90%", color: "black" }}
                                                placeholderStyle={{ color: "#E94E1C" }}
                                                placeholderIconColor="#E94E1C"
                                                selectedValue={this.state.selectedState}
                                                onValueChange={
                                                    (itemValue) => this.dropDownChangeState(itemValue)
                                                }
                                            >
                                                <Picker.Item label={this.props.str.selectstate} value="" key="" />
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
                                                            style={{ height: 50, width: "90%", color: "black" }}
                                                            placeholderStyle={{ color: "#E94E1C" }}
                                                            placeholderIconColor="#E94E1C"
                                                            selectedValue={this.state.selectedCity}
                                                            // onValueChange={(itemValue, itemIndex) => this.setState({ selectedCity: itemValue })}

                                                            onValueChange={
                                                                // (itemValue, itemIndex) => this.setState({ selectedCity: itemValue })
                                                                (itemValue, itemIndex) => this.dropDownChangeCity(itemValue, itemIndex)
                                                            }

                                                        >

                                                            <Picker.Item label={this.props.str.selectcity} value="" key="" />
                                                            {
                                                                this.state.allCityFromApi.map((key, index) => {
                                                                    return (
                                                                        // <Picker.Item label={key.name_en} value={key.id} key={index} />
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
                                                            style={{ height: 50, width: "90%", color: "black" }}
                                                            placeholderStyle={{ color: "#E94E1C" }}
                                                            placeholderIconColor="#E94E1C"
                                                            selectedValue={this.state.selectedDistricts}
                                                            // onValueChange={(itemValue, itemIndex) => this.setState({ selectedCity: itemValue })}

                                                            onValueChange={
                                                                // (itemValue, itemIndex) => this.setState({ selectedCity: itemValue })
                                                                (itemValue, itemIndex) => this.dropDownChangeDistricts(itemValue, itemIndex)
                                                            }

                                                        >

                                                            <Picker.Item label={this.props.str.selectdistricts} value="" key="" />
                                                            {
                                                                this.state.districts.map((key, index) => {
                                                                    return (
                                                                        // <Picker.Item label={key.name_en} value={key.id} key={index} />
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
                                                            style={{ height: 50, width: "90%", color: "black" }}
                                                            placeholderStyle={{ color: "#E94E1C" }}
                                                            placeholderIconColor="#E94E1C"
                                                            selectedValue={this.state.selectedSubDistricts}
                                                            // onValueChange={(itemValue, itemIndex) => this.setState({ selectedCity: itemValue })}

                                                            onValueChange={
                                                                (itemValue, itemIndex) => this.setState({ selectedSubDistricts: itemValue })
                                                            }

                                                        >

                                                            <Picker.Item label={this.props.str.selectsubdistricts} value="" key="" />
                                                            {
                                                                this.state.subdistricts.map((key, index) => {
                                                                    return (
                                                                        // <Picker.Item label={key.name_en} value={key.id} key={index} />
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
                                ) :
                                    <View>
                                        {
                                            (this.props.str.language === "en") ? (
                                                <Item>
                                                    <Text style={{ marginLeft: "2.5%", fontSize: 15, marginBottom: 10 }}>{this.state.selectedState_Format}</Text>
                                                </Item>
                                            ) :
                                                <View>
                                                    <Text style={{ marginRight: "5%", fontSize: 15, marginBottom: 10 }}>{this.state.selectedState_Format}</Text>
                                                </View>
                                        }

                                        {
                                            (this.state.selectedState != "") ? (
                                                <Animatable.View animation="slideInLeft" iterationCount={1}>
                                                    <Item>
                                                        <Picker
                                                            mode="dropdown"
                                                            style={{ height: 50, width: "90%", color: "black" }}
                                                            placeholderStyle={{ color: "#E94E1C" }}
                                                            placeholderIconColor="#E94E1C"
                                                            selectedValue={this.state.selectedCity}
                                                            // onValueChange={(itemValue, itemIndex) => this.setState({ selectedCity: itemValue })}

                                                            onValueChange={
                                                                // (itemValue, itemIndex) => this.setState({ selectedCity: itemValue })
                                                                (itemValue, itemIndex) => this.dropDownChangeCity(itemValue, itemIndex)
                                                            }

                                                        >

                                                            <Picker.Item label={this.props.str.selectcity} value="" key="" />
                                                            {
                                                                this.state.allCityFromApi.map((key, index) => {
                                                                    return (
                                                                        // <Picker.Item label={key.name_en} value={key.id} key={index} />
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
                                        {
                                            (this.state.selectedCity != "" && this.state.districts && this.state.districts.length != 0) ? (
                                                <Animatable.View animation="slideInLeft" iterationCount={1}>
                                                    <Item>
                                                        <Picker
                                                            mode="dropdown"
                                                            style={{ height: 50, width: "90%", color: "black" }}
                                                            placeholderStyle={{ color: "#E94E1C" }}
                                                            placeholderIconColor="#E94E1C"
                                                            selectedValue={this.state.selectedDistricts}
                                                            // onValueChange={(itemValue, itemIndex) => this.setState({ selectedCity: itemValue })}

                                                            onValueChange={
                                                                // (itemValue, itemIndex) => this.setState({ selectedCity: itemValue })
                                                                (itemValue, itemIndex) => this.dropDownChangeDistricts(itemValue, itemIndex)
                                                            }

                                                        >

                                                            <Picker.Item label={this.props.str.selectdistricts} value="" key="" />
                                                            {
                                                                this.state.districts.map((key, index) => {
                                                                    return (
                                                                        // <Picker.Item label={key.name_en} value={key.id} key={index} />
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
                                                            style={{ height: 50, width: "90%", color: "black" }}
                                                            placeholderStyle={{ color: "#E94E1C" }}
                                                            placeholderIconColor="#E94E1C"
                                                            selectedValue={this.state.selectedSubDistricts}
                                                            // onValueChange={(itemValue, itemIndex) => this.setState({ selectedCity: itemValue })}

                                                            onValueChange={
                                                                (itemValue, itemIndex) => this.setState({ selectedSubDistricts: itemValue })
                                                            }

                                                        >

                                                            <Picker.Item label={this.props.str.selectsubdistricts} value="" key="" />
                                                            {
                                                                this.state.subdistricts.map((key, index) => {
                                                                    return (
                                                                        // <Picker.Item label={key.name_en} value={key.id} key={index} />
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



                            {/* Input Types of prperty */}
                            {/* <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
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
                                                            <Picker.Item label={this.state.categoryPropertyMenu[key]} value={this.state.categoryPropertyMenu[key]} key={this.state.categoryPropertyMenu[key]} />
                                                        )
                                                    })
                                                }
                                            </Picker>
                                        </Item>
                                    ) : null
                                }
                            </View> */}

                            {/* Address */}
                            <View style={{ marginTop: 8 }}>
                                <Item style={styles.input}>
                                    <Input
                                        placeholder={this.props.str.address}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        label={this.props.str.title}
                                        style={{ fontSize: 16 }}
                                        onChangeText={(e) => { this.setState({ address: e }) }}
                                        value={this.state.address}
                                    />
                                    <IconFontFontFoundation name='address-book' style={{ marginRight: 13.5, fontSize: 19, color: "#1E90FF" }} />
                                </Item>
                            </View>

                            {/* Google map */}
                            <View
                                style={{
                                    marginTop: 10,
                                    // flex: 0.5,
                                    width: "90%",
                                    borderWidth: 1,
                                    // borderColor: "#E94E1C",
                                    borderColor: "#1E90FF",
                                    borderRadius: 0,
                                    backgroundColor: "#EDEDED",
                                }}
                            >
                                <Text>{this.props.str.googlemap}</Text>
                                <MapDirection coordsForEdit={this.state.sendLocation && this.state.sendLocation} mapLocation={(marker) => this.location(marker)} />
                                {/* <MapDirection coordsForEdit={this.state.sendLocation && this.state.sendLocation} mapLocation={(marker) => { this.location(marker) }} /> */}
                            </View>
                            {
                                (this.state.submitFlag === false) ? (
                                    <TouchableOpacity
                                        style={{
                                            marginTop: 25,
                                            width: "90%",
                                            height: 35,
                                            borderWidth: 1,
                                            borderRadius: 0,
                                            backgroundColor: "white",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                        onPress={() => {
                                            // this.setState({
                                            //     submitFlag: true,
                                            // })
                                            (
                                                this.state.title != undefined && this.state.description != undefined
                                                && this.state.projectType != undefined
                                                && this.state.selectedsort != undefined
                                                && this.state.consistof0 != undefined
                                                && this.state.selectedState != undefined && this.state.selectedCity
                                                && this.state.address != undefined

                                            ) ?
                                                (this.setState({
                                                    submitFlag: true,
                                                })) : alert(this.props.str.alldescriptionandaddress)
                                        }}
                                    >
                                        <Text>{this.props.str.submit}</Text>
                                    </TouchableOpacity>
                                ) : null
                            }


                            {
                                (this.state.submitFlag === true) ? (
                                    <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                                        <View style={{ width: "110%", marginTop: 20, backgroundColor: "#1E90FF", height: 40, justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ color: "white", fontWeight: "bold" }}>{this.props.str.image}</Text>
                                        </View>
                                        {/* //images// */}
                                        <View style={{ width: "100%", marginHorizontal: "5%", justifyContent: "center", alignItems: "center", }}>

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

                                            {
                                                (this.state.gallery_src) ? (
                                                    <Text>{this.props.str.oldImages}</Text>
                                                ) : null
                                            }
                                            <View style={{ flexDirection: "row", flexWrap: "wrap", padding: 5, width: "90%", justifyContent: "center", marginTop: 10 }}>
                                                {
                                                    (this.state.gallery_src) ? (
                                                        this.state.gallery_src.map((key, index) => {
                                                            return (
                                                                <>
                                                                    <TouchableOpacity
                                                                        kay={index}
                                                                        activeOpacity={0.6}
                                                                        style={{ alignItems: "center", justifyContent: "center" }}
                                                                        onPress={() => { this.delete(key, index) }}
                                                                    >
                                                                        <View style={{}}>
                                                                            <View style={{ position: "relative" }}>
                                                                                <Image
                                                                                    style={{ height: 55, width: 55, marginHorizontal: 6, marginTop: 2 }}
                                                                                    source={{ uri: key }}
                                                                                />
                                                                            </View>
                                                                            <View style={{ position: "absolute", left: 10 }}>
                                                                                <Text style={{ color: "red", fontSize: 10, fontWeight: "bold" }}>X</Text>
                                                                            </View>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                </>
                                                            )
                                                        })
                                                    ) : null
                                                }
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



                                        </View>

                                        {/* embeddedvideourl */}

                                        {/* <View style={{ marginTop: 8, }}>
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
                                                <IconFontFontFoundation name='address-book' style={{ marginRight: 13.5, fontSize: 19, color: "#1E90FF" }} />
                                            </Item>
                                        </View> */}


                                        <View style={{ width: "110%", marginTop: 20, backgroundColor: "#1E90FF", height: 40, justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ color: "white", fontWeight: "bold" }}>{this.props.str.projects}</Text>
                                        </View>



                                        <TouchableOpacity
                                            onPress={() => { Actions.AddProperty({ addproperty: "addProject", }) }}
                                            style={{ flexDirection: "row", flex: 1, marginTop: 20, marginBottom: 20, paddingHorizontal: "2%", backgroundColor: "#1E90FF", width: "85%", height: 40, justifyContent: "center", alignItems: "center" }}>
                                            <View style={{ flex: 7, justifyContent: "center", alignItems: "center" }}>
                                                <Text style={{ marginLeft: "5%", color: "white", fontWeight: "bold" }}>{this.props.str.addnewpropertytothis}</Text>
                                            </View>
                                            <TouchableOpacity style={{ flex: 0.5 }}
                                                onPress={() => { Actions.AddProperty({ addproperty: "addProject", }) }}>
                                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 22 }}>+</Text>
                                            </TouchableOpacity>
                                        </TouchableOpacity>



                                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{this.props.str.assignfromcurrentproperties}</Text>
                                        {
                                            (this.state.propertyData) ? (
                                                <View style={{
                                                    marginLeft: 0, width: "85%", marginTop: 15,
                                                }}>
                                                    {
                                                        this.state.propertyData.map((index, key) => {
                                                            // console.log(index, key, "inmap")
                                                            return (
                                                                <View key={key} style={{
                                                                    flexDirection: "row", marginBottom: 10
                                                                }} >
                                                                    <CheckBox checked={this.state.addPropertyList.indexOf(index.id) !== -1} color="#1E90FF"
                                                                        onPress={() => { this.addPropertyList(index, key) }}
                                                                    />
                                                                    <Text style={{ marginLeft: 25, }}
                                                                        onPress={() => { this.addPropertyList(index, key) }}
                                                                    >{index.title}</Text>
                                                                </View>
                                                            )
                                                        })
                                                    }




                                                </View>

                                            ) : null
                                        }

                                        {
                                            (this.state.loaderFlag != true) ? (
                                                <TouchableOpacity
                                                    style={{
                                                        marginTop: 25,
                                                        width: "90%",
                                                        height: 35,
                                                        borderWidth: 1,
                                                        borderRadius: 0,
                                                        backgroundColor: "white",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        marginHorizontal: "5%"
                                                    }}
                                                    onPress={this.addPost.bind(this)}
                                                >
                                                    <Text>{this.props.str.postadd}</Text>
                                                </TouchableOpacity>
                                            ) : <ActivityIndicator style={{ top: 20, marginBottom: 20 }} />
                                        }

                                    </View>
                                ) : null
                            }


                        </View>

                    </ScrollView>
                </View>
            </View >
        );
    }
}


let mapStateToProps = state => {
    return {
        str: state.root.str,
        userCredentials: state.root.userCredentials,
        userDetails: state.root.userDetails,
        propertyData: state.root.propertyData,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        setStepsForAddProperties: (steps) => {
            dispatch(setStepsForAddProperties(steps))
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(AddProject);


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // width:"100%"
    },
    textareaContainer: {
        height: 220,
        width: "110%",
        padding: 5,
        backgroundColor: '#F8F8F8',
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 16,
        color: '#333',
    },

    contentContainer: {
        paddingBottom: 40,

    },
    listView: {
        width: "100%", height: 35, marginTop: 10,
        borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC",
        justifyContent: 'center'
    },
    listText: {
        marginLeft: 10, color: "#000"
    },

    input: { justifyContent: 'center', alignItems: 'center', width: '90%', },

});  
