import React, { Component } from 'react';
import { Text, View, } from 'native-base';
import { Image, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
// import { login, notifications, logOut } from '../store/action/action';
import * as Animatable from 'react-native-animatable';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { connect } from 'react-redux';
import {
    StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { hideTaber } from "../Store/Action/action";

class accDraBody extends Component {
    constructor() {
        super()
        this.state = {
            dBody: []
        }
    }

    componentWillMount() {
        console.log(this.props.str.Logout, "lllllll", this.props.userCredentials)
        // console.log(this.props.str,"strlllllll")

        var dBodyArr = [
            {
                icon: <Material name="home" size={20} style={{ color: "#908073", fontSize: 25 }} />,
                // name: "Properties",
                name: this.props.str.properties
            },

            {
                icon: <FontAwesome5 name="tasks" size={20} style={{ color: "#908073", fontSize: 19 }} />,
                name: this.props.str.Tasks
            },

            {
                icon: <Material name="face-profile" size={20} style={{ color: "#908073", fontSize: 25 }} />,
                name: this.props.str.profile,
                route: 'MyProfile'
            },
            {
                icon: <MaterialIcons name="payment" size={20} style={{ color: "#908073", fontSize: 25 }} />,
                name: this.props.str.mypayment,
                route: 'MyPayments'
            },
            {
                icon: <MaterialIcons name="favorite" size={20} style={{ color: "#908073", fontSize: 25 }} />,
                name: this.props.str.myfavorites
            },
            {
                icon: <Material name="email" size={20} style={{ color: "#908073", fontSize: 25 }} />,
                name: this.props.str.mailbox,
                // route:"mailBox"
            },
            {
                icon: <AntDesign name="team" size={20} style={{ color: "#908073", fontSize: 25 }} />,
                name: this.props.str.investwithus,
                route: "investWithUs"

            },
            {
                icon: <Material name="web" size={20} style={{ color: "#908073", fontSize: 25 }} />,
                name: this.props.str.promoteoursite,
            },

            {
                icon: <Entypo name="slideshare" size={20} style={{ color: "#908073", fontSize: 25 }} />,
                name: this.props.str.promotemyads,
                route: 'PromoteAds'

            },
            {
                icon: <Entypo name="slideshare" size={20} style={{ color: "#908073", fontSize: 25 }} />,
                name: this.props.str.about,
                route: 'myBlogs'


            }, {
                icon: <Entypo name="log-out" size={20} style={{ color: "#908073", fontSize: 25 }} />,
                name: this.props.str.Logout,
                route: 'Logout'
            },
        ]



        if (this.props.userDetails.user_type === "6") {

            dBodyArr.splice(6, 3);

        }

        if (this.props.userDetails.user_type === "3" || this.props.userDetails.user_type === "5") {
            var projects = {
                icon: <Octicons name="project" size={20} style={{ color: "#908073", fontSize: 19 }} />,
                name: this.props.str.projects,
                route: 'myProjects'
            }
            dBodyArr.splice(2, 0, projects);

        }
        if (this.props.userDetails.user_type === "5") {

            var varificationAndRep = {
                icon: <Octicons name="verified" size={20} style={{ color: "#908073", fontSize: 19 }} />,
                name: this.props.str.varificationAndRep,
            }
            dBodyArr.splice(5, 0, varificationAndRep);
        }
        if (this.props.userDetails.user_type === "5") {
            var varificationAndRep = {
                icon: <Ionicons name="md-photos" size={20} style={{ color: "#908073", fontSize: 19 }} />,
                name: this.props.str.myPhotos,
                route: 'myPhotos'
            }
            dBodyArr.splice(7, 0, varificationAndRep);
        }
        if (this.props.userDetails.user_type === "4") {
            var varificationAndRep = {
                icon: <Ionicons name="md-photos" size={20} style={{ color: "#908073", fontSize: 19 }} />,
                name: this.props.str.myPhotos,
                route: 'myPhotos'
            }
            dBodyArr.splice(5, 0, varificationAndRep);
        }

        this.setState({
            dBody: dBodyArr
        }, () => {
            console.log(this.state.dBody, "updatelogout")
        })
        // alert("all")
    }
    nestedOpt = (options, route, param) => {
        // alert("work")
        if (route && route !== "MyProfile" && route !== "Logout") {
            Actions[route](param)
        }
        else if (route && route === "Logout") {
            this.Logout()
        }
        else if (route && route === "MyProfile") {
            // alert("kia bat hai")
            Actions.tabbar({ type: "reset" });
            Actions.myaccount();
        }

        if (this.state.nestedOpt === options) {
            this.setState({
                nestedOpt: ""
            })
        }
        else {
            this.setState({
                nestedOpt: options
            })
        }

    }

    nestedBody = (nestedName, nextRout) => {

        // alert("abbu"+nextRout)


        return nestedName.map((value, index) => {
            return (
                <TouchableOpacity
                    onPress={() => {
                        Actions[nextRout[index]]()
                    }}
                    style={[styles.TouchableMain, { flexDirection: this.props.str.language === "en" ? "row" : "row-reverse", }]}
                    // style={styles.TouchableMain} 
                    key={index}>
                    <View style={styles.icon}>
                    </View>
                    <View style={[styles.text, {}]} >
                        <Animatable.Text animation="flipInX" duration={500} direction="normal" style={[styles.insideText, { color: "#f27500", fontSize: 15, right: this.props.str.language === "en" ? null : "10%" }]}>
                            {value}
                        </Animatable.Text>
                    </View>
                </TouchableOpacity>
            )
        })
    }
    Logout() {
        // this.props.hideTaber()

        var options = {
            method: 'POST',
            url: 'https://demo.akaratmisr.com:443/en/api/people/user/logout',
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
            // data: bodyFormData
        };
        console.log('****61');
        axios(options)
            .then((data) => {
                // console.log(data, "data")
                // alert(JSON.stringify(data.data.message))
                let keys = ['userHave', 'userDetails'];
                AsyncStorage.multiRemove(keys, (err) => {
                    // console.log(keys, err, "errors")
                    // keys k1 & k2 removed, if they existed
                    // do most stuff after removal (if you want)
                });
                this.props.hideTaber()

            }).catch((err) => {
                alert(JSON.stringify(err.response.data.message))
                console.log(JSON.parse(JSON.stringify(err)), 'ERRROR')
            })
    }
    render() {
        console.log("user type", this.props.userDetails)
        nestedProperties = ["Properties i added", "My buy requests"]
        nestedTasks = ["Tasks", "Tasks2"]
        obj = [{ name: "Properties", icon: "home", iconLib: "Material" },]
        let body = this.state.dBody
        let arrForRep = [this.props.str.myInbox, this.props.str.myOutBox, this.props.str.createMessage,]
        let arrForRepRoute = ["MyInbox", "outbox", "createMessage"]
        if (this.props.userDetails.user_type === "5") {
            arrForRep.splice(1, 0, this.props.str.inbMesToRep)
            arrForRepRoute.splice(1, 0, "InboxMsgToRep")
        }
        console.log(arrForRep, "bdddd", arrForRepRoute)
        return (
            <View style={{ flex: 3, }}>
                <ScrollView style={{ marginBottom: "3.5%", backgroundColor: "white" }}>
                    {
                        body.map((value, index) => {
                            return (
                                (this.props.userDetails.user_type === "6" &&
                                    (value.name === this.props.str.properties || value.name === this.props.str.about || value.name === this.props.str.Tasks)) ?
                                    (null) : (
                                        (this.props.userDetails.user_type !== "5" && value.name === this.props.str.about) ?
                                            (null) :
                                            (
                                                <View key={index}>
                                                    <TouchableOpacity
                                                        activeOpacity={0.8}
                                                        onPress={() => this.nestedOpt(value.name, value.route)}
                                                        style={[styles.TouchableMain, { flexDirection: this.props.str.language === "en" ? "row" : "row-reverse", }]}
                                                    // style=[styles.base, {backgroundColor: 'red'}]
                                                    >


                                                        <View style={[styles.icon, { flex: 1.8 }]}>
                                                            {value.icon}
                                                        </View>
                                                        <View style={styles.text}>
                                                            <Text style={styles.insideText}>{value.name}</Text>
                                                        </View>
                                                        <View style={[styles.text, { flex: 1.5 }]}>
                                                            {(
                                                                value.name === this.props.str.properties
                                                                || value.name === this.props.str.Tasks || value.name === this.props.str.myfavorites
                                                                || value.name === this.props.str.promoteoursite || value.name === this.props.str.mailbox
                                                                || value.name === this.props.str.varificationAndRep
                                                            ) ? (
                                                                    (this.state.nestedOpt === value.name) ? (
                                                                        <AntDesign name="down" size={20} style={{ color: "#908073", fontSize: 17 }} />
                                                                    ) : (
                                                                            <AntDesign name="right" size={20} style={{ color: "#908073", fontSize: 17 }} />
                                                                        )
                                                                ) :
                                                                (null)
                                                            }
                                                        </View>

                                                    </TouchableOpacity>
                                                    {
                                                        (this.state.nestedOpt === value.name && index === 0 && this.props.userDetails.user_type === "5") ? (
                                                            this.nestedBody([this.props.str.propertiesiadded, this.props.str.mybuyrequests, this.props.str.PendingProperties, this.props.str.allpropertiesInMyCity, this.props.str.allrequestInMyCity], ["PropertiesIAdded", "MyBuyRequests", "pendingProperties", "allPropertiesInMyCity", "allRequestInCity"])
                                                        ) : (
                                                                (this.state.nestedOpt === value.name && index === 0) ?
                                                                    this.nestedBody([this.props.str.propertiesiadded, this.props.str.mybuyrequests], ["PropertiesIAdded", "MyBuyRequests"])
                                                                    : (null)
                                                            )
                                                    }
                                                    {
                                                        (this.props.userDetails.user_type === "4") ?
                                                            (
                                                                (this.state.nestedOpt === value.name && index === 1) ? (
                                                                    this.nestedBody([this.props.str.myrequiredtasks, this.props.str.allTaskInState, this.props.str.myPreviousTasks, this.props.str.tasksIappliedFor, this.props.str.taskIWorkOnThem], ["myRequiredTask", "allTaskInMyState", "myPreviousTask", "TaskIAppliedFor", "taskIWorkOnThem"])
                                                                ) : (
                                                                        null
                                                                    )
                                                            ) :
                                                            (
                                                                (this.props.userDetails.user_type === "5") ?
                                                                    (
                                                                        (this.state.nestedOpt === value.name && index === 1) ? (
                                                                            this.nestedBody([this.props.str.myrequiredtasks, this.props.str.allTaskInMyCity], ["myRequiredTask", "AllTaskInMyCity"])
                                                                        ) : (
                                                                                null
                                                                            )
                                                                    ) :


                                                                    (this.state.nestedOpt === value.name && index === 1) ? (
                                                                        this.nestedBody([this.props.str.myrequiredtasks], ["myRequiredTask",])
                                                                    ) : (
                                                                            null
                                                                        )
                                                            )
                                                    }

                                                    {/* {(this.state.nestedOpt === value.name && index === 1) ? (
                                    this.nestedBody([this.props.str.myrequiredtasks], ["myRequiredTask",])
                                ) : (
                                        null
                                    )} */}


                                                    {
                                                        (this.state.nestedOpt === value.name && (this.props.userDetails.user_type === "3" ? index === 5 : (this.props.userDetails.user_type === "5") ? (index === 6) : index === 4)) ? (
                                                            this.nestedBody([this.props.str.properties, this.props.str.agent, this.props.str.Tasker, this.props.str.internationalpartner, this.props.str.representative, this.props.str.Tasks, this.props.str.request,], ["propertiesFavorite", "agentFavorites", "taskerFavorites", "intPartFavorites", "representativeFavorites", "tasksFavorites", "requestsFavorites",])//"searchesSave"])
                                                        ) : (
                                                                null
                                                            )
                                                    }

                                                    {
                                                        (this.props.userDetails.user_type === "5") ?
                                                            (
                                                                (this.state.nestedOpt === value.name && index === 5) ? (
                                                                    this.nestedBody([this.props.str.agents, this.props.str.Tasker, this.props.str.Tasks, this.props.str.properties, this.props.str.projects], ["Agents", "TaskersInCity", "Tasks", "Properties", "Projects"])
                                                                ) : (
                                                                        null
                                                                    )
                                                            ) :
                                                            null
                                                    }



                                                    {
                                                        (this.state.nestedOpt === value.name && (this.props.userDetails.user_type === "3" ? index === 6 : (this.props.userDetails.user_type === "5") ? (index === 8) : this.props.userDetails.user_type === "4" ? (null) : index === 5)) ? (
                                                            this.nestedBody(arrForRep, arrForRepRoute)
                                                        ) : (
                                                                null
                                                            )
                                                    }

                                                    {
                                                        (this.state.nestedOpt === value.name && this.props.userDetails.user_type === "4" && index === 6) ? (
                                                            this.nestedBody([this.props.str.myInbox, this.props.str.myOutBox, this.props.str.createMessage,], ["MyInbox", "outbox", "createMessage"])
                                                        ) : (
                                                                null
                                                            )
                                                    }


                                                    {
                                                        (value.route !== "Logout" && this.state.nestedOpt === value.name && (this.props.userDetails.user_type === "3" ? index === 8 : (this.props.userDetails.user_type === "5") ? (index === 10) : this.props.userDetails.user_type === "4" ? null : index === 7)) ? (
                                                            this.nestedBody([this.props.str.myaffiliateprogrammarketing, this.props.str.mycouponsactivities, this.props.str.ourNetwork, this.props.str.beourserviceprovider, this.props.str.contact], ['PromoteOurSite', 'Register', 'OurNetwork', 'beourserviceprovider', "contact"])
                                                        ) : (
                                                                null
                                                            )
                                                    }

                                                    {
                                                        (value.route !== "Logout" && this.state.nestedOpt === value.name && this.props.userDetails.user_type === "4" && index === 8) ? (
                                                            this.nestedBody([this.props.str.myaffiliateprogrammarketing, this.props.str.mycouponsactivities, this.props.str.ourNetwork, this.props.str.beourserviceprovider, this.props.str.contact], ['PromoteOurSite', 'Register', 'OurNetwork', 'beourserviceprovider', "contact"])
                                                        ) : (
                                                                null
                                                            )
                                                    }

                                                    {/* {(this.state.nestedOpt === value.name && (this.props.userDetails.user_type === "3" ? index === 10 : (this.props.userDetails.user_type === "5") ? (index === 12) : this.props.userDetails.user_type === "4" ? null : index === 9)) ? (
                                                        this.nestedBody([this.props.str.addblog, this.props.str.blogs])
                                                    ) : (
                                                            null
                                                        )} */}

                                                </View>
                                            )

                                    )

                            )
                        })
                    }
                </ScrollView>
            </View >
        );
    }
}



function mapStateToProp(state) {
    return ({
        str: state.root.str,
        userDetails: state.root.userDetails,
        userCredentials: state.root.userCredentials,

    })
}
function mapDispatchToProp(dispatch) {
    return ({
        hideTaber: () => {
            dispatch(hideTaber());
        },
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(accDraBody);
const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF',
    },
    TouchableMain: {
        // flexDirection: this.props.str.language === "en" ? "row" : "row-reverse",
        // marginTop: 10, 
        flex: 1,
        // marginLeft: 5, 
        width: '100%',
        paddingTop: 10,
        paddingLeft: 5,
    },
    icon: {
        flex: 1.5, justifyContent: "center", alignItems: "center",
    },
    text: {
        justifyContent: "center", marginLeft: 3, flex: 9,
    },
    insideText: {
        color: "#908073", fontSize: 17,
    },
})