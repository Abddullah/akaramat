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


class PromoteMyAds extends Component {
    constructor(props) {
        super(props)
        this.state = {
            webView: false,
            checkBoxItems: [
                {
                    name: 'emailCmp',
                    check: 'emailCmpFlag'
                },
                {
                    name: 'smsCmp',
                    check: 'smsCmpFlag'
                },
                {
                    name: 'whatsappCmp',
                    check: 'whatsappCmpFlag'
                },
                {
                    name: 'fbCmp',
                    check: 'fbCmpFlag'
                },
                {
                    name: 'twtrCmp',
                    check: 'twtrCmpFlag'
                },
                {
                    name: 'phoneCall',
                    check: 'phoneCallFlag'
                },
                {
                    name: 'all',
                    check: 'allFlag'
                }
            ],
            textFields: [
                {
                    name: 'promoBudget',
                    input: 'default'
                },
                {
                    name: 'PhoneNo',
                    input: 'number-pad'
                },
                {
                    name: 'personName',
                    input: 'default'
                }
            ],
            propertyArr: [],
            projectArr: []
        }
    }
    componentWillMount() {
        this.setState({
            token: this.props.userCredentials.token,
        })
        this.getState()
    }

    getState() {
        return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/payment/getPaymentHistory/10/0",
            headers: {
                "token": `bearer ${this.props.userCredentials.token}`,
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                console.log(data, 'data here')
                // let state = data.data.results
                // this.setState({
                //     stateFromApi: state
                // })
            })
            .catch(err => {
                console.log(err)
            })
    }


    checkStatus(check) {
        const {
            checkBoxItems, allFlag, emailCmpFlag, smsCmpFlag, whatsappCmpFlag,
            fbCmpFlag, twtrCmpFlag, phoneCallFlag
        } = this.state

        if (check === 'allFlag') {
            if (allFlag) {
                console.log('1')
                checkBoxItems.map((item) => {
                    this.setState({
                        [item.check]: false
                    })
                })
            }
            else {
                console.log('2')
                checkBoxItems.map((item) => {
                    this.setState({
                        [item.check]: true
                    })
                })
            }
        }
        else {
            console.log('3')
            if (allFlag) {
                console.log('4')
                this.setState({ allFlag: false })
            } else {
                checkBoxItems.map((items) => {
                    console.log(this.state[items.check], 'check here')
                })
            }

            this.setState({
                [check]: !this.state[check],
            })
        }

    }


    checkBoxItems(items, index) {
        return (
            <View
                key={index}
                style={styles.checkBox}
            >
                <View style={{
                    flexDirection: "row", marginLeft: "4.5%"
                    // backgroundColor: "red"
                }} >
                    <CheckBox checked={this.state[items.check]} color="#E94E1B"
                        onPress={() => this.checkStatus(items.check)}
                    />
                    <Text style={{ marginLeft: 25, fontSize: 16, fontWeight: 'bold' }}
                        onPress={() => this.checkStatus(items.check)}
                    >
                        {this.props.str[items.name]}</Text>
                </View>
            </View>
        )
    }

    textFields(items, index) {
        return (
            <View
                key={index}
                style={{
                    height: 70,
                    width: "100%",
                    // flexDirection: "row",
                    borderWidth: 0.5,
                    borderColor: "white",
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",
                }}

            >
                <View style={{
                    width: "80%", marginBottom: 20,
                }}>
                    <TextField
                        textColor={"grey"}
                        keyboardType={items.input}
                        tintColor={"rgb(63, 81, 181)"}
                        baseColor={"grey"}
                        label={this.props.str[items.name]}
                        value={this.state[items.name]}
                        onChangeText={(e) => this.setState({ [items.name]: e })}
                    />
                </View>
            </View>
        )
    }

    del(index, value) {
        const { propertyArr, projectArr } = this.state
        if (value === 'property') {
            propertyArr.splice(index, 1)
            this.setState({ propertyArr })
        }

        if (value === 'project') {
            projectArr.splice(index, 1)
            this.setState({ projectArr })
        }
    }

    myProperty(item, index, value) {
        return (
            <View key={index} style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#ccc',
                paddingVertical: 2,
                paddingHorizontal: 2,
                borderRadius: 5,
                marginHorizontal: 2,
                marginVertical: 2,
                backgroundColor: '#f1f1f1'
            }}>
                <View style={{ paddingHorizontal: 5 }}>
                    <Text>{item}</Text>
                </View>
                <TouchableOpacity onPress={() => this.del(index, value)}>
                    <View style={{ backgroundColor: '#E94E1B', paddingHorizontal: 5, borderRadius: 5 }}>
                        <Text style={{ color: 'white' }}>{'X'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    add(value) {
        const { property, propertyArr, projectArr, project } = this.state
        if (value === 'property') {
            if (property) {
                propertyArr.push(property)
                this.setState({ propertyArr, property: '' })
            }
        }

        if (value === 'project') {
            if (project) {
                projectArr.push(project)
                this.setState({ projectArr, project: '' })
            }
        }
    }

    submit() {
        const { propertyArr, projectArr, companyFlag, emailCmpFlag, smsCmpFlag, whatsappCmpFlag,
            fbCmpFlag, twtrCmpFlag, phoneCallFlag, allFlag, promoBudget, PhoneNo, personName } = this.state

        if (!promoBudget) {
            alert('Please fill Budget')
        }
        else if (!PhoneNo) {
            alert('Please enter phone number')
        }
        else if (!personName) {
            alert('Please enter person charge')
        }
        else {
            this.setState({
                loader: !this.state.loader
            })
            var cloneData = {
                propertycode: propertyArr,
                pcode: projectArr,
                chk_company: companyFlag ? 1 : 0,
                chk_email_campaign: emailCmpFlag ? 1 : 0,
                chk_sms_campaign: smsCmpFlag ? 1 : 0,
                chk_whatsapp_campaign: whatsappCmpFlag ? 1 : 0,
                chk_fb_campaign: fbCmpFlag ? 1 : 0,
                chk_twitter_campaign: twtrCmpFlag ? 1 : 0,
                chk_phone_campaign: phoneCallFlag ? 1 : 0,
                my_budget: promoBudget,
                my_phone: PhoneNo,
                charge_person: personName
            }

            var bodyFormData = new FormData();

            for (var key in cloneData) {
                if (cloneData[key] && cloneData[key] !== undefined && cloneData[key].length !== 0) {
                    if (Array.isArray(cloneData[key])) {
                        var arr = cloneData[key];
                        for (var i = 0; i < arr.length; i++) {
                            bodyFormData.append(key + "[]", arr[i]);
                        }
                    }
                    else {
                        bodyFormData.append(key, cloneData[key]);
                    }
                }
            }

            console.log(bodyFormData, 'object here')

            var urlm = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/people/user/sendPromoteResquest'
            var options = {
                method: 'POST',
                url: urlm,
                headers:
                {
                    token: "bearer " + this.state.token,
                    clientsecret: '(*jh2kj36gjhasdi78743982u432j',
                    clientkey: '34532hbjdsakjd2&&gjhjh11',
                },
                data: bodyFormData
            };
            axios(options)
                .then((data) => {
                    console.log(data, "data")
                    alert(JSON.stringify(data.data.message))
                    Actions.tabbar({ type: "reset" });

                    Actions.tabNavigation();
                    this.setState({
                        loader: !this.state.loader
                    })
                }).catch((err) => {
                    alert(JSON.stringify(err.response.data.message))
                    console.log(JSON.parse(JSON.stringify(err)), 'ERRROR')
                    this.setState({
                        loader: !this.state.loader
                    })
                })

        }



    }

    render() {
        const { projectArr, checkBoxItems, textFields, propertyArr, loader } = this.state
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
                        <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.promoteAds}</Text>
                        {/* <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.propertiescategories.toUpperCase()}</Text> */}
                    </View>
                </View>

                <View style={{ flex: 8, width: "100%", }}>
                    <ScrollView
                        style={{
                            width: "100%",
                            // backgroundColor: "red",
                        }}
                        contentContainerStyle={styles.contentContainer}
                    >

                        <View style={{ paddingVertical: 5, paddingHorizontal: 10, justifyContent: "center", alignItems: "center" }}>
                            <Text
                                style={{
                                    color: "grey",
                                    fontSize: 15,
                                    textAlign: 'justify',
                                    fontWeight: "400"
                                }}>
                                {this.props.str.promotions}
                            </Text>
                        </View>
                        <View style={{ paddingVertical: 5, paddingHorizontal: 10, justifyContent: "center" }}>
                            <Text
                                style={{
                                    color: "grey",
                                    fontSize: 15,
                                    textAlign: 'justify',
                                    fontWeight: "400"
                                }}>
                                {this.props.str.promote}
                            </Text>
                        </View>


                        <View
                            style={[styles.checkBox, { height: this.state.propertyFlag === true ? 200 : 70 }]}
                        >
                            <View style={{
                                flexDirection: "row", marginLeft: "4.5%", marginTop: this.state.propertyFlag === true ? 18 : 0,
                                // backgroundColor: "red"
                            }} >
                                <CheckBox checked={this.state.propertyFlag} color="#E94E1B"
                                    onPress={() => {
                                        this.setState({
                                            propertyFlag: !this.state.propertyFlag,
                                            property: "",
                                            propertyArr: []
                                        })
                                    }}
                                />
                                <Text style={{ marginLeft: 25, fontSize: 16, fontWeight: 'bold' }}
                                    onPress={() => {
                                        this.setState({
                                            propertyFlag: !this.state.propertyFlag,
                                            property: "",
                                            propertyArr: []
                                        })
                                    }}
                                >{this.props.str.property}</Text>
                            </View>

                            {
                                (this.state.propertyFlag === true) ? (
                                    <Animatable.View animation="slideInLeft" iterationCount={1}
                                        style={{
                                            width: "80%", marginBottom: 10, marginHorizontal: "10%"
                                        }}>


                                        <TextField
                                            textColor={"grey"}
                                            tintColor={"rgb(63, 81, 181)"}
                                            baseColor={"grey"}
                                            label={this.props.str.propertyCode}
                                            value={this.state.property}
                                            onChangeText={(e) => this.setState({ property: e })}
                                        />
                                        {
                                            propertyArr &&
                                                propertyArr.length ?
                                                <View style={{
                                                    borderWidth: 0.4,
                                                    borderColor: 'grey',
                                                    alignItems: 'flex-start',
                                                    flexWrap: 'wrap',
                                                    paddingVertical: 5,
                                                    flexDirection: 'row',
                                                    paddingHorizontal: 5
                                                }}>
                                                    {
                                                        propertyArr &&
                                                        propertyArr.map((item, index) => {
                                                            return (
                                                                this.myProperty(item, index, 'property')
                                                            )
                                                        })
                                                    }
                                                </View>
                                                :
                                                null
                                        }
                                        <View
                                            style={{ paddingVertical: 10 }}
                                        >
                                            <View>
                                                <Button
                                                    onPress={() => this.add('property')}
                                                    color={'#E94E1B'}
                                                    title={this.props.str.add}
                                                />
                                            </View>
                                        </View>

                                    </Animatable.View>
                                ) : (null)
                            }
                        </View>

                        <View
                            style={[styles.checkBox, { height: this.state.projectFlag === true ? 200 : 70 }]}
                        >
                            <View style={{
                                flexDirection: "row", marginLeft: "4.5%", marginTop: this.state.projectFlag === true ? 18 : 0,
                                // backgroundColor: "red"
                            }} >
                                <CheckBox checked={this.state.projectFlag} color="#E94E1B"
                                    onPress={() => {
                                        this.setState({
                                            projectFlag: !this.state.projectFlag,
                                            project: "",
                                            projectArr: []
                                        })
                                    }}
                                />
                                <Text style={{ marginLeft: 25, fontSize: 16, fontWeight: 'bold' }}
                                    onPress={() => {
                                        this.setState({
                                            projectFlag: !this.state.projectFlag,
                                            project: "",
                                            projectArr: []
                                        })
                                    }}
                                >{this.props.str.project}</Text>
                            </View>

                            {
                                (this.state.projectFlag === true) ? (
                                    <Animatable.View animation="slideInLeft" iterationCount={1}
                                        style={{
                                            width: "80%", marginBottom: 10, marginHorizontal: "10%"
                                        }}>
                                        <TextField
                                            textColor={"grey"}
                                            tintColor={"rgb(63, 81, 181)"}
                                            baseColor={"grey"}
                                            label={this.props.str.projectCode}
                                            value={this.state.project}
                                            onChangeText={(e) => this.setState({ project: e })}
                                        />

                                        {
                                            projectArr &&
                                                projectArr.length ?
                                                <View style={{
                                                    borderWidth: 0.4,
                                                    borderColor: 'grey',
                                                    alignItems: 'flex-start',
                                                    flexWrap: 'wrap',
                                                    paddingVertical: 5,
                                                    flexDirection: 'row',
                                                    paddingHorizontal: 5
                                                }}>
                                                    {
                                                        projectArr &&
                                                        projectArr.map((item, index) => {
                                                            return (
                                                                this.myProperty(item, index, 'project')
                                                            )
                                                        })
                                                    }
                                                </View>
                                                :
                                                null
                                        }
                                        <View
                                            style={{ paddingVertical: 10 }}
                                        >
                                            <View>
                                                <Button
                                                    onPress={() => this.add('project')}
                                                    color={'#E94E1B'}
                                                    title={this.props.str.add}
                                                />
                                            </View>
                                        </View>

                                    </Animatable.View>

                                ) : (null)
                            }
                        </View>


                        <View
                            style={styles.checkBox}
                        >
                            <View style={{
                                flexDirection: "row", marginLeft: "4.5%"
                                // backgroundColor: "red"
                            }} >
                                <CheckBox checked={this.state.companyFlag} color="#E94E1B"
                                    onPress={() => {
                                        this.setState({
                                            companyFlag: !this.state.companyFlag,
                                            company: ""
                                        })
                                    }}
                                />
                                <Text style={{ marginLeft: 25, fontSize: 16, fontWeight: 'bold' }}
                                    onPress={() => {
                                        this.setState({
                                            companyFlag: !this.state.companyFlag,
                                            company: ""
                                        })
                                    }}
                                >{this.props.str.company}</Text>
                            </View>
                        </View>

                        <View style={{ paddingVertical: 5, paddingHorizontal: 10, justifyContent: "center" }}>
                            <Text
                                style={{
                                    color: "grey",
                                    fontSize: 15,
                                    textAlign: 'justify',
                                    fontWeight: "400"
                                }}>
                                {this.props.str.promotionChannel}
                            </Text>
                        </View>

                        {
                            checkBoxItems &&
                            checkBoxItems.map((items, index) => {
                                return (
                                    this.checkBoxItems(items, index)
                                )
                            })
                        }

                        {
                            textFields &&
                            textFields.map((items, index) => {
                                return (
                                    this.textFields(items, index)
                                )
                            })
                        }

                        <View
                            style={{ paddingVertical: 10, alignItems: 'center' }}
                        >
                            <View style={{ width: '80%' }}>
                                {
                                    loader ?
                                        <ActivityIndicator />
                                        :
                                        <Button
                                            onPress={() => this.submit()}
                                            color={'#E94E1B'}
                                            title={this.props.str.submit}
                                        />
                                }
                            </View>
                        </View>

                        <View style={{ paddingVertical: 10, paddingHorizontal: 10, justifyContent: "center" }}>
                            <Text
                                style={{
                                    color: "grey",
                                    fontSize: 15,
                                    textAlign: 'center',
                                    fontWeight: "400"
                                }}>
                                {this.props.str.marketService}
                            </Text>
                        </View>


                        <View
                            style={{
                                paddingVertical: 20,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20
                            }}
                        >
                            <View style={{ alignItems: 'center' }}>
                                <Button
                                    onPress={() => Actions.advertiseWithUs()}
                                    color={'#E94E1B'}
                                    title={this.props.str.advertise}
                                />
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Button
                                    onPress={() => Actions.bannerAds()}
                                    color={'#E94E1B'}
                                    title={this.props.str.bannerAds}
                                />
                            </View>
                        </View>
                    </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(PromoteMyAds);
const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 40,
    },
    checkBox: {
        height: 70,
        width: "100%",
        borderWidth: 0.5,
        borderColor: "white",
        borderRadius: 5,
        justifyContent: "center",
    }
});  
