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


class OurNetwork extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
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
                        <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.ourNetwork}</Text>
                    </View>
                </View> 

                <View style={{ paddingVertical: '3%', backgroundColor: '#1E90FF', paddingHorizontal: '3%' }}>
                    <Text style={{ fontSize: 14, color: 'white', textAlign: 'center' }}>
                        {this.props.str.investors}
                    </Text>
                </View>

                <View style={{ flex: 8, alignItems: 'center' }}>
                    <View style={{ width: "90%" }}>
                        <TouchableOpacity style={styles.listView}
                            onPress={() => { Actions.HaveFund() }}>
                            <Text style={styles.listText}>{this.props.str.fund}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.listView}
                            onPress={() => { Actions.HaveAsset() }} >
                            <Text style={styles.listText}>{this.props.str.asset}</Text>
                        </TouchableOpacity>
                    </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(OurNetwork);
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
    }
});  
