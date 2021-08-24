import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, StatusBar, RefreshControl,
    Dimensions, WebView, TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Badge, Picker, Item } from 'native-base';
import { connect } from "react-redux";
import axios from 'axios';
// import Drawer from '../../Component/drawer';
import InfiniteScroll from 'react-native-infinite-scroll';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontIcons from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';



class MyPayments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            webView: false,
            searchFlag: '',
            deliveryDetail: [],
            isLoading: true,
            searchInput: {
                name: 'search',
                value: 'search',
                type: 'default',
                icon: 'ios-search',
            },
            page: 0
        }
    }
    componentWillMount() {
        const { page } = this.state
        this.getDetails(page)

        console.log(this.props.userData, 'userData from payments')
    }

    getDetails(offset, refresh) {
        return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/payment/getPaymentHistory/10/" + offset,
            headers: {
                "token": `bearer ${this.props.userCredentials.token}`,
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                const { deliveryDetail } = this.state
                let state = data.data.results
                if (refresh) {
                    this.setState({
                        deliveryDetail: state,
                        isLoading: false
                    })
                } else {
                    deliveryDetail.push(...data.data.results)
                    this.setState({
                        deliveryDetail,
                        isLoading: false,
                        moreloader: false
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    searchFields(items, index) {
        return (
            <View
                key={index}
                style={{
                    height: 60,
                    width: "100%",
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
                                    <Ionicons name={items.icon} size={15} />
                            }
                        </View>
                    </Item>
                </View>
            </View>
        )
    }

    _onRefreshTasker() {
        this.setState({
            isLoading: true
        })
        this.getDetails('0', true)
    }

    _onEndReached() {
        const { page } = this.state
        this.getDetails(page + 10)
        console.log('end reached before', page)

        this.setState({
            moreloader: true,
            page: page + 10
        }, () => {
            console.log('end reached', this.state.page)
        })
    }


    deliveryCard(item, index) {
        return (
            <View key={index} style={{
                flexDirection: this.props.str.language === "en" ? "row" : "row-reverse", 
                marginLeft: 5,
                marginRight: 5,
                marginTop: 10,
            }} >
                {/* headings */}
                <View style={{
                    flex: 1,
                    backgroundColor: "#908073",
                    padding: "2%"
                }}>
                    <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{'#'}</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.transactionId}</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.package}</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.amount}</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.reqDate}</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{this.props.str.status}</Text>
                </View>
                {/* values */}
                <View style={{ flex: 2, backgroundColor: "#f8f1f1", padding: "2%" }}>
                    <Text style={{ fontSize: 13, lineHeight: 18, color: "#908073" }}>{index + 1}</Text>
                    <Text style={{ fontSize: 13, lineHeight: 18, color: "#908073" }}>{item.transaction_id}</Text>
                    <Text style={{ fontSize: 13, lineHeight: 18, color: "#908073" }}>
                        {
                            item.package.length >= 23 ?
                                item.package.slice(0, 23) + '...'
                                :
                                item.package
                        }
                    </Text>
                    <Text style={{ fontSize: 13, lineHeight: 18, color: "#908073" }}>{item.amount}</Text>
                    <Text style={{ fontSize: 13, lineHeight: 18, color: "#908073" }}>{item.request_day}</Text>
                    <TouchableOpacity style={{
                        backgroundColor: 'green', width: "35%", borderRadius: 5, alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Text style={{ color: 'white', fontSize: 12 }}>{item.status}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }


    render() {
        const { webView, searchInput, searchFlag, deliveryDetail, isLoading } = this.state
        console.log(this.props.loginUserData.upgrade_package_url, "TOKENWITHUSER")
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
                        <View style={{ flexGrow: 1 }}>
                            <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.myPayment}</Text>
                        </View>
                        {/* <View>
                            <TouchableOpacity onPress={() => this.setState({ searchFlag: !searchFlag })}>
                                <Ionicons name='ios-search' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                            </TouchableOpacity>
                        </View> */}
                        {/* <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.propertiescategories.toUpperCase()}</Text> */}
                    </View>
                </View>

                <View style={{ flex: 8, width: "100%", }}>
                    {
                        webView ?
                            <View style={{ flex: 1 }}>
                                <WebView
                                    // renderLoading={true}
                                    bounces={true}
                                    javaScriptEnabled={true}
                                    domStorageEnabled={true}
                                    originWhitelist={['*']}
                                    mixedContentMode='compatibility'
                                    automaticallyAdjustContentInsets={false}
                                    startInLoadingState={true}
                                    source={{ uri: this.props.loginUserData.upgrade_package_url }}
                                    style={{ marginTop: 20 }}
                                />
                            </View>
                            :
                            <View style={{ paddingHorizontal: '3%' }}>
                                <Text>
                                    {`${this.props.str.currentPackage}${this.props.userData.current_package ? this.props.userData.current_package : this.props.strs.free}`}
                                    <Text onPress={() => this.setState({ webView: true })} style={{ color: '#E94E1B', textDecorationLine: 'underline' }}>{` ${this.props.str.upgradePackage}`}</Text>
                                </Text>
                            </View>
                    }
                    {/* <Text style={{ textAlign: 'center' }}>
                        {this.props.str.noPayments}
                    </Text> */}

                    {/* {
                        !webView &&
                        <View
                            style={{
                                width: "90%",
                                alignSelf: 'center',
                                alignItems: "center",
                                paddingTop: '4%'
                            }}
                        >
                            {
                                (this.state.searchFlag != "") ? (
                                    <Animatable.View animation="slideInLeft" iterationCount={1}>
                                        {
                                            this.searchFields(searchInput, 0)
                                        }
                                    </Animatable.View>
                                ) : null
                            }
                        </View>
                    } */}

                    {
                        !webView && !deliveryDetail.length && !isLoading ?
                            <View>
                                <Text style={{ marginTop: 10, textAlign: 'center', color: 'grey' }} >No Payment History</Text>
                            </View>
                            :
                            null
                    }

                    {
                        !webView ?
                            !deliveryDetail && deliveryDetail.length || isLoading ?
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: "center",
                                    height: this.state.screenHeight / 1.25
                                }}>
                                    <ActivityIndicator size="large" color="#E94E1B" />
                                    <Text style={{ marginTop: 10, color: 'grey' }} >Loading....</Text>
                                </View>
                                :
                                <InfiniteScroll
                                    horizontal={false}  //true - if you want in horizontal
                                    onLoadMoreAsync={this._onEndReached.bind(this, "_onEndReached")}
                                    distanceFromEnd={12} // distance in density-independent pixels from the right end
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.activity}
                                            onRefresh={this._onRefreshTasker.bind(this, "_onRefreshTasker")} />
                                    }
                                >

                                    <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}>
                                        <View>
                                            {
                                                deliveryDetail &&
                                                deliveryDetail.map((items, index) => {
                                                    return (
                                                        this.deliveryCard(items, index)
                                                    )
                                                })
                                            }
                                        </View>
                                    </ScrollView>
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
                                </InfiniteScroll>
                            :
                            null
                    }

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
export default connect(mapStateToProps, mapDispatchToProps)(MyPayments);
const styles = StyleSheet.create({
});  
