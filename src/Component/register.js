import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, StatusBar, RefreshControl,
    Dimensions, WebView, Button, Picker
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Content, Card, CardItem, Thumbnail, Icon, Badge, Item } from 'native-base';
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
import Textarea from 'react-native-textarea';


class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lists: [
                {
                    name: 'startMark'
                },
                {
                    name: 'employee'
                },
                {
                    name: 'ambition'
                },
                {
                    name: 'mechanism'
                },
                {
                    name: 'performJob'
                },
                {
                    name: 'willing'
                },
                {
                    name: 'coupon'
                }
            ],
            dropdownContent: [
                {
                    name: 'visits',
                    value: 'Site Visits'
                },
                {
                    name: 'markPhone',
                    value: 'Marketing Phone Calls'
                },
                {
                    name: 'both',
                    value: 'Both'
                },
                {
                    name: 'others',
                    value: 'Others'
                }
            ],
            category: this.props.str.visits,
            affiliate: true
        }
    }

    ulLists(text, index) {
        return (
            <View key={index} style={{ marginBottom: 2, flexDirection: 'row' }}>
                <View style={{ width: '10%', alignItems: 'center', alignSelf: 'flex-start' }}>
                    <Text style={{ fontSize: 32 }}>{'\u2022'}</Text>
                </View>
                <View style={{ alignSelf: 'flex-end', width: '90%', paddingTop: '2%' }}>
                    <Text style={{ fontSize: 15, color: '#212529' }}>
                        {this.props.str[text]}
                    </Text>
                </View>
            </View>
        )
    }

    send() {
        const { affiliate, aboutme, training, category } = this.state

        var cloneData = {
            is_register: affiliate ? this.props.str.registerCopon : this.props.str.requestCopon,
            aboutme,
            meeting: training ? 1 : 0,
            typemarketing: category
        }

        this.setState({ loader: true })

        var bodyFormData = new FormData();
        for (var key in cloneData) {
            bodyFormData.append(key, cloneData[key]);
        }
        console.log(bodyFormData, 'bodyFormData')
        var urlm = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/people/user/sendRequestCoupon'

        var options = {
            method: 'POST',
            url: urlm,
            headers:
            {
                token: "bearer " + this.props.userCredentials.token,
                clientsecret: '(*jh2kj36gjhasdi78743982u432j',
                clientkey: '34532hbjdsakjd2&&gjhjh11',
            },
            data: bodyFormData
        };
        axios(options)
            .then((data) => {
                console.log(data, "data")
                // data.json().then((response) => {
                alert(response.data.message)
                Actions.tabNavigation();
                this.setState({ loader: false })
                // })

            }).catch((err) => {
                this.setState({ loader: false })
                alert(JSON.stringify(err.response.data.message))

                // console.log(JSON.parse(JSON.stringify(err)), 'ERRROR')
            })
    }

    render() {
        const { lists, dropdownContent, loader } = this.state
        return (
            <View style={{
                flex: 1,
                backgroundColor: "white",
                width: "100%",
                position: 'relative'
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
                        <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.Register}</Text>
                    </View>
                </View>

                <View style={{ flex: 8, paddingHorizontal: '5%' }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            lists &&
                            lists.map((items, index) => {
                                return (
                                    this.ulLists(items.name, index)
                                )
                            })
                        }
                        <View style={{ paddingVertical: '3%', paddingHorizontal: '3%' }}>
                            <Text style={{ fontSize: 20 }}>
                                {this.props.str.form}
                            </Text>
                        </View>

                        <View style={{ paddingVertical: '2%', backgroundColor: '#E94E1B', paddingHorizontal: '3%' }}>
                            <Text style={{ fontSize: 14, color: 'white', textAlign: 'center' }}>
                                {this.props.str.directMarket}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', height: 70 }}>
                            <View style={{ width: '10%', alignSelf: 'center' }}>
                                <CheckBox checked={this.state.affiliate} color="#E94E1B"
                                    onPress={() => {
                                        this.setState({
                                            affiliate: !this.state.affiliate,
                                        })
                                    }}
                                />
                            </View>
                            <View style={{ width: '90%', alignSelf: 'center' }}>
                                <Text style={{ marginLeft: 15, fontSize: 16, fontWeight: 'bold' }}
                                    onPress={() => {
                                        this.setState({
                                            affiliate: !this.state.affiliate,
                                        })
                                    }}
                                >{this.props.str.affiliateSys}</Text>
                            </View>
                        </View>

                        <View style={styles.container}>
                            <View style={{ padding: "5%", backgroundColor: "#F8F8F8" }}>
                                <Text style={{ color: "black", fontWeight: 'bold', marginBottom: 10 }}>{this.props.str.aboutme}</Text>
                                <Textarea
                                    containerStyle={styles.textareaContainer}
                                    style={styles.textarea}
                                    onChangeText={(e) => { this.setState({ aboutme: e }) }}
                                    defaultValue={this.state.aboutme}
                                    maxLength={500}
                                    placeholder={this.props.str.aboutme}
                                    placeholderTextColor={'#c7c7c7'}
                                    underlineColorAndroid={'transparent'}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', height: 70 }}>
                            <View style={{ width: '10%', alignSelf: 'center' }}>
                                <CheckBox checked={this.state.training} color="#E94E1B"
                                    onPress={() => {
                                        this.setState({
                                            training: !this.state.training,
                                        })
                                    }}
                                />
                            </View>
                            <View style={{ width: '90%', alignSelf: 'center' }}>
                                <Text style={{ marginLeft: 15, fontSize: 16, fontWeight: 'bold' }}
                                    onPress={() => {
                                        this.setState({
                                            training: !this.state.training,
                                        })
                                    }}
                                >{this.props.str.training}</Text>
                            </View>
                        </View>

                        <Item>
                            <Picker
                                mode="dropdown"
                                style={{ height: 50, width: "90%", color: "black" }}
                                placeholderStyle={{ color: "#E94E1C" }}
                                placeholderIconColor="#E94E1C"
                                selectedValue={this.state.category}
                                onValueChange={
                                    (itemValue, itemIndex) => this.setState({ category: itemValue })
                                }
                            >
                                {
                                    dropdownContent.map((item, index) => {
                                        return (
                                            <Picker.Item label={this.props.str[item.name]} value={this.props.str[item.name]} key={index} />
                                        )
                                    })
                                }
                            </Picker>
                        </Item>

                        <View
                            style={{ paddingVertical: 40, alignItems: 'center' }}
                        >
                            <View style={{ width: '80%' }}>
                                {
                                    loader ?
                                        <ActivityIndicator />
                                        :
                                        <Button
                                            onPress={() => this.send()}
                                            color={'#E94E1B'}
                                            title={this.props.str.send}
                                        />
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Register);
const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 40,
    },
    checkBox: {
    }
});  
