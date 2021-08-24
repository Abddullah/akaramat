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
import Ionicons from 'react-native-vector-icons/Ionicons';


class WebViews extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    changes(change) {
        console.log(change, 'chnages here')

        if (change.url.indexOf('is=success') !== -1 && !change.loading) {
            // Actions.pop()
            Actions.tabbar({ type: "reset" });
            Actions.tabNavigation();

        }

    }


    goBack() {

        Actions.pop()

    }

    render() {
        const { url, title } = this.props
        console.log(url, "url")
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
                        <TouchableOpacity style={{ marginRight: 20 }} onPress={() => { this.goBack() }}>
                            <Ionicons name='md-arrow-back' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                        </TouchableOpacity>
                        <View style={{ flexGrow: 1 }}>
                            <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str[title]}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flex: 8, width: "100%", }}>
                    <View style={{ flex: 1 }}>
                        <WebView
                            // renderLoading={true}
                            bounces={true}
                            mediaPlaybackRequiresUserAction={false}
                            allowsInlineMediaPlayback={true}
                            mixedContentMode='compatibility'
                            onNavigationStateChange={(stateChange) => this.changes(stateChange)}
                            startInLoadingState={true}
                            source={{ uri: url }}
                        />
                    </View>
                </View>

            </View >
        );
    }
}

let mapStateToProps = state => {
    return {
        str: state.root.str,
        userData: state.root.userDetails,
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
export default connect(mapStateToProps, mapDispatchToProps)(WebViews);
const styles = StyleSheet.create({
});  
