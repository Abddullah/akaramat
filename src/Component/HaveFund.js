import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, StatusBar, RefreshControl,
    Dimensions, WebView, Button, TextInput, ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Content, Card, CardItem, Thumbnail, Icon, Badge, Picker, Item } from 'native-base';
import { connect } from "react-redux";
import axios from 'axios';
import { Permissions, Location } from 'expo'
// import Drawer from '../../Component/drawer';
import InfiniteScroll from 'react-native-infinite-scroll';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontIcons from 'react-native-vector-icons/FontAwesome';

import {
    CheckBox
} from 'native-base';
import * as Animatable from 'react-native-animatable';
// import { TextField } from 'react-native-material-textfield';
import StepIndicator from 'react-native-step-indicator';
import Textarea from 'react-native-textarea';
import MapDirection from '../Component/map'




class HaveFund extends Component {
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
                name: 'proposed',
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
            countriesFromApi: null
        }
    }

    componentWillMount() {
        this.setState({
            token: this.props.userCredentials.token,
        })

        this.getCountries()

        this.getState()

        this.getCategory()
    }


    getCategory() {
        return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/dataselect/getNewCategoryProperty",
            headers: {
                "token": `bearer ${this.props.userCredentials.token}`,
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                console.log(data, 'data category here****')
                // let state = data.data.results
                // this.setState({
                //     stateFromApi: state
                // })
            })
            .catch(err => {
                console.log(err)
            })
    }


    dropDownChangeState = (itemValue, itemIndex) => {
        console.log(itemValue, "123456")
        if (itemValue) {
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
        console.log('this.props.str.language***', this.props.str.language)
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
                console.log(data.data.results, "countries", url);
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
        this.setState({
            selectedCountry: itemValue,
        })
    }

    dropDownChangeCity = (itemValue, itemIndex) => {

        this.setState({
            selectedCity: itemValue,
        })

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

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log(location, "getlocation")
        this.setState({ location });

    };

    step2() {
        const { name, email, phoneNumber, address, city, state,
            selectedCountry, currentPosition } = this.state

        if (name && email && phoneNumber && address && city && state && selectedCountry) {
            this.setState({ currentPosition: currentPosition + 1 })
        } else {
            alert(this.props.str.haveFundAlert2)
        }
        console.log(obj, 'object here')

    }

    location(location) {
        this.setState({ location })
    }

    step3() {
        const { address2, proposed, description, selectedState, selectedCity, location, currentPosition } = this.state

        var obj = {
            address2,
            proposed,
            description,
            selectedState,
            selectedCity,
            location
        }

        if (address2 && proposed && description && selectedCity && selectedState && location) {
            this.setState({ currentPosition: currentPosition + 1 })
        } else {
            // alert(this.props.str.haveFundAlert3)
            this._getLocationAsync()
        }

    }

    done() {
        const { name, email, phoneNumber, address, city, state, selectedCountry,
            currentPosition, address2, proposed, description, selectedState,
            selectedCity, location } = this.state

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
            proposed,
            description,
            address,
            state,
            location_city: city,
            latitude: location.latitude,
            longitude: location.longitude
        }

        var bodyFormData = new FormData();

        for (var key in cloneData) {
            bodyFormData.append(key, cloneData[key]);
        }

        var urlm = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/people/user/addMoneyInvestors'
        var options = {
            method: 'POST',
            url: urlm,
            headers:
            {
                token: "bearer " + this.state.token,
                clientsecret: '(*jh2kj36gjhasdi78743982u432j',
                clientkey: '34532hbjdsakjd2&&gjhjh11',
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
        const { textInput, countriesFromApi, currentPosition, step2Input, step2Input2, stateFromApi, loader } = this.state
        const labels = [this.props.str.aboutme, this.props.str.money, this.props.str.done];

        return (
            <View style={{
                flex: 1,
                backgroundColor: "white",
                width: "100%",
            }}>
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
                        <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.fund}</Text>
                    </View>
                </View>

                <View style={{ flex: 8, alignItems: 'center' }}>
                    <View style={{ width: '100%', paddingVertical: '5%' }}>
                        <StepIndicator
                            customStyles={customStyles}
                            currentPosition={this.state.currentPosition}
                            labels={labels}
                            stepCount={3}
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
                                    this.textFields(step2Input, 0)
                                }

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
    console.log('***string*****', state.root.str);
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
export default connect(mapStateToProps, mapDispatchToProps)(HaveFund);
const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 40,
    },

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