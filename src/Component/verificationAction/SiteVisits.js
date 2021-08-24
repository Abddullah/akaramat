import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, StatusBar, RefreshControl,
    Dimensions, WebView, Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Content, Card, CardItem, Thumbnail, Icon, Badge, Picker, Item } from 'native-base';
import { connect } from "react-redux";
import axios from 'axios';
// import Drawer from '../../Component/drawer';
import InfiniteScroll from 'react-native-infinite-scroll';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    CheckBox
} from 'native-base';
import * as Animatable from 'react-native-animatable';
import { TextField } from 'react-native-material-textfield';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Textarea from 'react-native-textarea';


class SiteVisits extends Component {
    constructor(props) {
        super(props)
        this.state = {
            note:"",
            meet:"Good"
        }
    }

componentWillMount(){
    this.props.fetchSiteVis(this.state.meet, this.state.note, "this.state.meet")
}
    render() {
        const { radioData } = this.state
        const { heading, first, second, third, fourth } = this.props
        var radio_props;
        if (this.props.str.language == "en") {

            radio_props = [
                { label: 'Good', value: "Good" },
                { label: 'Not Good', value: "Not Good" },
            ];
        }
        else {
            radio_props = [
                { label: 'حسن', value: "Good" },
                { label: 'ليست جيدة', value: "Not Good" },
            ];
        }
        return (
            <View style={{
                flex: 1,
                backgroundColor: "white",
                width: "100%",
            }}>
                <View style={{ paddingVertical: '3%', backgroundColor: '#1E90FF', paddingHorizontal: '3%' }}>
                    <Text style={{ fontSize: 14, color: 'white', textAlign: 'center' }}>
                        {this.props.str[heading]}
                    </Text>
                </View>

                {
                    first &&
                    <View style={{ paddingVertical: 5, paddingHorizontal: 10, justifyContent: "center" }}>
                        <Text
                            style={{
                                color: "grey",
                                fontSize: 15,
                                textAlign: 'justify',
                                fontWeight: "400"
                            }}>
                            {this.props.str[first]}
                        </Text>
                    </View>
                }

                {
                    second &&
                    <View style={styles.base}>
                        <Text style={{ fontWeight: 'bold' }}>
                            {this.props.str[second]}
                        </Text>
                    </View>
                }

                {
                    third &&
                    <View style={{
                        width: "100%", paddingVertical: '1%', paddingHorizontal: '7%',
                        justifyContent: 'flex-start', alignItems: "flex-start"
                        // backgroundColor: "yellow",

                    }}>
                        <RadioForm
                            // formHorizontal={false}
                            labelHorizontal={true}
                            animation={true}
                            radio_props={radio_props}
                            // initial={this.state[third]}

                            buttonSize={10}
                            buttonOuterSize={20}
                            onPress={(value) => {
                                this.setState({ [third]: value }, () => {
                                    this.props.fetchSiteVis(this.state.meet, this.state.note, "this.state.meet")
                                })
                            }}
                        />
                    </View>
                }

                {
                    fourth &&
                    <View style={{ padding: "5%", marginVertical: '2%', width: '90%', alignSelf: 'center', backgroundColor: "#F8F8F8" }}>
                        <Text style={{ color: "black", fontWeight: 'bold', marginBottom: 10 }}>{this.props.str[fourth]}</Text>
                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            onChangeText={(e) => {
                                this.setState({ [fourth]: e }, () => {
                                    this.props.fetchSiteVis(this.state.meet, this.state[fourth], "this.state.meet")
                                })
                            }}
                            defaultValue={this.state[fourth]}
                            maxLength={500}
                            placeholder={this.props.str[fourth]}
                            placeholderTextColor={'#c7c7c7'}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                }


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
export default connect(mapStateToProps, mapDispatchToProps)(SiteVisits);
const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 40,
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
    },
    base: {
        // borderWidth: 1,
        paddingHorizontal: '3%',
        paddingVertical: '2%'
    },
    checkBox: {
        height: 50,
        width: "100%",
        borderWidth: 0.5,
        borderColor: "white",
        borderRadius: 5,
        justifyContent: "center",
    }
});  
