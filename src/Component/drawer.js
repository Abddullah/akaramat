import React, { Component } from 'react';
import { Container, Button, Text, Content, Form, Item, Input, Label, Alert, Thumbnail, View } from 'native-base';
import { Image, TouchableOpacity, PanResponder, TouchableHighlight, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo'

import { connect } from 'react-redux';
import {
    StyleSheet,

} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AccDraBody from '../Component/accDraBody';
import PropertiesOwnerDrabody from '../Component/propertiesOwnerDraBody';
class Drawer extends Component {
    constructor() {
        super()
        this.state = {
            rout: "Feeds",
            animationStyle: "",
            userName: ""
        }
        _panResponder = {};







    }
    componentWillMount() {
        this._panResponder = PanResponder.create({
            // onStartShouldSetPanResponder: (evt, gestureState) => {
            //     return !(gestureState.dx === 0 && gestureState.dy === 0)
            // },
            // onStartShouldSetPanResponderCapture: (evt, gestureState) => {
            //     return !(gestureState.dx === 0 && gestureState.dy === 0)
            // },
            // onMoveShouldSetPanResponder: (evt, gestureState) => {
            //     return !(gestureState.dx === 0 && gestureState.dy === 0)
            // },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                console.log("move", gestureState.dx)

                // return !(gestureState.dx === 0 && gestureState.dy === 0)
                if (gestureState.dx < -45 && this.props.str.language === "en") {
                    console.log("slide close",gestureState.dx)
                    this.setState({
                        animationStyle: "fadeOutLeftBig"
                    })
                    this.props.animateParent(false)
                }
                else if(gestureState.dx > 45 && this.props.str.language !== "en"){
                    console.log("slide close",gestureState.dx)
                    this.setState({
                        animationStyle: "fadeOutRightBig"
                    })
                    this.props.animateParent(false)
                }
            },

            // onPanResponderGrant: (evt, gestureState) => {
            //     // console.log("grant", gestureState.dx)
            // },
            // onPanResponderMove: (evt, gestureState) => {
            //     // console.log("move")
            // },
            // onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // console.log("release", gestureState.dx)
                // if (gestureState.dx < -40) {
                //     // console.log("slide close")
                //     this.setState({
                //         animationStyle: "fadeOutLeftBig"
                //     })
                //     this.props.animateParent(false)
                // }
            },
            // onPanResponderTerminate: (evt, gestureState) => {
            // },
            // onShouldBlockNativeResponder: (evt, gestureState) => {
            //     return true;
            // },
        });



        if (this.props.routName === "Account") {
            console.log("bablu", this.props.userDetails, this.props.userCredentials)
            this.setState({
                uri: this.props.userDetails.avatar_photo || "http://www.cybecys.com/wp-content/uploads/2017/07/no-profile.png"
            })
        }

        //for properties owner details 
        if ((this.props.routName === "Properties" || this.props.routName === "Tasks" || this.props.routName === "Tasker") && this.props.ownerDetails) {
            console.log(this.props.ownerDetails, "ownerDetails")
            if (this.props.ownerDetails.avatar_photo != "No found" && this.props.ownerDetails.avatar_photo != undefined) {
                this.setState({
                    uri: this.props.ownerDetails.avatar_photo,
                })
            }
            else {
                this.setState({
                    uri: "https://demo.akaratmisr.com/uploads/profile_photos/nophoto-.jpg",
                })
            }
        }
        this.setState({
            animationStyle: this.props.animationStyle,
        })
    }

    componentWillReceiveProps(nextProp) {
        console.log(nextProp, "nextProp")

        //for properties owner details 
        if ((this.props.routName === "Properties" || this.props.routName === "Tasks" || this.props.routName === "Tasker") && nextProp.ownerDetails) {
            console.log(this.props.ownerDetails, "ownerDetails")
            if (nextProp.ownerDetails.avatar_photo != "No found" && nextProp.ownerDetails.avatar_photo != undefined) {
                this.setState({
                    uri: nextProp.ownerDetails.avatar_photo,
                })
            }
            else {
                this.setState({
                    uri: "https://demo.akaratmisr.com/uploads/profile_photos/nophoto-.jpg",
                })
            }
        }
    }


    componentWillUnmount() {
        this.setState({
            uri: "https://demo.akaratmisr.com/uploads/profile_photos/nophoto-.jpg"
        })
    }
    render() {
        console.log(this.props.ownerProperties, "inDrawer")
        return (
            <View
                {...this._panResponder.panHandlers}
                animation={this.state.animationStyle}
                duration={500}
                style={{
                    marginTop: "6.5%",
                    // backgroundColor:"red",
                    borderRightWidth: 1,
                    borderRightRadius: 2,
                    borderRightColor: '#ddd',
                    borderBottomWidth: 0,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 55,
                    flex: 1, width: "80%", height: "100%", position: "absolute", zIndex: 1,right: this.props.str.language === "en" ? null :0,
                }}>
                <View style={{ flex: 1, backgroundColor: "#856e48", }}>
                    <Image style={{
                        width: "100%", height: "100%",
                    }}
                        source={require("../assets/Images/drawerhead.png")}
                    />

                    <View style={{ position: "absolute", zIndex: 1, padding: "5%", marginTop: "8%", justifyContent: "center", alignItems: "center", }}>
                        {(this.props.userDetails.current_package === "Free"||this.props.userDetails.current_package === "مجانا") ? 
                        (null):
                         (
                            <LinearGradient
                            colors={['#f27500', '#fff',]}

                            style={{
                                position: "absolute", zIndex: 1, right: 0, bottom: -15, justifyContent: "center", alignItems: "center",
                                width: 50,
                                height: 50,
                                borderRadius: 100 / 2,
                                backgroundColor: '#f27500', opacity: 0.8
                            }}>
                            <Text style={{ fontSize: 9, color: "white", textAlign: "center", fontWeight: "bold" }}>{this.props.userDetails.current_package} </Text>
                        </LinearGradient>
                         )}

                      
                        {
                            (this.state.uri) ? (
                                <Image
                                    resizeMode="contain"
                                    style={{ width: 100, height: 100, borderColor: "grey", borderWidth: 2, borderRadius: 100 / 0 }}
                                    source={{ uri: this.state.uri }}
                                />
                            ) :
                                <View style={{
                                    width: 100, height: 100,
                                    justifyContent: 'center',
                                    alignItems: "center",
                                }}>
                                    <ActivityIndicator size="small" color="#E94E1B" />
                                    {
                                        (this.state.err) ?
                                            (
                                                <Text style={{ marginTop: 10 }}>{this.state.err}</Text>
                                            ) : <Text style={{ marginTop: 10, fontSize: 10 }} >Loading....</Text>
                                    }
                                </View>
                        }
                        {/* <Text>current pakce</Text> */}
                    </View>
                </View>
                {
                    this.props.routName === "Account" ? (
                        <AccDraBody />
                    ) : (null)
                }
                {
                    this.props.routName === "Properties" || this.props.routName === "Tasks" || this.props.routName === "Tasker" ? (
                        <PropertiesOwnerDrabody post_id={this.props.propertyId} ownerDetails={this.props.ownerDetails} ownerProperties={this.props.ownerProperties} created_by={this.props.created_by} routName={this.props.routName} />
                    ) : (null)
                }
            </View>
        );
    }
}



