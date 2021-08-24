
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, ScrollView, ListView, RefreshControl, Picker, ActivityIndicator, Modal, TouchableHighlight, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
import axios from 'axios';
import IconFontFontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextField } from 'react-native-material-textfield';
import * as Animatable from 'react-native-animatable';
import MultiSelect from 'react-native-multiple-select';
import { resultData } from '../../../Store/Action/action'
import IconFontIonicons from 'react-native-vector-icons/Ionicons';
import { Item, Input, CheckBox, DatePicker } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class SearchForProperties extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchFlag: true,

            //state and cities
            stateFromApi: [],
            allCityFromApi: [],
            selectedState: "",

            statusProperty: [],

            //types
            // selectedType: [],
            // type: [
            //     {
            //         id: props.str.apartment,
            //         name: props.str.apartment,
            //     },
            //     {
            //         id: props.str.house,
            //         name: props.str.house,
            //     },
            //     {
            //         id: props.str.condo,
            //         name: props.str.condo,
            //     },
            //     {
            //         id: props.str.chalet,
            //         name: props.str.chalet,
            //     },
            //     {
            //         id: props.str.villa,
            //         name: props.str.villa,
            //     },
            //     {
            //         id: props.str.palace,
            //         name: props.str.palace,
            //     },
            //     {
            //         id: props.str.shop,
            //         name: props.str.shop,
            //     },
            //     {
            //         id: props.str.warehouse,
            //         name: props.str.warehouse,
            //     },
            //     {
            //         id: props.str.office,
            //         name: props.str.office,
            //     },
            //     {
            //         id: props.str.clinic,
            //         name: props.str.clinic,
            //     },
            //     {
            //         id: props.str.hospital,
            //         name: props.str.hospital,
            //     },
            //     {
            //         id: props.str.farm,
            //         name: props.str.farm,
            //     },
            //     {
            //         id: props.str.factory,
            //         name: props.str.factory,
            //     },
            //     {
            //         id: props.str.room,
            //         name: props.str.room,
            //     },
            //     {
            //         id: props.str.others,
            //         name: props.str.others,
            //     },
            // ],

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


            //selected subtitels for
            // selectedPropertiesStatus: [],
            // propertiesStatus: [
            //     {
            //         id: props.str.newbuilding,
            //         name: props.str.newbuilding,
            //     },
            //     {
            //         id: props.str.oldbuilding,
            //         name: props.str.oldbuilding,
            //     },
            //     {
            //         id: props.str.notbuildyet,
            //         name: props.str.notbuildyet,
            //     },
            //     {
            //         id: props.str.underDevelopment,
            //         name: props.str.underDevelopment,
            //     },
            //     {
            //         id: props.str.halfFlasing,
            //         name: props.str.halfFlasing,
            //     },
            //     {
            //         id: props.str.completefinishing,
            //         name: props.str.completefinishing,
            //     },
            //     {
            //         id: props.str.hugeluxefinishing,
            //         name: props.str.hugeluxefinishing,
            //     },
            //     {
            //         id: props.str.furnished,
            //         name: props.str.furnished,
            //     },
            // ],

        }
    }



    componentWillMount() {
        this.getState(this)
        this.getCategoryPropertyMenu(this)
        this.getStatusProperty(this)


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




    // onSelectedItemsChangeType = selectedType => {
    //     this.setState({ selectedType });
    // };

    onSelectedItemsChangeSubtitlefor = selectedSubtitlefor => {
        if (selectedSubtitlefor.length < 4) {
            this.setState({ selectedSubtitlefor });
        }
        else {
            alert(this.props.str.maximum3items)
        }
    };



    // onSelectedItemsChangePropertiesStatus = selectedPropertiesStatus => {
    //     this.setState({ selectedPropertiesStatus });
    // };




    searchProperties() {
        cloneData = {
            estate_name: this.state.searchKeyword,
            property_code: this.state.propertiCode,
            state: this.state.selectedState,
            city: this.state.selectedCity,
            purpose_sale: this.state.perpose,
            type: this.state.type,
            suitable_categories: this.state.selectedSubtitlefor,
            condition: this.state.estateCondition,
            bedrooms: this.state.bedrooms,
            bathrooms: this.state.bathrooms,
            min_price: this.state.minimum,
            max_price: this.state.maximum,
            limit: 10,
            offset: 0
        }

        // if (this.state.selectedDistricts != undefined) {
        //     cloneData.location_district = this.state.selectedDistricts
        // }
        // if (this.state.selectedSubDistricts != undefined) {
        //     cloneData.location_subdistrict = this.state.selectedSubDistricts
        // }

        // console.log(cloneData, "cloneDacloneDatata")
        this._getFilterData(cloneData)
    }

    _getFilterData(cloneData) {
        this.setState({
            searchFlag: false
        })
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
        console.log(bodyFormData, '****280', cloneData);
        return axios({
            method: 'post',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/guest/getPropertiesSearch/",
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: bodyFormData
        })
            .then(data => {
                let responseAPI = data.data.results
                // console.log(responseAPI)
                this.props.resultData(responseAPI)
                Actions.Results({ SearchForProperties: "SearchForProperties", cloneData: cloneData })
                this.setState({
                    searchFlag: true
                })
            })
            .catch(err => {
                console.log(err)
                alert(err.message)
                this.setState({
                    err: err.message,
                    moreloader: false,
                    searchFlag: true
                })
            })
    }







    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: "center",
                // backgroundColor: '#333333',
                backgroundColor: "white",
                width: "100%",

            }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", }}>
                    <View style={{ flex: 0.15, flexDirection: "row", backgroundColor: "#E94E1B", width: "100%" }}>
                        <TouchableOpacity onPress={() => { Actions.pop() }} style={{ flex: 0.2, justifyContent: "center", alignItems: "center" }}>
                            <IconFontIonicons name='md-arrow-back' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, marginTop: "30%" }} />
                        </TouchableOpacity>
                        <View style={{ flex: 0.2, backgroundColor: "#B33F19", justifyContent: "center", alignItems: "center" }}>
                            <IconFontFontAwesome name='search' style={{ fontSize: 30, color: "white", marginTop: "30%" }} />
                        </View>
                        <View style={{ flex: 0.8, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "white", marginTop: "10%" }}>{this.props.str.searchforproperty}</Text>
                        </View>
                    </View>
                    <ScrollView
                        contentContainerStyle={styles.contentContainer}
                        style={{ flex: 6, width: "100%" }}>
                        <View style={{ width: "90%", marginHorizontal: "5%", justifyContent: "center", alignItems: "center", }}>
                            {/* /Search with keyword */}
                            <View style={{ marginTop: 25 }}>
                                <Item style={styles.input}>
                                    <Input
                                        // keyboardType={"number"}
                                        placeholder={this.props.str.searchwithkeyword}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        label={this.props.str.searchwithkeyword}
                                        style={{ fontSize: 16 }}
                                        onChangeText={(e) => { this.setState({ searchKeyword: e }) }}
                                        value={this.state.title}
                                    />
                                    <Entypo name='keyboard' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                </Item>
                            </View>

                            {/* /Search property code */}
                            <View style={{ marginTop: 25 }}>
                                <Item style={styles.input}>
                                    <Input
                                        // keyboardType={"number"}
                                        placeholder={this.props.str.propertycode}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        label={this.props.str.propertycode}
                                        style={{ fontSize: 16 }}
                                        onChangeText={(e) => { this.setState({ propertiCode: e }) }}
                                        value={this.state.title}
                                    />
                                    <FontAwesome name='building' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                                </Item>
                            </View>

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
                                        style={{ height: 50, width: "90%", color: "black", marginTop: 15 }}
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
                                                    style={{ height: 50, width: "90%", color: "black", marginTop: 15 }}
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
                                {/* {
                                    (this.state.selectedCity != "" && this.state.districts && this.state.districts.length != 0) ? (
                                        <Animatable.View animation="slideInLeft" iterationCount={1}>
                                            <Item>
                                                <Picker
                                                    mode="dropdown"
                                                    style={{ height: 50, width: "90%", color: "black", marginTop: 15 }}
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
                                } */}



                                {/* ////////////////////////////////subdistricts///////////////////////////// */}
                                {/* {
                                    (this.state.selectedDistricts != "" && this.state.subdistricts && this.state.subdistricts.length != 0) ? (
                                        <Animatable.View animation="slideInLeft" iterationCount={1}>
                                            <Item>
                                                <Picker
                                                    mode="dropdown"
                                                    style={{ height: 50, width: "90%", color: "black", marginTop: 15 }}
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
                                } */}
                            </View>

                            {/* Input Perpose */}

                            <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                                <Item>
                                    <Picker
                                        mode="dropdown"
                                        style={{ height: 50, width: "90%", color: "black", marginTop: 15 }}
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
                                                style={{ height: 50, width: "90%", color: "black", marginTop: 15 }}
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

                            {/* Input estateCondition */}

                            <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                                <Item>
                                    <Picker
                                        mode="dropdown"
                                        style={{ height: 50, width: "90%", color: "black", marginTop: 15 }}
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

                            {/* ////////////////////////////////Input bedrooms and bathrooms///////////////////////////// */}
                            <View style={{ width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row", marginTop: 15 }}>
                                <Item style={{ width: "45%" }}>
                                    <Picker
                                        mode="dropdown"
                                        style={{ height: 50, width: "100%", color: "black" }}
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.bedrooms}
                                        onValueChange={
                                            (itemValue, itemIndex) => this.setState({ bedrooms: itemValue })
                                        }
                                    >
                                        <Picker.Item label={this.props.str.bedrooms} value="" />
                                        <Picker.Item label={this.props.str.any} value={"any"} key={"any"} />
                                        <Picker.Item label={'1'} value={"1"} key={"1"} />
                                        <Picker.Item label={'2'} value={"2"} key={"2"} />
                                        <Picker.Item label={'3'} value={"3"} key={"3"} />
                                    </Picker>
                                </Item>
                                <Item style={{ width: "45%" }}>
                                    <Picker
                                        mode="dropdown"
                                        style={{ height: 50, width: "100%", color: "black" }}
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.bathrooms}
                                        onValueChange={
                                            (itemValue, itemIndex) => this.setState({ bathrooms: itemValue })
                                        }
                                    >
                                        <Picker.Item label={this.props.str.bathrooms} value="" />
                                        <Picker.Item label={this.props.str.any} value={"any"} key={"any"} />
                                        <Picker.Item label={'1'} value={"1"} key={"1"} />
                                        <Picker.Item label={'2'} value={"2"} key={"2"} />
                                        <Picker.Item label={'3'} value={"3"} key={"3"} />
                                    </Picker>
                                </Item>
                            </View>

                            <View style={{ marginTop: 20, width: "90%", }}>
                                <Text style={{ color: "#1E90FF" }}>{this.props.str.pricerange}</Text>
                            </View>
                            <View style={{ width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row", top: -10 }}>
                                <Item style={{ width: "45%" }}>
                                    {/* <TextField
                                        keyboardType={"numeric"}
                                        textColor={"black"}
                                        tintColor={"#1E90FF"}
                                        baseColor={"black"}
                                        label={this.props.str.minimum}
                                        value={this.state.minimum}
                                        onChangeText={(e) => this.setState({ minimum: e })}
                                    /> */}

                                    <Input
                                        keyboardType={"number"}
                                        placeholder={this.props.str.minimum}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        label={this.props.str.minimum}
                                        style={{ fontSize: 16 }}
                                        onChangeText={(e) => { this.setState({ minimum: e }) }}
                                        value={this.state.minimum}
                                    />
                                </Item>
                                <Item style={{ width: "45%" }}>
                                    {/* <TextField
                                        keyboardType={"numeric"}
                                        textColor={"black"}
                                        tintColor={"#1E90FF"}
                                        baseColor={"black"}
                                        label={this.props.str.maximum}
                                        value={this.state.maximum}
                                        onChangeText={(e) => this.setState({ maximum: e })}
                                    /> */}

                                    <Input
                                        keyboardType={"number"}
                                        placeholder={this.props.str.maximum}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        label={this.props.str.maximum}
                                        style={{ fontSize: 16 }}
                                        onChangeText={(e) => { this.setState({ maximum: e }) }}
                                        value={this.state.maximum}
                                    />
                                </Item>

                            </View>

                            {
                                (this.state.searchFlag === true) ? (
                                    <TouchableOpacity style={{
                                        backgroundColor: "#1E90FF",
                                        width: "100%",
                                        height: 25,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: 15,
                                    }}
                                        onPress={() => {
                                            this.searchProperties(this)
                                        }}
                                    >

                                        <Text style={{ color: "white", fontSize: 12 }}>
                                            {this.props.str.searchnow}
                                        </Text>

                                    </TouchableOpacity>
                                ) : <ActivityIndicator style={{ marginTop: 15 }} />
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
        str: state.root.str
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        resultData: (searchResult) => {
            dispatch(resultData(searchResult))
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchForProperties);


const styles = StyleSheet.create({
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
