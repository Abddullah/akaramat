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
import BasicInfo from './BasicInfo';
import ExperienceQuality from './ExperienceQuality';
import PersonalMeeting from './PersonalMeeting';
import SiteVisits from './SiteVisits';


class MyVerificationAction extends Component {
    constructor(props) {
        super(props)
        this.state = {
            basicArr: []
        }
    }

    done(objWithId) {
        const { ref1, ref2, ref3, note_reference, meeting, note_visit, visit, note_meeting, } = this.state
        // console.log("Work fine", ref1, ref2, ref3, note_reference, meeting, note_visit, visit, note_meeting, this.props.data.data.results.id, this.props.rout)
        console.log(this.props.obj.id, "ssssss", note_meeting, this.props.role)
        var bodyFormData = new FormData();
        if (this.props.role === "tasks" || this.props.role === "properties" || this.props.role === "projects") {
            let uri;
            bodyFormData.append("note", note_meeting);
            if (this.props.role === "tasks") {
                bodyFormData.append("task_id", this.props.obj.id);
                uri = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/verification/user/verifyTask'
            }
            else if (this.props.role === "projects") {
                console.log("elsepro")
                bodyFormData.append("project_id", this.props.obj.id);
                uri = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/verification/user/verifyProject'
            }
            else {
                bodyFormData.append("property_id", this.props.obj.id);
                uri = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/verification/user/verifyProperty'
            }
            url = uri
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
                    console.log(err, 'errrr', JSON.stringify(err.response))
                    alert(JSON.stringify(err.response.data.message))
                    this.setState({ sendingLoader: !this.state.sendingLoader });
                })

        }
        else {

            let basicArr = this.state.basicArr
            let filterArr = basicArr.indexOf(false)
            console.log(filterArr, "filterArr")

            if (filterArr === -1) {
                console.log(filterArr, "filterArr")
                bodyFormData.append("user_id", this.props.data.data.results.id);
                bodyFormData.append("rate_references1", ref1 === "Very good" ? "1" : ref1 === "Good" ? "2" : ref1 === "Fair") ? ("3") : ref1 === "Bad" ? ("4") : (ref1 === "Prefer not to say" ? ("5") : (null));
                bodyFormData.append("rate_references2", ref1 === "Very good" ? "1" : ref1 === "Good" ? "2" : ref1 === "Fair") ? ("3") : ref1 === "Bad" ? ("4") : (ref1 === "Prefer not to say" ? ("5") : (null));
                bodyFormData.append("rate_references3", ref1 === "Very good" ? "1" : ref1 === "Good" ? "2" : ref1 === "Fair") ? ("3") : ref1 === "Bad" ? ("4") : (ref1 === "Prefer not to say" ? ("5") : (null));
                bodyFormData.append("note_reference", note_reference);
                bodyFormData.append("meeting", meeting === "Good" ? "1" : "2");
                bodyFormData.append("note_visit", note_visit);
                bodyFormData.append("visit", visit === "Good" ? "1" : "2");
                bodyFormData.append("note_meeting", note_meeting);
                bodyFormData.append("user_type", this.props.rout === "TaskersInCity" ? "tasker" : "agent");
                url = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/verification/user/verifyUser'
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
                        console.log(err, 'errrr', JSON.stringify(err.response))
                        alert(JSON.stringify(err.response.data.message))
                        this.setState({ sendingLoader: !this.state.sendingLoader });
                    })
            }
            else {
                alert(this.props.str.allfieldsarerequired)
            }
        }
    }

    button(objWithId) {
        return (
            <View
                style={{ paddingVertical: 30, alignItems: 'center' }}
            >
                <View style={{ width: '80%' }}>
                    <Button
                        onPress={() => this.done(objWithId)}
                        color={'#E94E1B'}
                        title={this.props.str.save}
                    />
                </View>
            </View>
        )
    }
    BasicInfoFunc(email, phone, address, photoId, addressProof) {
        let basicArr = []
        basicArr.push(email, phone, address, photoId, addressProof)
        this.setState({
            basicArr
        })
        console.log(email, phone, address, photoId, addressProof, "email,phone,address,photoId,addressProof", basicArr)
    }
    fetchExp(ref1, ref2, ref3, note_reference) {
        console.log(ref1, ref2, ref3, note_reference, "ref1,ref2,ref3")
        this.setState({
            ref1, ref2, ref3, note_reference
        })
    }
    fetchPmeeting(meeting, note_visit) {
        this.setState({
            meeting, note_visit
        })
        // console.log(meet, note, "ref1,ref2,ref3")
    }
    fetchSiteVis(visit, note_meeting) {
        this.setState({
            visit, note_meeting
        })
        // console.log(meet, note, "fetchSiteVis")
    }
    render() {
        const { role, obj, data } = this.props
        // console.log(role, obj, "wokkk", data.data.results)
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
                        <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.verification}</Text>
                    </View>
                </View>

                <View style={{ flex: 8, alignItems: 'center' }}>
                    <ScrollView style={{ width: '100%' }}>
                        {
                            (role === 'tasker' || role === 'agents') &&
                            <>
                                <BasicInfo email={data.data.results.user_email} phone={data.data.results.contact_phone}
                                    address={data.data.results.address} BasicInfoFunc={(email, phone, address, photoId, addressProof) => this.BasicInfoFunc(email, phone, address, photoId, addressProof)} />
                                <ExperienceQuality fetchExp={(ref1, ref2, ref3, note, ) => this.fetchExp(ref1, ref2, ref3, note)} />
                                <PersonalMeeting fetchPmeeting={(meet, note) => this.fetchPmeeting(meet, note)} />
                                <SiteVisits
                                    heading={'siteVis'}
                                    first={'visitOff'}
                                    second={'overallVisit'}
                                    third={'meet'}
                                    fourth={'note'}
                                    fetchSiteVis={(meet, note) => this.fetchSiteVis(meet, note)}
                                />
                                {
                                    this.button(data.data.results)
                                }
                            </>
                        }
                        {
                            role === 'tasks' &&
                            <>
                                <SiteVisits
                                    heading={'basicInfo'}
                                    first={'ownReport'}
                                    fourth={'note'}
                                    fetchSiteVis={(meet, note) => this.fetchSiteVis(meet, note)}

                                />
                                {
                                    this.button()
                                }
                            </>

                        }

                        {
                            role === 'properties' &&
                            <>
                                <SiteVisits
                                    heading={'basicInfo'}
                                    first={'ownReport'}
                                    fourth={'note'}
                                    fetchSiteVis={(meet, note) => this.fetchSiteVis(meet, note)}

                                />
                                {
                                    this.button()
                                }
                            </>

                        }

                        {
                            role === 'projects' &&
                            <>
                                <SiteVisits
                                    heading={'basicInfo'}
                                    first={'ownReport'}
                                    fourth={'note'}
                                    fetchSiteVis={(meet, note) => this.fetchSiteVis(meet, note)}
                                />
                                {
                                    this.button()
                                }
                            </>

                        }

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
export default connect(mapStateToProps, mapDispatchToProps)(MyVerificationAction);
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
    }
});  