function mapStateToProp(state) {
    return ({
        str: state.root.str,
        isLoader: state.root.isLoader,
        isError: state.root.isError,
        errorMessage: state.root.errorMessage,
        userProfile: state.root.userProfile,
        userDetails: state.root.userDetails,
        userCredentials: state.root.userCredentials,
        favoriteAllAdds: state.root.favorites,

    })
}
function mapDispatchToProp(dispatch) {
    return ({
        login: (userCredentials, navigation) => {
            dispatch(login(userCredentials, navigation));
        },
        logOut: (navigation) => {
            dispatch(logOut(navigation));
        },
        errorRemove: () => {
            dispatch(errorRemove());
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Drawer);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    imgSize: {
        width: "50%",
        height: 100,
    },
    imgView: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 200,
    },
    footerColor: {
        backgroundColor: "#cc3333"
    },
    marginText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 15
    },
    forgetYourPassword: {
        color: '#004D94',
        textAlign: 'center',
        margin: 15

    },
    btnTextMargin: {
        fontWeight: 'bold',
        marginTop: 8,

    }

});

const styl = StyleSheet.create({
    header: { backgroundColor: "#2196f3", flexDirection: 'row', borderBottomColor: '#cbcacf', borderBottomWidth: 1, shadowRadius: 1.2, shadowOpacity: 0.2, height: 50, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
    input: { backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', width: '80%', margin: 5, borderBottomColor: "#FFCB05", borderBottomWidth: 0.5 },
    icons: { color: '#2196f3', marginRight: 10 },
    form: { backgroundColor: '#F8F8F8', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, width: '80%', margin: 10, elevation: 7, borderRadius: 100, borderWidth: 1, borderColor: '#d6d7da' },
    button: { width: '80%', backgroundColor: '#FFCB05', marginLeft: '10%', marginRight: '10%', marginTop: '5%', borderColor: '#FFCB05', borderRadius: 100, borderWidth: 1, shadowColor: '#d7f0ff', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, elevation: 9, marginBottom: 30 },
    error: { color: 'red', marginLeft: 30, marginRight: 30, width: '80%', fontWeight: "600" }
})