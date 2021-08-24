import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, StatusBar, RefreshControl,
    Dimensions, WebView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Badge, Picker, Item } from 'native-base';
import { connect } from "react-redux";
import axios from 'axios';
// import Drawer from '../../Component/drawer';
import InfiniteScroll from 'react-native-infinite-scroll';
import Ionicons from 'react-native-vector-icons/Ionicons';



class BuyAds extends Component {
    constructor(props) {
        super(props)
        this.state = {
            webView: false
        }
    }
    componentWillMount() {
        const { url, title } = this.props

        this.setState({
            url,
            title
        })

    }

    changes(change) {
        console.log(change,'chnages here')

        if(change.url.indexOf('is=success') !== -1 && !change.loading) {
            Actions.pop()
        }
        
    }

    render() {
        const { url, title } = this.state
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
                        <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str[title]}</Text>
                        {/* <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.propertiescategories.toUpperCase()}</Text> */}
                    </View>
                </View>

                <View style={{ flex: 8, width: "100%", }}>
                    <View style={{ flex: 1 }}>
                        <WebView
                            // renderLoading={true}
                            bounces={true}
                            mixedContentMode='compatibility'
                            onNavigationStateChange={(stateChange) => this.changes(stateChange)}
                            startInLoadingState={true}
                            source={{ uri: url }}
                            // style={{ marginTop: 20 }}
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
export default connect(mapStateToProps, mapDispatchToProps)(BuyAds);
const styles = StyleSheet.create({
});  
