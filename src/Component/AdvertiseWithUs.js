import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, StatusBar, RefreshControl,
    Dimensions, WebView, Button, TextInput, ActivityIndicator, Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Content, Card, CardItem, Thumbnail, Icon, Badge, Picker, Item } from 'native-base';
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
// import { TextField } from 'react-native-material-textfield';
import image from '../../assets/ads.jpg'



class AdvertiseWithUs extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentWillMount() {
        this.getAdvertiseCategories()

        this.getAdvert('1')
    }

    getAdvert(category) {
        return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + `/api/payment/getBillingPackages/${category}`,
            headers: {
                "token": `bearer ${this.props.userCredentials.token}`,
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                console.log(data.data.results, 'data here')
                let state = data.data.results
                this.setState({
                    advertise: state
                })
            })
            .catch(err => {
                console.log(err)
            })
    }


    getAdvertiseCategories() {
        return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/payment/getBillingCategories",
            headers: {
                "token": `bearer ${this.props.userCredentials.token}`,
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                let state = data.data.results
                this.setState({
                    advertCategory: state
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    dropDownChange(value, index) {
        const { advertCategory } = this.state
        if (advertCategory) {
            this.getAdvert(advertCategory[index].id)
        }
        this.setState({ selectedCategory: value })
    }

    buy(item) {
        var obj = {
            url: item.url_buy,
            title: 'buyBanner'
        }
        Actions.BuyAds(obj)
    }


    details(item) {
        var obj = {
            data: item
        }
        Actions.AdvertiseDetail(obj)
    }


    AdvertCard(item, index) {
        return (
            <View key={index} style={{
                width: '80%',
                marginVertical: 3
            }}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        style={{ width: '100%', height: 300 }}
                        source={{ uri: item.url }}
                    />
                </View>
                <View style={{ paddingHorizontal: '10%', paddingVertical: '4%' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                        {item.package_name}
                    </Text>
                </View>
                <View style={{ paddingHorizontal: '10%', paddingVertical: '2%', flexDirection: 'row' }}>
                    <View style={{ flexGrow: 1 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            {'Price'}
                        </Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 17 }}>
                            {`EGP ${item.price}`}
                        </Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: '10%', paddingVertical: '2%', flexDirection: 'row' }}>
                    <View style={{ flexGrow: 1 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            {'Quantity'}
                        </Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 17 }}>
                            {'1'}
                        </Text>
                    </View>
                </View>
                <View
                    style={{ paddingTop: 10, paddingHorizontal: '10%' }}
                >
                    <View>
                        <Button
                            onPress={() => this.buy(item)}
                            color={'#E94E1B'}
                            title={this.props.str.buy}
                        />
                    </View>
                </View>
                <View
                    style={{ paddingVertical: 10, paddingHorizontal: '10%' }}
                >
                    <View>
                        <Button
                            onPress={() => this.details(item)}
                            color={'#b88049'}
                            title={this.props.str.productDetail}
                        />
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const { advertCategory, advertise } = this.state
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
                        <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.advertiseWithUs}</Text>
                    </View>
                </View>

                <View style={{ flex: 8, alignItems: 'center' }}>
                    <View style={{ paddingVertical: '2%' }}>
                        {
                            advertCategory &&
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
                                        selectedValue={this.state.selectedCategory}
                                        onValueChange={
                                            (itemValue, itemIndex) => this.dropDownChange(itemValue, itemIndex)
                                        }
                                    >
                                        {
                                            advertCategory.map((item, index) => {
                                                return (
                                                    <Picker.Item label={item.category_name} value={item.category_name} key={index} />
                                                )
                                            })
                                        }
                                    </Picker>
                                </Item>
                            </View>

                        }

                    </View>

                    <ScrollView style={{ width: '100%' }}>
                        <View style={{ alignItems: 'center', paddingVertical: '3%' }}>
                            {
                                advertise &&
                                advertise.map((item, index) => {
                                    return (
                                        this.AdvertCard(item, index)
                                    )
                                })
                            }
                        </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(AdvertiseWithUs);
const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 40,
    },

});
