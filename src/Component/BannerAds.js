import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, StatusBar, RefreshControl,
    Dimensions, WebView, Button, TextInput, ActivityIndicator
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




class bannerAds extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    changes(change) {
        console.log(change,'chnages here')

        if(change.url.indexOf('is=success') !== -1 && !change.loading) {
            Actions.pop()
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
                        <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.buyBanner}</Text>
                    </View>
                </View>

                <View style={{ flex: 8, alignItems: 'center' }}>
                    <View style={{ flex: 1, width: '100%' }}>
                        <WebView
                            // renderLoading={true}
                            bounces={true}
                            mixedContentMode='compatibility'
                            onNavigationStateChange={(stateChange) => this.changes(stateChange)}
                            startInLoadingState={true}
                            source={{ uri: 'http://ads.akaratmisr.com/public/buy.php' }}
                        />
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
export default connect(mapStateToProps, mapDispatchToProps)(bannerAds);
const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 40,
    },

});
