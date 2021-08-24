import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, StatusBar, RefreshControl,
    Dimensions, WebView, Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, CardItem, Thumbnail, Icon, Badge, Picker, Item } from 'native-base';
import { connect } from "react-redux";
import axios from 'axios';
// import Drawer from '../../Component/drawer';
import InfiniteScroll from 'react-native-infinite-scroll';
import Ionicons from 'react-native-vector-icons/Ionicons';



class AdvertiseDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentWillMount() {
        const { data } = this.props

        this.setState({
            data
        })
    }

    buy() {
        const { data } = this.state
        var obj = {
            url: data.url_buy,
            title: 'buyBanner'
        }
        Actions.BuyAds(obj)
    }


    render() {
        const { data } = this.state
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
                        <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.productDetail}</Text>
                        {/* <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.propertiescategories.toUpperCase()}</Text> */}
                    </View>
                </View>

                <View style={{ flex: 8, width: "100%", alignItems: 'center' }}>
                    <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', paddingVertical: '10%' }}>
                        <View style={{
                            width: '80%',
                            marginVertical: 3
                        }}>
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    style={{ width: '100%', height: 300 }}
                                    source={{ uri: data.url }}
                                />
                            </View>
                            <View style={{ paddingHorizontal: '10%', paddingVertical: '3%' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                                    {data.package_name}
                                </Text>
                            </View>
                            <View style={{ paddingHorizontal: '10%', paddingVertical: '1%' }}>
                                <Text style={{ fontSize: 14, color: 'grey', textAlign: 'center' }}>
                                    {data.description}
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
                                        {`EGP ${data.price}`}
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
                                style={{ paddingTop: 7, paddingHorizontal: '10%' }}
                            >
                                <View>
                                    <Button
                                        onPress={() => this.buy()}
                                        color={'#E94E1B'}
                                        title={this.props.str.buy}
                                    />
                                </View>
                            </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(AdvertiseDetail);
const styles = StyleSheet.create({
});  
