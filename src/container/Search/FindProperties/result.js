
import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, ScrollView,
    ListView, RefreshControl, Picker, SafeAreaView, ActivityIndicator, Modal, TouchableHighlight, Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
// import Footer from '../../Constant/Footer';
// import { changeRoute } from '../../Constant/Helper'
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Item, Fab } from 'native-base';
import { connect } from "react-redux";
// import InfiniteScrollView from 'react-native-infinite-scroll-view';
import axios from 'axios';
import InfiniteScroll from 'react-native-infinite-scroll';
import IconFontEntypo from 'react-native-vector-icons/Ionicons';
import IconFontFontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextField } from 'react-native-material-textfield';
import * as Animatable from 'react-native-animatable';
import MultiSelect from 'react-native-multiple-select';
import ImageSlider from 'react-native-image-slider';
import Communications from 'react-native-communications';
import IconFontIonicons from 'react-native-vector-icons/Ionicons';
import { resultData } from '../../../Store/Action/action'


class Results extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activity: false,
            moreloader: false,
            isloader: true,
            page: 10,
            results: [],


        }
    }


    // componentDidMount() {
    //     StatusBar.setHidden(true)
    // }


    componentWillMount() {
        if (this.props.SearchForProperties) {

            this.setState({
                propertyData: this.props.searchResult,
                cloneData: this.props.cloneData,
                isloader: false
            })


        }
    }


    _onRefresh() {
        this.setState({
            isloader: true
        })
        let cloneData = this.state.cloneData
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
                this.props.resultData(responseAPI)
                this.setState({
                    isloader: false
                })
            })
            .catch(err => {
                console.log(err)
                alert(err.message)
                this.setState({
                    err: err.message,
                    isloader: false

                })
            })

    }


    _onEndReached() {
        this.setState({
            moreloader: true
        })
        let cloneData = this.state.cloneData
        cloneData.offset = this.state.page + 10
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
                let clonepropertyData = this.state.propertyData
                let responseAPI = data.data.results
                for (var i = 0; i < responseAPI.length; i++) {
                    clonepropertyData.push(responseAPI[i])
                }
                this.setState({
                    page: this.state.page + 10,
                    moreloader: true
                })
            })
            .catch(err => {
                console.log(err)
                alert(err.message)
                this.setState({
                    err: err.message,
                    moreloader: false,

                })
            })
    }



    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: "center",
                backgroundColor: "white"
            }}>
                <View style={{
                    flex: 1.18,
                    // height: 40,
                    backgroundColor: '#E94E1B',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: "row",
                    width: "100%"
                }}>
                    {/* /////////////////////////////header///////////////////////////// */}
                    <View style={{ flex: 0.5, width: "90%", flexDirection: "row", marginTop: "7%" }}>
                        <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => { Actions.pop() }}>
                            <IconFontIonicons name='md-arrow-back' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                        </TouchableOpacity>
                        {
                            (this.props.SearchForProperties) ? (
                                <Text style={{ marginLeft: "10%", color: "#ffff", fontWeight: "bold", fontSize: 20 }}>{this.props.str.result}</Text>
                            ) : null
                        }

                    </View>
                    <TouchableOpacity style={{ flex: 0.5, justifyContent: "center", alignItems: "center", marginTop: "7%" }}>
                        <TouchableOpacity
                            style={{ backgroundColor: "white", height: "50%", width: "80%", alignItems: "center", justifyContent: "center" }}
                            onPress={() => { Actions.SearchForProperties() }}
                        >
                            <Text style={{ color: "black", fontSize: 10, textAlign: "center" }}>{this.props.str.searchforproperty}</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>


                {
                    (this.props.SearchForProperties) ? (
                        <View style={{ flex: 8, width: "100%", }}>
                            {
                                (this.state.isloader === true) ? (
                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: "center",
                                    }}>
                                        <ActivityIndicator size="large" color="#E94E1B" />
                                        <Text style={{ marginTop: 10 }} >Loading....</Text>
                                    </View>
                                ) :
                                    <InfiniteScroll
                                        horizontal={false}  //true - if you want in horizontal
                                        onLoadMoreAsync={this._onEndReached.bind(this)}
                                        distanceFromEnd={12} // distance in density-independent pixels from the right end
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={this.state.activity}
                                                onRefresh={this._onRefresh.bind(this)} />
                                        }
                                    >
                                        {
                                            (this.state.propertyData.length != 0) ? (
                                                <View>
                                                    {
                                                        this.state.propertyData.map((key, index) => {
                                                            return (
                                                                <TouchableOpacity key={index} style={{ marginTop: 5, flex: 1, flexDirection: "row", padding: 5, backgroundColor: "#f8f1f1" }}
                                                                    onPress={() => { Actions.FithPageList({ propertyData: key }) }}
                                                                >
                                                                    <View style={{ flex: 0.5, }} >
                                                                        <Image style={{ resizeMode: 'contain', height: 120, width: "100%" }}
                                                                            source={{ uri: key.featured_image_src }} />
                                                                    </View>
                                                                    <View style={{ flex: 0.6, padding: 5, }} >
                                                                        <View style={{ flex: 0.9 }}>
                                                                            <View style={{ flexDirection: "row", }}>
                                                                                {
                                                                                    (key.typeFlag) ? (
                                                                                        <View style={{ backgroundColor: "#E94E1B", justifyContent: "center", alignItems: "center", marginTop: 2.5, width: 80 }}>
                                                                                            <Text style={{ fontSize: 12, color: "white", }}> {key.typeFlag.toUpperCase()}</Text>
                                                                                        </View>
                                                                                    ) : null
                                                                                }
                                                                            </View>
                                                                            <View style={{ marginTop: 10 }}>
                                                                                <Text style={{ fontSize: 12, color: "black" }}>{key.title}</Text>
                                                                            </View>
                                                                            <View style={{ marginTop: 0 }} >
                                                                                <View style={{ flexDirection: "row", }}>
                                                                                    {
                                                                                        (key.price_fomat != undefined && key.price_fomat != "") ? (
                                                                                            <Text style={{ fontSize: 14, color: "#E94E1B", textAlign: "right", marginTop: 7, }}>{key.price_fomat}</Text>
                                                                                        ) : null
                                                                                    }
                                                                                </View>

                                                                            </View>
                                                                        </View>
                                                                        <View style={{ flex: 0.1 }}>
                                                                            <View style={{ flexDirection: "row", }}>
                                                                                <Text style={{ fontSize: 8, color: "#6a6a6a", textAlign: "right", marginTop: 3 }}>{this.props.str.publishedon}, {key.publish_time + " "} </Text>
                                                                                <Text style={{ fontSize: 8, color: "#6a6a6a", textAlign: "right", marginTop: 3 }}>{key.city_format}, {key.state_format}</Text>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        (this.state.moreloader === true) ? (
                                                            <View style={{
                                                                justifyContent: 'center',
                                                                alignItems: "center",
                                                                marginBottom: 20,
                                                                marginTop: 20,
                                                            }}>
                                                                <ActivityIndicator size="large" color="#E94E1B" />
                                                            </View>
                                                        ) : null
                                                    }
                                                </View>
                                            ) :
                                                <View style={{
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: "center",
                                                    marginBottom: 20,
                                                    marginTop: 20,
                                                }}>
                                                    <Text style={{ color: "black" }}>{this.props.str.thereisnodataavailable}</Text>
                                                </View>
                                        }
                                    </InfiniteScroll>
                            }
                        </View>
                    ) : null
                }





                {/* <Footer /> */}
            </View >
        );
    }
}


let mapStateToProps = state => {
    return {
        str: state.root.str,
        searchResult: state.root.searchResult
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        resultData: (searchResult) => {
            dispatch(resultData(searchResult))
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Results);


const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 70,
        backgroundColor: "white",

    },
    container: {
        flex: 1,
    },
    customSlide: {
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    customImage: {
        width: "100%",
        height: 190,
    },
    listView: {
        width: "100%", height: 35, marginTop: 10,
        borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC",
        justifyContent: 'center'
    },
    listText: {
        marginLeft: 10, color: "#000"
    }
});  
