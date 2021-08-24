import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Button, ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Content, Card, CardItem, Thumbnail, Icon, Badge } from 'native-base';
import { connect } from "react-redux";
import axios from 'axios';
import InfiniteScroll from 'react-native-infinite-scroll';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    CheckBox, Input, Item
} from 'native-base';
import * as Animatable from 'react-native-animatable';
import { TextField } from 'react-native-material-textfield';
import Textarea from 'react-native-textarea';


class ServiceProvider extends Component {
    constructor(props) {
        super(props);
        console.log('propsuser_name', props)
        this.state = {
            name: props && props.userDetails.user_name ? props.userDetails.user_name : '',
            companyName: props && props.userDetails.company_name ? props.userDetails.company_name : '',
            tel: props && props.userDetails.tel ? props.userDetails.tel : '',
            email: props && props.userDetails.user_email ? props.userDetails.user_email : '',
            // name: '',
            // companyName: '',
            // tel: '',
            // email: '',
            website: '',
            fbPage: '',
            linkedIn: '',
            services: {
                fbAdds: { description: '', price: '', showDescription: false },
                seo: { description: '', price: '', showDescription: false },
                digitalMarketingplannig: { description: '', price: '', showDescription: false },
                sitevisits: { description: '', price: '', showDescription: false },
                whatsappCampaign: { description: '', price: '', showDescription: false },
                viberCampaign: { description: '', price: '', showDescription: false },
                databaseOffering: { description: '', price: '', showDescription: false },
                graphicDesigning: { description: '', price: '', showDescription: false },
                twitterCompaign: { description: '', price: '', showDescription: false },
                InstagramCampaign: { description: '', price: '', showDescription: false },
                youtubeCampaign: { description: '', price: '', showDescription: false },
                googlePlusCampaign: { description: '', price: '', showDescription: false },
                facebookAccount: { description: '', price: '', showDescription: false },
                mobileAppMarketing: { description: '', price: '', showDescription: false },
            }
            ,
        }
    }

    ApiRequest = async (url, bodyFormData, image) => {

        var header1 = {
            token: "bearer " + this.props.userCredentials.token,
            clientsecret: '(*jh2kj36gjhasdi78743982u432j',
            clientkey: '34532hbjdsakjd2&&gjhjh11',
            'postman-token': '553d07fc-3950-1199-efd9-6b5b5f8315a2',
            'cache-control': 'no-cache',
            "Content-Type": "application/json",
            "Allow-Cross-Origin": '*',
        }
        var header2 = {
            token: "bearer " + this.props.userCredentials.token,
            clientsecret: '(*jh2kj36gjhasdi78743982u432j',
            clientkey: '34532hbjdsakjd2&&gjhjh11',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        }

        var options = {
            method: 'POST',
            url: url,
            headers: image ? header2 : header1,
            data: bodyFormData
        };
        return await axios(options)
            .then((data) => {
                return data
            }).catch((err) => {
                return err
            })

    }

    onChangeText = (val, name) => {
        this.setState({ [name]: val })
    }
    switchButton = (name) => {
        var state = this.state.services
        state[name].showDescription = !state[name].showDescription
        this.setState({ services: state })
    }
    onChangeSwitch = (val, field, name, ) => {
        var state = this.state.services
        state[name][field] = val
        this.setState({ services: state })
    }

