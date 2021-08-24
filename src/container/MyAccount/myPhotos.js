import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, StatusBar, RefreshControl,
    Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Badge, Picker, Item } from 'native-base';
import { connect } from "react-redux";
import axios from 'axios';
import MyPhotosBody from '../../Component/myPhotosBody';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

class MyPhotos extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentWillMount() {
        var { height, width } = Dimensions.get('window');
        this.setState({
            screenHeight: height,
        })
    }
    delete(flag) {
        this.setState({
            delete: flag
        })
    }
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "white",
                width: "100%"
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
                        <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.myPhotos}</Text>
                        {/* <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.propertiescategories.toUpperCase()}</Text> */}
                        {(this.state.delete) ?
                            (
                                <TouchableOpacity style={{ marginLeft: "50%" }} onPress={() => { Actions.pop() }}>
                                    <AntDesign name='delete' style={{ color: "#ffff", fontWeight: "bold", fontSize: 20, }} />
                                </TouchableOpacity>
                            ) :
                            (null)}
                    </View>
                </View>

                {/* //////////////////////////////////////body////////////////////////////////////// */}
                <View style={{ flex: 8, width: "100%", }}>
                    <MyPhotosBody rout="MyPhotosBody" delete={(flag) => this.delete(flag)} />
                </View>
                {/* //////////////////////////////////////Projects////////////////////////////////////// */}

            </View >
        );
    }
}

let mapStateToProps = state => {
    return {
        str: state.root.str
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        // languageSet: (lang) => {
        //     dispatch(languageSet(lang))
        // },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(MyPhotos);

const styles = StyleSheet.create({

});  
