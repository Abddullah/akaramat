import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, StatusBar, RefreshControl,
    Dimensions, WebView, Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Content, Card, CardItem, Thumbnail, Icon, Badge, Picker, Item } from 'native-base';
import { connect } from "react-redux";
import axios from 'axios';
// import Drawer from '../../Component/drawer';
import InfiniteScroll from 'react-native-infinite-scroll';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    CheckBox
} from 'native-base';
import * as Animatable from 'react-native-animatable';
import { TextField } from 'react-native-material-textfield';


class BasicInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            basic0:false,
            basic1:false,
            basic2:false,
            doc0:false,
            doc1:false,
            checkData: [
                {
                    check: 'email',
                    value: this.props.email
                },
                {
                    check: 'phone',
                    value: this.props.phone
                },
                {
                    check: 'address',
                    value: this.props.address
                }
            ],
            check2Data: [
                {
                    check: 'photoId',
                },
                {
                    check: 'addProof',
                }
            ]
        }
    }
componentWillMount(){
    this.props.BasicInfoFunc(this.state.basic0, this.state.basic1, this.state.basic2, this.state.doc0, this.state.doc1)
}
    myCheckData(item, index, basicOrDoc) {
        return (
            <>
                <View
                    key={index}
                    style={styles.checkBox}
                >
                    <View style={{
                        flexDirection: "row", marginLeft: "4.5%",
                        // backgroundColor: "red"
                    }} >
                        <CheckBox checked={this.state[basicOrDoc+index]} color="#E94E1B"
                            onPress={() => {
                                this.setState({
                                    [basicOrDoc+index]: !this.state[basicOrDoc+index],
                                },()=>{
                                    this.props.BasicInfoFunc(this.state.basic0, this.state.basic1, this.state.basic2, this.state.doc0, this.state.doc1)
                                })
                                // console.log(this.state.basic0, this.state.basic1, this.state.basic2, this.state.doc0, this.state.doc1, "email,p")

                            }}
                        />
                        <Text style={{ marginLeft: 25, fontSize: 16, fontWeight: 'bold' }}
                            onPress={() => {
                                this.setState({
                                    [basicOrDoc+index]: !this.state[basicOrDoc+index],
                                })
                            }}
                        >{this.props.str[item.check]}</Text>
                    </View>
                </View>
                {
                    item.value ?
                        <View style={{ paddingVertical: 5, paddingHorizontal: '15%', justifyContent: "center" }}>
                            <Text
                                style={{
                                    color: "grey",
                                    fontSize: 15,
                                    textAlign: 'justify',
                                    fontWeight: "400"
                                }}>
                                {item.value}
                            </Text>
                        </View>
                        :
                        null
                }
            </>
        )
    }

    render() {
        const { checkData, check2Data } = this.state
        return (
            <View style={{
                flex: 1,
                backgroundColor: "white",
                width: "100%",
            }}>
                <View style={{ paddingVertical: '3%', backgroundColor: '#1E90FF', paddingHorizontal: '3%' }}>
                    <Text style={{ fontSize: 14, color: 'white', textAlign: 'center' }}>
                        {this.props.str.basicInfo}
                    </Text>
                </View>

                <View style={{ paddingVertical: 5, paddingHorizontal: 10, justifyContent: "center" }}>
                    <Text
                        style={{
                            color: "grey",
                            fontSize: 15,
                            textAlign: 'justify',
                            fontWeight: "400"
                        }}>
                        {this.props.str.verifyInfo}
                    </Text>
                </View>

                <View style={styles.base}>
                    <Text style={{ fontWeight: 'bold' }}>
                        {this.props.str.nameAgent}
                    </Text>
                </View>


                {
                    checkData &&
                    checkData.map((item, index, ) => {
                        return (
                            this.myCheckData(item, index, "basic")
                        )
                    })
                }

                <View style={styles.base}>
                    <Text style={{ fontWeight: 'bold' }}>
                        {this.props.str.docs}
                    </Text>
                </View>

                {
                    check2Data &&
                    check2Data.map((item, index) => {
                        return (
                            this.myCheckData(item, index, "doc")
                        )
                    })
                }

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
export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 40,
    },
    listView: {
        width: "100%", height: 40, marginTop: 10,
        borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC",
        justifyContent: 'center'
    },
    listText: {
        justifyContent: "flex-start",
        textAlign: "left",
        alignSelf: "stretch",
        fontSize: 16
    },
    base: {
        // borderWidth: 1,
        paddingHorizontal: '3%',
        paddingVertical: '2%'
    },
    checkBox: {
        height: 50,
        width: "100%",
        borderWidth: 0.5,
        borderColor: "white",
        borderRadius: 5,
        justifyContent: "center",
    }
});  