    done() {
        const { services, name, companyName, tel, email, website, fbPage, linkedIn } = this.state

        if (name && tel) {
            this.setState({ loader: true })

            var urlm = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/people/user/beserviceprovider'

            let cloneData = {
                inputName: name,
                inputCompanyName: companyName,
                inputTel: tel,
                inputEmail: email,
                inputWebsite: website,
                inputFacebook: fbPage,
                inputLinkedin: linkedIn,

                facebook_ads: services.fbAdds.showDescription ? 1 : 0,
                facebook_ads_desc: services.fbAdds.description,
                facebook_ads_price: services.fbAdds.price,

                seo: services.seo.showDescription ? 1 : 0,
                seo_desc: services.seo.description,
                seo_price: services.seo.price,

                digital_marketing: services.digitalMarketingplannig.showDescription ? 1 : 0,
                digital_marketing_desc: services.digitalMarketingplannig.description,
                digital_marketing_price: services.digitalMarketingplannig.price,

                site_visits: services.sitevisits.showDescription ? 1 : 0,
                site_visits_desc: services.sitevisits.description,
                site_visits_price: services.sitevisits.price,

                whatsapp_camp: services.whatsappCampaign.showDescription ? 1 : 0,
                whatsapp_camp_desc: services.whatsappCampaign.description,
                whatsapp_camp_price: services.whatsappCampaign.price,

                viber_camp: services.viberCampaign.showDescription ? 1 : 0,
                viber_camp_desc: services.viberCampaign.description,
                viber_camp_price: services.viberCampaign.price,

                database_offer: services.databaseOffering.showDescription ? 1 : 0,
                database_offer_desc: services.databaseOffering.description,
                database_offer_price: services.databaseOffering.price,

                graphic_design: services.graphicDesigning.showDescription ? 1 : 0,
                graphic_design_desc: services.graphicDesigning.description,
                graphic_design_price: services.graphicDesigning.price,

                twitter_camp: services.twitterCompaign.showDescription ? 1 : 0,
                twitter_camp_desc: services.twitterCompaign.description,
                twitter_camp_price: services.twitterCompaign.price,

                instagram_camp: services.InstagramCampaign.showDescription ? 1 : 0,
                instagram_camp_desc: services.InstagramCampaign.description,
                instagram_camp_price: services.InstagramCampaign.price,

                youtube_camp: services.youtubeCampaign.showDescription ? 1 : 0,
                youtube_camp_desc: services.youtubeCampaign.description,
                youtube_camp_price: services.youtubeCampaign.price,

                google_plus_camp: services.googlePlusCampaign.showDescription ? 1 : 0,
                google_plus_camp_desc: services.googlePlusCampaign.description,
                google_plus_camp_price: services.googlePlusCampaign.price,

                facebook_account: services.facebookAccount.showDescription ? 1 : 0,
                facebook_account_desc: services.facebookAccount.description,
                facebook_account_price: services.facebookAccount.price,

                mobile_app: services.mobileAppMarketing.showDescription ? 1 : 0,
                mobile_app_desc: services.mobileAppMarketing.description,
                mobile_app_price: services.mobileAppMarketing.price,
            }

            var bodyFormData = new FormData();
            for (var key in cloneData) {
                if (cloneData[key] && cloneData[key] !== undefined && cloneData[key].length !== 0) {
                    bodyFormData.append(key, cloneData[key]);
                }
            }

            console.log(bodyFormData, 'body form datat')

            this.ApiRequest(urlm, bodyFormData, false).then((data) => {
                console.log(data, 'data')
                this.setState({ loader: false })
                if (data && data.data && data.data.message) {
                    alert(data.data.message)
                } else {
                    alert(this.props.str.contacUstAlert)
                }
            }).catch((err) => {
                console.log(err, 'err')
                this.setState({ loader: false })
            })

        } else {
            alert(this.props.str.telAlert)
        }
    }

