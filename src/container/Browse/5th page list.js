
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Picker, Image, SafeAreaView, ActivityIndicator, images, Dimensions, Share } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Item, Fab, Input } from 'native-base';
import { connect } from "react-redux";
import IconFontEntypo from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import MultiSelect from 'react-native-multiple-select';
import ImageSlider from 'react-native-image-slider';
import Communications from 'react-native-communications';
import IconFontIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import SendEmail from '../../Component/sendEmail';
import Modal from "react-native-modal";
import Textarea from 'react-native-textarea';
import axios from 'axios';
import Drawer from '../../Component/drawer';
import SendMsgToTasker from '../../Component/sendMsgToTasker';
import MapDirection from '../../Component/map'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import WebView from '../../Component/WebView'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class FithPageList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // isModalVisible: false,
            emailSendingFlag: false,
            chatButtonLoading: false,
            location: null,
            errorMessage: null,
        }
    }
    componentWillMount() {
        this.setState({
            token: this.props.userCredentials.token,
        })

        if (this.props.propertyData || this.props.agentanddevelopers || this.props.representativeData || this.props.newsData || this.props.requestData) {
            if (this.props.propertyData) {
                console.log(this.props.propertyData, "123456")
                this.setState({
                    propertyId: this.props.propertyData.id,
                    addId: this.props.propertyData.unique_id,
                    coords: {
                        latitude: this.props.propertyData.latitude,
                        longitude: this.props.propertyData.longitude
                    }
                })
            }
            if (this.props.agentanddevelopers) {
                this.setState({
                    addId: this.props.agentanddevelopers.id
                })
            }
            if (this.props.representativeData) {
                this.setState({
                    addId: this.props.representativeData.id
                })
            }
            if (this.props.requestData) {
                console.log(this.props.requestData, "requestDataaa")
                this.setState({
                    addId: this.props.requestData.id
                })
            }

            this.userDetailsGet(this)
            this.getOwnerProperties(this)
        }
        // if (this.props.agentanddevelopers) {
        //     // console.log()
        //     // this.setState({
        //     //     ownerId: this.props.propertyData.created_by
        //     // })
        // }

        var { height, width } = Dimensions.get('window');
        this.setState({
            screenHeight: height,
        })

    }

    animateParent(fals) {
        setTimeout(() => {
            this.setState({
                drawer: false
            })
        }, 250);
    }

    //for userdetails get
    userDetailsGet() {
        this.setState({
            chatButtonLoading: !this.state.chatButtonLoading
        })
        let created_by;
        if (this.props.propertyData) {
            created_by = this.props.propertyData.created_by
        }
        if (this.props.agentanddevelopers) {
            created_by = this.props.agentanddevelopers.id

        }
        if (this.props.representativeData) {
            created_by = this.props.representativeData.id
        }
        if (this.props.newsData) {
            created_by = this.props.newsData.created_by
        }

        // console.log(created_by, "created_by")
        let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/guest/getUserDetail/" + created_by
        return axios({
            method: 'get',
            url: uri,
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                console.log(data.data.results, "responseCsreated_by");
                this.setState({
                    userDetails: data.data.results,
                    chatButtonLoading: !this.state.chatButtonLoading
                })

            })
            .catch(err => {
                console.log(err)
                alert(err.message)
                this.setState({
                    err: err.message,
                    chatButtonLoading: !this.state.chatButtonLoading

                })
            })
    }

    // getting all properties add owner
    getOwnerProperties() {
        let created_by;
        if (this.props.propertyData) {
            created_by = this.props.propertyData.created_by
            this.setState({
                created_by: this.props.propertyData.created_by
            })
        }
        if (this.props.agentanddevelopers) {
            created_by = this.props.agentanddevelopers.id
            this.setState({
                created_by: this.props.agentanddevelopers.id
            })
        }
        if (this.props.representativeData) {
            created_by = this.props.representativeData.id
            this.setState({
                created_by: this.props.representativeData.id
            })
        }
        // console.log(created_by, "created_byOwnerFunction")
        let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/property/guest/getPropertiesPostedByUSerId/" + created_by + "/25/0"
        return axios({
            method: 'get',
            url: uri,
            headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
        })
            .then(data => {
                console.log(data.data.results, "OwnerAllproperties");
                this.setState({
                    ownerProperties: data.data.results,
                })
            })
            .catch(err => {
                console.log(err)
                alert(err.message)
                this.setState({
                    err: err.message,

                })
            })

    }

    emailSending() {
        this.setState({
            emailSendingFlag: !this.state.emailSendingFlag
        })
    }

    addToFav() {
        let urlm = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/favorite/user/addFavorite";
        var bodyFormData = new FormData();

        if (this.props.propertyData) {
            bodyFormData.append("type_favorite", "property");
            bodyFormData.append("favorite_id", this.props.propertyData.id);
        }

        if (this.props.agentanddevelopers) {
            bodyFormData.append("type_favorite", "agent");
            bodyFormData.append("favorite_id", this.props.agentanddevelopers.id);
        }
        if (this.props.representativeData) {
            bodyFormData.append("type_favorite", "representative");
            bodyFormData.append("favorite_id", this.props.representativeData.id);
        }
        if (this.props.requestData) {
            bodyFormData.append("type_favorite", "request");
            bodyFormData.append("favorite_id", this.props.requestData.id);
        }

        return axios({
            method: "post",
            url: urlm,
            headers: {
                token: "bearer " + this.state.token,
                'postman-token': '553d07fc-3950-1199-efd9-6b5b5f8315a2',
                'cache-control': 'no-cache',
                clientsecret: '(*jh2kj36gjhasdi78743982u432j',
                clientkey: '34532hbjdsakjd2&&gjhjh11',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                "Allow-Cross-Origin": '*',
            },
            data: bodyFormData
        })
            .then(data => {
                console.log(data.data.message);
                // alert(JSON.stringify(data.data.message))
                alert(data.data.message)

            })
            .catch(err => {
                var errUpdate = JSON.stringify(err);
                console.log(JSON.parse(errUpdate));
                // alert(JSON.stringify(err.response.data.message))
                alert(err.response.data.message)

            });
    }



    onShare = () => {
        try {
            if (this.props.propertyData) {
                console.log(this.props.propertyData.url_property, "onshare")
                const result = Share.share({
                    message: this.props.propertyData.url_property,
                })
            }
            if (this.props.agentanddevelopers) {
                console.log(this.props.agentanddevelopers.user_url, "onshare")
                const result = Share.share({
                    message: this.props.agentanddevelopers.user_url,
                })
            }
            if (this.props.representativeData) {
                console.log(this.props.representativeData.user_url, "onshare")
                const result = Share.share({
                    message: this.props.representativeData.user_url,
                })
            }
            if (this.props.newsData) {
                console.log(this.props.newsData.blog_url, "onshare")
                const result = Share.share({
                    message: this.props.newsData.blog_url,
                })
            }
            else {
                const result = Share.share({
                    message: 'React Native | A framework for building native apps using React',
                })
            }

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    location = (marker) => {
        this.setState({
            latitude: marker.latitude,
            longitude: marker.longitude,
        })

    }

    render() {
        // console.log(this.props.propertyData, "this.props.propertyDatathis.props.propertyData")
        return (
            <View style={{
                flex: 1,
                backgroundColor: "white"
            }}>
                {/* drawer*/}
                {(this.state.drawer === true) ? (
                    <Drawer
                        animationStyle="fadeInLeftBig"
                        routName="Properties"
                        propertyId={this.props.propertyData ? this.props.propertyData.id : null}
                        animateParent={this.animateParent.bind(this)}
                        ownerDetails={this.state.userDetails}
                        ownerProperties={this.state.ownerProperties}
                        created_by={this.state.created_by}
                    />

                ) : (
                        null
                    )}
                {/* drawer*/}


                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: "center",
                    backgroundColor: "white"
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
                            style={{ position: "absolute", height: this.state.screenHeight, width: "20%", right: 0, zIndex: 1 }}>
                        </TouchableOpacity>
                    ) : (null)}
                    {/* this view for closing drawer  */}


                    {/* /////////////////////////////header///////////////////////////// */}
                    <View style={{
                        flex: 1.18,
                        backgroundColor: '#E94E1B',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: "row",
                        width: "100%"
                    }}>

                        <View style={{ width: "90%", flexDirection: "row", marginTop: "7%" }}>
                            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => { Actions.pop() }}>
                                <IconFontIonicons name='md-arrow-back' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                            </TouchableOpacity>
                            {
                                (this.props.propertyData || this.props.agentanddevelopers || this.props.representativeData) ? (
                                    <View style={{ flexDirection: "row" }} >
                                        <TouchableOpacity style={{ marginRight: 20 }}
                                            onPress={() => this.setState({ drawer: !this.state.drawer })}>
                                            <Entypo name='menu' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                                        </TouchableOpacity>
                                        {
                                            (this.props.propertyData) ? (
                                                <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.propertyData.type_format.toUpperCase()}</Text>
                                            ) : null

                                        }

                                        {
                                            (this.props.agentanddevelopers) ? (
                                                <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.agent}</Text>
                                            ) : null

                                        }

                                    </View>
                                ) : null
                            }
                            {
                                (this.props.representativeData) ? (
                                    <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.representative}</Text>
                                ) : null
                            }
                            {
                                (this.props.requestData) ? (
                                    <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.requestData.type_format + " " + this.props.str.request}</Text>
                                ) : null
                            }
                        </View>
                    </View>



                    {
                        (this.props.propertyData) ? (
                            <View style={{ flex: 8, width: "100%", }}>
                                <SendEmail modalOpen={this.state.emailSendingFlag} addId={this.state.addId} emailSending={() => this.emailSending()} />

                                <View style={{ flex: 0.4 }}>

                                    {
                                        (this.props.propertyData.gallery_src.length != 0) ? (
                                            <SafeAreaView style={styles.container}>

                                                <ImageSlider
                                                    // loopBothSides
                                                    autoPlayWithInterval={8000}
                                                    images={this.props.propertyData.gallery_src}
                                                    customSlide={({ index, item, style, width }) => (
                                                        // It's important to put style here because it's got offset inside
                                                        <View key={index} style={[style, styles.customSlide]}>
                                                            <Image resizeMode={"cover"} source={{ uri: item }} style={styles.customImage} />

                                                            <View style={{
                                                                flex: 1, flexDirection: 'row', top: -41, marginLeft: "80%",
                                                                alignItems: 'center', justifyContent: 'flex-end', position: 'relative',
                                                            }}>
                                                                <TouchableOpacity style={{
                                                                    height: 40, width: 40, borderColor: '#fce5c8',
                                                                    borderWidth: 1, borderRadius: 5, marginRight: 0,
                                                                    justifyContent: 'center', alignItems: 'center', backgroundColor: '#E94E1B'
                                                                }}
                                                                    onPress={this.addToFav.bind(this)}

                                                                >
                                                                    <Icon name='heart' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    )} />


                                            </SafeAreaView>
                                        ) :
                                            <SafeAreaView style={styles.container}>
                                                <View style={styles.customSlide}>
                                                    <Image resizeMode="stretch" source={{ uri: this.props.propertyData.featured_image_src }} style={styles.customImage} />
                                                </View>
                                                <View style={{
                                                    flex: 1, flexDirection: 'row', top: -41, marginRight: 20,
                                                    alignItems: 'center', justifyContent: 'flex-end', position: 'relative',
                                                }}>
                                                    <TouchableOpacity style={{
                                                        height: 40, width: 40, borderColor: '#fce5c8',
                                                        borderWidth: 1, borderRadius: 5, marginRight: 0,
                                                        justifyContent: 'center', alignItems: 'center', backgroundColor: '#E94E1B'
                                                    }}
                                                        onPress={this.addToFav.bind(this)}

                                                    >
                                                        <Icon name='heart' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                                                    </TouchableOpacity>
                                                </View>
                                            </SafeAreaView>
                                    }


                                </View>


                                <View style={{ flex: 0.6, marginTop: 10, width: "100%", alignItems: "center", }} >
                                    <ScrollView contentContainerStyle={styles.contentContainer} style={{ width: "95%", }}>

                                        {/* price and title */}

                                        <View style={{ flex: 1, flexDirection: "row", height: 55, borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10, marginBottom: 15 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.price}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.propertyData.price_fomat + " \n" + (this.props.propertyData.price_negotiable == 0 ? this.props.str.pricenotnegotiable : this.props.str.pricenegotiable)} </Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10, marginBottom: 15 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.title}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 10, marginBottom: 15 }} >{this.props.propertyData.title} </Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* area and status */}
                                        {/* 
                                        <View style={{ flex: 1, flexDirection: "row", height: 40, borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.type}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.propertyData.type_format}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.perpose}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.propertyData.purpose_format}</Text>
                                                </View>
                                            </View>
                                        </View>
                                       */}
                                        {/* type and perpose */}

                                        <View style={{ flex: 1, flexDirection: "row", height: 40, borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.type}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.propertyData.type_format}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.perpose}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.propertyData.purpose_format}</Text>
                                                </View>
                                            </View>
                                        </View>


                                        {/* bedroom and bathroom */}

                                        <View style={{ flex: 1, flexDirection: "row", height: 40, borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.bedrooms}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.propertyData.bedroom}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.bathrooms}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.propertyData.bath}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* Size */}

                                        <View style={{ flex: 1, flexDirection: "row", height: 40, borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >

                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.floor}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.propertyData.floor}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.status}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.propertyData.estate_condition_format}</Text>
                                                </View>
                                            </View>

                                        </View>

                                        {/* subtitle and area */}

                                        <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10, marginBottom: 15 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.suitablecategories}</Text>
                                                    {/* <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.propertyData.suitable_categories || "n/a"}</Text> */}
                                                    {
                                                        (this.props.propertyData.suitable_categories_format && this.props.propertyData.suitable_categories_format.length) ? (
                                                            this.props.propertyData.suitable_categories_format.map((value, index) => {
                                                                return (
                                                                    // console.log(value, "value")
                                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{value + " , "}</Text>
                                                                )
                                                            })
                                                        ) :
                                                            <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >N/a</Text>
                                                        // null
                                                    }
                                                </View>
                                            </View>


                                            <TouchableOpacity style={{ flex: 0.5, }}
                                                onPress={() => Communications.phonecall(this.props.propertyData.phone, true)}
                                            >
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.makephonecall}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.propertyData.phone}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>


                                        {/* Description */}

                                        <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 1, }}>
                                                <View style={{ marginLeft: 10, marginBottom: 15 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.description}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12, }} >{this.props.propertyData.description}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* delivery date */}

                                        <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, marginBottom: 15 }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.location}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 10 }} >{this.props.propertyData.city_format}, {this.props.propertyData.state_format}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 0.5, marginBottom: 15 }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.deliverydateofthepro}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 10 }} >{this.props.propertyData.deliverydate}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* View and id */}

                                        <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, marginBottom: 15 }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.generalamenities}</Text>
                                                    {
                                                        (this.props.propertyData.general_amenities && this.props.propertyData.general_amenities.length) ? (
                                                            this.props.propertyData.general_amenities.map((value, index) => {
                                                                return (
                                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{value.title + " , "}</Text>
                                                                )
                                                            })
                                                        ) :
                                                            <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >N/a</Text>
                                                    }
                                                </View>
                                            </View>
                                            <View style={{ flex: 0.5, marginBottom: 15 }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.id}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.propertyData.id}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, height: 40, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <TouchableOpacity style={{ flex: 1, marginBottom: 15, }}
                                                onPress={() => {
                                                    Actions.distanceInformation({
                                                        distanceInformation: this.props.propertyData.distance_info,
                                                    })
                                                }}
                                            >
                                                <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12, marginLeft: 10 }} >{this.props.str.distanceinformation}</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, height: 40, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <TouchableOpacity style={{ flex: 1, marginBottom: 15, }}
                                                onPress={() => {
                                                    Actions.googlemapfullview({
                                                        sendLocation: this.state.coords,
                                                    })
                                                }}>
                                                <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12, marginLeft: 10 }} >{this.props.str.clicktolocation}</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, height: 40, borderBottomColor: "#BEBCBC", marginTop: 15 }}>
                                            <TouchableOpacity style={{ flex: 1, marginBottom: 15, }} onPress={() => {
                                                Actions.WebView({
                                                    url: `https://demo.akaratmisr.com/en/show/commentspost/${this.props.propertyData.id}`,
                                                    title: 'comments'
                                                })
                                            }}>
                                                <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12, marginLeft: 10 }}>

                                                    {
                                                        this.props.str.clickToView
                                                    }
                                                </Text>
                                            </TouchableOpacity>
                                            {/* <WebView
                                                url={`https://demo.akaratmisr.com/en/show/commentspost/285024`}
                                                title={'Comments'}
                                            /> */}
                                        </View>

                                    </ScrollView>
                                    <Fab
                                        containerStyle={{ padding: 10 }}
                                        active={this.state.active}
                                        direction="up"
                                        containerStyle={{ marginLeft: 10 }}
                                        style={{ backgroundColor: '#E94E1B' }}
                                        // position="bottomRight"
                                        // position="bottomLeft"
                                        position={this.props.str.language == "ar" ? "bottomLeft" : "bottomRight"}
                                        onPress={() => Communications.phonecall(this.props.propertyData.phone, true)}
                                    >
                                        <Icon name="md-call" />
                                        {
                                            // console.log(this.props.userDetails,this.state.userDetails )
                                            (this.props.userDetails.user_email != "" && this.state.userDetails && this.state.userDetails.user_email != "") ? (
                                                <Button
                                                    style={{ backgroundColor: '#3B5998', }}
                                                    onPress={() => this.emailSending()}
                                                >
                                                    <Icon name="mail" />
                                                </Button>
                                            ) :
                                                (this.state.chatButtonLoading === true) ? (
                                                    <Button
                                                        style={{ backgroundColor: '#3B5998', }}
                                                    // onPress={() => this.emailSending()}
                                                    >
                                                        <ActivityIndicator size="small" />
                                                    </Button>
                                                ) : null
                                        }
                                        <Button
                                            style={{ backgroundColor: '#3B5998', }}
                                            onPress={this.onShare}
                                        >
                                            <Entypo name='share' style={{ fontSize: 19, color: "white" }} />
                                        </Button>
                                    </Fab>
                                </View>
                            </View>
                        ) : null

                        //  <View style={{
                        //     flex: 8, width: "100%",
                        //     justifyContent: 'center',
                        //     alignItems: "center",
                        //     marginBottom: 20,
                        //     marginTop: 20,
                        // }}>
                        //         <ActivityIndicator size="large" color="#E94E1B" />
                        //         {
                        //             (this.state.err) ?
                        //                 (
                        //                     <Text style={{ marginTop: 10 }}>{this.state.err}</Text>
                        //                 ) : <Text style={{ marginTop: 10 }} >Loading....</Text>
                        //         }
                        //     </View>
                    }
                    {
                        (this.props.requestData) ? (
                            <View style={{ flex: 8, width: "100%", }}>
                                <SendEmail modalOpen={this.state.emailSendingFlag} addId={this.state.addId} requestData={this.props.requestData} emailSending={() => this.emailSending()} />
                                <View style={{ flex: 1, marginTop: 10, width: "100%", alignItems: "center", }} >
                                    <ScrollView contentContainerStyle={styles.contentContainer} style={{ width: "95%", }}>
                                        {/* name and published on */}

                                        <View style={{ flex: 1, flexDirection: "row", height: 40, borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.name}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.requestData.created_by_name}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.publishedon}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.requestData.create_time}</Text>
                                                </View>
                                            </View>
                                        </View>


                                        {/* price and title */}
                                        <View style={{ flex: 1, flexDirection: "row", height: 55, borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10, marginBottom: 15 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.price}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.requestData.price_max_formar} </Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10, marginBottom: 15 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.title}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 10, marginBottom: 15 }} >{this.props.requestData.title} </Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* type and perpose */}

                                        <View style={{ flex: 1, flexDirection: "row", height: 40, borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.type}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.requestData.type_format}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.perpose}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.requestData.purpose_format}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* description */}

                                        <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 1, }}>
                                                <View style={{ marginLeft: 10, marginBottom: 15 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.description}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12, }} >{this.props.requestData.description}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* state and city and id */}

                                        <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, marginBottom: 15 }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.location}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 10 }} >{this.props.requestData.city_format}, {this.props.requestData.state_format}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 0.5, marginBottom: 15 }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.id}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.requestData.id}</Text>
                                                </View>
                                            </View>
                                        </View>

                                    </ScrollView>


                                    <Fab
                                        containerStyle={{ padding: 10 }}
                                        active={this.state.active}
                                        direction="up"
                                        containerStyle={{ marginLeft: 10 }}
                                        style={{ backgroundColor: '#E94E1B' }}
                                        // position="bottomRight"
                                        position={this.props.str.language == "ar" ? "bottomLeft" : "bottomRight"}

                                        onPress={() => this.emailSending()}
                                    >
                                        <Icon name="mail" />
                                        <Button
                                            style={{ backgroundColor: '#3B5998', }}
                                            // onPress={() => this.emailSending()}
                                            onPress={this.addToFav.bind(this)}

                                        >
                                            {/* <Icon name="mail" /> */}
                                            <Icon name='heart' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />

                                        </Button>


                                    </Fab>
                                </View>
                            </View>
                        ) : null

                    }


                    {/* ****************************************Agent or developers**************************************** */}

                    {
                        (this.props.agentanddevelopers) ? (
                            <View style={{ flex: 8, width: "100%", }}>
                                <SendMsgToTasker modalOpen={this.state.emailSendingFlag} agentanddevelopers={this.props.agentanddevelopers} emailSending={() => this.emailSending()} />
                                <View style={{ flex: 0.4 }}>
                                    {
                                        (this.props.agentanddevelopers.gallery.length != 0) ? (
                                            <SafeAreaView style={styles.container}>
                                                <ImageSlider
                                                    // loopBothSides
                                                    autoPlayWithInterval={8000} images={this.props.agentanddevelopers.gallery} customSlide={({ index, item, style, width }) => (
                                                        // It's important to put style here because it's got offset inside
                                                        <View key={index} style={[style, styles.customSlide]}>
                                                            <Image resizeMode={"cover"} source={{ uri: item }} style={styles.customImage} />
                                                            <View style={{
                                                                flex: 1, flexDirection: 'row', top: -41, marginLeft: "80%",
                                                                alignItems: 'center', justifyContent: 'flex-end', position: 'relative',
                                                            }}>
                                                                <TouchableOpacity style={{
                                                                    height: 40, width: 40, borderColor: '#fce5c8',
                                                                    borderWidth: 1, borderRadius: 5, marginRight: 0,
                                                                    justifyContent: 'center', alignItems: 'center', backgroundColor: '#E94E1B'
                                                                }}
                                                                    onPress={this.addToFav.bind(this)}

                                                                >
                                                                    <Icon name='heart' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                                                                </TouchableOpacity>
                                                            </View>


                                                        </View>
                                                    )} />
                                            </SafeAreaView>
                                        ) :
                                            <SafeAreaView style={styles.container}>
                                                <View style={styles.customSlide}>
                                                    <Image resizeMode="stretch" source={{ uri: this.props.agentanddevelopers.avatar_photo }} style={styles.customImage} />
                                                </View>
                                                <View style={{
                                                    flex: 1, flexDirection: 'row', top: -41, marginRight: 20,
                                                    alignItems: 'center', justifyContent: 'flex-end', position: 'relative',
                                                }}>
                                                    <TouchableOpacity style={{
                                                        height: 40, width: 40, borderColor: '#fce5c8',
                                                        borderWidth: 1, borderRadius: 5, marginRight: 0,
                                                        justifyContent: 'center', alignItems: 'center', backgroundColor: '#E94E1B'
                                                    }}
                                                        onPress={this.addToFav.bind(this)}

                                                    >
                                                        <Icon name='heart' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                                                    </TouchableOpacity>
                                                </View>
                                            </SafeAreaView>
                                    }
                                </View>


                                <View style={{ flex: 0.6, marginTop: 10, width: "100%", alignItems: "center", }} >
                                    <ScrollView contentContainerStyle={styles.contentContainer} style={{ width: "95%", }}>

                                        {/* Name and address */}

                                        <View style={{ flex: 1, flexDirection: "row", height: 45, borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.name}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12, marginBottom: 10 }} >{this.props.agentanddevelopers.full_name}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12, }} >{this.props.str.address}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 10, marginBottom: 10 }} >{this.props.agentanddevelopers.address}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* Location and makecall*/}

                                        <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.location}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 10, marginBottom: 10 }} >{this.props.agentanddevelopers.city}, {this.props.agentanddevelopers.state}</Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity style={{ flex: 0.5, }}
                                                onPress={() => Communications.phonecall(this.props.agentanddevelopers.contact_phone, true)}
                                            >
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.makephonecall}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12, marginBottom: 10 }} >{this.props.agentanddevelopers.contact_phone}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            {/* <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10, marginBottom: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.icanwork}</Text>
                                                    {
                                                        (this.props.agentanddevelopers.workin_city_format != undefined && this.props.agentanddevelopers.workin_city_format === Array) ? (
                                                            this.props.agentanddevelopers.workin_city_format.map((value, index) => {
                                                                return (
                                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{value},</Text>
                                                                )
                                                            })
                                                        ) :
                                                            <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.agentanddevelopers.workin_city_format},</Text>
                                                    }
                                                </View>
                                            </View> */}

                                            <View style={{ flex: 1, }}>
                                                <View style={{ marginLeft: 10, marginBottom: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.aboutme}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.agentanddevelopers.about_me},</Text>

                                                    {/* {
                                                    (this.props.taskerData.type_tasker != undefined && this.props.taskerData.type_tasker === Array) ? (
                                                        this.props.taskerData.type_tasker.map((value, index) => {
                                                            console.log(value, index, "html")
                                                            return (
                                                                <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{value},</Text>
                                                            )
                                                        })
                                                    ) :
                                                        <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.taskerData.type_tasker},</Text>
                                                } */}
                                                </View>
                                            </View>
                                        </View>

                                        {/* View and id */}

                                        <View style={{ flex: 1, flexDirection: "row", height: 40, borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10, marginBottom: 15 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.id}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.agentanddevelopers.id}</Text>
                                                </View>
                                            </View>
                                            {/* <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.views}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >3</Text>
                                                </View>
                                            </View> */}
                                        </View>

                                    </ScrollView>
                                    <Fab
                                        active={this.state.active}
                                        direction="up"
                                        containerStyle={{ marginLeft: 10 }}
                                        style={{ backgroundColor: '#E94E1B' }}
                                        // position="bottomRight"
                                        position={this.props.str.language == "ar" ? "bottomLeft" : "bottomRight"}

                                        onPress={() => Communications.phonecall(this.props.agentanddevelopers.contact_phone, true)}
                                    >
                                        <Icon name="md-call" />
                                        {
                                            (this.state.userDetails && this.props.agentanddevelopers.id != "" && this.props.agentanddevelopers.id != "n/a" &&
                                                this.props.agentanddevelopers.full_name != "" && this.props.agentanddevelopers.full_name != "n/a" &&
                                                this.props.agentanddevelopers.user_email != "" && this.props.agentanddevelopers.user_email != "n/a" &&
                                                this.props.agentanddevelopers.contact_phone != "" && this.props.agentanddevelopers.contact_phone != "n/a"
                                            ) ? (
                                                    <Button
                                                        style={{ backgroundColor: '#3B5998', }}
                                                        onPress={() => this.emailSending()}
                                                    >
                                                        <Icon name="mail" />
                                                    </Button>
                                                ) :
                                                (this.state.chatButtonLoading === true) ? (
                                                    <Button
                                                        style={{ backgroundColor: '#3B5998', }}
                                                    // onPress={() => this.emailSending()}
                                                    >
                                                        <ActivityIndicator size="small" />
                                                    </Button>
                                                ) : null
                                        }
                                        <Button
                                            style={{ backgroundColor: '#3B5998', }}
                                            onPress={this.onShare}
                                        >
                                            <Entypo name='share' style={{ fontSize: 19, color: "white" }} />
                                        </Button>
                                        {/* {
                                            (this.props.userDetails.user_email != "" && this.state.userDetails && this.state.userDetails.user_email != "") ? (

                                                <Button
                                                    style={{ backgroundColor: '#3B5998', }}
                                                    onPress={() => this.emailSending()}
                                                >
                                                    <Icon name="mail" />
                                                </Button>
                                            ) :
                                                (this.state.chatButtonLoading === true) ? (
                                                    <Button
                                                        style={{ backgroundColor: '#3B5998', }}
                                                    // onPress={() => this.emailSending()}
                                                    >
                                                        <ActivityIndicator size="small" />
                                                    </Button>
                                                ) : null
                                        } */}
                                    </Fab>
                                </View>
                            </View>
                        ) : null
                    }

                    {/* ****************************************representativeData**************************************** */}
                    {
                        (this.props.representativeData) ? (
                            <View style={{ flex: 8, width: "100%", }}>
                                <SendMsgToTasker modalOpen={this.state.emailSendingFlag} representativeData={this.props.representativeData} emailSending={() => this.emailSending()} />
                                <View style={{ flex: 0.4 }}>
                                    {
                                        (this.props.representativeData.gallery.length != 0) ? (
                                            <SafeAreaView style={styles.container}>
                                                <ImageSlider
                                                    // loopBothSides
                                                    autoPlayWithInterval={8000} images={this.props.representativeData.gallery} customSlide={({ index, item, style, width }) => (
                                                        // It's important to put style here because it's got offset inside
                                                        <View key={index} style={[style, styles.customSlide]}>
                                                            <Image resizeMode={"cover"} source={{ uri: item }} style={styles.customImage} />
                                                            <View style={{
                                                                flex: 1, flexDirection: 'row', top: -41, marginLeft: "80%",
                                                                alignItems: 'center', justifyContent: 'flex-end', position: 'relative',
                                                            }}>
                                                                <TouchableOpacity style={{
                                                                    height: 40, width: 40, borderColor: '#fce5c8',
                                                                    borderWidth: 1, borderRadius: 5, marginRight: 0,
                                                                    justifyContent: 'center', alignItems: 'center', backgroundColor: '#E94E1B'
                                                                }}
                                                                    onPress={this.addToFav.bind(this)}

                                                                >
                                                                    <Icon name='heart' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                                                                </TouchableOpacity>
                                                            </View>

                                                        </View>
                                                    )} />
                                            </SafeAreaView>
                                        ) :
                                            <SafeAreaView style={styles.container}>
                                                <View style={styles.customSlide}>
                                                    <Image resizeMode="stretch" source={{ uri: this.props.representativeData.avatar_photo }} style={styles.customImage} />
                                                </View>
                                                <View style={{
                                                    flex: 1, flexDirection: 'row', top: -41, marginRight: 20,
                                                    alignItems: 'center', justifyContent: 'flex-end', position: 'relative',
                                                }}>
                                                    <TouchableOpacity style={{
                                                        height: 40, width: 40, borderColor: '#fce5c8',
                                                        borderWidth: 1, borderRadius: 5, marginRight: 0,
                                                        justifyContent: 'center', alignItems: 'center', backgroundColor: '#E94E1B'
                                                    }}
                                                        onPress={this.addToFav.bind(this)}

                                                    >
                                                        <Icon name='heart' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
                                                    </TouchableOpacity>
                                                </View>
                                            </SafeAreaView>
                                    }
                                </View>


                                <View style={{ flex: 0.6, marginTop: 10, width: "100%", alignItems: "center", }} >
                                    <ScrollView contentContainerStyle={styles.contentContainer} style={{ width: "95%", }}>

                                        {/* Name and address */}

                                        <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.name}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12, marginBottom: 10 }} >{this.props.representativeData.full_name}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12, }} >{this.props.str.address}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 10, marginBottom: 10 }} >{this.props.representativeData.address}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* Location and makecall*/}

                                        <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.location}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 10, marginBottom: 10 }} >{this.props.representativeData.city}, {this.props.representativeData.state}</Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity style={{ flex: 0.5, }}
                                                onPress={() => Communications.phonecall(this.props.representativeData.contact_phone, true)}
                                            >
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.makephonecall}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12, marginBottom: 10 }} >{this.props.representativeData.contact_phone}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10, marginBottom: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.icanwork}</Text>
                                                    {
                                                        (this.props.representativeData.workin_city_format != undefined) ? (
                                                            this.props.representativeData.workin_city_format.map((value, index) => {
                                                                return (
                                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{value}</Text>
                                                                )
                                                            })
                                                        ) :
                                                            null
                                                        // <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.representativeData.workin_city_format + " , "}</Text>
                                                    }
                                                </View>
                                            </View>

                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10, marginBottom: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.aboutme}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.representativeData.about_me},</Text>

                                                    {/* {
                                                    (this.props.taskerData.type_tasker != undefined && this.props.taskerData.type_tasker === Array) ? (
                                                        this.props.taskerData.type_tasker.map((value, index) => {
                                                            console.log(value, index, "html")
                                                            return (
                                                                <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{value},</Text>
                                                            )
                                                        })
                                                    ) :
                                                        <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.taskerData.type_tasker},</Text>
                                                } */}
                                                </View>
                                            </View>
                                        </View>

                                        {/* View and id */}

                                        <View style={{ flex: 1, flexDirection: "row", height: 40, borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10, marginBottom: 15 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.id}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >{this.props.representativeData.id}</Text>
                                                </View>
                                            </View>
                                            {/* <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.views}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12 }} >3</Text>
                                                </View>
                                            </View> */}
                                        </View>

                                    </ScrollView>
                                    <Fab
                                        active={this.state.active}
                                        direction="up"
                                        containerStyle={{ marginLeft: 10 }}
                                        style={{ backgroundColor: '#E94E1B' }}
                                        // position="bottomRight"
                                        position={this.props.str.language == "ar" ? "bottomLeft" : "bottomRight"}

                                        onPress={() => Communications.phonecall(this.props.representativeData.contact_phone, true)}
                                    >
                                        <Icon name="md-call" />
                                        {
                                            (this.state.userDetails && this.props.representativeData.id != "" && this.props.representativeData.id != "n/a" &&
                                                this.props.representativeData.full_name != "" && this.props.representativeData.full_name != "n/a" &&
                                                this.props.representativeData.user_email != "" && this.props.representativeData.user_email != "n/a" &&
                                                this.props.representativeData.contact_phone != "" && this.props.representativeData.contact_phone != "n/a"
                                            ) ? (
                                                    <Button
                                                        style={{ backgroundColor: '#3B5998', }}
                                                        onPress={() => this.emailSending()}
                                                    >
                                                        <Icon name="mail" />
                                                    </Button>
                                                ) :
                                                (this.state.chatButtonLoading === true) ? (
                                                    <Button
                                                        style={{ backgroundColor: '#3B5998', }}
                                                    // onPress={() => this.emailSending()}
                                                    >
                                                        <ActivityIndicator size="small" />
                                                    </Button>
                                                ) : null
                                        }
                                        <Button
                                            style={{ backgroundColor: '#3B5998', }}
                                            onPress={this.onShare}
                                        >
                                            <Entypo name='share' style={{ fontSize: 19, color: "white" }} />
                                        </Button>
                                    </Fab>
                                </View>
                            </View>
                        ) : null
                    }

                    {/* ****************************************News blogs**************************************** */}
                    {
                        (this.props.newsData) ? (
                            <View style={{ flex: 8, width: "100%", }}>
                                <View style={{ flex: 0.4 }}>
                                    <SafeAreaView style={styles.container}>
                                        <View style={styles.customSlide}>
                                            <Image resizeMode="stretch" source={{ uri: this.props.newsData.featured_img_src }} style={styles.customImage} />
                                        </View>
                                    </SafeAreaView>
                                </View>

                                <View style={{ flex: 0.6, marginTop: 10, width: "100%", alignItems: "center", }} >
                                    <ScrollView contentContainerStyle={styles.contentContainer} style={{ width: "95%", }}>
                                        <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.postedon}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12, marginBottom: 10 }} >{this.props.newsData.create_time}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 0.5, }}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.by}</Text>
                                                    {
                                                        (this.state.userDetails) ? (
                                                            <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 12, marginBottom: 10 }} >{this.state.userDetails.full_name || this.state.userDetails.user_name}</Text>

                                                        ) : <ActivityIndicator size="small" />
                                                    }
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 1, }}>
                                                <View style={{ marginLeft: 10, marginBottom: 10 }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }} >{this.props.str.title}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 20, marginTop: 10 }} >{this.props.newsData.title}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 15 }} >
                                            <View style={{ flex: 1, }}>
                                                <View style={{ marginLeft: 10, marginBottom: 20, }}>
                                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12, }} >{this.props.str.description}</Text>
                                                    <Text style={{ color: "#6a6a6a", fontWeight: "bold", fontSize: 20, marginTop: 10 }} >{this.props.newsData.description}</Text>
                                                </View>
                                            </View>
                                        </View>

                                    </ScrollView>
                                    <Fab
                                        active={this.state.active}
                                        direction="up"
                                        containerStyle={{ marginLeft: 10 }}
                                        style={{ backgroundColor: '#E94E1B' }}
                                        // position="bottomRight"
                                        position={this.props.str.language == "ar" ? "bottomLeft" : "bottomRight"}

                                        onPress={this.onShare}
                                    >
                                        <Entypo name='share' style={{ fontSize: 19, color: "white" }} />

                                    </Fab>
                                </View>
                            </View>
                        ) : null
                    }



                    {/* <Footer /> */}
                </View >
            </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(FithPageList);


const styles = StyleSheet.create({
    holder: {
        flex: 0.25,
        justifyContent: 'center',
    },
    contentContainer: {
        paddingBottom: 60,
        backgroundColor: "white",

    },
    container: {
        flex: 1,
    },
    containerForModal: {
        // flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // width:"100%"
    },
    textareaContainer: {
        height: "30%",
        width: "95%",
        padding: 5,
        // backgroundColor: '#F8F8F8',
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 100,
        fontSize: 14,
        // color: '#333',
    },
    customSlide: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    customImage: {
        width: "100%",
        height: "100%",
    },
    listView: {
        width: "100%", height: 40, marginTop: 15,
        borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    listTextOption: {
        marginLeft: 10, color: "#000", fontWeight: "bold", fontSize: 12
    },
    listTextOptionValue: {
        marginLeft: 10, color: "#6a6a6a", textAlign: "right",
    },
    input: { justifyContent: 'center', alignItems: 'center', width: '95%', },
});  
