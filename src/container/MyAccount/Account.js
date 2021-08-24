import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, StatusBar, RefreshControl,
    Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon } from 'native-base';
import { connect } from "react-redux";
import axios from 'axios';
import Drawer from '../../Component/drawer';
import ImageSlider from 'react-native-image-slider';
import Communications from 'react-native-communications';
import InfiniteScroll from 'react-native-infinite-scroll';
import IconFontFontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Profile from '../../Component/Profile';
import RepresentativeProfile from '../../Component/profile/RepresentativeProfile';
import TaskerProfile from '../../Component/profile/TaskerProfile';
import AgentProfile from '../../Component/profile/AgentProfile';
import InternationalProfile from '../../Component/profile/InternationalProfile';

class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drawer: false
        }
    }


    animateParent(fals) {
        setTimeout(() => {
            this.setState({
                drawer: false
            })
        }, 250);
    }

    componentWillMount() {
        var { height, width } = Dimensions.get('window');
        // this.setState({
        // })


        const { userData } = this.props

        if (userData) {
            console.log(userData, 'userdate he4re')
            this.setState({
                userType: userData.user_type,
                screenHeight: height,

            })
        }
    }

    componentWillReceiveProps(props) {
        const { userData } = props

        if (userData) {
            this.setState({
                userType: userData.user_type
            })
        }
    }

    render() {
        const { userType } = this.state
        let specialChars = '!@#$^&%*()+=-[]\/{}|:""<>?. ';

        return (
            <View style={{
                flex: 1,
                // justifyContent: 'center',
                // alignItems: "center",
                backgroundColor: "white",
                width: "100%"
            }}>

                {/* this view for closing drawer  */}
                {(this.state.drawer === true) ? (
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            this.setState({
                                drawer: false
                            })
                        }}
                        style={{ position: "absolute", height: this.state.screenHeight, width: "20%", right: 0, zIndex: 1, left: this.props.str.language !== "en" ? 0 : null, }}>
                    </TouchableOpacity>
                ) : (null)}
                {/* this view for closing drawer  */}
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
                    <View style={{ width: "90%", flexDirection: this.props.str.language === "en" ? "row" : "row-reverse", marginTop: "7%", }}>
                        <TouchableOpacity style={{ marginRight: 20 }}
                            onPress={() => this.setState({ drawer: !this.state.drawer })}>
                            <Entypo name='menu' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                        </TouchableOpacity>
                        <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.myAccount.toUpperCase()}</Text>
                    </View>
                </View>


                {/* drawer*/}
                {(this.state.drawer === true) ? (
                    <Drawer
                        animationStyle="fadeInLeftBig"
                        routName="Account"
                        animateParent={this.animateParent.bind(this)}
                    />

                ) : (
                        null
                    )}
                {/* drawer*/}


                {/* //////////////////////////////////////Properties////////////////////////////////////// */}
                <View style={{ flex: 8, width: "100%", justifyContent: "center", alignItems: "center", }}>

                    {
                        userType &&
                            userType === '2' ?
                            <Profile header={false} />
                            :
                            userType === '3' ?
                                <AgentProfile header={false} />
                                :
                                userType === '4' ?
                                    <TaskerProfile header={false} />
                                    :
                                    userType === '5' ?
                                        <RepresentativeProfile header={false} />
                                        :
                                        userType === '6' ?
                                            <InternationalProfile header={false} />
                                            :
                                            <ActivityIndicator />
                    }

                </View>

                {/* //////////////////////////////////////Projects////////////////////////////////////// */}




            </View >
        );
    }
}



let mapStateToProps = state => {
    return {
        str: state.root.str,
        userData: state.root.userDetails,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        // languageSet: (lang) => {
        //     dispatch(languageSet(lang))
        // },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Account);



const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 20,
        backgroundColor: "white",
        // flex: 1

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
