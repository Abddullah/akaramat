
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Picker, Image, SafeAreaView, ActivityIndicator, images, Dimensions, Share } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Item, Fab, Input } from 'native-base';
import { connect } from "react-redux";
import IconFontIonicons from 'react-native-vector-icons/Ionicons';

class distanceInformation extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentWillMount() {
        console.log(this.props.distanceInformation, "distanceInformation")
    }
    render() {
        return (
            <View style={{
                flex: 1, width: "100%",backgroundColor:"white"
            }}>
                <View style={{
                    flex: 1.18,
                    // height: 40,
                    backgroundColor: '#E94E1B',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: "row",
                    width: "100%"
                }}>
                    <View style={{ flex: 1, width: "90%", flexDirection: "row", marginTop: "7%" }}>
                        <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => { Actions.pop() }}>
                            <IconFontIonicons name='md-arrow-back' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: "10%", color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.distanceinformation.toUpperCase()}</Text>
                    </View>
                </View>
                <View style={{ flex: 8, width: "90%", marginHorizontal: "5%", }}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
                        {
                            (this.props.distanceInformation && this.props.distanceInformation.length) ? (
                                this.props.distanceInformation.map((value, index) => {
                                    return (
                                        <View style={{ flex: 1, flexDirection: "row", marginTop: 20 }}>

                                            <View style={{ width: "33.3%", }}>
                                                <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{value.title}</Text>
                                            </View>
                                            <View style={{ width: "33.3%", }}>
                                                <Text style={{ textAlign: "center", color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{value.value}</Text>
                                            </View>
                                            <View style={{ width: "33.3%", }}>
                                                <Text style={{ textAlign: "center", color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{value.units}</Text>
                                            </View>
                                        </View>

                                    )
                                })
                            ) :
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: "center",
                                    marginBottom: 20,
                                    marginTop: 20,
                                }}>
                                    <Text style={{ color: "black" }}>{this.props.str.thereisnodataavailable}</Text>
                                </View>
                            // <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.str.thereisnodataavailable}</Text>
                        }

                    </ScrollView>
                </View>
            </View >
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
export default connect(mapStateToProps, mapDispatchToProps)(distanceInformation);


const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 20,

        // flex: 1

    },
});  
