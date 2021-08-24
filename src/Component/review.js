import React, { Component } from 'react';
import { Container, Button, Text, Content, Form, Item, Input, Label, Alert, Thumbnail, View } from 'native-base';
import { Image, TouchableOpacity, StyleSheet, ScrollView, Picker, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import Textarea from 'react-native-textarea';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Rating from '../Component/rating';
import { Actions } from "react-native-router-flux";
var { height, width } = Dimensions.get('window');

class Review extends Component {
    constructor(props) {
        super(props)
        this.state = {
            qualityOfWork: 1,
            adhenrence: 1,
            communication: 1,
            isloader: false
        }
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
                        <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.FeedBack}</Text>
                        {/* <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.propertiescategories.toUpperCase()}</Text> */}
                    </View>
                </View>

                {/* //////////////////////////////////////body////////////////////////////////////// */}
                <View style={{ flex: 8, width: "100%", }}>
                    <Rating rout="review" taskId={this.props.id} DeliverTheTask={this.props.DeliverTheTask}/>
                </View>
                {/* //////////////////////////////////////Projects////////////////////////////////////// */}

            </View >
        );
    }
}

function mapStateToProp(state) {
    return ({
        // isLoader: state.root.isLoader,
        // isError: state.root.isError,
        // errorMessage: state.root.errorMessage,
        // commentsObj: state.root.comments,
        // userProfile: state.root.userProfile,
        // addsData: state.root.addsData,
        str: state.root.str,
        userCredentials: state.root.userCredentials


        // myOffers: state.root.myOffers,

    })
}
function mapDispatchToProp(dispatch) {
    return ({
        // getComments: (id, navigation) => {
        //     dispatch(getComments(id, navigation));
        // },
        // commentsAdd: (data, navigation) => {
        //     dispatch(commentsAdd(data, navigation));
        // },
        rating: (starCount, addId, navigation) => {
            dispatch(rating(starCount, addId, navigation));
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Review);
const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 70,

    },
    containerTextarea: {
        marginHorizontal: "10%", flex: 1, padding: 30, justifyContent: 'center', alignItems: 'center',
        backgroundColor: '#F1F2F2', justifyContent: 'center', alignItems: 'center', borderColor: 'white', width: '80%', margin: 10,
    },
    textareaContainer: {
        height: 180,
        padding: 5,
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#333',

    },
    input: {
        justifyContent: 'center', width: '80%',
        borderColor: "#DCE0DE", borderWidth: 1,
    },



});
