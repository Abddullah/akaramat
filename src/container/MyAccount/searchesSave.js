
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Picker, Image, SafeAreaView, ActivityIndicator, images, Dimensions, RefreshControl } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Item, Fab, Input } from 'native-base';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
import Textarea from 'react-native-textarea';
import axios from 'axios';
import InfiniteScroll from 'react-native-infinite-scroll';

class SearchesSave extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 10,
            activity: false,
            moreloader: false,
            isloader: true,
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
        this._onRefreshTasker()
    }
    _onRefreshTasker() {
        console.log("work", this.state.token)
        let uri;
        this.setState({
            isloader: true
        })
        uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteSearches/10/0"

        this.requestOnServer("_onRefreshTasker", uri)
    }
    requestOnServer = (functionName, uri, del) => {
        console.log(functionName, uri, "functionName, uri", this.props.userCredentials.token)
        return axios({
            method: del ? "DELETE" : 'get',
            url: uri,
            headers: {
                "token": `bearer ${this.props.userCredentials.token}`,
                'postman-token': '553d07fc-3950-1199-efd9-6b5b5f8315a2',
                'cache-control': 'no-cache',
                "clientsecret": '(*jh2kj36gjhasdi78743982u432j',
                "clientkey": '34532hbjdsakjd2&&gjhjh11',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                "Allow-Cross-Origin": '*',
            },
        }).then(data => {
            if (functionName === "_onRefreshTasker") {

                console.log(data.data.results, "response");
                this.setState({
                    iAddedProperties: data.data.results,
                    isloader: false,
                    page: 10,
                    // selectedValue: data.data.results.status === "Active" ? "Deactive" : "Active"
                })
            }
            else if (functionName === "_onEndReached") {
                let cloneiAddedProperties = this.state.iAddedProperties
                let responseAPI = data.data.results
                for (var i = 0; i < responseAPI.length; i++) {
                    cloneiAddedProperties.push(responseAPI[i])
                }
                console.log(responseAPI, "reachend")
                this.setState({
                    moreloader: false,
                    page: this.state.page + 10,
                    iAddedProperties: cloneiAddedProperties
                })
            }
            else if (functionName === "removeSearches") {
                console.log("ssssssss")
                alert(data.data.message)
                this._onRefreshTasker()

            }

        }).catch(err => {
            var errUpdate = JSON.stringify(err);
            console.log(JSON.parse(errUpdate));
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
        let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/getFavoriteSearches/10/" + this.state.page
        this.requestOnServer("_onEndReached", uri)
    }
    removeSearches(id) {
        // alert("chal gya ")
        console.log(id, "add")
        let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/deleteSearch/" + id
        this.requestOnServer("removeSearches", uri, "delete")

    }

    render() {
        console.log(this.state.iAddedProperties, "iAddedPropertiesiAddedProperties")
        return (
            <Container style={{ flex: 1 }}>
                <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }}>
                    <View style={{
                        flex: 1, width: "100%",
                        // backgroundColor: "green"
                    }}>
                        <View style={{
                            flex: 0.55,
                            flexDirection: "row",
                            width: "100%",
                            backgroundColor: "#F2F1F0"
                        }}>
                            <View style={{
                                flex: 0.5, width: "100%", justifyContent: "center", alignItems: "center",
                                // backgroundColor: "orange"
                            }}><Text style={{ fontWeight: "bold", fontSize: 15 }}>View Search</Text>
                            </View>

                            <View style={{
                                flex: 0.5, width: "100%", justifyContent: "center", alignItems: "center", borderLeftColor: "#E7E5E2", borderLeftWidth: 2,
                                // backgroundColor: "yellow"
                            }}><Text style={{ fontWeight: "bold", fontSize: 15 }}>Remove from Favorites</Text>
                            </View>
                        </View>
                        <View style={{
                            flex: 6, width: "100%",
                            // backgroundColor: "green"
                        }}>

                            {
                                (this.state.iAddedProperties) ? (
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
                                                            onRefresh={this._onRefreshTasker.bind(this)} />
                                                    }
                                                >
                                                    {
                                                        (this.state.iAddedProperties.length != 0) ? (
                                                            <View>
                                                                {
                                                                    this.state.iAddedProperties.map((key, index) => {
                                                                        console.log(key, index, "index")
                                                                        return (
                                                                            <View key={index} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", borderBottomColor: "#B1AFAC", borderBottomWidth: 0.5 }}
                                                                            // onPress={() => { Actions.FithPageList({ propertyData: key }) }}
                                                                            >
                                                                                <View style={{ flex: 1, marginBottom: 10, justifyContent: "center", alignItems: "center", }}>
                                                                                    <Text style={{ marginTop: 10, textDecorationLine: "underline" }} >{key.search_name}</Text>
                                                                                </View>
                                                                                <View style={{ flex: 1, marginBottom: 10, justifyContent: "center", alignItems: "center", }}>
                                                                                    <TouchableOpacity
                                                                                        onPress={() => this.removeSearches(key.id)}
                                                                                        style={{ marginTop: 10 }} >
                                                                                        <FontAwesome name='remove' style={{ color: "red", fontWeight: "bold", fontSize: 23, }} />

                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                            </View>
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

                        </View>
                    </View>
                </View>
            </Container>
        );
    }
}


let mapStateToProps = state => {
    return {
        str: state.root.str,
        userDetails: state.root.userDetails,
        taskId: state.root.taskId,
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
export default connect(mapStateToProps, mapDispatchToProps)(SearchesSave);


const styles = StyleSheet.create({
    // holder: {
    //      flex: 0.25,
    //      justifyContent: 'center',
    // },
});  
