
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Picker, Image, SafeAreaView, ActivityIndicator, images, Dimensions, Share } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Item, Fab, Input } from 'native-base';
import { connect } from "react-redux";
import MapDirection from '../Component/map'

class googlemapfullview extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "white"
            }}>
                <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 40 }} >
                    <View
                        style={{
                            // marginTop: 10,
                            marginBottom: 25,
                            width: "90%",
                            marginHorizontal: "5%",
                            borderWidth: 1,
                            borderColor: "#1E90FF",
                            borderRadius: 0,
                            backgroundColor: "#EDEDED",
                        }}
                    >
                        <Text>{this.props.str.googlemap}</Text>
                        <MapDirection sendLocation={this.props.sendLocation} />
                    </View>


                </View>
            </View>
        );
    }
}


let mapStateToProps = state => {
    return {
        str: state.root.str,
        userDetails: state.root.userDetails,
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
export default connect(mapStateToProps, mapDispatchToProps)(googlemapfullview);


const styles = StyleSheet.create({

});  
