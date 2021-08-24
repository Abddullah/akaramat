
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
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import { TextField } from 'react-native-material-textfield';
import * as Animatable from 'react-native-animatable';
import MultiSelect from 'react-native-multiple-select';
import { setStepsForAddProperties, setOwnerProperties } from '../../../Store/Action/action'
import Textarea from 'react-native-textarea';
import MapDirection from '../../../Component/map'
import ImagePicker1 from '../../../Component/ImagePicker';
import SwitchButton from '../../../Component/switchButton';
import { DocumentPicker, ImagePicker, FileSystem } from 'expo';
import Modal from "react-native-modal";



class AddProperty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaderFlag: false,
            isModalVisible: false,
            submitFlag: false,
            price: true,
            timeshare: 0,
            pricenegotiable: 0,
            selectedFacilities: [],
            distance_id: [],
            distance_title: [],
            distance_value: [],
            distance_unit: [],

            // images: ['1'],
            // imageArrFrmMulti: [],
            // featuredimage: [],
            galleryImage: [],
            // addressFile_upload: [],

            featuredimage: null,
            brochure_file: null,
            gallery1: null,
            gallery2: null,
            gallery3: null,
            gallery4: null,
            gallery5: null,
            gallery6: null,
            //state and cities
            statusProperty: [],
            stateFromApi: [],
            allCityFromApi: [],
            selectedState: "",
            districts: [],
            subdistricts: [],
            //selected subtitels for
            selectedSubtitlefor: [],
            subtitlesfor: [
                {
                    id: "resedential",
                    name: props.str.residential,
                },
                {
                    id: "commercial",
                    name: props.str.commercial,
                },
                {
                    id: "administrative",
                    name: props.str.administrative,
                },
                {
                    id: "agricultural",
                    name: props.str.agriculture,
                },
                {
                    id: "touristic",
                    name: props.str.touristic,
                },
                {
                    id: "industrial",
                    name: props.str.industrial,
                },
                {
                    id: "medical",
                    name: props.str.medical,
                },
                {
                    id: "educational",
                    name: props.str.educational,
                },
            ],

            contactUs: true,
            creaditpayment: true,
            thepropertyisFlag: true,

        }
    }

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    galleryImage = async (serial) => {
        let result = await ImagePicker.launchImageLibraryAsync({
        });
        console.log(result, "resultphoto");
        if (!result.cancelled) {
            this.getFileSize(result.uri).then((size) => {
                let inkb = size / 1024
                let inMb = inkb / 1024
                console.log(inMb, "size")
                if (inMb < 2) {
                    this.setState({ [`gallery${serial}`]: result.uri, });
                }
                else {
                    alert(this.props.str.imagesizetolarge)
                }
            })


        }
    };

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
    _pickDocument = () => {
        var result = DocumentPicker.getDocumentAsync()
        result.then((res) => {
            if (res.type === 'success') {
                console.log(res)
                var lastIndex = res.name.lastIndexOf('.')
                var ext = res.name.slice(lastIndex + 1)
                if (ext === 'png' || ext === 'jpg' || ext === 'jpeg') {
                    alert(this.props.str.onlypdfallow)
                } else {
                    this.setState({
                        brochure_file: res.uri,
                        uploadAddName: res.name.slice(0, lastIndex) + "." + ext,
                        uploadType: `application/${ext}`
                    })
                }
            }
        })
    }
    getFileSize = async fileUri => {
        let fileInfo = await FileSystem.getInfoAsync(fileUri);
        return fileInfo.size;
    };
    componentWillMount() {
        this.setState({
            token: this.props.userCredentials.token,
        })
        this.getStatusProperty(this)
        this.getCategoryPropertyMenu(this)
        this.getFacilities(this)
        this.getListDistance(this)

        if (this.props.AddId) {
            // console.log(this.props.AddId, "this.props.AddId")
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
            // this.dropDownChangeState(this.props.userDetails.state_work_in)


            //City set representative according to i can cover area 
            // console.log(this.props.userDetails.workin_city, "this.props.userDetails.workin_city")
            let idArr = this.props.userDetails.workin_city.split(",")


            // var idArr = []
            // idArr.push(strCityId)
            console.log(idArr, "arrrr")

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
            console.log(newArr, "newArr")

            this.setState({
                allCityFromApi: newArr,
            })
        }




        if (this.props.propertyDataForEdit) {
            this.setState({
                sendLocation: {
                    latitude: this.props.propertyDataForEdit.latitude,
                    longitude: this.props.propertyDataForEdit.longitude,
                },
                latitude: this.props.propertyDataForEdit.latitude,
                longitude: this.props.propertyDataForEdit.longitude,

            })
            if (this.props.propertyDataForEdit.distance_info && this.props.propertyDataForEdit.distance_info.length) {

                const { distance_id, distance_title, distance_unit, distance_value } = this.state

                this.props.propertyDataForEdit.distance_info.map((distance, index) => {

                    //main arry for db
                    distance_id.push(distance.id)
                    distance_title.push(distance.title)
                    distance_unit.push(distance.units)
                    distance_value.push(distance.value)


                    console.log(distance, "distance")
                    // console.log(distance_id, distance_title, distance_unit, distance_value, distance.value, distance.units, "distance")
                    // console.log([`distance${distance.title}`], [`distance_unitVal${distance.title}`], "distance")
                    this.setState({
                        [`distance${distance.title}`]: distance.value,
                        [`distance_unitVal${distance.title}`]: distance.units,
                        distance_id,
                        distance_title,
                        distance_value,
                        distance_unit
                    })
                })

            }

            // console.log(this.props.propertyDataForEdit.suitable_categories, "suitable")

            // if (this.props.propertyDataForEdit.suitable_categories.length &&
            //     this.props.propertyDataForEdit.suitable_categories_format.length) {
            //     let selectedSuitable = this.state.selectedSubtitlefor
            //     for (var i = 0; i < this.props.propertyDataForEdit.suitable_categories.length; i++) {
            //         selectedSuitable.push({
            //             id: this.props.propertyDataForEdit.suitable_categories[i],
            //             name: this.props.propertyDataForEdit.suitable_categories_format[i],
            //         });
            //     }
            //     this.setState({
            //         selectedSubtitlefor: selectedSuitable
            //     })
            // }


            if (this.props.propertyDataForEdit.contact_price == 0) {
                this.setState({
                    contactUs: true
                })
            }
            else {
                this.setState({
                    contactUs: false
                })
            }


            this.setState({
                title: this.props.propertyDataForEdit.title,
                description: this.props.propertyDataForEdit.description,
                // selectedState: this.props.propertyDataForEdit.state,
                // selectedCity: this.props.propertyDataForEdit.city,
                // selectedDistricts: this.props.propertyDataForEdit.district,
                // selectsubdistricts: this.props.propertyDataForEdit.subdistrict,
                perpose: this.props.propertyDataForEdit.purpose,
                type: this.props.propertyDataForEdit.type,
                selectedSubtitlefor: this.props.propertyDataForEdit.suitable_categories,
                directphonenumberforthis: this.props.propertyDataForEdit.phone,
                address: this.props.propertyDataForEdit.address,
                // latitude: 45.19704497466066,
                // longitude: 55.930957481265065,
                video_url: this.props.propertyDataForEdit.video_url,


                // rent_price: this.props.propertyDataForEdit.rent_price,
                // // no return from api
                // rent_price_currency: this.props.propertyDataForEdit.rent_price,
                // rent_price_unit: this.props.propertyDataForEdit.rent_price_unit,
                // totalprice: this.props.propertyDataForEdit.total_price,
                // totalpricecurrency: this.props.propertyDataForEdit.total_price_currency,
                // priceperunit: this.props.propertyDataForEdit.rent_price_unit,
                // priceperunitcurrency: this.props.propertyDataForEdit.total_price_currency,
                // // no return from api
                // priceunit: this.props.propertyDataForEdit.total_price_currency,




                //FOR SALE
                totalprice: this.props.propertyDataForEdit.total_price, //1
                totalpricecurrency: this.props.propertyDataForEdit.total_price_currency, //2
                priceperunit: this.props.propertyDataForEdit.price_per_unit, //3 no return from api 
                priceperunitcurrency: this.props.propertyDataForEdit.price_per_unit_currency, //4 no return from api 
                priceunit: this.props.propertyDataForEdit.price_unit, //5

                //FOR RENT
                rentprice: this.props.propertyDataForEdit.rent_price,
                rentpricecurrency: this.props.propertyDataForEdit.rent_price_currency,
                rentpriceunit: this.props.propertyDataForEdit.rent_price_unit,




                upfrontpayment: this.props.propertyDataForEdit.upfront_payment,
                monthlypayment: this.props.propertyDataForEdit.monthly_payment,
                quarterlypayment: this.props.propertyDataForEdit.quarterly_payment,
                yearlypayment: this.props.propertyDataForEdit.yearly_payment,
                period: this.props.propertyDataForEdit.period,
                // no return from api
                periodpriceunit: this.props.propertyDataForEdit.period_price_unit,
                pricenegotiable: this.props.propertyDataForEdit.price_negotiable,
                areasize: this.props.propertyDataForEdit.home_size.toString(),
                home_size_unit: this.props.propertyDataForEdit.home_size_unit_format,
                // no return from api
                buildingareasize: this.props.propertyDataForEdit.lot_size,
                landsizeunit: this.props.propertyDataForEdit.lot_size_unit_format,
                // no return from api
                area: this.props.propertyDataForEdit.area_field,
                certification: this.props.propertyDataForEdit.certification,
                bathrooms: this.props.propertyDataForEdit.bath,
                bedrooms: this.props.propertyDataForEdit.bedroom,
                number_of_floor: this.props.propertyDataForEdit.number_of_floor,
                yearbuilt: this.props.propertyDataForEdit.year_built,
                // return value not key
                estateCondition: this.props.propertyDataForEdit.estate_condition,
                timeshare: this.props.propertyDataForEdit.timeshare,
                deliverydate: this.props.propertyDataForEdit.deliverydate,
                gallery_src: this.props.propertyDataForEdit.gallery_src,
                featuredimage: this.props.propertyDataForEdit.featured_image_src,
                creaditpayment: false
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
                // if (this.state.featuredimage) {
                //     this.setState({

                //     })
                // }
            })

            this.dropDownChangeState(this.props.propertyDataForEdit.state)
            this.dropDownChangeCity(this.props.propertyDataForEdit.city)
            this.dropDownChangeDistricts(this.props.propertyDataForEdit.district)

            if (this.props.userDetails.user_type != 5) {
                this.setState({
                    selectedState: this.props.propertyDataForEdit.state,
                    selectedCity: this.props.propertyDataForEdit.city,
                    selectedDistricts: this.props.propertyDataForEdit.district,
                    selectedSubDistricts: this.props.propertyDataForEdit.subdistrict,
                })
            }
            else {
                this.setState({
                    // selectedState: this.props.propertyDataForEdit.state,
                    // selectedCity: this.props.propertyDataForEdit.city,
                    selectedDistricts: this.props.propertyDataForEdit.district,
                    selectedSubDistricts: this.props.propertyDataForEdit.subdistrict,
                })
            }
            //  facilities: this.state.selectedFacilities,
            //  distance_id: this.state.distance_id,
            //  distance_title: this.state.distance_title,
            //  distance_value: this.state.distance_value,
            //  distance_unit: this.state.distance_unit,
        }



    }

    componentDidMount() {
        // if (this.props.propertyDataForEdit) {
        //     this.setState({
        //         sendLocation: {
        //             latitude: this.props.propertyDataForEdit.latitude,
        //             longitude: this.props.propertyDataForEdit.longitude,
        //         }
        //     })

        // }
        // this.props.setOwnerProperties(["testing"])




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
                console.log(data.data.results, "OwnerAllproperties");
                this.props.setOwnerProperties(data.data.results)
                Actions.popTo('AddProject');

            })
            .catch(err => {
                console.log(err)
                alert(err.message)
                this.setState({
                    err: err.message,
                })
            })

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

    getListDistance() {
        return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/dataselect/getListDistance",
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                let listDistance = data.data.results
                // console.log(listDistance, "listDistance")
                this.setState({
                    listDistance: listDistance
                })
            })
            .catch(err => {
                console.log(err)
            })
    }



    getFacilities() {
        return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/dataselect/getFacilities",
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                var facilities = data.data.results
                // console.log(facilities, "facilities")

                this.setState({
                    facilities: facilities
                }, () => {

                    if (this.props.propertyDataForEdit && this.props.propertyDataForEdit.general_amenities && this.props.propertyDataForEdit.general_amenities.length) {
                        var selectedFacilities = []
                        this.props.propertyDataForEdit.general_amenities.map((item, index1) => {
                            this.state.facilities.map((facilities, index2) => {
                                if (item.id === facilities.id) {
                                    selectedFacilities.push(facilities.id)
                                    this.state.facilities[index2].selected = true
                                }
                            })
                        })
                        this.setState({
                            selectedFacilities
                        })
                    }

                })
            })
            .catch(err => {
                console.log(err)
            })
    }



    getStatusProperty() {
        return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/dataselect/getStatusProperty",
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                let statusProperty = data.data.results
                // console.log(statusProperty, "statuspro")
                this.setState({
                    statusProperty: statusProperty
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
        // console.log(itemValue, "123456")
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
                    console.log(city)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    dropDownChangeCity = (itemValue, itemIndex) => {
        // console.log(itemValue, itemIndex, "valueCities")
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
                    // console.log(districts, "districk")

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    dropDownChangeDistricts = (itemValue, itemIndex) => {
        // console.log(itemValue, itemIndex, "valueDist")
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
                    // console.log(subdistricts, "subdistrick")

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }


    onSelectedItemsChangeType = selectedType => {
        this.setState({ selectedType });
    };


    onSelectedItemsChangeSubtitlefor = selectedSubtitlefor => {
        if (selectedSubtitlefor.length < 4) {
            this.setState({ selectedSubtitlefor });
        }
        else {
            alert(this.props.str.maximum3items)
        }
    };



    switchButton = (data, name) => {
        // console.log(data, name, "switch")
        if (name === "contactusto") {
            this.setState({ contactUs: data })
        }

        if (name === "creaditpayment") {
            this.setState({ creaditpayment: data })
        }

        if (name === "thepropertyis") {
            this.setState({ thepropertyisFlag: data })
        }

        if (name === "propertyistimesheare") {
            // console.log("workir")

            if (data != false) {
                this.setState({ timeshare: 0 })
            }
            else {
                this.setState({ timeshare: 1 })
            }
        }

        if (name === "pricenegotiable") {
            if (data != false) {
                this.setState({ pricenegotiable: 0 })
            }
            else {
                this.setState({ pricenegotiable: 1 })
            }
        }

    }


    switchButtonForfacilities = (data, name) => {
        // console.log(data, name, "switchButtonForfacilities")
        let selectedFacilities = this.state.selectedFacilities
        if (data === false) {
            selectedFacilities.push(name)
        }
        else {
            for (var i = 0; i < selectedFacilities.length; i++) {
                if (selectedFacilities[i] === name) {
                    selectedFacilities.splice(i, 1);
                }
            }
        }
        // console.log(selectedFacilities, "cloneFacilities")
    }


    // onBlurDistance = (title) => {

    //     console.log(title, "tttttt")
    //     // console.log(this.state[`distance_unitVal${title}`], "onBlurr")

    //     // if (this.state[`distance_unitVal${title}`] == undefined) {
    //     //     alert(this.props.str.pleasefill + ' ' + title + ' ' + this.props.str.distanceSmall)
    //     // }

    //     // else {
    //     //     // alert(`Please fill ${title} distance`)
    //     //     alert(this.props.str.pleasefill + ' ' + title + ' ' + this.props.str.distanceSmall)
    //     // }

    //     // this.setState({
    //     //     [`distance${title}`]: value,
    //     //     distance_id_Value: id,
    //     //     distance_title_Value: title,
    //     // })
    // }

    setDistance = (title, id, value, index) => {
        console.log(title, id, value, index, "setDistance")
        let distance_id = this.state.distance_id
        let distance_title = this.state.distance_title
        let distance_value = this.state.distance_value
        let distance_unit = this.state.distance_unit
        if (distance_title.length > 0) {
            let flag = true
            for (var i = 0; i < distance_title.length; i++) {
                if (distance_title[i] === title) {
                    if (value === "") {
                        console.log("ifffffff", value)
                        distance_value.splice(i, 1)
                        distance_title.splice(i, 1)
                        distance_id.splice(i, 1)
                        distance_unit.splice(i, 1)
                        flag = false
                    }
                    else {
                        distance_value.splice(i, 1, value)
                        flag = false
                    }
                }
            }
            if (flag) {
                distance_value.push(value)
                distance_title.push(title)
                distance_id.push(id)
                distance_unit.push("Minutes")
            }
        }
        else {
            distance_value.push(value)
            distance_title.push(title)
            distance_id.push(id)
            distance_unit.push("Minutes")
        }
        console.log(distance_value, distance_id, distance_title, distance_unit, "setDistance")
        this.setState({
            [`distance${title}`]: value,
            distance_id_Value: id,
            distance_title_Value: title,
            distance_id, distance_value, distance_unit, distance_title,
        })
    }

    setDistanceDd = (title, id, index, itemValue) => {
        let distance_id = this.state.distance_id
        let distance_title = this.state.distance_title
        let distance_value = this.state.distance_value
        let distance_unit = this.state.distance_unit
        if (distance_title.length > 0) {
            let flag = true
            for (var i = 0; i < distance_title.length; i++) {
                console.log(i, "iiii")
                if (distance_title[i] === title) {
                    distance_unit.splice(i, 1, itemValue)
                    flag = false
                    this.setState({
                        [`distance_unitVal${title}`]: itemValue
                    })
                }
            }
            if (flag) {
                alert("first select " + title + " distance")
            }
        }
        else {
            alert("first select " + title + " distance")
        }
        console.log(distance_value, distance_id, distance_title, distance_unit, "setDistance")
        this.setState({
            distance_value: distance_value,
            distance_unit: distance_unit,
            distance_id: distance_id,
            distance_title: distance_title,
        })

        // if (defVal) {
        //     distance_unit.splice(index, 1, defVal)
        //     distance_title.splice(index, 1, title)
        //     distance_id.splice(index, 1, id)
        // }


        // console.log(distance_unit, distance_title, distance_id, distance_value, "defValeee", index)



        // if (this.state[`distance${title}`] != undefined) {
        //     this.setState({
        //         [`distance_unitVal${title}`]: itemValue
        //     })

        //     if (this.state[`distance${this.state.distance_title_Value}`] && distance_value.indexOf(this.state[`distance${this.state.distance_title_Value}`]) === -1) {
        //         distance_value.splice(index, 1, this.state[`distance${this.state.distance_title_Value}`])
        //         this.setState({ distance_value })

        //     }




        //     distance_unit.splice(index, 1, itemValue)

        //     // if (distance_unit.indexOf(itemValue) == -1 && itemValue) {
        //     // distance_unit.splice(index, 1, itemValue)
        //     // }

        //     if (distance_id.indexOf(this.state.distance_id_Value) == -1 && this.state.distance_id_Value) {

        //         distance_id.splice(index, 1, this.state.distance_id_Value)
        //     }
        //     if (distance_title.indexOf(title) == -1 && title) {
        //         distance_title.splice(index, 1, title)
        //     }



        //     this.setState({
        //         distance_value: distance_value,
        //         distance_unit: distance_unit,
        //         distance_id: distance_id,
        //         distance_title: distance_title,
        //     })
        //     console.log(distance_id)
        //     console.log(distance_title)
        //     console.log(distance_value)
        //     console.log(distance_unit)
        // }
        // else {
        //     // alert(`Please fill ${title} distance`)
        //     alert(this.props.str.pleasefill + ' ' + title + ' ' + this.props.str.distanceSmall)
        // }
    }


    setDate(newDate) {
        this.setState({
            deliverydate: newDate.toString().substr(4, 12)
        })
    }

    location = (marker) => {
        console.log(marker, "markerrr")
        this.setState({
            latitude: marker.latitude,
            longitude: marker.longitude,
        })

    }


    addPost() {
        this.setState({
            loaderFlag: !this.state.loaderFlag
        })
        cloneData = {
            // token: "Bearer " + this.state.token,
            title: this.state.title,
            description: this.state.description,
            state: this.state.selectedState,
            city: this.state.selectedCity,
            purpose: this.state.perpose,
            category: this.state.type,
            suitable_categories: this.state.selectedSubtitlefor,
            phone: this.state.directphonenumberforthis,
            address: this.state.address,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            // property_featured_img: this.state.featuredimage,
            // galleryImages lgani hai ??????????????????????????
            // brochure_file: this.state.brochure_file.uri,
            video_url: this.state.embeddedvideourl,
            // for rent Pricing fields
            rent_price: this.state.rentprice,
            rent_price_currency: this.state.rentpricecurrency,
            rent_price_unit: this.state.rentpriceunit,
            // for sale Pricing fields
            total_price: this.state.totalprice,
            total_price_currency: this.state.totalpricecurrency,
            price_per_unit: this.state.priceperunit,
            price_per_unit_currency: this.state.priceperunitcurrency,
            price_unit: this.state.priceunit,

            upfront_payment: this.state.upfrontpayment,
            monthly_payment: this.state.monthlypayment,
            quarterly_payment: this.state.quarterlypayment,
            yearly_payment: this.state.yearlypayment,
            period: this.state.period,
            period_price_unit: this.state.periodpriceunit,
            price_negotiable: this.state.pricenegotiable,
            home_size: this.state.areasize,
            home_size_unit: this.state.home_size_unit,
            lot_size: this.state.buildingareasize,
            lot_size_unit: this.state.landsizeunit,
            area_field: this.state.area,
            certification: this.state.certification,
            baths: this.state.bathrooms,
            beds: this.state.bedrooms,
            number_of_floor: this.state.number_of_floor,
            year_built: this.state.yearbuilt,
            condition: this.state.estateCondition,
            facilities: this.state.selectedFacilities,
            distance_id: this.state.distance_id,
            distance_title: this.state.distance_title,
            distance_value: this.state.distance_value,
            distance_unit: this.state.distance_unit,
            timeshare: this.state.timeshare,

        }


        if (this.state.selectedDistricts != undefined) {
            cloneData.location_district = this.state.selectedDistricts
        }
        if (this.state.selectedSubDistricts != undefined) {
            cloneData.location_subdistrict = this.state.selectedSubDistricts
        }

        if (this.state.contactUs === true) {
            cloneData.contact_price = 0
        }
        else {
            cloneData.contact_price = 1
        }


        // if (this.state.brochure_file != null) {
        //     cloneData.brochure_file = this.state.brochure_file.uri
        // }

        var bodyFormData = new FormData();
        if (this.props.AddId) {
            bodyFormData.append("property_id", this.props.AddId);
        }
        if (this.state.deliverydate) {
            bodyFormData.append("deliverydate", this.state.deliverydate);
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
            bodyFormData.append('gallery_photos[0]', {
                uri: this.state.gallery1,
                name: `photo.${fileTypeProfile}`,
                type: `image/${fileTypeProfile}`,
            });
        }
        if (this.state.gallery2 != null) {
            // gallery image 2
            let uriPartsProfile = this.state.gallery2.split('.');
            let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
            bodyFormData.append('gallery_photos[1]', {
                uri: this.state.gallery2,
                name: `photo.${fileTypeProfile}`,
                type: `image/${fileTypeProfile}`,
            });
        }
        if (this.state.gallery3 != null) {
            // gallery image 3
            let uriPartsProfile = this.state.gallery3.split('.');
            let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
            bodyFormData.append('gallery_photos[2]', {
                uri: this.state.gallery3,
                name: `photo.${fileTypeProfile}`,
                type: `image/${fileTypeProfile}`,
            });
        }
        if (this.state.gallery4 != null) {
            // gallery image 4
            let uriPartsProfile = this.state.gallery4.split('.');
            let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
            bodyFormData.append('gallery_photos[3]', {
                uri: this.state.gallery4,
                name: `photo.${fileTypeProfile}`,
                type: `image/${fileTypeProfile}`,
            });
        }
        if (this.state.gallery5 != null) {
            // gallery image 5
            let uriPartsProfile = this.state.gallery5.split('.');
            let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
            bodyFormData.append('gallery_photos[4]', {
                uri: this.state.gallery5,
                name: `photo.${fileTypeProfile}`,
                type: `image/${fileTypeProfile}`,
            });
        }
        if (this.state.gallery6 != null) {
            // gallery image 6
            let uriPartsProfile = this.state.gallery6.split('.');
            let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
            bodyFormData.append('gallery_photos[5]', {
                uri: this.state.gallery6,
                name: `photo.${fileTypeProfile}`,
                type: `image/${fileTypeProfile}`,
            });
        }
        if (this.state.brochure_file != null) {
            bodyFormData.append('brochure_file', {
                uri: this.state.brochure_file,
                name: this.state.uploadAddName,
                type: this.state.uploadType,
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
        if (this.props.AddId) {
            urlm = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/property/user/editProperty'
        }
        else {
            urlm = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/property/user/addProperty'
        }
        var options = {
            method: 'POST',
            url: urlm,
            headers:
            {
                token: "bearer " + this.props.userCredentials.token,
                clientsecret: '(*jh2kj36gjhasdi78743982u432j',
                clientkey: '34532hbjdsakjd2&&gjhjh11',
                'postman-token': '553d07fc-3950-1199-efd9-6b5b5f8315a2',
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
                'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
            },
            data: bodyFormData
        };
        console.log(bodyFormData, '********************61', cloneData);
        axios(options)
            .then((data) => {
                console.log(JSON.stringify(data), "data")
                alert(JSON.stringify(data.data.message))
                this.setState({
                    loaderFlag: !this.state.loaderFlag
                })
                if (this.props.addproperty === "addProject") {
                    this.getOwnerProperties(this)
                }
                else {
                    Actions.tabbar({ type: "reset" });
                    Actions.tabNavigation();
                }

                // Actions.tabNavigation()
            }).catch((err) => {
                alert(JSON.stringify(err.response.data.message))
                console.log(JSON.parse(JSON.stringify(err)), 'ERRROR')
                this.setState({
                    loaderFlag: !this.state.loaderFlag
                })
            })


    }

    render() {

        const { latitude, longitude } = this.state

        console.log(this.props.addproperty, "addproperty")

        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: "center",
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
                                        placeholder={this.props.str.title}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        label={this.props.str.title}
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

                                                            <Picker.Item label={this.props.str.selectcity} value="" />
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

                                                            <Picker.Item label={this.props.str.selectdistricts} value="" />
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

                                                            <Picker.Item label={this.props.str.selectsubdistricts} value="" />
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

                                                            <Picker.Item label={this.props.str.selectcity} value="" />
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

                                                            <Picker.Item label={this.props.str.selectdistricts} value="" />
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

                                                            <Picker.Item label={this.props.str.selectsubdistricts} value="" />
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


                            {/* Input Perpose */}

                            <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                                <Item>
                                    <Picker
                                        mode="dropdown"
                                        style={{ height: 50, width: "90%", color: "black" }}
                                        placeholderStyle={{ color: "#E94E1C" }}
                                        placeholderIconColor="#E94E1C"
                                        selectedValue={this.state.perpose}
                                        onValueChange={
                                            (itemValue, itemIndex) => this.setState({ perpose: itemValue })
                                        }
                                    >
                                        <Picker.Item label={this.props.str.purpose} value="" />
                                        <Picker.Item label={this.props.str.sale} value="sale" key={"sale"} />
                                        <Picker.Item label={this.props.str.rent} value="rent" key={"rent"} />
                                        <Picker.Item label={this.props.str.salrorrent} value="sale_or_rent" key={"sale_or_rent"} />
                                    </Picker>
                                </Item>

                            </View>

                            {/* Input Types */}


                            <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
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
                                                        // console.log(Object.keys(this.state.categoryPropertyMenu)[index], "category")
                                                        return (
                                                            <Picker.Item label={this.state.categoryPropertyMenu[key]} value={Object.keys(this.state.categoryPropertyMenu)[index]} key={this.state.categoryPropertyMenu[key]} />
                                                        )
                                                    })
                                                }
                                            </Picker>
                                        </Item>
                                    ) : null
                                }
                            </View>


                            {/* Input Subtitles*/}

                            <View
                                style={{
                                    marginTop: 20,
                                    flex: 0.5,
                                    width: "90%",
                                    borderWidth: 1,
                                    // borderColor: "#E94E1C",
                                    borderColor: "#1E90FF",
                                    borderRadius: 0,
                                    backgroundColor: "white",
                                }}
                            >
                                <View style={{ width: "90%", height: "90%", marginTop: 20, marginHorizontal: "5%" }}>
                                    <MultiSelect
                                        showDropDowns={true}
                                        hideTags
                                        hideSubmitButton={true}
                                        // fixedHeight={true}
                                        items={this.state.subtitlesfor}
                                        uniqueKey="id"
                                        // ref={(component) => { this.multiSelect = component }}
                                        onSelectedItemsChange={this.onSelectedItemsChangeSubtitlefor}
                                        selectedItems={this.state.selectedSubtitlefor}
                                        selectText={this.props.str.subtitlefor}
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
                            </View>

                            {/* Directphone number */}

                            <View style={{ marginTop: 25 }}>
                                <Item style={styles.input}>
                                    <Input
                                        keyboardType={"numeric"}
                                        placeholder={this.props.str.directphonenumberforthis}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        label={this.props.str.directphonenumberforthis}
                                        style={{ fontSize: 16 }}
                                        onChangeText={(e) => { this.setState({ directphonenumberforthis: e }) }}
                                        value={this.state.directphonenumberforthis}
                                    />
                                    <Icon name='cellphone-basic' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                </Item>
                            </View>

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
                                                && this.state.selectedState != undefined && this.state.selectedCity
                                                &&
                                                this.state.perpose != undefined
                                                // && this.state.selectedType.length != 0
                                                && this.state.directphonenumberforthis != undefined
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





                        </View>


                        {
                            (this.state.submitFlag === true) ? (
                                <View>
                                    <View style={{ marginTop: 20, backgroundColor: "#1E90FF", height: 40, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ color: "white", fontWeight: "bold" }}>{this.props.str.image}</Text>
                                    </View>



                                    {/* //images// */}

                                    <View style={{ width: "90%", marginHorizontal: "5%", justifyContent: "center", alignItems: "center", }}>

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



                                        {/* PDF UPLOAD */}
                                        <View style={{ marginTop: 15, height: 70, width: "90%", flexDirection: "row", borderWidth: 1, borderColor: "#1E90FF", borderRadius: 0, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
                                            <View style={{ width: "40%", marginVertical: 0, }}>
                                                {/* {
                                                    this.state.brochure_file != null ?
                                                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", marginHorizontal: "10%", marginVertical: 5, flexWrap: "wrap" }}>
                                                            <Image style={{ height: 55, width: 55, marginHorizontal: 6, marginTop: 2, }} source={require("../../../assets/Images/download.png")} resizeMode="contain" />
                                                        </View>
                                                        : <Text style={{ color: "black", fontWeight: "bold" }}>{this.props.str.estatebrochure}</Text>
                                                } */}

                                                {
                                                    (this.state.brochure_file != null) ? (
                                                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", marginHorizontal: "10%", marginVertical: 5, flexWrap: "wrap" }}>
                                                            <Text style={{ color: "black", fontWeight: "bold" }}>{this.state.uploadAddName}</Text>
                                                        </View>
                                                    )
                                                        : <Text style={{ color: "black", fontWeight: "bold" }}>{this.props.str.UploadPDFDocorDocXfile}</Text>
                                                }

                                            </View>

                                            <View style={{ width: "40%", height: 40, marginVertical: 50, justifyContent: "center", alignItems: "center", }}>
                                                <TouchableOpacity onPress={this._pickDocument} style={{ backgroundColor: "green", height: 40, width: "90%", justifyContent: "center", alignItems: "center" }}>
                                                    <Text style={{ color: "#ffffff", fontWeight: "bold", textAlign: 'center', fontSize: 10 }}>{this.props.str.UploadPDFDocorDocXfile}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        {/* <View style={{ marginTop: 15, height: 70, width: "90%", flexDirection: "row", borderWidth: 1, borderColor: "#1E90FF", borderRadius: 0, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>

                                            <View style={{ width: "40%", marginVertical: 0, }}>

                                                {
                                                    (this.state.brochure_file) ? (
                                                        <Text style={{ color: "black", fontWeight: "bold" }}>{this.props.str.fileattached}</Text>
                                                    ) :
                                                        <Text style={{ color: "#b3b3b3", fontWeight: "bold" }}>{this.props.str.estatebrochure}</Text>
                                                }

                                            </View>

                                            <View style={{ width: "40%", height: 40, marginVertical: 50, justifyContent: "center", alignItems: "center", }}>
                                                <TouchableOpacity
                                                    onPress={this._pickDocument}
                                                    style={{ width: "82%", height: 40, justifyContent: "center", alignItems: "center", backgroundColor: "#33CD5F" }}>
                                                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 10, textAlign: "center" }}>{this.props.str.UploadPDFDocorDocXfile}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View> */}

                                        {/* embeddedvideourl */}

                                        <View style={{ marginTop: 15 }}>
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
                                                <Icon name='youtube' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                            </Item>
                                        </View>
                                    </View>

                                    <View style={{ marginTop: 20, backgroundColor: "#1E90FF", height: 40, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ color: "white", fontWeight: "bold" }}>{this.props.str.price}</Text>
                                    </View>


                                    <View style={{ width: "90%", marginHorizontal: "5%", justifyContent: "center", alignItems: "center", }}>

                                        {/* contact us  SwitchButton*/}

                                        <View style={{ marginTop: 15, flexDirection: "row", width: "90%", height: 50, justifyContent: "space-between", alignItems: "center", borderBottomColor: "#b3b3b3", borderBottomWidth: 0.5, }}>
                                            <Text style={{ color: "black", fontWeight: "bold", marginLeft: "3%" }}>{this.props.str.contactusto}</Text>
                                            <SwitchButton name={"contactusto"} selected={this.props.propertyDataForEdit ? this.props.propertyDataForEdit.contact_price == 0 ? false : true : null} getData={(data, name) => { this.switchButton(data, name) }} />
                                        </View>

                                        {
                                            (this.state.contactUs != false) ? (
                                                <View>
                                                    {/* sale */}

                                                    {
                                                        (this.state.perpose && this.state.perpose === "sale") ? (
                                                            <View style={{ width: "100%" }}>
                                                                {/* Price */}

                                                                <View style={{ marginTop: 5, justifyContent: "space-between", width: "100%" }}>
                                                                    <Item style={styles.input}>
                                                                        <Input
                                                                            keyboardType={"numeric"}
                                                                            placeholder={this.props.str.totalprice}
                                                                            placeholderStyle={{ fontSize: 10 }}
                                                                            placeholderTextColor="#b3b3b3"
                                                                            label={this.props.str.totalprice}
                                                                            style={{ fontSize: 16 }}
                                                                            onChangeText={(e) => { this.setState({ totalprice: e }) }}
                                                                            value={this.state.totalprice}
                                                                        />
                                                                        <IconIonicons name='md-pricetags' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                                    </Item>
                                                                </View>

                                                                {/* total price currency */}

                                                                <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                                                                    <Item>
                                                                        <Picker mode="dropdown" style={{ height: 50, width: "90%", color: "black" }}
                                                                            placeholderStyle={{ color: "#E94E1C" }} placeholderIconColor="#E94E1C"
                                                                            selectedValue={this.state.totalpricecurrency}
                                                                            onValueChange={(itemValue, itemIndex) => this.setState({ totalpricecurrency: itemValue })}>
                                                                            <Picker.Item label={this.props.str.totalpricecurrency} value="" />
                                                                            <Picker.Item label={this.props.str.usdollar} value="USD" key={"USD"} />
                                                                            <Picker.Item label={this.props.str.egyptainpound} value="EGP" key={"EGP"} />
                                                                        </Picker>
                                                                    </Item>

                                                                </View>

                                                                {/* Price per unit */}

                                                                <View style={{ marginTop: 5, justifyContent: "space-between", width: "100%" }}>
                                                                    <Item style={styles.input}>
                                                                        <Input
                                                                            keyboardType={"numeric"}
                                                                            placeholder={this.props.str.priceperunit}
                                                                            placeholderStyle={{ fontSize: 10 }}
                                                                            placeholderTextColor="#b3b3b3"
                                                                            label={this.props.str.priceperunit}
                                                                            style={{ fontSize: 16 }}
                                                                            onChangeText={(e) => { this.setState({ priceperunit: e }) }}
                                                                            value={this.state.priceperunit}
                                                                        />
                                                                        <Icon name='cash-multiple' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                                    </Item>
                                                                </View>


                                                                {/* priceperunitcurrency  */}

                                                                <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                                                                    <Item>
                                                                        <Picker mode="dropdown" style={{ height: 50, width: "90%", color: "black" }}
                                                                            placeholderStyle={{ color: "#E94E1C" }} placeholderIconColor="#E94E1C"
                                                                            selectedValue={this.state.priceperunitcurrency}
                                                                            onValueChange={(itemValue, itemIndex) => this.setState({ priceperunitcurrency: itemValue })}>
                                                                            <Picker.Item label={this.props.str.priceperunitcurrency} value="" />
                                                                            <Picker.Item label={this.props.str.usdollar} value="USD" key={"USD"} />
                                                                            <Picker.Item label={this.props.str.egyptainpound} value="EGP" key={"EGP"} />
                                                                        </Picker>
                                                                    </Item>

                                                                </View>


                                                                {/* Price  unit */}

                                                                <View style={{ marginTop: 5, justifyContent: "space-between", width: "100%" }}>
                                                                    <Item style={styles.input}>
                                                                        <Input
                                                                            keyboardType={"numeric"}
                                                                            placeholder={this.props.str.priceunit}
                                                                            placeholderStyle={{ fontSize: 10 }}
                                                                            placeholderTextColor="#b3b3b3"
                                                                            label={this.props.str.priceunit}
                                                                            style={{ fontSize: 16 }}
                                                                            onChangeText={(e) => { this.setState({ priceunit: e }) }}
                                                                            value={this.state.priceunit}
                                                                        />
                                                                        <Icon name='cash-multiple' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                                    </Item>
                                                                </View>
                                                            </View>



                                                        ) : null
                                                    }

                                                    {/* rent */}

                                                    {
                                                        (this.state.perpose && this.state.perpose === "rent") ? (
                                                            <View style={{ width: "100%" }}>
                                                                {/* Price */}

                                                                <View style={{ marginTop: 5, justifyContent: "space-between", width: "100%" }}>
                                                                    <Item style={styles.input}>
                                                                        <Input
                                                                            keyboardType={"numeric"}
                                                                            placeholder={this.props.str.rentprice}
                                                                            placeholderStyle={{ fontSize: 10 }}
                                                                            placeholderTextColor="#b3b3b3"
                                                                            label={this.props.str.rentprice}
                                                                            style={{ fontSize: 16 }}
                                                                            onChangeText={(e) => { this.setState({ rentprice: e }) }}
                                                                            value={this.state.rentprice}
                                                                        />
                                                                        <IconIonicons name='md-pricetags' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                                    </Item>
                                                                </View>

                                                                {/* total price currency */}

                                                                <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                                                                    <Item>
                                                                        <Picker mode="dropdown" style={{ height: 50, width: "90%", color: "black" }}
                                                                            placeholderStyle={{ color: "#E94E1C" }} placeholderIconColor="#E94E1C"
                                                                            selectedValue={this.state.rentpricecurrency}
                                                                            onValueChange={(itemValue, itemIndex) => this.setState({ rentpricecurrency: itemValue })}>
                                                                            <Picker.Item label={this.props.str.rentpricecurrency} value="" />
                                                                            <Picker.Item label={this.props.str.usdollar} value="USD" key={"USD"} />
                                                                            <Picker.Item label={this.props.str.egyptainpound} value="EGP" key={"EGP"} />
                                                                        </Picker>
                                                                    </Item>

                                                                </View>

                                                                {/* Price per unit */}

                                                                <View style={{ marginTop: 5, justifyContent: "space-between", width: "100%" }}>
                                                                    <Item style={styles.input}>
                                                                        <Input
                                                                            keyboardType={"numeric"}
                                                                            placeholder={this.props.str.rentpriceunit}
                                                                            placeholderStyle={{ fontSize: 10 }}
                                                                            placeholderTextColor="#b3b3b3"
                                                                            label={this.props.str.rentpriceunit}
                                                                            style={{ fontSize: 16 }}
                                                                            onChangeText={(e) => { this.setState({ rentpriceunit: e }) }}
                                                                            value={this.state.rentpriceunit}
                                                                        />
                                                                        <Icon name='cash-multiple' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                                    </Item>
                                                                </View>
                                                            </View>
                                                        ) : null
                                                    }



                                                    {/* sale and rent */}

                                                    {
                                                        (this.state.perpose && this.state.perpose === "sale_or_rent") ? (
                                                            <View style={{ width: "100%" }}>
                                                                {/* SALE */}
                                                                {/* Price */}

                                                                <View style={{ marginTop: 5, justifyContent: "space-between", width: "100%" }}>
                                                                    <Item style={styles.input}>
                                                                        <Input
                                                                            keyboardType={"numeric"}
                                                                            placeholder={this.props.str.totalprice}
                                                                            placeholderStyle={{ fontSize: 10 }}
                                                                            placeholderTextColor="#b3b3b3"
                                                                            label={this.props.str.totalprice}
                                                                            style={{ fontSize: 16 }}
                                                                            onChangeText={(e) => { this.setState({ totalprice: e }) }}
                                                                            value={this.state.totalprice}
                                                                        />
                                                                        <IconIonicons name='md-pricetags' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                                    </Item>
                                                                </View>

                                                                {/* total price currency */}

                                                                <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                                                                    <Item>
                                                                        <Picker mode="dropdown" style={{ height: 50, width: "90%", color: "black" }}
                                                                            placeholderStyle={{ color: "#E94E1C" }} placeholderIconColor="#E94E1C"
                                                                            selectedValue={this.state.totalpricecurrency}
                                                                            onValueChange={(itemValue, itemIndex) => this.setState({ totalpricecurrency: itemValue })}>
                                                                            <Picker.Item label={this.props.str.totalpricecurrency} value="" />
                                                                            <Picker.Item label={this.props.str.usdollar} value="USD" key={"USD"} />
                                                                            <Picker.Item label={this.props.str.egyptainpound} value="EGP" key={"EGP"} />
                                                                        </Picker>
                                                                    </Item>

                                                                </View>

                                                                {/* Price per unit */}

                                                                <View style={{ marginTop: 5, justifyContent: "space-between", width: "100%" }}>
                                                                    <Item style={styles.input}>
                                                                        <Input
                                                                            keyboardType={"numeric"}
                                                                            placeholder={this.props.str.priceperunit}
                                                                            placeholderStyle={{ fontSize: 10 }}
                                                                            placeholderTextColor="#b3b3b3"
                                                                            label={this.props.str.priceperunit}
                                                                            style={{ fontSize: 16 }}
                                                                            onChangeText={(e) => { this.setState({ priceperunit: e }) }}
                                                                            value={this.state.priceperunit}
                                                                        />
                                                                        <Icon name='cash-multiple' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                                    </Item>
                                                                </View>



                                                                {/* priceperunitcurrency  */}

                                                                <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                                                                    <Item>
                                                                        <Picker mode="dropdown" style={{ height: 50, width: "90%", color: "black" }}
                                                                            placeholderStyle={{ color: "#E94E1C" }} placeholderIconColor="#E94E1C"
                                                                            selectedValue={this.state.priceperunitcurrency}
                                                                            onValueChange={(itemValue, itemIndex) => this.setState({ priceperunitcurrency: itemValue })}>
                                                                            <Picker.Item label={this.props.str.priceperunitcurrency} value="" />
                                                                            <Picker.Item label={this.props.str.usdollar} value="USD" key={"USD"} />
                                                                            <Picker.Item label={this.props.str.egyptainpound} value="EGP" key={"EGP"} />
                                                                        </Picker>
                                                                    </Item>

                                                                </View>


                                                                {/* Price  unit */}

                                                                <View style={{ marginTop: 5, justifyContent: "space-between", width: "100%" }}>
                                                                    <Item style={styles.input}>
                                                                        <Input
                                                                            keyboardType={"numeric"}
                                                                            placeholder={this.props.str.priceunit}
                                                                            placeholderStyle={{ fontSize: 10 }}
                                                                            placeholderTextColor="#b3b3b3"
                                                                            label={this.props.str.priceunit}
                                                                            style={{ fontSize: 16 }}
                                                                            onChangeText={(e) => { this.setState({ priceunit: e }) }}
                                                                            value={this.state.priceunit}
                                                                        />
                                                                        <Icon name='cash-multiple' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                                    </Item>
                                                                </View>


                                                                {/* RENT */}

                                                                {/* Price */}

                                                                <View style={{ marginTop: 5, justifyContent: "space-between", width: "100%" }}>
                                                                    <Item style={styles.input}>
                                                                        <Input
                                                                            keyboardType={"numeric"}
                                                                            placeholder={this.props.str.rentprice}
                                                                            placeholderStyle={{ fontSize: 10 }}
                                                                            placeholderTextColor="#b3b3b3"
                                                                            label={this.props.str.rentprice}
                                                                            style={{ fontSize: 16 }}
                                                                            onChangeText={(e) => { this.setState({ rentprice: e }) }}
                                                                            value={this.state.rentprice}
                                                                        />
                                                                        <IconIonicons name='md-pricetags' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                                    </Item>
                                                                </View>

                                                                {/* total price currency */}

                                                                <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                                                                    <Item>
                                                                        <Picker mode="dropdown" style={{ height: 50, width: "90%", color: "black" }}
                                                                            placeholderStyle={{ color: "#E94E1C" }} placeholderIconColor="#E94E1C"
                                                                            selectedValue={this.state.rentpricecurrency}
                                                                            onValueChange={(itemValue, itemIndex) => this.setState({ rentpricecurrency: itemValue })}>
                                                                            <Picker.Item label={this.props.str.rentpricecurrency} value="" />
                                                                            <Picker.Item label={this.props.str.usdollar} value="USD" key={"USD"} />
                                                                            <Picker.Item label={this.props.str.egyptainpound} value="EGP" key={"EGP"} />
                                                                        </Picker>
                                                                    </Item>

                                                                </View>

                                                                {/* Price per unit */}

                                                                <View style={{ marginTop: 5, justifyContent: "space-between", width: "100%" }}>
                                                                    <Item style={styles.input}>
                                                                        <Input
                                                                            keyboardType={"numeric"}
                                                                            placeholder={this.props.str.rentpriceunit}
                                                                            placeholderStyle={{ fontSize: 10 }}
                                                                            placeholderTextColor="#b3b3b3"
                                                                            label={this.props.str.rentpriceunit}
                                                                            style={{ fontSize: 16 }}
                                                                            onChangeText={(e) => { this.setState({ rentpriceunit: e }) }}
                                                                            value={this.state.rentpriceunit}
                                                                        />
                                                                        <Icon name='cash-multiple' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                                    </Item>
                                                                </View>
                                                            </View>
                                                        ) : null
                                                    }
                                                </View>
                                            ) : null
                                        }



                                        {/* propertyistimesheare SwitchButton */}
                                        <View style={{ marginTop: 15, flexDirection: "row", width: "90%", height: 50, justifyContent: "space-between", alignItems: "center", borderBottomColor: "#b3b3b3", borderBottomWidth: 0.5, }}>
                                            <Text style={{ color: "black", fontWeight: "bold", marginLeft: "3%" }}>{this.props.str.propertyistimesheare}</Text>
                                            <SwitchButton name={"propertyistimesheare"} selected={this.state.timeshare == 0 ? false : true} getData={(data, name) => { this.switchButton(data, name) }} />
                                        </View>



                                        {


                                            (this.state.perpose && this.state.perpose === "sale") || this.state.perpose === "sale_or_rent" ? (
                                                // {/* creaditpayment SwitchButton*/}
                                                < View style={{ marginTop: 15, flexDirection: "row", width: "90%", height: 50, justifyContent: "space-between", alignItems: "center", borderBottomColor: "#b3b3b3", borderBottomWidth: 0.5, }}>
                                                    <Text style={{ color: "black", fontWeight: "bold", marginLeft: "3%" }}>{this.props.str.creaditpayment}</Text>
                                                    <SwitchButton name={"creaditpayment"} selected={this.props.propertyDataForEdit ? true : false} getData={(data, name) => { this.switchButton(data, name) }} />
                                                </View>

                                            ) : null






                                        }

                                        {
                                            (this.state.creaditpayment === false) ? (
                                                <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                                                    {/* Upfront payment if available*/}
                                                    <View style={{ marginTop: 5 }}>
                                                        <Item style={styles.input}>
                                                            <Input
                                                                keyboardType={"numeric"}
                                                                placeholder={this.props.str.upfrontpayment}
                                                                placeholderStyle={{ fontSize: 10 }}
                                                                placeholderTextColor="#b3b3b3"
                                                                label={this.props.str.upfrontpayment}
                                                                style={{ fontSize: 16 }}
                                                                onChangeText={(e) => { this.setState({ upfrontpayment: e }) }}
                                                                value={this.state.upfrontpayment}
                                                            />
                                                            <Icon name='cash-multiple' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                        </Item>
                                                    </View>

                                                    {/* monthlypayment if available*/}
                                                    <View style={{ marginTop: 5 }}>
                                                        <Item style={styles.input}>
                                                            <Input
                                                                keyboardType={"numeric"}
                                                                placeholder={this.props.str.monthlypayment}
                                                                placeholderStyle={{ fontSize: 10 }}
                                                                placeholderTextColor="#b3b3b3"
                                                                label={this.props.str.monthlypayment}
                                                                style={{ fontSize: 16 }}
                                                                onChangeText={(e) => { this.setState({ monthlypayment: e }) }}
                                                                value={this.state.monthlypayment}
                                                            />
                                                            <Icon name='cash-multiple' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                        </Item>
                                                    </View>

                                                    {/* quarterlypayment if available*/}
                                                    <View style={{ marginTop: 5 }}>
                                                        <Item style={styles.input}>
                                                            <Input
                                                                keyboardType={"numeric"}
                                                                placeholder={this.props.str.quarterlypayment}
                                                                placeholderStyle={{ fontSize: 10 }}
                                                                placeholderTextColor="#b3b3b3"
                                                                label={this.props.str.quarterlypayment}
                                                                style={{ fontSize: 16 }}
                                                                onChangeText={(e) => { this.setState({ quarterlypayment: e }) }}
                                                                value={this.state.quarterlypayment}
                                                            />
                                                            <Icon name='cash-multiple' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                        </Item>
                                                    </View>

                                                    {/* yearlypayment if available*/}
                                                    <View style={{ marginTop: 5 }}>
                                                        <Item style={styles.input}>
                                                            <Input
                                                                keyboardType={"numeric"}
                                                                placeholder={this.props.str.yearlypayment}
                                                                placeholderStyle={{ fontSize: 10 }}
                                                                placeholderTextColor="#b3b3b3"
                                                                label={this.props.str.yearlypayment}
                                                                style={{ fontSize: 16 }}
                                                                onChangeText={(e) => { this.setState({ yearlypayment: e }) }}
                                                                value={this.state.yearlypayment}
                                                            />
                                                            <Icon name='cash-multiple' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                        </Item>
                                                    </View>

                                                    {/* period if available*/}
                                                    <View style={{ marginTop: 5 }}>
                                                        <Item style={styles.input}>
                                                            <Input
                                                                keyboardType={"numeric"}
                                                                placeholder={this.props.str.period}
                                                                placeholderStyle={{ fontSize: 10 }}
                                                                placeholderTextColor="#b3b3b3"
                                                                label={this.props.str.period}
                                                                style={{ fontSize: 16 }}
                                                                onChangeText={(e) => { this.setState({ period: e }) }}
                                                                value={this.state.period}
                                                            />
                                                            <Icon name='cash-multiple' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                        </Item>
                                                    </View>

                                                    {/* Input periodpriceunit */}

                                                    <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                                                        <Item>
                                                            <Picker
                                                                mode="dropdown"
                                                                style={{ height: 50, width: "90%", color: "black" }}
                                                                placeholderStyle={{ color: "#E94E1C" }}
                                                                placeholderIconColor="#E94E1C"
                                                                selectedValue={this.state.periodpriceunit}
                                                                onValueChange={
                                                                    (itemValue, itemIndex) => this.setState({ periodpriceunit: itemValue })
                                                                }
                                                            >
                                                                <Picker.Item label={this.props.str.periodpriceunit} value="" />
                                                                <Picker.Item label={this.props.str.month} value="month" key={"month"} />
                                                                <Picker.Item label={this.props.str.year} value="year" key={"year"} />
                                                            </Picker>
                                                        </Item>

                                                    </View>


                                                </View>
                                            ) : null
                                        }


                                        {/* pricenegotiable SwitchButton*/}
                                        <View style={{ marginTop: 15, flexDirection: "row", width: "90%", height: 50, justifyContent: "space-between", alignItems: "center", borderBottomColor: "#b3b3b3", borderBottomWidth: 0.5, }}>
                                            <Text style={{ color: "black", fontWeight: "bold", marginLeft: "3%" }}>{this.props.str.pricenegotiable}</Text>
                                            <SwitchButton name={"pricenegotiable"} selected={this.state.pricenegotiable == 0 ? false : true} getData={(data, name) => { this.switchButton(data, name) }} />
                                        </View>
                                    </View>

                                    <View style={{ marginTop: 20, backgroundColor: "#1E90FF", height: 40, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ color: "white", fontWeight: "bold" }}>{this.props.str.summary}</Text>
                                    </View>

                                    <View style={{ width: "90%", marginHorizontal: "5%", justifyContent: "center", alignItems: "center", }}>

                                        {/* areasize */}

                                        {
                                            (
                                                this.state.type === "house" ||
                                                this.state.type === "apartment" || this.state.type === "office" ||
                                                this.state.type === "clinic" || this.state.type === "hospital" ||
                                                this.state.type === "room" || this.state.type === "other" ||
                                                this.state.type === "com_space" || this.state.type === "shop" ||
                                                this.state.type === "warehouse" || this.state.type === "condo" || this.state.type === "villa"
                                            ) ? (
                                                    <View style={{}}>
                                                        <View style={{ marginTop: 5, width: "100%", }}>
                                                            <Item style={styles.input}>
                                                                <Input
                                                                    keyboardType={"numeric"}
                                                                    placeholder={this.props.str.areasize}
                                                                    placeholderStyle={{ fontSize: 10 }}
                                                                    placeholderTextColor="#b3b3b3"
                                                                    label={this.props.str.areasize}
                                                                    style={{ fontSize: 16 }}
                                                                    onChangeText={(e) => { this.setState({ areasize: e }) }}
                                                                    value={this.state.areasize}
                                                                />
                                                                <IconIonicons name='md-resize' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                            </Item>
                                                        </View>

                                                        <View style={{ marginTop: 5, width: "100%", }}>
                                                            <Item style={styles.input}>
                                                                <Input
                                                                    // keyboardType={"numeric"}
                                                                    placeholder={this.props.str.home_size_unit}
                                                                    placeholderStyle={{ fontSize: 10 }}
                                                                    placeholderTextColor="#b3b3b3"
                                                                    label={this.props.str.home_size_unit}
                                                                    style={{ fontSize: 16 }}
                                                                    onChangeText={(e) => { this.setState({ home_size_unit: e }) }}
                                                                    value={this.state.home_size_unit}
                                                                />
                                                                <IconSimpleLineIcons name="size-actual" style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                            </Item>
                                                        </View>
                                                    </View>
                                                ) : null
                                        }



                                        {
                                            (
                                                this.state.type === "house" ||
                                                this.state.type === "villa" || this.state.type === "office" ||
                                                this.state.type === "clinic" || this.state.type === "hospital" ||
                                                this.state.type === "land" || this.state.type === "farm"

                                            ) ? (
                                                    <View style={{}}>
                                                        <View style={{ marginTop: 5, width: "100%", }}>
                                                            <Item style={styles.input}>
                                                                <Input
                                                                    // keyboardType={"numeric"}-
                                                                    placeholder={this.props.str.buildingareasize}
                                                                    placeholderStyle={{ fontSize: 10 }}
                                                                    placeholderTextColor="#b3b3b3"
                                                                    label={this.props.str.buildingareasize}
                                                                    style={{ fontSize: 16 }}
                                                                    onChangeText={(e) => { this.setState({ buildingareasize: e }) }}
                                                                    value={this.state.buildingareasize}
                                                                />
                                                                <IconIonicons name='md-resize' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                            </Item>
                                                        </View>

                                                        {
                                                            (this.state.type === "land") ? (
                                                                <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                                                                    <Item>
                                                                        <Picker
                                                                            mode="dropdown"
                                                                            style={{ height: 50, width: "90%", color: "black" }}
                                                                            placeholderStyle={{ color: "#E94E1C" }}
                                                                            placeholderIconColor="#E94E1C"
                                                                            selectedValue={this.state.landsizeunit}
                                                                            onValueChange={
                                                                                (itemValue, itemIndex) => this.setState({ landsizeunit: itemValue })
                                                                            }
                                                                        >
                                                                            <Picker.Item label={this.props.str.landsizeunit} value="" />
                                                                            <Picker.Item label={this.props.str.arce} value="acre" key={"acre"} />
                                                                            <Picker.Item label={this.props.str.hector} value="hector" key={"hector"} />
                                                                            <Picker.Item label={this.props.str.fedan} value="fedan" key={"fedan"} />
                                                                            <Picker.Item label={this.props.str.squarefeet} value="squarefeet" key={"squarefeet"} />
                                                                            <Picker.Item label={this.props.str.squaremetres} value="squaremetres" key={"squaremetres"} />
                                                                        </Picker>
                                                                    </Item>
                                                                </View>
                                                            ) :
                                                                <View style={{ marginTop: 5, width: "100%" }}>
                                                                    <Item style={styles.input}>
                                                                        <Input
                                                                            // keyboardType={"numeric"}
                                                                            placeholder={this.props.str.landsizeunit}
                                                                            placeholderStyle={{ fontSize: 10 }}
                                                                            placeholderTextColor="#b3b3b3"
                                                                            label={this.props.str.landsizeunit}
                                                                            style={{ fontSize: 16 }}
                                                                            onChangeText={(e) => { this.setState({ landsizeunit: e }) }}
                                                                            value={this.state.landsizeunit}
                                                                        />
                                                                        <IconSimpleLineIcons name="size-actual" style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                                    </Item>
                                                                </View>
                                                        }

                                                    </View>
                                                ) : null
                                        }







                                        {/* yearbuilt */}
                                        <View style={{ marginTop: 5 }}>
                                            <Item style={styles.input}>
                                                <Input
                                                    keyboardType={"numeric"}
                                                    placeholder={this.props.str.yearbuilt}
                                                    placeholderStyle={{ fontSize: 10 }}
                                                    placeholderTextColor="#b3b3b3"
                                                    label={this.props.str.yearbuilt}
                                                    style={{ fontSize: 16 }}
                                                    onChangeText={(e) => { this.setState({ yearbuilt: e }) }}
                                                    value={this.state.yearbuilt}
                                                />
                                                <IconFontAwesome name='calendar' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                            </Item>
                                        </View>
                                        {/* bathroom */}
                                        <View style={{ marginTop: 5 }}>
                                            <Item style={styles.input}>
                                                <Input
                                                    keyboardType={"numeric"}
                                                    placeholder={this.props.str.bathrooms}
                                                    placeholderStyle={{ fontSize: 10 }}
                                                    placeholderTextColor="#b3b3b3"
                                                    label={this.props.str.bathrooms}
                                                    style={{ fontSize: 16 }}
                                                    onChangeText={(e) => { this.setState({ bathrooms: e }) }}
                                                    value={this.state.bathrooms}
                                                />
                                                <IconFontAwesome name='bathtub' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                            </Item>
                                        </View>
                                        {/* bedroom */}
                                        <View style={{ marginTop: 5 }}>
                                            <Item style={styles.input}>
                                                <Input
                                                    keyboardType={"numeric"}
                                                    placeholder={this.props.str.bedrooms}
                                                    placeholderStyle={{ fontSize: 10 }}
                                                    placeholderTextColor="#b3b3b3"
                                                    label={this.props.str.bedrooms}
                                                    style={{ fontSize: 16 }}
                                                    onChangeText={(e) => { this.setState({ bedrooms: e }) }}
                                                    value={this.state.bedrooms}
                                                />
                                                <Icon name='scale-bathroom' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                            </Item>
                                        </View>


                                        {
                                            (
                                                this.state.type === "house" ||
                                                this.state.type === "villa" || this.state.type === "office" ||
                                                this.state.type === "clinic" || this.state.type === "hospital"

                                            ) ? (
                                                    //    {/* Floor */}
                                                    <View style={{ marginTop: 5, }}>
                                                        <Item style={styles.input}>
                                                            <Input
                                                                keyboardType={"numeric"}
                                                                placeholder={this.props.str.numberoffloors}
                                                                placeholderStyle={{ fontSize: 10 }}
                                                                placeholderTextColor="#b3b3b3"
                                                                label={this.props.str.numberoffloors}
                                                                style={{ fontSize: 16 }}
                                                                onChangeText={(e) => { this.setState({ number_of_floor: e }) }}
                                                                value={this.state.number_of_floor}
                                                            />
                                                            <IconFontAwesome name='building' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                        </Item>
                                                    </View>
                                                ) : null
                                        }

                                        {
                                            (
                                                this.state.type === "factory"

                                            ) ? (
                                                    <View style={{}}>
                                                        <View style={{ marginTop: 5, width: "100%" }}>
                                                            <Item style={styles.input}>
                                                                <Input
                                                                    keyboardType={"numeric"}
                                                                    placeholder={this.props.str.area}
                                                                    placeholderStyle={{ fontSize: 10 }}
                                                                    placeholderTextColor="#b3b3b3"
                                                                    label={this.props.str.area}
                                                                    style={{ fontSize: 16 }}
                                                                    onChangeText={(e) => { this.setState({ area: e }) }}
                                                                    value={this.state.area}
                                                                />
                                                                <IconIonicons name='md-resize' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                            </Item>
                                                        </View>

                                                        <View style={{ marginTop: 5 }}>
                                                            <Item style={styles.input}>
                                                                <Input
                                                                    keyboardType={"numeric"}
                                                                    placeholder={this.props.str.certification}
                                                                    placeholderStyle={{ fontSize: 10 }}
                                                                    placeholderTextColor="#b3b3b3"
                                                                    label={this.props.str.certification}
                                                                    style={{ fontSize: 16 }}
                                                                    onChangeText={(e) => { this.setState({ certification: e }) }}
                                                                    value={this.state.certification}
                                                                />
                                                                <Icon name='scale-bathroom' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                            </Item>
                                                        </View>
                                                    </View>


                                                ) : null
                                        }

                                        {/* Input estateCondition */}

                                        <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                                            <Item>
                                                <Picker
                                                    mode="dropdown"
                                                    style={{ height: 50, width: "90%", color: "black" }}
                                                    placeholderStyle={{ color: "#E94E1C" }}
                                                    placeholderIconColor="#E94E1C"
                                                    selectedValue={this.state.estateCondition}
                                                    onValueChange={
                                                        (itemValue, itemIndex) => this.setState({ estateCondition: itemValue })
                                                    }
                                                >
                                                    <Picker.Item label={this.props.str.estateCondition} value="" />
                                                    {
                                                        Object.keys(this.state.statusProperty).map((key, index) => {
                                                            // console.log(this.state.statusProperty[key], key, index, "inmapestatecondition")
                                                            return (
                                                                <Picker.Item label={this.state.statusProperty[key]} value={key} key={key} />
                                                            )
                                                        })
                                                    }
                                                </Picker>
                                            </Item>
                                        </View>

                                        {/* thepropertyis SwitchButton*/}
                                        <View style={{ marginTop: 15, flexDirection: "row", width: "90%", height: 50, justifyContent: "space-between", alignItems: "center", borderBottomColor: "#b3b3b3", borderBottomWidth: 0.5, }}>
                                            <Text style={{ color: "black", fontWeight: "bold", marginLeft: "3%" }}>{this.props.str.thepropertyis}</Text>
                                            <SwitchButton name={"thepropertyis"} getData={(data, name) => { this.switchButton(data, name) }} />
                                        </View>


                                        {
                                            (this.state.thepropertyisFlag === true) ? (
                                                <View style={{ marginTop: 15, width: "100%", alignItems: "center", justifyContent: "center", }}>
                                                    <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#b3b3b3", borderBottomWidth: 0.5, }}>
                                                        <DatePicker
                                                            defaultDate={new Date()}
                                                            // minimumDate={new Date()}
                                                            // maximumDate={new Date()}
                                                            locale={"en"}
                                                            timeZoneOffsetInMinutes={undefined}
                                                            modalTransparent={false}
                                                            animationType={"fade"}
                                                            androidMode={"default"}
                                                            placeHolderText={this.props.propertyDataForEdit && this.props.propertyDataForEdit.deliverydate ? this.props.propertyDataForEdit.deliverydate : this.props.str.selectdeliverydate}
                                                            textStyle={{ color: "#EC4651", }}
                                                            placeHolderTextStyle={{ color: "black", fontSize: 16, fontWeight: "bold" }}
                                                            onDateChange={(data) => this.setDate(data)}
                                                        />
                                                        <IconEntypo name='calendar' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                    </View>
                                                </View>
                                            ) : null
                                        }
                                    </View>

                                    {/* //distance */}

                                    <View style={{ marginTop: 20, backgroundColor: "#1E90FF", height: 40, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ color: "white", fontWeight: "bold" }}>{this.props.str.distance}</Text>
                                    </View>

                                    <View style={{ width: "100%", justifyContent: "center", alignItems: "center", }}>
                                        {/* listDistance */}

                                        {
                                            Object.keys(this.state.listDistance).map((key, index) => {
                                                // console.log(this.state.listDistance[key].title, "maaap")
                                                return (
                                                    <View style={{ marginTop: 20, width: "80%", height: 70, }}>
                                                        <Text style={{ color: "black", fontWeight: "bold", marginLeft: "2%" }}>{this.state.listDistance[key].title}</Text>
                                                        <View style={{ flex: 1, flexDirection: "row" }}>
                                                            <View style={{ flex: 0.5, }}>
                                                                <Item style={styles.input}>
                                                                    <Input
                                                                        keyboardType={"numeric"}
                                                                        placeholder={this.props.str.distance}
                                                                        placeholderStyle={{ fontSize: 10 }}
                                                                        placeholderTextColor="#b3b3b3"
                                                                        label={this.props.str.cafe}
                                                                        style={{ fontSize: 16 }}
                                                                        onChangeText={(e) => { this.setDistance(this.state.listDistance[key].title, this.state.listDistance[key].id, e, index) }}
                                                                        // onBlur={this.onBlurDistance.bind(this.state.listDistance[key].title)}
                                                                        // onBlur={this.onBlurDistance(index)}
                                                                        value={this.state[`distance${this.state.listDistance[key].title}`]}
                                                                    />
                                                                    <Icon name='map-marker-distance' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                                                </Item>
                                                            </View>

                                                            <View style={{ flex: 0.5, }}>
                                                                <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                                                                    <Item>
                                                                        <Picker
                                                                            mode="dropdown"
                                                                            style={{ height: 50, width: "90%", color: "black" }}
                                                                            placeholderStyle={{ color: "#E94E1C" }}
                                                                            placeholderIconColor="#E94E1C"

                                                                            selectedValue={this.state[`distance_unitVal${this.state.listDistance[key].title}`]}
                                                                            onValueChange={
                                                                                (itemValue, ) => { this.setDistanceDd(this.state.listDistance[key].title, this.state.listDistance[key].id, index, itemValue) }
                                                                            }
                                                                        >
                                                                            {/* <Picker.Item label={this.props.str.selectunit} value="" /> */}
                                                                            <Picker.Item label={this.props.str.minutes} value={"Minutes"} key={"Minutes"} />
                                                                            <Picker.Item label={this.props.str.meters} value={"Meters"} key={"Meters"} />
                                                                            <Picker.Item label={this.props.str.feet} value={"Feets"} key={"Feets"} />
                                                                            <Picker.Item label={this.props.str.kilometers} value={"Kilometers"} key={"Kilometers"} />
                                                                            <Picker.Item label={this.props.str.mile} value={"Miles"} key={"Miles"} />
                                                                        </Picker>
                                                                    </Item>
                                                                </View>
                                                            </View>


                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }















                                    </View>



                                    {/* amenities */}

                                    <View style={{ marginTop: 20, backgroundColor: "#1E90FF", height: 40, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ color: "white", fontWeight: "bold" }}>{this.props.str.amenities}</Text>
                                    </View>

                                    <View style={{ width: "90%", marginHorizontal: "5%", justifyContent: "center", alignItems: "center", }}>
                                        {
                                            (this.state.facilities) ? (
                                                <View style={{ width: "100%", marginHorizontal: "5%", justifyContent: "center", alignItems: "center", }}>
                                                    {
                                                        Object.keys(this.state.facilities).map((key, index) => {
                                                            return (
                                                                // console.log(this.state.facilities[key], "facilities")
                                                                <View style={{ marginTop: 15, flexDirection: "row", width: "90%", height: 50, justifyContent: "space-between", alignItems: "center", borderBottomColor: "#b3b3b3", borderBottomWidth: 0.5, }}>
                                                                    <Text style={{ color: "black", fontWeight: "bold", marginLeft: "3%" }}>{this.state.facilities[key].title}</Text>
                                                                    <SwitchButton name={this.state.facilities[key].id} selected={this.state.facilities[key].selected} getData={(data, name) => { this.switchButtonForfacilities(data, name) }} />
                                                                </View>

                                                            )
                                                        })
                                                    }
                                                </View>
                                            ) : null
                                        }
                                    </View>


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
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        setStepsForAddProperties: (steps) => {
            dispatch(setStepsForAddProperties(steps))
        },
        setOwnerProperties: (data) => {
            dispatch(setOwnerProperties(data))
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(AddProperty);


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
