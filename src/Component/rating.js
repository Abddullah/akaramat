import React, { Component } from 'react';
import { Container, Button, Text, Content, Form, Item, Input, Label, Alert, Thumbnail, View } from 'native-base';
import { Image, TouchableOpacity, StyleSheet, ScrollView, Picker, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import Textarea from 'react-native-textarea';
import axios from 'axios';
import { Actions } from "react-native-router-flux";
var { height, width } = Dimensions.get('window');

class Rating extends Component {
    constructor(props) {
        super(props)
        this.state = {
            qualityOfWork: 1,
            adhenrence: 1,
            communication: 1,
            isloader: false
        }
    }

    // componentDidMount() {
    //     let addId = this.props.navigation.getParam('addId');
    //     console.log(addId, "addIdaddIdaddId***")
    //     this.setState({
    //         addId
    //     })
    // }

    qualityOfWork(star, rateHead) {
        this.setState({
            [rateHead]: star
        })
    }

    submit() {
        this.setState({
            isloader: true
        })
        var bodyFormData = new FormData();
        let url;
        if (this.props.rout === "review") {
            if (this.state.description && this.state.experience) {
                console.log("iffff", this.state.description, this.state.experience)
                bodyFormData.append("task_id", this.props.taskId);
                bodyFormData.append("experience", this.state.description);
                if (this.state.experience === 4) {
                    console.log("goood")
                    bodyFormData.append("rate", "1");
                }
                else {
                    bodyFormData.append("rate", "2");
                    console.log("bad")
                }
                if(!this.props.DeliverTheTask){

                    bodyFormData.append("type_action", "is_feedback");
                }
                url = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/task/user/deliverTask'
            }
            else {
                alert(this.props.str.allfieldsarerequired)
            }
        }
        else {
            console.log("else")

            bodyFormData.append("task_id", this.props.taskObj.task_id);
            bodyFormData.append("user_hired", this.props.taskObj.id);
            bodyFormData.append("quanlity", this.state.qualityOfWork);
            bodyFormData.append("schedule", this.state.adhenrence);
            bodyFormData.append("communication", this.state.communication);
            bodyFormData.append("experience", this.state.description);
            url = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/task/user/endContractTask'
        }
        var options = {
            method: 'POST',
            url: url,
            headers:
            {
                token: "bearer " + this.props.userCredentials.token,
                'postman-token': '553d07fc-3950-1199-efd9-6b5b5f8315a2',
                'cache-control': 'no-cache',
                clientsecret: '(*jh2kj36gjhasdi78743982u432j',
                clientkey: '34532hbjdsakjd2&&gjhjh11',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                "Allow-Cross-Origin": '*',
            },
            data: bodyFormData
        };
        console.log(bodyFormData, '****61');
        axios(options)
            .then((data) => {
                console.log(data, 'DATAT')
                this.setState({
                    isloader: false
                })
                alert(data.data.message)
                Actions.tabbar({ type: "reset" });
                Actions.tabNavigation();

            }).catch((err) => {
                this.setState({
                    isloader: false
                })
                console.log(err, 'DATAT')
                alert(JSON.stringify(err.response.data.message))
                this.setState({ sendingLoader: !this.state.sendingLoader });
            })


    }
    render() {
        // alert(this.props.DeliverTheTask)
        return (
            <View style={{ flex: 1, backgroundColor: "white", }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 200, }}>






                    <View style={{ backgroundColor: "#1E90FF", height: 40, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>
                            {this.props.str.publicFeedBack}
                        </Text>
                    </View>
                    <View style={{ padding: 5 }}>
                        <View>
                            <Text style={{}}>
                                {(this.props.rout === "review") ? (

                                    this.props.str.thisReview
                                ) : (
                                        this.props.str.thisFeedBack
                                    )}

                            </Text>
                        </View>
                        <View style={{ top: 10 }}>
                            <Text style={{ fontWeight: "bold" }}>

                                {(this.props.rout === "review") ? (

                                    this.props.str.feedbackToClient
                                ) : (
                                        this.props.str.feedbackToTasker
                                    )}


                            </Text>
                        </View>
                        {/* starss with heading */}
                        {(this.props.rout === "review") ?
                            (["experience",].map((rateHead, index) => {
                                return (
                                    <View>
                                        <View style={{ top: 10, left: 10 }}>
                                            <Text style={{}}>
                                                {this.props.str[rateHead]}
                                            </Text>
                                        </View>
                                        <View style={{
                                            marginTop: "7%", flexDirection: "row", justifyContent: "center", alignItems: "center",
                                        }}>
                                            {
                                                [5, 4,].map((starCount, index) => {
                                                    return (
                                                        <TouchableOpacity style={{ marginRight: 10, alignSelf: "flex-start" }}
                                                            onPress={() => this.qualityOfWork(starCount, rateHead)}
                                                        >
                                                            <Icon name={this.state[rateHead] <= starCount ? 'star' : 'staro'} style={{ color: "#ffea00", fontWeight: "bold", fontSize: 50, }} />
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                )
                            })) :
                            (
                                ["qualityOfWork", "adhenrence", "communication"].map((rateHead, index) => {
                                    return (
                                        <View>
                                            <View style={{ top: 10, left: 10 }}>
                                                <Text style={{}}>
                                                    {this.props.str[rateHead]}
                                                </Text>
                                            </View>
                                            <View style={{
                                                marginTop: "7%", flexDirection: "row", justifyContent: "center", alignItems: "center",
                                            }}>
                                                {
                                                    [5, 4, 3, 2, 1].map((starCount, index) => {
                                                        return (
                                                            <TouchableOpacity style={{ marginRight: 10, alignSelf: "flex-start" }}
                                                                onPress={() => this.qualityOfWork(starCount, rateHead)}
                                                            >
                                                                <Icon name={this.state[rateHead] <= starCount ? 'star' : 'staro'} style={{ color: "#ffea00", fontWeight: "bold", fontSize: 50, }} />
                                                            </TouchableOpacity>
                                                        )
                                                    })
                                                }
                                            </View>
                                        </View>
                                    )
                                })
                            )}

                        {

                        }

                        {/* Description */}

                        <View style={{
                            padding: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <View style={{ padding: "5%", backgroundColor: "#F8F8F8" }}>
                                <Text style={{ color: "black", marginBottom: 10 }}>{this.props.str.description}</Text>
                                <Textarea
                                    containerStyle={{
                                        height: 190,
                                        width: "110%",
                                        padding: 5,
                                        backgroundColor: '#F8F8F8',
                                    }}
                                    style={{
                                        textAlignVertical: 'top',  // hack android
                                        height: 170,
                                        fontSize: 14,
                                        color: '#333',
                                    }}
                                    onChangeText={(e) => { this.setState({ description: e }) }}
                                    defaultValue={this.state.description}
                                    maxLength={500}
                                    placeholder={this.props.str.shareYourExp}
                                    placeholderTextColor={'#c7c7c7'}
                                    underlineColorAndroid={'transparent'}
                                />
                            </View>

                        </View>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            {
                                (this.state.isloader === true) ? (
                                    <View style={{
                                        // flex: 1,
                                        // backgroundColor: "red", 
                                        justifyContent: 'center',
                                        alignItems: "center",
                                    }}>
                                        <ActivityIndicator style={{ top: 20, marginBottom: 20 }} />
                                        {/* <Text style={{ marginTop: 10 }} >Loading....</Text> */}
                                    </View>
                                ) : (<TouchableOpacity
                                    style={{ width: "90%", height: 35, borderWidth: 1, borderRadius: 0, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}
                                    onPress={this.submit.bind(this)}
                                >
                                    <Text>
                                        {(this.props.rout === "review") ? (

                                            this.props.str.giveFeedback
                                        ) : (
                                                this.props.str.endContract
                                            )}

                                    </Text>
                                </TouchableOpacity>)
                            }

                        </View>


                    </View>
                </ScrollView>



            </View>
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

export default connect(mapStateToProp, mapDispatchToProp)(Rating);
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