    render() {

        const { loader } = this.state
        let services = this.state.services
        return (
            <View style={{
                flex: 1,
                backgroundColor: "white",
                width: "100%",
                position: 'relative'
            }}>
                <View style={{
                    flex: 1.4,
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
                        <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.beourserviceprovider}</Text>
                    </View>
                </View>
                <View style={{ flex: 8, paddingHorizontal: '5%' }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ marginTop: 5, justifyContent: "space-between", width: "100%" }}>
                            <Item style={styles.input}>
                                <Input
                                    placeholder={this.props.str.name}
                                    placeholderStyle={{ fontSize: 10 }}
                                    placeholderTextColor="#b3b3b3"
                                    style={{ fontSize: 16 }}
                                    onChangeText={(val) => this.onChangeText(val, 'name')}
                                    value={this.state.name}
                                />
                            </Item>
                            <Item style={styles.input}>
                                <Input
                                    placeholder={this.props.str.companyname}
                                    placeholderStyle={{ fontSize: 10 }}
                                    placeholderTextColor="#b3b3b3"
                                    onChangeText={(val) => this.onChangeText(val, 'companyName')}
                                    style={{ fontSize: 16 }}
                                    value={this.state.companyName}
                                />
                            </Item>
                            <Item style={styles.input}>
                                <Input
                                    placeholder={this.props.str.tel}
                                    keyboardType="numeric"
                                    placeholderStyle={{ fontSize: 10 }}
                                    placeholderTextColor="#b3b3b3"
                                    style={{ fontSize: 16 }}
                                    onChangeText={(val) => this.onChangeText(val, 'tel')}
                                    value={this.state.tel}
                                />
                            </Item>
                            <Item style={styles.input}>
                                <Input
                                    placeholder={this.props.str.email}
                                    keyboardType="email-address"
                                    placeholderStyle={{ fontSize: 10 }}
                                    placeholderTextColor="#b3b3b3"
                                    style={{ fontSize: 16 }}
                                    onChangeText={(val) => this.onChangeText(val, 'email')}
                                    value={this.state.email}
                                />
                            </Item>
                            <Item style={styles.input}>
                                <Input
                                    placeholder={this.props.str.website}
                                    placeholderStyle={{ fontSize: 10 }}
                                    placeholderTextColor="#b3b3b3"
                                    style={{ fontSize: 16 }}
                                    onChangeText={(val) => this.onChangeText(val, 'website')}
                                    value={this.state.website}
                                />
                            </Item>
                            <Item style={styles.input}>
                                <Input
                                    placeholder={this.props.str.facebook}
                                    keyboardType="numeric"
                                    placeholderStyle={{ fontSize: 10 }}
                                    placeholderTextColor="#b3b3b3"
                                    style={{ fontSize: 16 }}
                                    onChangeText={(val) => this.onChangeText(val, 'fbPage')}
                                    value={this.state.fbPage}
                                />
                            </Item>
                            <Item style={styles.input}>
                                <Input
                                    placeholder={this.props.str.Linkedin}
                                    keyboardType="numeric"
                                    placeholderStyle={{ fontSize: 10 }}
                                    placeholderTextColor="#b3b3b3"
                                    style={{ fontSize: 16 }}
                                    onChangeText={(val) => this.onChangeText(val, 'linkedIn')}
                                    value={this.state.linkedIn}
                                />
                            </Item>
                            <View style={{ width: '100%', }}>
                                <View style={styles.switchView}>
                                    <Text>{this.props.str.fbAds}</Text>
                                    <Switch value={services.fbAdds.showDescription} onValueChange={() => this.switchButton('fbAdds')} />
                                </View>
                                {
                                    services.fbAdds.showDescription ?
                                        <View>
                                            <Textarea
                                                // containerStyle={styles.textareaContainer}
                                                style={styles.textarea}
                                                onChangeText={(val) => this.onChangeSwitch(val, 'description', 'fbAdds')}
                                                // defaultValue={this.state.text}
                                                maxLength={120}
                                                placeholder={this.props.str.description}
                                                placeholderTextColor={'#c7c7c7'}
                                                underlineColorAndroid={'transparent'}
                                            />
                                            <Item style={styles.input}>
                                                <Input
                                                    placeholder={this.props.str.price}
                                                    placeholderStyle={{ fontSize: 10 }}
                                                    placeholderTextColor="#b3b3b3"
                                                    style={{ fontSize: 16 }}
                                                    onChangeText={(val) => this.onChangeSwitch(val, 'price', 'fbAdds')}
                                                // value={this.state.linkedIn}
                                                />
                                            </Item>
                                        </View>
                                        :
                                        null
                                }
                                <View style={styles.switchView}>
                                    <Text> {this.props.str.seo} </Text>
                                    <Switch value={services.seo.showDescription} onValueChange={() => this.switchButton('seo')} />
                                </View>
                                {
                                    services.seo.showDescription ?
                                        <View>
                                            <Textarea
                                                // containerStyle={styles.textareaContainer}
                                                style={styles.textarea}
                                                onChangeText={(val) => this.onChangeSwitch(val, 'description', 'seo')}
                                                // defaultValue={this.state.text}
                                                maxLength={120}
                                                placeholder={this.props.str.description}
                                                placeholderTextColor={'#c7c7c7'}
                                                underlineColorAndroid={'transparent'}
                                            />
                                            <Item style={styles.input}>
                                                <Input
                                                    placeholder={this.props.str.price}
                                                    placeholderStyle={{ fontSize: 10 }}
                                                    placeholderTextColor="#b3b3b3"
                                                    style={{ fontSize: 16 }}
                                                    onChangeText={(val) => this.onChangeSwitch(val, 'price', 'seo')}
                                                // value={this.state.linkedIn}
                                                />
                                            </Item>
                                        </View>
                                        :
                                        null
                                }
                                <View style={styles.switchView}>
                                    <Text> {this.props.str.dmp} </Text>
                                    <Switch value={services.digitalMarketingplannig.showDescription} onValueChange={() => this.switchButton('digitalMarketingplannig')} />
                                </View>
                                {
                                    services.digitalMarketingplannig.showDescription ?
                                        <View>
                                            <Textarea
                                                // containerStyle={styles.textareaContainer}
                                                style={styles.textarea}
                                                onChangeText={(val) => this.onChangeSwitch(val, 'description', 'digitalMarketingplannig')}
                                                // defaultValue={this.state.text}
                                                maxLength={120}
                                                placeholder={this.props.str.description}
                                                placeholderTextColor={'#c7c7c7'}
                                                underlineColorAndroid={'transparent'}
                                            />
                                            <Item style={styles.input}>
                                                <Input
                                                    placeholder={this.props.str.price}
                                                    placeholderStyle={{ fontSize: 10 }}
                                                    placeholderTextColor="#b3b3b3"
                                                    style={{ fontSize: 16 }}
                                                    onChangeText={(val) => this.onChangeSwitch(val, 'price', 'digitalMarketingplannig')}
                                                // value={this.state.linkedIn}
                                                />
                                            </Item>
                                        </View>
                                        :
                                        null
                                }
                                <View style={styles.switchView}>
                                    <Text> {this.props.str.visits} </Text>
                                    <Switch value={services.sitevisits.showDescription} onValueChange={() => this.switchButton('sitevisits')} />
                                </View>
                                {
                                    services.sitevisits.showDescription ?
                                        <View>
                                            <Textarea
                                                // containerStyle={styles.textareaContainer}
                                                style={styles.textarea}
                                                onChangeText={(val) => this.onChangeSwitch(val, 'description', 'sitevisits')}
                                                // defaultValue={this.state.text}
                                                maxLength={120}
                                                placeholder={this.props.str.description}
                                                placeholderTextColor={'#c7c7c7'}
                                                underlineColorAndroid={'transparent'}
                                            />
                                            <Item style={styles.input}>
                                                <Input
                                                    placeholder={this.props.str.price}
                                                    placeholderStyle={{ fontSize: 10 }}
                                                    placeholderTextColor="#b3b3b3"
                                                    style={{ fontSize: 16 }}
                                                    onChangeText={(val) => this.onChangeSwitch(val, 'price', 'sitevisits')}
                                                // value={this.state.linkedIn}
                                                />
                                            </Item>
                                        </View>
                                        :
                                        null
                                }
                                <View style={styles.switchView}>
                                    <Text> {this.props.str.vibComp} </Text>
                                    <Switch value={services.viberCampaign.showDescription} onValueChange={() => this.switchButton('viberCampaign')} />
                                </View>
                                {
                                    services.viberCampaign.showDescription ?
                                        <View>
                                            <Textarea
                                                // containerStyle={styles.textareaContainer}
                                                style={styles.textarea}
                                                onChangeText={(val) => this.onChangeSwitch(val, 'description', 'viberCampaign')}
                                                // defaultValue={this.state.text}
                                                maxLength={120}
                                                placeholder={this.props.str.description}
                                                placeholderTextColor={'#c7c7c7'}
                                                underlineColorAndroid={'transparent'}
                                            />
                                            <Item style={styles.input}>
                                                <Input
                                                    placeholder={this.props.str.price}
                                                    placeholderStyle={{ fontSize: 10 }}
                                                    placeholderTextColor="#b3b3b3"
                                                    style={{ fontSize: 16 }}
                                                    onChangeText={(val) => this.onChangeSwitch(val, 'price', 'viberCampaign')}
                                                // value={this.state.linkedIn}
                                                />
                                            </Item>
                                        </View>
                                        :
                                        null
                                }
                                <View style={styles.switchView}>
                                    <Text> {this.props.str.dbOffer} </Text>
                                    <Switch value={services.databaseOffering.showDescription} onValueChange={() => this.switchButton('databaseOffering')} />
                                </View>
                                {
                                    services.databaseOffering.showDescription ?
                                        <View>
                                            <Textarea
                                                // containerStyle={styles.textareaContainer}
                                                style={styles.textarea}
                                                onChangeText={(val) => this.onChangeSwitch(val, 'description', 'databaseOffering')}
                                                // defaultValue={this.state.text}
                                                maxLength={120}
                                                placeholder={this.props.str.description}
                                                placeholderTextColor={'#c7c7c7'}
                                                underlineColorAndroid={'transparent'}
                                            />
                                            <Item style={styles.input}>
                                                <Input
                                                    placeholder={this.props.str.price}
                                                    placeholderStyle={{ fontSize: 10 }}
                                                    placeholderTextColor="#b3b3b3"
                                                    style={{ fontSize: 16 }}
                                                    onChangeText={(val) => this.onChangeSwitch(val, 'price', 'databaseOffering')}
                                                // value={this.state.linkedIn}
                                                />
                                            </Item>
                                        </View>
                                        :
                                        null
                                }
                                <View style={styles.switchView}>
                                    <Text> {this.props.str.graphDes} </Text>
                                    <Switch value={services.graphicDesigning.showDescription} onValueChange={() => this.switchButton('graphicDesigning')} />
                                </View>
                                {
                                    services.graphicDesigning.showDescription ?
                                        <View>
                                            <Textarea
                                                // containerStyle={styles.textareaContainer}
                                                style={styles.textarea}
                                                onChangeText={(val) => this.onChangeSwitch(val, 'description', 'graphicDesigning')}
                                                // defaultValue={this.state.text}
                                                maxLength={120}
                                                placeholder={this.props.str.description}
                                                placeholderTextColor={'#c7c7c7'}
                                                underlineColorAndroid={'transparent'}
                                            />
                                            <Item style={styles.input}>
                                                <Input
                                                    placeholder={this.props.str.price}
                                                    placeholderStyle={{ fontSize: 10 }}
                                                    placeholderTextColor="#b3b3b3"
                                                    style={{ fontSize: 16 }}
                                                    onChangeText={(val) => this.onChangeSwitch(val, 'price', 'graphicDesigning')}
                                                // value={this.state.linkedIn}
                                                />
                                            </Item>
                                        </View>
                                        :
                                        null
                                }
                                <View style={styles.switchView}>
                                    <Text>{this.props.str.twtrCmp}</Text>
                                    <Switch value={services.twitterCompaign.showDescription} onValueChange={() => this.switchButton('twitterCompaign')} />
                                </View>
                                {
                                    services.twitterCompaign.showDescription ?
                                        <View>
                                            <Textarea
                                                // containerStyle={styles.textareaContainer}
                                                style={styles.textarea}
                                                onChangeText={(val) => this.onChangeSwitch(val, 'description', 'twitterCompaign')}
                                                // defaultValue={this.state.text}
                                                maxLength={120}
                                                placeholder={this.props.str.description}
                                                placeholderTextColor={'#c7c7c7'}
                                                underlineColorAndroid={'transparent'}
                                            />
                                            <Item style={styles.input}>
                                                <Input
                                                    placeholder={this.props.str.price}
                                                    placeholderStyle={{ fontSize: 10 }}
                                                    placeholderTextColor="#b3b3b3"
                                                    style={{ fontSize: 16 }}
                                                    onChangeText={(val) => this.onChangeSwitch(val, 'price', 'twitterCompaign')}
                                                // value={this.state.linkedIn}
                                                />
                                            </Item>
                                        </View>
                                        :
                                        null
                                }
                                <View style={styles.switchView}>
                                    <Text> {this.props.str.instCom} </Text>
                                    <Switch value={services.InstagramCampaign.showDescription} onValueChange={() => this.switchButton('InstagramCampaign')} />
                                </View>
                                {
                                    services.InstagramCampaign.showDescription ?
                                        <View>
                                            <Textarea
                                                // containerStyle={styles.textareaContainer}
                                                style={styles.textarea}
                                                onChangeText={(val) => this.onChangeSwitch(val, 'description', 'InstagramCampaign')}
                                                // defaultValue={this.state.text}
                                                maxLength={120}
                                                placeholder={this.props.str.description}
                                                placeholderTextColor={'#c7c7c7'}
                                                underlineColorAndroid={'transparent'}
                                            />
                                            <Item style={styles.input}>
                                                <Input
                                                    placeholder={this.props.str.price}
                                                    placeholderStyle={{ fontSize: 10 }}
                                                    placeholderTextColor="#b3b3b3"
                                                    style={{ fontSize: 16 }}
                                                    onChangeText={(val) => this.onChangeSwitch(val, 'price', 'InstagramCampaign')}
                                                // value={this.state.linkedIn}
                                                />
                                            </Item>
                                        </View>
                                        :
                                        null
                                }
                                <View style={styles.switchView}>
                                    <Text> {this.props.str.youtCom} </Text>
                                    <Switch value={services.youtubeCampaign.showDescription} onValueChange={() => this.switchButton('youtubeCampaign')} />
                                </View>
                                {
                                    services.youtubeCampaign.showDescription ?
                                        <View>
                                            <Textarea
                                                // containerStyle={styles.textareaContainer}
                                                style={styles.textarea}
                                                onChangeText={(val) => this.onChangeSwitch(val, 'description', 'youtubeCampaign')}
                                                // defaultValue={this.state.text}
                                                maxLength={120}
                                                placeholder={this.props.str.description}
                                                placeholderTextColor={'#c7c7c7'}
                                                underlineColorAndroid={'transparent'}
                                            />
                                            <Item style={styles.input}>
                                                <Input
                                                    placeholder={this.props.str.price}
                                                    placeholderStyle={{ fontSize: 10 }}
                                                    placeholderTextColor="#b3b3b3"
                                                    style={{ fontSize: 16 }}
                                                    onChangeText={(val) => this.onChangeSwitch(val, 'price', 'youtubeCampaign')}
                                                // value={this.state.linkedIn}
                                                />
                                            </Item>
                                        </View>
                                        :
                                        null
                                }
                                <View style={styles.switchView}>
                                    <Text>{this.props.str.fbAccount} </Text>
                                    <Switch value={services.facebookAccount.showDescription} onValueChange={() => this.switchButton('facebookAccount')} />
                                </View>
                                {
                                    services.facebookAccount.showDescription ?
                                        <View>
                                            <Textarea
                                                // containerStyle={styles.textareaContainer}
                                                style={styles.textarea}
                                                onChangeText={(val) => this.onChangeSwitch(val, 'description', 'facebookAccount')}
                                                // defaultValue={this.state.text}
                                                maxLength={120}
                                                placeholder={this.props.str.description}
                                                placeholderTextColor={'#c7c7c7'}
                                                underlineColorAndroid={'transparent'}
                                            />
                                            <Item style={styles.input}>
                                                <Input
                                                    placeholder={this.props.str.price}
                                                    placeholderStyle={{ fontSize: 10 }}
                                                    placeholderTextColor="#b3b3b3"
                                                    style={{ fontSize: 16 }}
                                                    onChangeText={(val) => this.onChangeSwitch(val, 'price', 'facebookAccount')}
                                                // value={this.state.linkedIn}
                                                />
                                            </Item>
                                        </View>
                                        :
                                        null
                                }
                                <View style={styles.switchView}>
                                    <Text>{this.props.str.description}</Text>
                                    <Switch value={services.mobileAppMarketing.showDescription} onValueChange={() => this.switchButton('mobileAppMarketing')} />
                                </View>
                                {
                                    services.mobileAppMarketing.showDescription ?
                                        <View>
                                            <Textarea
                                                // containerStyle={styles.textareaContainer}
                                                style={styles.textarea}
                                                onChangeText={(val) => this.onChangeSwitch(val, 'description', 'mobileAppMarketing')}
                                                // defaultValue={this.state.text}
                                                maxLength={120}
                                                placeholder={this.props.str.description}
                                                placeholderTextColor={'#c7c7c7'}
                                                underlineColorAndroid={'transparent'}
                                            />
                                            <Item style={styles.input}>
                                                <Input
                                                    placeholder={this.props.str.price}
                                                    placeholderStyle={{ fontSize: 10 }}
                                                    placeholderTextColor="#b3b3b3"
                                                    style={{ fontSize: 16 }}
                                                    onChangeText={(val) => this.onChangeSwitch(val, 'price', 'mobileAppMarketing')}
                                                // value={this.state.linkedIn}
                                                />
                                            </Item>
                                        </View>
                                        :
                                        null
                                }
                            </View>
                            <View
                                style={{ paddingVertical: 30, alignItems: 'center' }}
                            >
                                <View style={{ width: '90%' }}>
                                    {
                                        loader ?
                                            <ActivityIndicator />
                                            :
                                            <Button
                                                onPress={() => this.done()}
                                                color={'#E94E1B'}
                                                title={this.props.str.submit}
                                            />
                                    }
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>

        );
    }
}

let mapStateToProps = state => {
    console.log('userCredentials****', str, 'str', state.root.userDetails);
    return {
        str: state.root.str,
        userCredentials: state.root.userCredentials,
        userDetails: state.root.userDetails,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        // languageSet: (lang) => {
        //     dispatch(languageSet(lang))
        // },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ServiceProvider);
const styles = StyleSheet.create({
    input: { justifyContent: 'center', alignItems: 'center', width: '94%', },
    switchView: {
        flexDirection: 'row', justifyContent: 'space-between',
        height: 50, alignItems: 'center'
    }

});  
